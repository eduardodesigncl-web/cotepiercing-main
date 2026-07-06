import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Award,
  FlaskConical,
  ShieldCheck,
  Sparkles,
  GraduationCap,
  Gem,
  HeartHandshake,
  MapPin,
  Clock,
  MessageCircle,
  Syringe,
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

import heroCarouselEarWide from "@/assets/hero/hero-carousel-ear-wide.webp";
import heroCarouselJewelryHands from "@/assets/hero/hero-carousel-jewelry-hands.webp";
import heroCarouselJewelryTray from "@/assets/hero/hero-carousel-jewelry-tray.webp";
import heroCarouselMarking from "@/assets/hero/hero-carousel-marking.webp";
import heroCarouselEarStar from "@/assets/hero/hero-carousel-ear-star.webp";
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
import gPerforacionHelix from "@/assets/gallery/perforacion-helix-cotepiercing.webp";
import gMicrodermalZonaBaja from "@/assets/gallery/piercing-microdermal-vertical-zona-baja-cotepiercing.webp";
import gMicrodermal from "@/assets/gallery/microdermal-cotepiercing.webp";
import gPiercingHelix from "@/assets/gallery/piercing-helix-cotepiercing.webp";
import gIndustrial from "@/assets/gallery/ambas-perforaciones-para-industrial-cotepiercing.webp";

type GalleryItem = {
  src: string;
  filename: string;
  width: number;
  height: number;
  alt: string;
  category: string;
  caption: string;
};

const galleryItems: GalleryItem[] = [
  {
    src: gExpansion,
    filename: "expansion-lobulo-doble-helix-oreja-cotepiercing.webp",
    width: 530,
    height: 577,
    alt: "Oreja con expansión de lóbulo y doble piercing hélix, trabajo profesional realizado por María José de Cotepiercing.",
    category: "Oreja",
    caption: "Expansión de lóbulo y doble hélix",
  },
  {
    src: gSeptum,
    filename: "septum-piercing-con-herradura-cotepiercing-arica.webp",
    width: 1200,
    height: 1600,
    alt: "Septum piercing con joyería tipo herradura realizado por María José de Cotepiercing en Arica, Chile.",
    category: "Nariz / rostro",
    caption: "Septum con herradura",
  },
  {
    src: gEyebrow,
    filename: "eyebrow-piercing-vertical-cotepiercing-arica.webp",
    width: 1311,
    height: 1200,
    alt: "Vertical eyebrow piercing realizado por María José de Cotepiercing en Arica, Chile.",
    category: "Rostro",
    caption: "Vertical eyebrow",
  },
  {
    src: gTongue,
    filename: "tongue-piercing-con-joyeria-personalizada-cotepiercing-arica.webp",
    width: 1080,
    height: 1062,
    alt: "Tongue piercing con joyería personalizada realizado por María José de Cotepiercing en Arica, Chile.",
    category: "Oral",
    caption: "Tongue con joyería personalizada",
  },
  {
    src: gPerforacionHelix,
    filename: "perforacion-helix-cotepiercing.webp",
    width: 853,
    height: 888,
    alt: "Perforación hélix con joyería curva de cristales en la oreja, trabajo realizado por Cotepiercing.",
    category: "Oreja",
    caption: "Perforación Hélix",
  },
  {
    src: gMicrodermalZonaBaja,
    filename: "piercing-microdermal-vertical-zona-baja-cotepiercing.webp",
    width: 891,
    height: 900,
    alt: "Piercing microdermal vertical en zona baja de la espalda con dos joyas de cristal.",
    category: "Cuerpo",
    caption: "Piercing microdermal vertical zona baja",
  },
  {
    src: gMicrodermal,
    filename: "microdermal-cotepiercing.webp",
    width: 887,
    height: 881,
    alt: "Microdermal en mejilla con joyería de cristales, trabajo realizado por Cotepiercing.",
    category: "Rostro",
    caption: "Microdermal",
  },
  {
    src: gPiercingHelix,
    filename: "piercing-helix-cotepiercing.webp",
    width: 900,
    height: 887,
    alt: "Piercing hélix en oreja con joyería de tres cristales.",
    category: "Oreja",
    caption: "Piercing Hélix",
  },
  {
    src: gIndustrial,
    filename: "ambas-perforaciones-para-industrial-cotepiercing.webp",
    width: 900,
    height: 899,
    alt: "Ambas perforaciones para piercing industrial en oreja con joyería inicial.",
    category: "Oreja",
    caption: "Ambas perforaciones para industrial",
  },
  {
    src: gEstudio,
    filename: "estudio-piercing-cotepiercing-espacio-de-trabajo.webp",
    width: 905,
    height: 1600,
    alt: "Espacio de trabajo de estudio de piercing con camilla, mesón, insumos y decoración profesional.",
    category: "Estudio",
    caption: "El estudio",
  },
];

const heroCarouselImages = [
  {
    src: heroCarouselEarWide,
    alt: "Oreja con piercings dorados y joyería fina.",
    objectPosition: "44% 44%",
  },
  {
    src: heroCarouselJewelryHands,
    alt: "Manos con guantes negros manipulando joyería dorada.",
    objectPosition: "52% 46%",
  },
  {
    src: heroCarouselJewelryTray,
    alt: "Selección de joyería para piercing en una bandeja beige.",
    objectPosition: "50% 49%",
  },
  {
    src: heroCarouselEarStar,
    alt: "Oreja con piercings dorados y colgante de estrella.",
    objectPosition: "54% 44%",
  },
  {
    src: heroCarouselMarking,
    alt: "María José evaluando la anatomía facial antes de una perforación.",
    objectPosition: "58% 43%",
  },
];

const heroCarouselLoop = [...heroCarouselImages, ...heroCarouselImages];
const faqMidpoint = Math.ceil(faqs.length / 2);
const faqColumns = [faqs.slice(0, faqMidpoint), faqs.slice(faqMidpoint)];

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
      { rel: "preload", as: "image", href: heroCarouselEarWide, fetchPriority: "high" },
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
    <section
      id={id}
      className={`landing-section scroll-mt-24 py-12 sm:py-20 lg:py-32 ${className}`}
    >
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
    <div className={`landing-section-head max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
      <h2 className="font-serif text-3xl lg:text-5xl leading-[1.1] text-foreground">{title}</h2>
      {intro && (
        <p className="mt-6 text-base lg:text-[17px] leading-relaxed text-muted-foreground">
          {intro}
        </p>
      )}
      <div className={`landing-gold-rule gold-rule mt-8 ${center ? "mx-auto" : ""}`} />
    </div>
  );
}

function Page() {
  const [cat, setCat] = useState<Category>("Oreja");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const filtered = services.filter((s) => s.category === cat);

  useEffect(() => {
    const root = heroRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const track = root.querySelector<HTMLElement>(".hero-carousel-track");
      const cards = track
        ? Array.from(track.querySelectorAll<HTMLElement>(".hero-carousel-card"))
        : [];

      if (!track || cards.length <= heroCarouselImages.length) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          isDesktop: "(min-width: 1024px)",
        },
        (context) => {
          const { reduceMotion, isDesktop } = context.conditions ?? {};
          const distance = cards[heroCarouselImages.length].offsetLeft - cards[0].offsetLeft;

          if (reduceMotion || !isDesktop || !distance) return undefined;

          gsap.set(track, { x: 0, force3D: true });

          const tween = gsap.to(track, {
            x: -distance,
            duration: 34,
            ease: "none",
            repeat: -1,
          });

          return () => tween.kill();
        },
      );

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="landing-color-study min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav overlay />

      <SchemaScript />

      {/* HERO — editorial carousel */}
      <section
        id="inicio"
        ref={heroRef}
        className="relative h-[100svh] max-h-[700px] min-h-[610px] w-full overflow-hidden bg-[#0D0D0D] text-white sm:min-h-[650px]"
      >
        <div className="relative z-10 mx-auto h-full w-full max-w-[1500px] px-4 pt-[112px] sm:px-6 sm:pt-[118px] lg:px-10 lg:pt-[122px]">
          <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
            <h1 className="animate-hero-rise max-w-2xl font-sans text-[28px] font-normal uppercase leading-[1.1] tracking-[0.01em] text-[#F5F0EA] sm:text-[36px] lg:text-[42px]">
              Piercings diseñados
              <span className="block">para tu anatomía</span>
            </h1>

            <p
              className="mt-4 max-w-[440px] animate-hero-rise text-[12px] leading-relaxed text-[#CFC7BB] sm:text-[13px]"
              style={{ animationDelay: "180ms" }}
            >
              Evaluación, perforación y joyería con un enfoque profesional, seguro y personalizado.
            </p>

            <div
              className="mt-6 flex animate-hero-rise flex-col items-center"
              style={{ animationDelay: "320ms" }}
            >
              <Link
                to="/servicios"
                className="inline-flex min-h-9 items-center justify-center rounded-full bg-[#F5F0EA] px-6 py-2 text-center font-sans text-[10px] font-normal uppercase tracking-[0.18em] text-[#0D0D0D] transition-all hover:-translate-y-0.5 hover:bg-white sm:px-7"
              >
                Ver servicios
                <span aria-hidden="true" className="ml-2 text-sm leading-none">
                  ›
                </span>
              </Link>
            </div>
          </div>

          <div className="hero-carousel-mask animate-hero-fade">
            <div className="hero-carousel-track">
              {heroCarouselLoop.map((image, index) => (
                <figure
                  key={`${image.src}-${index}`}
                  className="hero-carousel-card overflow-hidden bg-white/5"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={900}
                    height={1125}
                    loading={index < heroCarouselImages.length ? "eager" : "lazy"}
                    decoding="async"
                    className="h-full w-full object-cover"
                    style={{ objectPosition: image.objectPosition }}
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <Section className="landing-band landing-band-cream landing-trust-section">
        <div className="landing-trust-grid grid grid-cols-2 md:grid-cols-5 gap-px bg-border border border-border">
          {[
            { icon: GraduationCap, label: "Atención profesional especializada" },
            { icon: Sparkles, label: "Especialización exclusiva en piercing" },
            { icon: ShieldCheck, label: "Asepsia y seguridad" },
            { icon: Gem, label: "Joyería inicial incluida" },
            { icon: HeartHandshake, label: "Evaluación según anatomía" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="landing-glass-tile bg-background p-5 sm:p-8 flex flex-col items-center text-center gap-3 sm:gap-4 last:col-span-2 md:last:col-span-1"
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--gold)]" strokeWidth={1.2} />
              <p className="text-[11px] sm:text-xs lg:text-sm leading-snug text-foreground/80">
                {label}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* SERVICES — image cards */}
      <Section id="servicios" className="landing-band landing-band-sand landing-catalog-section">
        <SectionHead title="Catálogo" />

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
              className="landing-card group flex flex-col h-full w-full text-left bg-background overflow-hidden border border-border hover:border-[var(--gold)] transition-colors"
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
      <Section id="joyeria" className="landing-band landing-band-cream landing-band-glow">
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
      <Section id="cuidados" className="landing-band landing-band-dark landing-care-section">
        <SectionHead
          eyebrow="Cuidados"
          title="Cuidados para una cicatrización segura"
          intro="El cuidado posterior es parte esencial del proceso. Cada perforación requiere atención según la zona, tipo de joyería y evolución individual."
        />

        <div className="landing-care-grid mt-10 grid gap-5 lg:grid-cols-2 lg:gap-6">
          <div className="landing-care-panel">
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
          <div className="landing-care-panel">
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
        <div className="landing-care-cta mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
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

      <GoogleReviews />

      {/* ABOUT */}
      <Section id="sobre" className="landing-band landing-band-sand !pt-6 !pb-12 lg:!py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_0.78fr_1fr] lg:gap-8 lg:items-center">
            <div className="order-2 lg:order-none">
              <div className="eyebrow text-[0.78rem] tracking-[0.42em] text-[var(--gold)]">
                Sobre
              </div>
              <h2 className="mt-5 font-serif text-5xl leading-[0.98] text-foreground sm:text-6xl lg:text-[4.35rem]">
                María José
              </h2>
              <div className="mt-8 h-px w-24 bg-[var(--gold)] lg:mt-6" />
              <p className="mt-8 max-w-md text-[1.05rem] leading-8 text-foreground sm:text-xl sm:leading-9 lg:mt-6 lg:text-[1.05rem] lg:leading-8">
                Hola, soy la profesional detrás de <strong>Cotepiercing.</strong> Con 8 años de
                trayectoria en el mundo de la modificación corporal, mi enfoque combina la pasión
                por el arte con el máximo rigor técnico.
                <span className="lg:hidden">
                  {" "}
                  Además de mi formación como Analista Químico, cuento con certificaciones
                  profesionales en Body Piercing y en Modificaciones Corporales Avanzadas.
                </span>
              </p>
              <div className="landing-about-commitment mt-7 hidden rounded-xl border border-border bg-background/55 p-5 lg:block">
                <div className="flex gap-4">
                  <Sparkles
                    className="mt-1 h-6 w-6 shrink-0 text-[var(--gold)]"
                    strokeWidth={1.3}
                  />
                  <p className="text-[0.95rem] leading-7 text-foreground">
                    Mi compromiso es ofrecer perforaciones de la más alta calidad, cuidando tu salud
                    y garantizando un resultado estético que <strong>se adapte a ti.</strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="about-image order-1 lg:order-none">
              <img
                src={aboutImg}
                alt="María José, piercer profesional de Cotepiercing en Arica, Chile, en su estudio de trabajo con uniforme clínico."
                loading="lazy"
                decoding="async"
                width={900}
                height={1200}
                className="landing-about-photo mx-auto h-auto w-full max-w-[34rem] aspect-[5/6] rounded-xl object-cover shadow-sm lg:mx-0 lg:max-w-[22rem] lg:aspect-[4/5]"
              />
            </div>

            <div className="landing-about-panel order-3 overflow-hidden rounded-xl border border-border bg-background/55 lg:order-none lg:self-start">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
                <div className="flex gap-3 border-b border-border p-4 sm:gap-5 sm:border-r sm:p-8 lg:gap-4 lg:border-r-0 lg:p-4">
                  <div className="landing-about-icon">
                    <FlaskConical className="h-7 w-7 lg:h-5 lg:w-5" strokeWidth={1.6} />
                  </div>
                  <p className="text-[0.88rem] leading-5 text-foreground sm:text-lg sm:leading-7 lg:text-[0.95rem] lg:leading-6">
                    Formación como
                    <br />
                    Analista Químico
                  </p>
                </div>
                <div className="flex gap-3 border-b border-border p-4 sm:gap-5 sm:p-8 lg:gap-4 lg:p-4">
                  <div className="landing-about-icon">
                    <Award className="h-7 w-7 lg:h-5 lg:w-5" strokeWidth={1.6} />
                  </div>
                  <p className="text-[0.88rem] leading-5 text-foreground sm:text-lg sm:leading-7 lg:text-[0.95rem] lg:leading-6">
                    Certificaciones en Body Piercing (niveles básico, intermedio y avanzado) y
                    Modificaciones Corporales Avanzadas
                  </p>
                </div>
                <div className="flex gap-3 border-b border-border p-4 sm:gap-5 sm:border-r sm:border-b-0 sm:p-8 lg:gap-4 lg:border-r-0 lg:border-b lg:p-4">
                  <div className="landing-about-icon">
                    <ShieldCheck className="h-7 w-7 lg:h-5 lg:w-5" strokeWidth={1.6} />
                  </div>
                  <p className="text-[0.88rem] leading-5 text-foreground sm:text-lg sm:leading-7 lg:text-[0.95rem] lg:leading-6">
                    Protocolos de bioseguridad y materiales de alta biocompatibilidad
                  </p>
                </div>
                <div className="flex gap-3 p-4 sm:gap-5 sm:p-8 lg:gap-4 lg:p-4">
                  <div className="landing-about-icon">
                    <Syringe className="h-7 w-7 lg:h-5 lg:w-5" strokeWidth={1.6} />
                  </div>
                  <p className="text-[0.88rem] leading-5 text-foreground sm:text-lg sm:leading-7 lg:text-[0.95rem] lg:leading-6">
                    Procedimientos seguros, precisos y personalizados para cada anatomía
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="landing-about-commitment mt-8 rounded-xl border border-border bg-background/55 p-6 sm:p-8 lg:hidden">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <Sparkles className="h-8 w-8 shrink-0 text-[var(--gold)]" strokeWidth={1.3} />
              <div className="hidden h-24 w-px bg-[var(--gold)] sm:block" />
              <p className="max-w-4xl text-base leading-7 text-foreground sm:text-xl sm:leading-8">
                Mi compromiso es ofrecer perforaciones de la más alta calidad, cuidando tu salud y
                garantizando un resultado estético que <strong>se adapte a ti.</strong>
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* GALLERY */}
      <Section id="galeria" className="landing-band landing-band-cream">
        <SectionHead title="Galería" />
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
                  width={g.width}
                  height={g.height}
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
                  width={g.width}
                  height={g.height}
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
                  width={lightbox.width}
                  height={lightbox.height}
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
      <Section className="landing-band landing-band-smoke landing-faq-section">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <SectionHead eyebrow="FAQ" title="Preguntas frecuentes" />
          </div>
          <div className="lg:col-span-8">
            <div className="grid gap-x-8 md:grid-cols-2">
              {faqColumns.map((column, columnIndex) => (
                <Accordion
                  key={columnIndex}
                  type="single"
                  collapsible
                  className="landing-faq-accordion border-t"
                >
                  {column.map(({ question, answer }) => (
                    <AccordionItem key={question} value={question}>
                      <AccordionTrigger className="font-serif text-[16px] leading-snug py-4 sm:text-[17px]">
                        {question}
                      </AccordionTrigger>
                      <AccordionContent className="text-[#2f241d] leading-relaxed pb-5">
                        {answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* RESERVE */}
      <Section id="reserva" className="landing-band landing-band-dark landing-band-reserve">
        <div className="landing-reserve-grid grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-6">
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
          <div className="landing-reserve-panel lg:col-span-6 bg-[var(--stone)]/50 p-5 sm:p-6 lg:p-7 space-y-4">
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

            {/* Horario */}
            <div className="border-t border-white/10 pt-4">
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

      <SiteFooter />
    </div>
  );
}
