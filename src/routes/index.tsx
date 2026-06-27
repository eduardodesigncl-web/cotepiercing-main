import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShieldCheck,
  Sparkles,
  GraduationCap,
  Gem,
  HeartHandshake,
  MapPin,
  Clock,
  MessageCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/site/Nav";
import { SchemaScript } from "@/components/site/SchemaScript";
import { GoogleReviews } from "@/components/site/GoogleReviews";
import { SiteFooter } from "@/components/site/SiteFooter";
import { services, categories, type Category, type Service } from "@/data/services";
import { faqs } from "@/data/faqs";
import { waLink } from "@/lib/wa";
import { SITE_URL } from "@/lib/config";
import { BUSINESS_ADDRESS_WITH_COUNTRY, SITE } from "@/lib/site";

import heroPortrait from "@/assets/hero-portrait.jpg";
import joyeriaPremiumArica from "@/assets/joyeria/joyeria-piercing-premium-cotepiercing-arica.webp";
import joyeriaSatin from "@/assets/joyeria/joyeria-piercing-satin-lujo-cotepiercing.webp";
import joyeriaMarmol from "@/assets/joyeria/joyeria-piercing-marmol-premium-cotepiercing.webp";
import joyeriaDetalle from "@/assets/joyeria/joyeria-piercing-detalle-dorado-plata-cotepiercing.webp";
import earImg from "@/assets/ear.jpg";
import aboutImg from "@/assets/maria-jose-piercer-profesional-cotepiercing-arica-chile.webp";

import gExpansion from "@/assets/gallery/expansion-lobulo-doble-helix-oreja-cotepiercing.webp";
import gSeptum from "@/assets/gallery/septum-piercing-con-herradura-cotepiercing-arica.webp";
import gEyebrow from "@/assets/gallery/eyebrow-piercing-vertical-cotepiercing-arica.webp";
import gTongue from "@/assets/gallery/tongue-piercing-con-joyeria-personalizada-cotepiercing-arica.webp";
import gEstudio from "@/assets/gallery/estudio-piercing-cotepiercing-espacio-de-trabajo.webp";

type GalleryItem = {
  src: string;
  filename: string;
  alt: string;
  category: string;
  caption: string;
};

const galleryItems: GalleryItem[] = [
  {
    src: gExpansion,
    filename: "expansion-lobulo-doble-helix-oreja-cotepiercing.webp",
    alt: "Oreja con expansión de lóbulo y doble piercing hélix, trabajo profesional realizado por María José de Cotepiercing.",
    category: "Oreja",
    caption: "Expansión de lóbulo y doble hélix",
  },
  {
    src: gSeptum,
    filename: "septum-piercing-con-herradura-cotepiercing-arica.webp",
    alt: "Septum piercing con joyería tipo herradura realizado por María José de Cotepiercing en Arica, Chile.",
    category: "Nariz / rostro",
    caption: "Septum con herradura",
  },
  {
    src: gEyebrow,
    filename: "eyebrow-piercing-vertical-cotepiercing-arica.webp",
    alt: "Vertical eyebrow piercing realizado por María José de Cotepiercing en Arica, Chile.",
    category: "Rostro",
    caption: "Vertical eyebrow",
  },
  {
    src: gTongue,
    filename: "tongue-piercing-con-joyeria-personalizada-cotepiercing-arica.webp",
    alt: "Tongue piercing con joyería personalizada realizado por María José de Cotepiercing en Arica, Chile.",
    category: "Oral",
    caption: "Tongue con joyería personalizada",
  },
  {
    src: gEstudio,
    filename: "estudio-piercing-cotepiercing-espacio-de-trabajo.webp",
    alt: "Espacio de trabajo de estudio de piercing con camilla, mesón, insumos y decoración profesional.",
    category: "Estudio",
    caption: "El estudio",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cotepiercing | Piercings cerca de ti en Arica" },
      {
        name: "description",
        content:
          "Cotepiercing ofrece piercing profesional en Arica con María José: evaluación anatómica, asepsia rigurosa, joyería inicial incluida, cuidados personalizados y reserva por WhatsApp.",
      },
      { property: "og:title", content: "Cotepiercing | Piercings cerca de ti en Arica" },
      {
        property: "og:description",
        content:
          "Piercing profesional en Arica con evaluación anatómica, joyería inicial incluida, cuidados seguros y reserva por WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
      { rel: "preload", as: "image", href: heroPortrait, fetchPriority: "high" },
    ],
  }),
  component: Page,
});

function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-12 sm:py-20 lg:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">{children}</div>
    </section>
  );
}

function SectionHead({
  eyebrow,
  title,
  intro,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
      <h2 className="font-serif text-3xl lg:text-5xl leading-[1.1] text-foreground">{title}</h2>
      {intro && (
        <p className="mt-6 text-base lg:text-[17px] leading-relaxed text-muted-foreground">
          {intro}
        </p>
      )}
      <div className={`gold-rule mt-8 ${center ? "mx-auto" : ""}`} />
    </div>
  );
}

function Page() {
  const [cat, setCat] = useState<Category>("Oreja");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const filtered = services.filter((s) => s.category === cat);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      <SchemaScript />

      {/* HERO — cinematic editorial */}
      <section
        id="inicio"
        className="relative h-[100svh] min-h-[690px] w-full overflow-hidden bg-[var(--warm-white)]"
      >
        <img
          src={heroPortrait}
          alt="Retrato editorial con piercings dorados delicados — Cotepiercing Arica"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full animate-hero-kenburns object-cover object-[62%_center]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--warm-white) 0%, color-mix(in oklab, var(--warm-white) 96%, transparent) 28%, color-mix(in oklab, var(--warm-white) 60%, transparent) 52%, color-mix(in oklab, var(--warm-white) 14%, transparent) 72%, transparent 88%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--warm-white) 72%, transparent) 0%, transparent 22%, transparent 72%, color-mix(in oklab, var(--foreground) 12%, transparent) 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-soft-light">
          <div className="absolute -top-1/4 left-0 h-[150%] w-[22%] animate-hero-sheen bg-gradient-to-r from-transparent via-white/55 to-transparent" />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {Array.from({ length: 14 }).map((_, index) => (
            <span
              key={index}
              className="absolute h-1 w-1 animate-hero-particle rounded-full bg-[var(--gold)] opacity-0"
              style={{
                left: `${10 + ((index * 19) % 82)}%`,
                bottom: `${8 + ((index * 23) % 54)}%`,
                animationDelay: `${(index % 7) * 1.15}s`,
                animationDuration: `${7 + (index % 5)}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-6 lg:px-10">
          <div className="max-w-[650px] pt-24 lg:pt-8">
            <div className="mb-6 flex animate-hero-rise items-center gap-3">
              <span className="h-px w-10 bg-[var(--gold)]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.34em] text-[var(--gold)]">
                Piercing profesional · Arica
              </span>
            </div>

            <h1 className="font-serif text-[48px] leading-[0.98] tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-[92px]">
              <span className="block animate-hero-rise" style={{ animationDelay: "120ms" }}>
                Piercings cerca
              </span>
              <span className="block animate-hero-rise" style={{ animationDelay: "240ms" }}>
                de ti en{" "}
                <span className="animate-hero-shimmer bg-gradient-to-r from-[var(--gold)] via-[var(--gold-soft)] to-[var(--gold)] bg-[length:200%_auto] bg-clip-text italic text-transparent">
                  Arica
                </span>
              </span>
            </h1>

            <p
              className="mt-7 max-w-md animate-hero-rise text-base leading-relaxed text-foreground/78 sm:text-lg"
              style={{ animationDelay: "360ms" }}
            >
              Evaluación anatómica, técnica segura y joyería inicial incluida. Cada perforación,
              diseñada para tu cuerpo y tu proceso de cicatrización.
            </p>

            <p
              className="mt-5 animate-hero-rise font-serif text-xl italic text-foreground/72"
              style={{ animationDelay: "520ms" }}
            >
              “No perforo cuerpos, diseño anatomías.”
            </p>

            <div
              className="mt-10 flex animate-hero-rise flex-col gap-3 sm:flex-row sm:flex-wrap"
              style={{ animationDelay: "680ms" }}
            >
              <a
                href={waLink()}
                data-cta="reservation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[var(--gold)] px-8 py-4 text-center text-[11px] uppercase tracking-[0.3em] text-white shadow-[0_18px_42px_-18px_var(--gold)] transition-all hover:-translate-y-0.5 hover:bg-[var(--gold-soft)] sm:w-auto sm:px-11"
              >
                Reservar por WhatsApp
              </a>
              <Link
                to="/servicios"
                className="inline-flex min-h-14 w-full items-center justify-center rounded-full border border-foreground/25 px-8 py-4 text-center text-[11px] uppercase tracking-[0.24em] text-foreground transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)] sm:w-auto"
              >
                Ver servicios
              </Link>
            </div>

            <div
              className="mt-11 grid max-w-xl animate-hero-fade grid-cols-3 gap-4"
              style={{ animationDelay: "900ms" }}
            >
              {[
                { value: "+8 años", label: "De experiencia" },
                { value: "100%", label: "Asepsia certificada" },
                { value: "5.0★", label: "Reseñas Google" },
              ].map((item) => (
                <div key={item.label} className="min-w-0">
                  <p className="font-serif text-2xl leading-none text-[var(--gold)] sm:text-[28px]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-foreground/60 sm:text-[10px]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-20 right-5 z-20 hidden animate-hero-float items-center gap-3 rounded-2xl border border-white/70 bg-white/65 p-3 pr-5 shadow-[0_20px_55px_-25px_rgba(60,50,40,0.45)] backdrop-blur-xl lg:flex">
          <img
            src={earImg}
            alt="Detalle de joyería de piercing"
            width={52}
            height={52}
            decoding="async"
            className="h-14 w-14 rounded-xl object-cover"
          />
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--gold)]">
              Joyería incluida
            </p>
            <p className="mt-1 font-serif text-[15px] leading-tight text-foreground">
              Titanio implant-grade
            </p>
          </div>
        </div>

        <a
          href="#servicios"
          aria-label="Bajar a servicios"
          className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 animate-hero-fade flex-col items-center gap-2 text-[9px] uppercase tracking-[0.34em] text-foreground/55 sm:flex"
          style={{ animationDelay: "1.1s" }}
        >
          Scroll
          <span className="relative block h-8 w-5 rounded-full border border-foreground/30">
            <span className="absolute left-1/2 top-2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--gold)] animate-hero-scroll-dot" />
          </span>
        </a>
      </section>

      {/* TRUST */}
      <Section className="bg-[var(--warm-white)]">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-border border border-border">
          {[
            { icon: GraduationCap, label: "Atención profesional especializada" },
            { icon: Sparkles, label: "Especialización exclusiva en piercing" },
            { icon: ShieldCheck, label: "Asepsia y seguridad" },
            { icon: Gem, label: "Joyería inicial incluida" },
            { icon: HeartHandshake, label: "Evaluación según anatomía" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="bg-background p-5 sm:p-8 flex flex-col items-center text-center gap-3 sm:gap-4 last:col-span-2 md:last:col-span-1"
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--gold)]" strokeWidth={1.2} />
              <p className="text-[11px] sm:text-xs lg:text-sm leading-snug text-foreground/80">
                {label}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-2xl text-sm lg:text-base text-muted-foreground leading-relaxed">
          Cada perforación se realiza considerando anatomía, ubicación, tipo de joyería, proceso de
          cicatrización y cuidado posterior.
        </p>
      </Section>

      {/* SERVICES — image cards */}
      <Section id="servicios" className="bg-[var(--stone)]/40">
        <SectionHead eyebrow="Catálogo" title="Servicios de piercing en Arica" />

        <div className="mt-8 sm:mt-12 flex flex-wrap gap-1.5 sm:gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs tracking-[0.18em] uppercase border transition-colors ${
                cat === c
                  ? "bg-[var(--gold)] text-white border-[var(--gold)]"
                  : "bg-background border-border text-foreground/70 hover:border-[var(--gold)] hover:text-[var(--gold)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {filtered.map((s) => (
            <Link
              key={s.name}
              to="/servicios/$slug"
              params={{ slug: s.slug }}
              className="group flex flex-col h-full w-full text-left bg-background overflow-hidden border border-border hover:border-[var(--gold)] transition-colors"
            >
              <div className="relative w-full aspect-[4/5] shrink-0 overflow-hidden bg-[var(--stone)]">
                <img
                  src={s.image}
                  alt={s.imageAlt}
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={1000}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-3 sm:p-5 flex flex-col gap-2 sm:gap-3 w-full flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-3">
                  <div>
                    <h3 className="font-serif text-[17px] sm:text-xl leading-tight">{s.name}</h3>
                    <p className="mt-1 sm:mt-1.5 text-[9px] sm:text-[10px] tracking-[0.24em] uppercase text-muted-foreground">
                      {s.zone}
                    </p>
                  </div>
                  <div className="font-serif text-[15px] sm:text-lg text-[var(--gold)] whitespace-nowrap">
                    {s.price}
                  </div>
                </div>
                <span className="mt-auto inline-block text-[10px] tracking-[0.2em] uppercase text-[var(--gold)] group-hover:opacity-70 transition-opacity">
                  Ver detalle →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* JEWELRY */}
      <Section id="joyeria">
        {/* Texto intro */}
        <SectionHead
          eyebrow="Joyería"
          title="Joyería inicial incluida en cada servicio"
          intro="Cada perforación incluye joyería seleccionada según la zona, anatomía y proceso de cicatrización. La elección de la joya favorece comodidad, estabilidad y una correcta evolución del piercing."
        />

        {/* Fila de imágenes — marquee loop automático hacia la izquierda */}
        <div className="mt-8 lg:mt-12 jewelry-marquee-outer">
          <div className="jewelry-marquee-inner" aria-hidden="false">
            {/* Set 1 — imágenes reales */}
            <figure className="jm-wide">
              <img
                src={joyeriaPremiumArica}
                alt="Joyería premium para piercing en tonos dorado y plata utilizada por Cotepiercing en Arica"
                loading="lazy"
                width={680}
                height={420}
              />
              <figcaption className="sr-only">
                Joyería premium para piercing en tonos dorado y plata — Cotepiercing Arica
              </figcaption>
            </figure>
            <figure className="jm-tall">
              <img
                src={joyeriaSatin}
                alt="Joyería de piercing premium sobre tela satinada utilizada por Cotepiercing"
                loading="lazy"
                width={600}
                height={800}
              />
              <figcaption className="sr-only">
                Joyería de piercing premium sobre tela satinada — Cotepiercing
              </figcaption>
            </figure>
            <figure className="jm-tall">
              <img
                src={earImg}
                alt="Oreja con composición de piercings finos y joyería premium realizada por Cotepiercing"
                loading="lazy"
                width={600}
                height={800}
              />
              <figcaption className="sr-only">
                Oreja con composición de piercings finos y joyería premium — Cotepiercing
              </figcaption>
            </figure>
            <figure className="jm-square">
              <img
                src={joyeriaMarmol}
                alt="Colección de joyería para piercing sobre fondo mármol estilo premium de Cotepiercing"
                loading="lazy"
                width={600}
                height={450}
              />
              <figcaption className="sr-only">
                Colección de joyería sobre fondo mármol premium — Cotepiercing
              </figcaption>
            </figure>
            <figure className="jm-wide">
              <img
                src={joyeriaDetalle}
                alt="Detalle de joyería para piercing en acero quirúrgico dorado y plata de Cotepiercing"
                loading="lazy"
                width={680}
                height={420}
              />
              <figcaption className="sr-only">
                Detalle de joyería en acero quirúrgico dorado y plata — Cotepiercing
              </figcaption>
            </figure>
            {/* Set 2 — copia idéntica para loop sin cortes (aria-hidden) */}
            <figure className="jm-wide" aria-hidden="true">
              <img src={joyeriaPremiumArica} alt="" loading="lazy" width={680} height={420} />
            </figure>
            <figure className="jm-tall" aria-hidden="true">
              <img src={joyeriaSatin} alt="" loading="lazy" width={600} height={800} />
            </figure>
            <figure className="jm-tall" aria-hidden="true">
              <img src={earImg} alt="" loading="lazy" width={600} height={800} />
            </figure>
            <figure className="jm-square" aria-hidden="true">
              <img src={joyeriaMarmol} alt="" loading="lazy" width={600} height={450} />
            </figure>
            <figure className="jm-wide" aria-hidden="true">
              <img src={joyeriaDetalle} alt="" loading="lazy" width={680} height={420} />
            </figure>
          </div>
        </div>
      </Section>

      {/* CARE */}
      <Section id="cuidados">
        <SectionHead
          eyebrow="Cuidados"
          title="Cuidados para una cicatrización segura"
          intro="El cuidado posterior es parte esencial del proceso. Cada perforación requiere atención según la zona, tipo de joyería y evolución individual."
        />

        <div className="mt-12 grid lg:grid-cols-2 gap-12">
          <div>
            <div className="eyebrow mb-5">Cuidados generales</div>
            <ul className="space-y-3 text-[15px] leading-relaxed text-foreground/85">
              {[
                "Limpiar con solución salina estéril.",
                "Evitar tocar con manos sucias.",
                "No girar ni mover la joya.",
                "No retirar la joya durante la cicatrización.",
                "Evitar alcohol, agua oxigenada, cremas o perfumes cerca de la zona.",
                "Evitar presión, golpes o roce constante.",
                "Consultar ante dolor intenso, calor excesivo, secreción con mal olor o inflamación que empeora.",
              ].map((c) => (
                <li key={c} className="flex gap-3">
                  <span className="mt-2.5 w-1 h-1 rounded-full bg-[var(--gold)] shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow mb-5">Cuidados por zona</div>
            <Accordion type="single" collapsible className="border-t border-border">
              {[
                [
                  "Oreja",
                  "Evitar dormir sobre la zona, audífonos, cascos, cabello enganchado y presión directa.",
                ],
                [
                  "Nariz y rostro",
                  "Evitar maquillaje, skincare activo, toallas, mascarillas y manipulación.",
                ],
                [
                  "Labio y boca",
                  "Mantener higiene oral, usar enjuague sin alcohol y evitar jugar con la joya.",
                ],
                ["Cuerpo", "Evitar ropa apretada, golpes, presión y humedad excesiva."],
                [
                  "Íntimos",
                  "Servicio con indicaciones privadas según evaluación, anatomía y tipo de perforación.",
                ],
                [
                  "Surface y Microdermal",
                  "Evitar golpes, tirones, presión, ropa ajustada y manipulación directa.",
                ],
              ].map(([title, body]) => (
                <AccordionItem key={title} value={title}>
                  <AccordionTrigger className="font-serif text-lg">{title}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {body}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* CTA interlinking: cuidados → reserva */}
        <div className="mt-14 pt-10 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-serif text-lg lg:text-xl text-foreground">
              ¿Tu piercing está irritado o tiene un bultito?
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Cotepiercing ofrece evaluaciones profesionales en Arica. No manipules la zona por tu
              cuenta.
            </p>
          </div>
          <a
            href="#reserva"
            data-cta="reservation"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 border border-[var(--gold)] text-[var(--gold)] text-[11px] tracking-[0.22em] uppercase hover:bg-[var(--gold)] hover:text-white transition-colors"
            aria-label="Reservar evaluación de piercing en Cotepiercing"
          >
            Reservar evaluación
          </a>
        </div>
      </Section>

      {/* ABOUT */}
      <Section id="sobre" className="bg-[var(--stone)]/40">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <img
              src={aboutImg}
              alt="María José, piercer profesional de Cotepiercing en Arica, Chile, en su estudio de trabajo con uniforme clínico."
              loading="lazy"
              decoding="async"
              width={900}
              height={1200}
              className="w-full aspect-[4/5] object-cover rounded-xl shadow-sm"
            />
          </div>
          <div className="lg:col-span-7">
            <SectionHead
              eyebrow="Sobre María José"
              title="Sobre María José, piercer profesional en Arica"
              intro="María José es piercer profesional en Arica, Chile, con años de experiencia en perforaciones corporales, asesoría anatómica y procedimientos especializados. En Cotepiercing trabaja con un enfoque seguro, personalizado y respetuoso del cuerpo, priorizando la higiene, la precisión técnica y la elección adecuada de la joyería para cada anatomía."
            />
            <div className="mt-8">
              <Button asChild variant="gold" size="lg">
                <a href={waLink()} data-cta="reservation" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" />
                  Reservar por WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* GALLERY */}
      <Section id="galeria">
        <SectionHead
          eyebrow="Galería"
          title="Galería de piercings profesionales en Arica"
          intro="Explora algunos trabajos realizados por María José en Cotepiercing: perforaciones, joyería corporal y procedimientos especializados con enfoque profesional, seguro y personalizado."
        />
        <div className="mt-8 sm:mt-12">
          {/* Mobile horizontal gallery: touch-friendly and motion-free */}
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 sm:hidden">
            {galleryItems.map((g) => (
              <button
                key={`mobile-${g.filename}`}
                type="button"
                onClick={() => setLightbox(g)}
                className="group relative block h-[220px] w-[160px] shrink-0 snap-start overflow-hidden rounded-xl border border-border bg-[var(--stone)] shadow-sm"
                aria-label={`Ampliar: ${g.caption}`}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <p className="mt-1 line-clamp-2 font-serif text-[13px] leading-tight text-white">
                    {g.caption}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Desktop Masonry */}
          <div className="hidden sm:block columns-2 lg:columns-3 gap-5 lg:gap-6 [column-fill:_balance]">
            {galleryItems.map((g, i) => (
              <button
                key={g.filename}
                type="button"
                onClick={() => setLightbox(g)}
                className="group relative mb-5 lg:mb-6 block w-full break-inside-avoid overflow-hidden rounded-xl border border-border bg-[var(--stone)] shadow-sm hover:shadow-md transition-shadow animate-in fade-in duration-700"
                style={{ animationDelay: `${i * 60}ms` }}
                aria-label={`Ampliar: ${g.caption}`}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-[10px] tracking-[0.28em] uppercase text-[var(--gold-soft)]">
                    {g.category}
                  </p>
                  <p className="mt-1 font-serif text-white text-lg leading-snug">{g.caption}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        {/* Interlinking: galería → servicios */}
        <div className="mt-12 text-center">
          <a
            href="#servicios"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.24em] uppercase text-[var(--gold)] hover:opacity-70 transition-opacity"
            aria-label="Explorar todos los servicios de piercing de Cotepiercing"
          >
            Explorar todos los servicios →
          </a>
        </div>
      </Section>

      {/* GALLERY LIGHTBOX */}
      <Dialog open={!!lightbox} onOpenChange={(o) => !o && setLightbox(null)}>
        <DialogContent className="h-[100dvh] w-screen max-w-none overflow-hidden border-0 bg-background p-0 sm:h-auto sm:max-h-[92dvh] sm:w-[min(92vw,72rem)] sm:rounded-lg sm:border sm:border-border [&>button]:right-3 [&>button]:top-3 [&>button]:z-20 [&>button]:rounded-full [&>button]:bg-background/90 [&>button]:p-2 [&>button]:opacity-100">
          {lightbox && (
            <div className="grid h-full grid-rows-[minmax(0,58dvh)_minmax(0,1fr)] md:max-h-[92dvh] md:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.8fr)] md:grid-rows-none">
              <div className="flex min-h-0 items-center justify-center bg-black">
                <img
                  src={lightbox.src}
                  alt={lightbox.alt}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex min-h-0 flex-col overflow-y-auto p-5 sm:p-7 lg:p-9">
                <DialogHeader className="text-left space-y-3">
                  <p className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
                    {lightbox.category}
                  </p>
                  <DialogTitle className="font-serif text-2xl leading-tight lg:text-3xl">
                    {lightbox.caption}
                  </DialogTitle>
                </DialogHeader>
                <div className="gold-rule mt-5" />
                <DialogDescription className="mt-5 text-[15px] leading-relaxed text-foreground/75">
                  {lightbox.alt}
                </DialogDescription>
                <div className="mt-7 pb-2">
                  <Button
                    asChild
                    variant="gold"
                    size="lg"
                    className="h-auto min-h-12 w-full whitespace-normal px-4 py-3 text-center leading-relaxed"
                  >
                    <a
                      href={waLink(
                        `Hola María José, vi tu trabajo "${lightbox.caption}" y quiero más información.`,
                      )}
                      data-cta="reservation"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Reservar por WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* FAQ */}
      <Section className="bg-[var(--stone)]/40">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <SectionHead eyebrow="FAQ" title="Preguntas frecuentes" />
          </div>
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="border-t border-border">
              {faqs.map(({ question, answer }) => (
                <AccordionItem key={question} value={question}>
                  <AccordionTrigger className="font-serif text-lg py-6">
                    {question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Section>

      {/* RESERVE */}
      <Section id="reserva">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7">
            <SectionHead
              eyebrow="Reserva"
              title="Reserva tu hora"
              intro="Agenda tu piercing o evaluación directamente por WhatsApp. Indica el servicio que quieres realizar, zona del cuerpo y disponibilidad horaria para coordinar tu atención."
            />
            <div className="mt-8 sm:mt-10">
              <a
                href={waLink()}
                data-cta="reservation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto px-10 py-4 rounded-full bg-[var(--gold)] text-white text-[11px] tracking-[0.32em] uppercase hover:opacity-90 transition-opacity gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Reservar por WhatsApp
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 bg-[var(--stone)]/50 p-6 sm:p-8 lg:p-10 space-y-5 sm:space-y-6">
            {/* Ubicación */}
            <div>
              <div className="eyebrow mb-3">Ubicación</div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[var(--gold)] mt-1 shrink-0" strokeWidth={1.4} />
                <div>
                  <address className="not-italic text-[15px] leading-relaxed">
                    {SITE.venue}
                    <br />
                    {BUSINESS_ADDRESS_WITH_COUNTRY}
                  </address>
                  <p className="mt-1 text-[13px] text-muted-foreground">
                    {SITE.name} atiende en {SITE.venue}, ubicado en {BUSINESS_ADDRESS_WITH_COUNTRY}.
                  </p>
                  <a
                    href={SITE.mapsShareUrl}
                    data-cta="location"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ver ubicación de Cotepiercing en Google Maps"
                    className="inline-flex items-center gap-1.5 mt-3 text-[11px] tracking-[0.2em] uppercase text-[var(--gold)] hover:opacity-70 transition-opacity"
                  >
                    <MapPin className="w-3 h-3" strokeWidth={1.6} />
                    Ver en Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div
              className="overflow-hidden border border-border shadow-sm"
              style={{ borderRadius: "4px" }}
            >
              <iframe
                title={`Mapa de ubicación de ${SITE.name} en ${SITE.venue}, ${BUSINESS_ADDRESS_WITH_COUNTRY}`}
                src={SITE.mapsEmbedUrl}
                width="100%"
                height="240"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                style={{ border: 0, display: "block" }}
              />
            </div>

            <div className="gold-rule" />

            {/* Horario */}
            <div>
              <div className="eyebrow mb-3">Horario</div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[var(--gold)] mt-1 shrink-0" strokeWidth={1.4} />
                <ul className="text-[15px] space-y-1">
                  <li>{SITE.openingHoursText.weekdays}</li>
                  <li>{SITE.openingHoursText.saturday}</li>
                  <li className="text-muted-foreground">{SITE.openingHoursText.sunday}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <GoogleReviews />

      <SiteFooter />
    </div>
  );
}
