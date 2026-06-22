import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { waLink } from "@/lib/wa";

const links = [
  { href: "/servicios", label: "Servicios" },
  { href: "/piercing-arica", label: "Piercing en Arica" },
  { href: "/precios", label: "Precios" },
  { href: "/evaluacion", label: "Evaluación" },
  { href: "/estudio", label: "Estudio" },
  { href: "/#reserva", label: "Contacto" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 lg:h-24 flex items-center justify-between gap-6">
        <Link to="/" className="flex flex-col items-start leading-none">
          <span className="font-serif text-xl lg:text-2xl tracking-[0.28em] uppercase text-foreground">
            Cotepiercing
          </span>
          <span className="mt-2 flex items-center gap-2">
            <span className="w-6 h-px bg-[var(--gold)]" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-foreground/70">
              María José
            </span>
            <span className="w-6 h-px bg-[var(--gold)]" />
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[11px] tracking-[0.28em] uppercase text-foreground/85 hover:text-[var(--gold)] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center justify-center px-7 py-3 rounded-full border border-[var(--gold)] text-[11px] tracking-[0.28em] uppercase text-foreground hover:bg-[var(--gold)] hover:text-white transition-colors"
          >
            Reservar
          </a>
        </nav>

        <button
          aria-label="Menú"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex flex-col gap-[5px] p-2"
        >
          <span className="w-5 h-px bg-foreground" />
          <span className="w-5 h-px bg-foreground" />
          <span className="w-5 h-px bg-foreground" />
        </button>
      </div>
      {open && (
        <div id="mobile-navigation" className="lg:hidden bg-background border-t border-border">
          <div className="px-6 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-xs tracking-[0.22em] uppercase py-2"
              >
                {l.label}
              </a>
            ))}
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-xs tracking-[0.28em] uppercase py-3 border border-[var(--gold)] rounded-full text-center"
            >
              Reservar
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
