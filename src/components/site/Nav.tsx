import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { waLink } from "@/lib/wa";

const links = [
  { href: "/servicios", label: "Servicios" },
  { href: "/precios", label: "Precios" },
  { href: "/#sobre", label: "Sobre mí" },
];

export function Nav({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overHero = overlay && !scrolled;
  const linkTone = overHero
    ? "text-white/88 hover:text-[var(--gold-soft)]"
    : "text-foreground/95 hover:text-[var(--gold)]";
  const logoTone = overHero ? "text-white" : "text-foreground";
  const subtleTone = overHero ? "text-white/70" : "text-foreground/80";
  const menuLineTone = overHero ? "bg-white" : "bg-foreground";
  const reservationTone = overHero
    ? "border-[var(--gold-soft)] text-white hover:bg-[var(--gold)] hover:text-white"
    : "border-[var(--gold)] text-foreground/95 hover:bg-[var(--gold)] hover:text-white";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled
          ? "bg-background/94 backdrop-blur-md border-b border-border shadow-[0_14px_42px_-36px_rgba(38,29,23,0.8)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 lg:h-24 flex items-center justify-between gap-6">
        <Link to="/" className="flex flex-col items-start leading-none">
          <span
            className={`font-serif text-xl lg:text-2xl tracking-[0.28em] uppercase ${logoTone}`}
          >
            Cotepiercing
          </span>
          <span className="mt-2 flex items-center gap-2">
            <span className="w-6 h-px bg-[var(--gold)]" />
            <span className={`text-[10px] tracking-[0.4em] uppercase ${subtleTone}`}>
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
              className={`text-[11px] tracking-[0.28em] uppercase transition-colors ${linkTone}`}
            >
              {l.label}
            </a>
          ))}
          <a
            href={waLink()}
            data-cta="reservation"
            target="_blank"
            rel="noopener noreferrer"
            className={`ml-2 inline-flex items-center justify-center px-7 py-3 rounded-full border text-[11px] tracking-[0.28em] uppercase transition-colors ${reservationTone}`}
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
          <span className={`w-5 h-px ${menuLineTone}`} />
          <span className={`w-5 h-px ${menuLineTone}`} />
          <span className={`w-5 h-px ${menuLineTone}`} />
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
              data-cta="reservation"
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
