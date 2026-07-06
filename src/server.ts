import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { BUSINESS_ADDRESS_WITH_COUNTRY, SITE } from "./lib/site";
import type { GooglePlaceSummary, GoogleReview } from "./lib/google-reviews";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

type RuntimeEnv = {
  GOOGLE_PLACES_API_KEY?: string;
  GOOGLE_PLACE_ID?: string;
  CF_VERSION_METADATA?: {
    id: string;
    tag: string;
    timestamp: string;
  };
};

type RuntimeContext = {
  waitUntil?: (promise: Promise<unknown>) => void;
};

type PlacesAuthor = {
  displayName?: string;
  uri?: string;
  photoUri?: string;
};

type PlacesReview = {
  authorAttribution?: PlacesAuthor;
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  publishTime?: string;
};

type TextSearchPlace = {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
};

type PlaceDetails = {
  id?: string;
  displayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
  reviews?: PlacesReview[];
  googleMapsUri?: string;
};

const REVIEW_CACHE_SECONDS = 60 * 60 * 24;
const APP_COMMIT = __APP_COMMIT__;
const APP_BUILD_TIME = __APP_BUILD_TIME__;

function unavailableReviews(): GooglePlaceSummary {
  return {
    available: false,
    reviews: [],
    googleMapsUri: SITE.googleBusinessUrl,
    writeReviewUri: SITE.googleBusinessUrl,
  };
}

function jsonResponse(data: GooglePlaceSummary, status = 200): Response {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": `public, max-age=300, s-maxage=${REVIEW_CACHE_SECONDS}, stale-while-revalidate=604800`,
    },
  });
}

async function resolvePlaceId(apiKey: string): Promise<string | undefined> {
  const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress",
    },
    body: JSON.stringify({
      textQuery: `${SITE.name}, ${BUSINESS_ADDRESS_WITH_COUNTRY}`,
      languageCode: "es",
      regionCode: "CL",
    }),
  });
  if (!response.ok) return undefined;
  const payload = (await response.json()) as {
    places?: TextSearchPlace[];
  };
  const places = payload.places ?? [];
  const businessName = SITE.name.toLocaleLowerCase("es");
  const streetAddress = SITE.streetAddress.toLocaleLowerCase("es");

  const exactNameMatch = places.find((place) =>
    place.displayName?.text?.toLocaleLowerCase("es").includes(businessName),
  );
  if (exactNameMatch?.id) return exactNameMatch.id;

  const addressMatch = places.find((place) =>
    place.formattedAddress?.toLocaleLowerCase("es").includes(streetAddress),
  );
  return addressMatch?.id ?? places[0]?.id;
}

function normalizeReview(review: PlacesReview): GoogleReview | null {
  const text = review.text?.text ?? review.originalText?.text;
  if (!text) return null;
  return {
    author: review.authorAttribution?.displayName ?? "Cliente de Google",
    authorUri: review.authorAttribution?.uri,
    profilePhotoUri: review.authorAttribution?.photoUri,
    rating: Math.max(0, Math.min(5, review.rating ?? 0)),
    text,
    relativeTime: review.relativePublishTimeDescription,
    publishTime: review.publishTime,
  };
}

async function fetchGoogleReviews(apiKey: string, configuredPlaceId?: string) {
  const placeId = configuredPlaceId || (await resolvePlaceId(apiKey));
  if (!placeId) return unavailableReviews();

  const response = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=es&regionCode=CL`,
    {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "id,displayName,rating,userRatingCount,reviews,googleMapsUri",
      },
    },
  );
  if (!response.ok) return unavailableReviews();
  const place = (await response.json()) as PlaceDetails;
  return {
    available: true,
    rating: place.rating,
    userRatingCount: place.userRatingCount,
    reviews: (place.reviews ?? [])
      .map(normalizeReview)
      .filter((review): review is GoogleReview => review !== null),
    googleMapsUri: place.googleMapsUri ?? SITE.googleBusinessUrl,
    writeReviewUri: `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`,
    updatedAt: new Date().toISOString(),
  } satisfies GooglePlaceSummary;
}

async function handleGoogleReviews(
  request: Request,
  runtimeEnv: RuntimeEnv,
  ctx: RuntimeContext,
): Promise<Response> {
  const cacheStorage = globalThis.caches as CacheStorage & { default?: Cache };
  const cache = cacheStorage?.default;
  const cacheKey = new Request(new URL("/__cache/google-reviews-v1", request.url), {
    method: "GET",
  });
  const cached = cache ? await cache.match(cacheKey) : undefined;
  if (cached) return cached;

  const apiKey = runtimeEnv.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return jsonResponse(unavailableReviews());

  try {
    const data = await fetchGoogleReviews(apiKey, runtimeEnv.GOOGLE_PLACE_ID);
    const response = jsonResponse(data);
    if (cache) {
      const write = cache.put(cacheKey, response.clone());
      if (ctx.waitUntil) ctx.waitUntil(write);
      else await write;
    }
    return response;
  } catch (error) {
    console.error(JSON.stringify({ event: "google_reviews_error", message: String(error) }));
    return jsonResponse(unavailableReviews());
  }
}

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

const SECURITY_HEADERS: Record<string, string> = {
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "X-Frame-Options": "SAMEORIGIN",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://static.cloudflareinsights.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "frame-src https://maps.google.com https://www.google.com",
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://cloudflareinsights.com",
  ].join("; "),
};

function cachePolicyFor(url: URL, response: Response): string | undefined {
  if (response.headers.has("Cache-Control")) return undefined;
  if (url.pathname === "/version.json") return "no-store";
  if (url.pathname.startsWith("/assets/")) return "public, max-age=31536000, immutable";
  if (
    url.pathname === "/robots.txt" ||
    url.pathname === "/sitemap.xml" ||
    url.pathname === "/llms.txt"
  ) {
    return "public, max-age=3600, stale-while-revalidate=86400";
  }
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("text/html")) return "public, max-age=0, must-revalidate";
  return undefined;
}

function addResponseHeaders(
  request: Request,
  response: Response,
  runtimeEnv?: RuntimeEnv,
): Response {
  const url = new URL(request.url);
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    if (!headers.has(key)) {
      headers.set(key, value);
    }
  }
  headers.set("X-App-Commit", APP_COMMIT);
  if (runtimeEnv?.CF_VERSION_METADATA?.id) {
    headers.set("X-Cloudflare-Worker-Version", runtimeEnv.CF_VERSION_METADATA.id);
  }
  const cacheControl = cachePolicyFor(url, response);
  if (cacheControl) headers.set("Cache-Control", cacheControl);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function trailingSlashRedirect(request: Request): Response | undefined {
  const url = new URL(request.url);
  const { pathname } = url;
  if (pathname === "/" || !pathname.endsWith("/") || pathname.startsWith("/api/")) {
    return undefined;
  }

  const lastSegment = pathname.slice(0, -1).split("/").pop() ?? "";
  if (lastSegment.includes(".")) return undefined;

  url.pathname = pathname.slice(0, -1);
  return new Response(null, {
    status: 301,
    headers: {
      Location: `${url.pathname}${url.search}`,
      "Cache-Control": "public, max-age=86400",
    },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const url = new URL(request.url);
    const runtimeEnv = env as RuntimeEnv;
    const redirect = trailingSlashRedirect(request);
    if (redirect) return addResponseHeaders(request, redirect, runtimeEnv);

    if (url.pathname === "/version.json" && request.method === "GET") {
      return addResponseHeaders(
        request,
        Response.json({
          commit: APP_COMMIT,
          buildTime: APP_BUILD_TIME,
          cloudflareVersion: runtimeEnv.CF_VERSION_METADATA ?? null,
        }),
        runtimeEnv,
      );
    }
    if (url.pathname === "/api/google-reviews" && request.method === "GET") {
      return addResponseHeaders(
        request,
        await handleGoogleReviews(request, runtimeEnv, ctx as RuntimeContext),
        runtimeEnv,
      );
    }
    if (url.pathname === "/google6dcbd8f7e36626a2.html") {
      return addResponseHeaders(
        request,
        new Response("google-site-verification: google6dcbd8f7e36626a2.html", {
          status: 200,
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
        runtimeEnv,
      );
    }

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      return addResponseHeaders(request, normalized, runtimeEnv);
    } catch (error) {
      console.error(error);
      return addResponseHeaders(request, brandedErrorResponse(), runtimeEnv);
    }
  },
};
