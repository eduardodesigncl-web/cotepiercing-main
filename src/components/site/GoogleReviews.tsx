import { useEffect, useState } from "react";
import { ExternalLink, Star } from "lucide-react";
import { SITE } from "@/lib/site";
import type { GooglePlaceSummary } from "@/lib/google-reviews";

const fallback: GooglePlaceSummary = {
  available: false,
  reviews: [],
  googleMapsUri: SITE.googleBusinessUrl,
  writeReviewUri: SITE.googleBusinessUrl,
};

export function GoogleReviews() {
  const [data, setData] = useState<GooglePlaceSummary>(fallback);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/google-reviews", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : fallback))
      .then((payload: GooglePlaceSummary) => setData(payload))
      .catch(() => setData(fallback));
    return () => controller.abort();
  }, []);

  return (
    <section aria-labelledby="google-reviews-title" className="bg-[var(--stone)]/40 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <p className="eyebrow">Opiniones verificadas</p>
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 id="google-reviews-title" className="font-serif text-3xl lg:text-5xl">
              Reseñas de Cotepiercing en Google
            </h2>
            {data.rating && (
              <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" />
                <strong className="text-foreground">{data.rating.toFixed(1)}</strong>
                {data.userRatingCount ? ` · ${data.userRatingCount} opiniones` : ""}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={data.googleMapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[var(--gold)] px-6 py-3 text-[11px] tracking-[0.2em] uppercase text-[var(--gold)]"
            >
              Ver reseñas <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <a
              href={data.writeReviewUri}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[var(--gold)] px-6 py-3 text-[11px] tracking-[0.2em] uppercase text-white"
            >
              Dejar una reseña <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
        {data.reviews.length > 0 && (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {data.reviews.slice(0, 3).map((review, index) => (
              <article
                key={`${review.author}-${review.publishTime ?? index}`}
                className="border border-border bg-background p-6"
              >
                <div className="flex gap-1" aria-label={`${review.rating} de 5 estrellas`}>
                  {Array.from({ length: 5 }).map((_, star) => (
                    <Star
                      key={star}
                      className={`h-3.5 w-3.5 ${
                        star < review.rating
                          ? "fill-[var(--gold)] text-[var(--gold)]"
                          : "text-border"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-4 line-clamp-5 text-sm leading-relaxed text-foreground/80">
                  {review.text}
                </p>
                <p className="mt-5 text-xs font-medium">{review.author}</p>
                {review.relativeTime && (
                  <p className="mt-1 text-[11px] text-muted-foreground">{review.relativeTime}</p>
                )}
              </article>
            ))}
          </div>
        )}
        <p className="mt-6 text-[11px] text-muted-foreground">
          Reseñas y valoración proporcionadas por Google.
        </p>
      </div>
    </section>
  );
}
