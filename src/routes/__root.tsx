import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import { SITE_URL } from "@/lib/config";
import { ConsentBanner } from "@/components/site/ConsentBanner";
import { registerCotepiercingWebMcpTools } from "@/lib/webmcp";
import appCss from "@/styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página no encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La página que buscas no existe o fue movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Esta página no pudo cargar
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ocurrió un problema. Puedes volver a intentar o regresar al inicio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Intentar nuevamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Cotepiercing | Body piercing profesional" },
      {
        name: "description",
        content:
          "Cotepiercing es el espacio profesional de María José, piercer en Arica especializada en evaluación anatómica, asepsia rigurosa, joyería inicial incluida y cuidados seguros.",
      },
      { name: "author", content: "María José — Cotepiercing" },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Cotepiercing" },
      { property: "og:locale", content: "es_CL" },
      { property: "og:title", content: "Cotepiercing | Body piercing profesional" },
      {
        property: "og:description",
        content:
          "Body piercing profesional con María José: evaluación anatómica, higiene, joyería inicial incluida y reserva por WhatsApp.",
      },
      { property: "og:url", content: SITE_URL },
      {
        property: "og:image",
        content: `${SITE_URL}/cotepiercing-piercing-profesional-arica-chile-og.png`,
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Cotepiercing | Body piercing profesional" },
      {
        name: "twitter:description",
        content:
          "Piercing profesional con evaluación anatómica, higiene y joyería inicial incluida.",
      },
      {
        name: "twitter:image",
        content: `${SITE_URL}/cotepiercing-piercing-profesional-arica-chile-og.png`,
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" as const },
      { rel: "icon", type: "image/png", href: "/favicon-512.png", sizes: "512x512" },
      { rel: "icon", type: "image/png", href: "/favicon-192.png", sizes: "192x192" },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <ConsentBanner />
        <Scripts />
        {/* Cloudflare Web Analytics */}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "7a9115eb1564479994964427e51bd929"}'
        ></script>
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();

  useEffect(() => {
    const controller = registerCotepiercingWebMcpTools();
    return () => controller?.abort();
  }, []);

  useEffect(() => {
    window.scrollTo(0, window.scrollY);
  }, [location.pathname, location.hash]);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
