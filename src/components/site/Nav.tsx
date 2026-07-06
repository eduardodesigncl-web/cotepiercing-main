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
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto] items-center gap-6 px-6 lg:h-[68px] lg:grid-cols-[1fr_auto_1fr] lg:px-10">
        <Link to="/" className="flex flex-col items-start leading-none">
          <span className={`font-serif text-lg tracking-[0.24em] uppercase lg:text-xl ${logoTone}`}>
            Cotepiercing
          </span>
          <span className="mt-1.5 flex items-center gap-2">
            <span className="h-px w-5 bg-[var(--gold)]" />
            <span className={`text-[9px] tracking-[0.38em] uppercase ${subtleTone}`}>
              María José
            </span>
            <span className="h-px w-5 bg-[var(--gold)]" />
          </span>
        </Link>

        <nav className="hidden items-center justify-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-[10px] tracking-[0.28em] uppercase transition-colors ${linkTone}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden justify-end lg:flex">
          <a
            href={waLink()}
            data-cta="reservation"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center rounded-full border px-6 py-2.5 text-[10px] tracking-[0.28em] uppercase transition-colors ${reservationTone}`}
          >
            Reservar
          </a>
        </div>

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
