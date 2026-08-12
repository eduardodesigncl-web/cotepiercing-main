import { Nav } from "./Nav";
import { SiteFooter } from "./SiteFooter";
import { SiteBreadcrumbs, type BreadcrumbItem } from "./SiteBreadcrumbs";

export function ContentPage({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  breadcrumbs?: BreadcrumbItem[];
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />
      <main>
        <header className="border-b border-border bg-[var(--stone)]/35 pb-16 pt-36 lg:pb-24 lg:pt-44">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            {breadcrumbs && (
              <div className="mb-8">
                <SiteBreadcrumbs items={breadcrumbs} />
              </div>
            )}
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl lg:text-7xl">
              {title}
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-relaxed text-muted-foreground lg:text-lg">
              {intro}
            </p>
          </div>
        </header>
        <div className="mx-auto max-w-5xl px-6 py-14 lg:px-10 lg:py-20">
          {children}
          <aside className="mt-16 border-t border-border pt-10" aria-label="Enlaces relacionados">
            <h2 className="font-serif text-2xl">Explora Cotepiercing en Arica</h2>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <a href="/servicios" className="text-[var(--gold)] hover:opacity-70">
                Conocer servicios de piercing profesional
              </a>
              <a href="/precios" className="text-[var(--gold)] hover:opacity-70">
                Consultar precios de servicios
              </a>
              <a href="/evaluacion" className="text-[var(--gold)] hover:opacity-70">
                Solicitar una evaluación de piercing
              </a>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
