import { SITE } from "@/lib/site";

const links = [
  { href: "/servicios", label: "Servicios" },
  { href: "/piercing-arica", label: "Piercing en Arica" },
  { href: "/joyeria", label: "Joyería" },
  { href: "/servicios/oreja", label: "Oreja" },
  { href: "/servicios/nariz-rostro", label: "Nariz y rostro" },
  { href: "/servicios/labio-boca", label: "Labio y boca" },
  { href: "/servicios/cuerpo", label: "Cuerpo" },
  { href: "/servicios/privado", label: "Servicios privados" },
  { href: "/precios", label: "Precios" },
  { href: "/evaluacion", label: "Evaluación" },
  { href: "/estudio", label: "Estudio" },
  { href: "/sobre-cote", label: "Sobre María José" },
  { href: "/privacidad", label: "Privacidad" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-serif text-lg tracking-[0.2em] uppercase">{SITE.name}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              {SITE.venue} · {SITE.streetAddress}, {SITE.locality}, Chile
            </p>
            <a
              href={`tel:${SITE.phoneE164}`}
              data-cta="phone"
              className="mt-2 inline-block text-xs text-[var(--gold)] hover:opacity-70"
            >
              {SITE.phoneDisplay}
            </a>
          </div>
          <nav aria-label="Enlaces de pie de página">
            <ul className="flex max-w-2xl flex-wrap gap-x-6 gap-y-3">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground transition-colors hover:text-[var(--gold)]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
            Precisión piercing · Timeless you
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {SITE.professional} — {SITE.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
