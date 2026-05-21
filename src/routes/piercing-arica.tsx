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
import { services, categories, type Category, type Service } from "@/data/services";
import { waLink } from "@/lib/wa";
import { SITE_URL } from "@/lib/config";

import heroPortrait from "@/assets/hero-portrait.jpg";
import joyeriaPremiumArica from "@/assets/joyeria/joyeria-piercing-premium-cotepiercing-arica.webp";
import joyeriaSatin from "@/assets/joyeria/joyeria-piercing-satin-lujo-cotepiercing.webp";
import joyeriaMarmol from "@/assets/joyeria/joyeria-piercing-marmol-premium-cotepiercing.webp";
import joyeriaDetalle from "@/assets/joyeria/joyeria-piercing-detalle-dorado-plata-cotepiercing.webp";
import earImg from "@/assets/ear.jpg";
import aboutImg from "@/assets/maria-jose-piercer-profesional-cotepiercing-arica-chile.webp";

import gExpansion from "@/assets/gallery/expansion-lobulo-doble-helix-oreja-cotepiercing.webp";
import gSeptum from "@/assets/gallery/septum-piercing-con-herradura-cotepiercing-arica.webp";
import gSnake from "@/assets/gallery/snake-bites-piercing-labio-cotepiercing-arica.webp";
import gQueloide from "@/assets/gallery/extraccion-queloide-piercing-oreja-cotepiercing-arica.webp";
import gEyebrow from "@/assets/gallery/eyebrow-piercing-vertical-cotepiercing-arica.webp";
import gSurfaceEspalda from "@/assets/gallery/surface-piercing-espalda-baja-cotepiercing-arica.webp";
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
    alt: "Piercing de oreja en Arica con expansión de lóbulo y doble hélix realizado por Cotepiercing",
    category: "Oreja",
    caption: "Expansión de lóbulo y doble hélix",
  },
  {
    src: gSeptum,
    filename: "septum-piercing-con-herradura-cotepiercing-arica.webp",
    alt: "Piercing septum en Arica realizado por Cotepiercing con joyería tipo herradura",
    category: "Nariz / rostro",
    caption: "Septum con herradura",
  },
  {
    src: gSnake,
    filename: "snake-bites-piercing-labio-cotepiercing-arica.webp",
    alt: "Snake Bites piercing de labio en Arica con joyería plateada realizado por Cotepiercing",
    category: "Labios",
    caption: "Snake Bites en labio",
  },
  {
    src: gQueloide,
    filename: "extraccion-queloide-piercing-oreja-cotepiercing-arica.webp",
    alt: "Evaluación de queloides o granulomas en piercing de oreja realizada por Cotepiercing en Arica",
    category: "Evaluación",
    caption: "Evaluación de queloides o granulomas",
  },
  {
    src: gEyebrow,
    filename: "eyebrow-piercing-vertical-cotepiercing-arica.webp",
    alt: "Piercing de ceja vertical en Arica realizado por Cotepiercing",
    category: "Rostro",
    caption: "Vertical eyebrow",
  },
  {
    src: gSurfaceEspalda,
    filename: "surface-piercing-espalda-baja-cotepiercing-arica.webp",
    alt: "Piercing corporal en Arica — surface en espalda baja realizado por Cotepiercing",
    category: "Surface / corporal",
    caption: "Surface en espalda baja",
  },
  {
    src: gTongue,
    filename: "tongue-piercing-con-joyeria-personalizada-cotepiercing-arica.webp",
    alt: "Piercing de lengua en Arica con joyería personalizada realizado por Cotepiercing",
    category: "Oral",
    caption: "Tongue con joyería personalizada",
  },
  {
    src: gEstudio,
    filename: "estudio-piercing-cotepiercing-espacio-de-trabajo.webp",
    alt: "Estudio de piercing profesional en Arica — espacio de trabajo de Cotepiercing",
    category: "Estudio",
    caption: "El estudio",
  },
];

// ── Schema JSON-LD ────────────────────────────────────────────────────────────

const schemaLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "@id": `${SITE_URL}/piercing-arica/#local-business`,
  name: "Cotepiercing",
  description:
    "Piercing profesional en Arica con evaluación anatómica previa, joyería inicial incluida y atención personalizada. Atendido por María José en Recina Tattoo, San Marcos 393, Arica, Chile.",
  url: `${SITE_URL}/piercing-arica/`,
  telephone: "+56948566852",
  priceRange: "$20.000 - $100.000 CLP",
  currenciesAccepted: "CLP",
  paymentAccepted: "Efectivo, transferencia bancaria",
  image: `${SITE_URL}/cotepiercing-piercing-profesional-arica-chile-og.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "San Marcos 393",
    addressLocality: "Arica",
    addressRegion: "Arica y Parinacota",
    addressCountry: "CL",
    postalCode: "1000000",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -18.4754,
    longitude: -70.2979,
  },
  areaServed: {
    "@type": "City",
    name: "Arica",
    sameAs: "https://www.wikidata.org/wiki/Q220044",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "11:00",
      closes: "20:00",
    },
  ],
  founder: {
    "@type": "Person",
    "@id": `${SITE_URL}/piercing-arica/#maria-jose`,
    name: "María José",
    jobTitle: "Piercer profesional",
    description:
      "Piercer profesional con 8 años de experiencia en Arica, Chile. Formación en body piercing básico, intermedio y avanzado, y curso de asepsia y seguridad.",
    worksFor: {
      "@type": "Organization",
      name: "Cotepiercing",
    },
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de piercing en Arica",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Piercing profesional en Arica",
          description:
            "Perforaciones corporales profesionales con evaluación anatómica previa, asepsia clínica y joyería inicial incluida.",
        },
        areaServed: "Arica, Chile",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Evaluación de piercing irritado en Arica",
          description:
            "Evaluación profesional para piercings con irritación, bultitos, granulomas o queloides.",
        },
        price: "10000",
        priceCurrency: "CLP",
        availability: "https://schema.org/InStock",
      },
    ],
  },
};

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: `${SITE_URL}/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Piercing en Arica",
      item: `${SITE_URL}/piercing-arica/`,
    },
  ],
};

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Dónde puedo hacerme un piercing en Arica?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Puedes hacerte un piercing en Arica con Cotepiercing, atendido por María José en Recina Tattoo, San Marcos 393. María José es piercer profesional con 8 años de experiencia, formación en body piercing básico, intermedio y avanzado, y curso de asepsia y seguridad.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo puedo reservar un piercing con Cotepiercing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Puedes reservar directamente por WhatsApp al +56 9 4856 6852. Para confirmar tu hora se solicita un abono previo. Cotepiercing atiende de lunes a viernes de 10:00 a 20:00, y sábados de 11:00 a 20:00.",
      },
    },
    {
      "@type": "Question",
      name: "¿Los piercings incluyen joyería inicial?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Todos los servicios de Cotepiercing incluyen joyería inicial seleccionada según la zona, la anatomía y el proceso de cicatrización esperado. No necesitas comprar joyería por separado.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto cuesta hacerse un piercing en Arica?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En Cotepiercing los precios varían según el tipo de piercing. El lóbulo parte en $25.000 CLP, los piercings de cartílago y nariz entre $28.000 y $35.000 CLP, y los piercings más complejos como Industrial o Microdermal llegan a $45.000 CLP. Todos incluyen joyería inicial.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué piercing me conviene si es mi primera vez?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Para una primera vez, los piercings más recomendados son el lóbulo y el nostril, por su proceso de cicatrización más sencillo y su versatilidad estética. María José puede orientarte durante la consulta previa según tu anatomía y preferencias.",
      },
    },
    {
      "@type": "Question",
      name: "¿Me pueden decir si un piercing me quedará bien antes de hacerlo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Antes de ciertos piercings, María José realiza una evaluación anatómica previa para determinar si la perforación es viable, segura y estéticamente armónica para tu anatomía. Esto evita malas posiciones, presión innecesaria y procesos de cicatrización complicados.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué hago si tengo un piercing irritado o con un 'bolito'?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No manipules la zona ni cambies la joyería por tu cuenta. Cotepiercing ofrece evaluaciones profesionales para piercings irritados, granulomas y queloides. Si presentas dolor intenso, fiebre, calor excesivo, secreción con mal olor u otros síntomas preocupantes, acude a atención médica.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cotepiercing realiza limpiezas o intervenciones de piercings?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Cotepiercing ofrece servicios complementarios como evaluación de piercing irritado, cambio de joyería, retiro de joyería, evaluación de granulomas y queloides, revisión de cicatrización y reconstrucción de lóbulos.",
      },
    },
    {
      "@type": "Question",
      name: "¿Puedo hacerme un piercing si soy menor de edad?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Consulta directamente por WhatsApp para conocer las condiciones específicas según tu edad y el tipo de piercing que deseas. Cotepiercing aplica criterios de seguridad y responsabilidad profesional en cada caso.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué piercings no realiza Cotepiercing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cotepiercing no realiza Snake Eyes, Bridge ni otros procedimientos que no cumplan con criterios de seguridad profesional. La viabilidad de cada piercing se evalúa caso a caso según la anatomía del cliente y los estándares de práctica segura.",
      },
    },
  ],
};

// ── Route ─────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/piercing-arica")(({
  head: () => ({
    meta: [
      { title: "Piercing en Arica | Cotepiercing María José" },
      {
        name: "description",
        content:
          "Hazte tu piercing en Arica con María José de Cotepiercing. Perforaciones seguras, evaluación anatómica, joyería inicial incluida, precios claros y reserva por WhatsApp.",
      },
      { name: "author", content: "María José — Cotepiercing" },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Cotepiercing" },
      { property: "og:locale", content: "es_CL" },
      {
        property: "og:title",
        content: "Piercing en Arica con joyería incluida | Cotepiercing",
      },
      {
        property: "og:description",
        content:
          "Perforaciones profesionales en Arica con evaluación anatómica, atención segura, precios claros y reserva por WhatsApp.",
      },
      { property: "og:url", content: `${SITE_URL}/piercing-arica/` },
      {
        property: "og:image",
        content: `${SITE_URL}/cotepiercing-piercing-profesional-arica-chile-og.png`,
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Piercing en Arica | Cotepiercing María José",
      },
      {
        name: "twitter:description",
        content:
          "Piercing profesional en Arica con evaluación anatómica, joyería incluida y reserva por WhatsApp.",
      },
      {
        name: "twitter:image",
        content: `${SITE_URL}/cotepiercing-piercing-profesional-arica-chile-og.png`,
      },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/piercing-arica/` },
      { rel: "preload", as: "image", href: heroPortrait, fetchPriority: "high" },
    ],
  }),
  component: PiercingAricaPage,
} as any));

// ── Sub-components ────────────────────────────────────────────────────────────

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
      <h2 className="font-serif text-3xl lg:text-5xl leading-[1.1] text-foreground">
        {title}
      </h2>
      {intro && (
        <p className="mt-6 text-base lg:text-[17px] leading-relaxed text-muted-foreground">
          {intro}
        </p>
      )}
      <div className={`gold-rule mt-8 ${center ? "mx-auto" : ""}`} />
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

function PiercingAricaPage() {
  const [cat, setCat] = useState<Category>("Oreja");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const filtered = services.filter((s) => s.category === cat);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* JSON-LD schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLocalBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }}
      />

      {/* BREADCRUMB VISIBLE */}
      <div className="sr-only" aria-label="Ruta de navegación">
        <nav aria-label="Breadcrumb">
          <ol>
            <li><Link to="/">Inicio</Link></li>
            <li>Piercing en Arica</li>
          </ol>
        </nav>
      </div>

      {/* ── 1. HERO ──────────────────────────────────────────────────────────── */}
      <section id="inicio" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <img
          src={heroPortrait}
          alt="Piercer profesional en Arica realizando un piercing con joyería incluida — Cotepiercing María José"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-[70%_center] lg:object-[60%_center]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--warm-white) 0%, color-mix(in oklab, var(--warm-white) 92%, transparent) 30%, color-mix(in oklab, var(--warm-white) 40%, transparent) 55%, transparent 75%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 h-full flex items-center">
          <div className="max-w-xl pt-24 lg:pt-0">
            <h1 className="font-serif text-[32px] leading-[1.05] sm:text-5xl lg:text-6xl xl:text-[72px] tracking-tight text-foreground">
              Piercing en Arica: perforaciones seguras, personalizadas y con joyería incluida
            </h1>
            <p className="mt-5 font-serif text-xl lg:text-2xl italic text-foreground/70 leading-snug">
              "No perforo cuerpos, diseño anatomías."
            </p>
            <p className="mt-6 max-w-md text-base lg:text-lg text-foreground/75 leading-relaxed">
              Hazte tu piercing con evaluación anatómica previa, atención profesional y orientación clara antes de reservar. Cotepiercing atiende en Arica con un enfoque estético, seguro y personalizado.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto px-10 py-4 rounded-full bg-[var(--gold)] text-white text-[11px] tracking-[0.32em] uppercase hover:opacity-90 transition-opacity gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Reservar por WhatsApp
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center justify-center w-full sm:w-auto px-10 py-4 rounded-full border border-[var(--gold)] text-[var(--gold)] text-[11px] tracking-[0.32em] uppercase hover:bg-[var(--gold)] hover:text-white transition-colors"
              >
                Ver precios
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <Section className="bg-[var(--warm-white)]">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-border border border-border">
          {[
            { icon: GraduationCap, label: "8 años de experiencia" },
            { icon: Sparkles, label: "Formación básica, intermedia y avanzada" },
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
          Cada perforación se realiza considerando anatomía, ubicación, tipo de joyería, proceso de cicatrización y cuidado posterior.
        </p>
      </Section>

      {/* ── 2. SERVICIOS ─────────────────────────────────────────────────────── */}
      <Section id="servicios" className="bg-[var(--stone)]/40">
        <SectionHead
          eyebrow="Catálogo"
          title="Servicios de piercing en Arica"
          intro="Explora los servicios de piercing profesional de Cotepiercing en Arica. Cada perforación es realizada por María José con evaluación anatómica, higiene rigurosa, técnica segura y joyería inicial incluida."
        />

        {/* Links internos por categoría */}
        <nav aria-label="Categorías de piercing en Arica" className="mt-8 flex flex-wrap gap-3 text-[12px] text-[var(--gold)]">
          <Link to="/servicios/$slug" params={{ slug: "piercing-lobulo-oreja-arica" }} className="hover:opacity-70 transition-opacity underline underline-offset-4">Piercing de oreja en Arica</Link>
          <span className="text-border" aria-hidden="true">·</span>
          <Link to="/servicios/$slug" params={{ slug: "piercing-nostril-nariz-arica" }} className="hover:opacity-70 transition-opacity underline underline-offset-4">Piercing de nariz en Arica</Link>
          <span className="text-border" aria-hidden="true">·</span>
          <Link to="/servicios/$slug" params={{ slug: "piercing-labret-labio-arica" }} className="hover:opacity-70 transition-opacity underline underline-offset-4">Piercing de labio y boca en Arica</Link>
          <span className="text-border" aria-hidden="true">·</span>
          <Link to="/servicios/$slug" params={{ slug: "piercing-ombligo-abdomen-arica" }} className="hover:opacity-70 transition-opacity underline underline-offset-4">Piercing corporal en Arica</Link>
          <span className="text-border" aria-hidden="true">·</span>
          <Link to="/servicios/$slug" params={{ slug: "piercing-intimo-femenino-arica" }} className="hover:opacity-70 transition-opacity underline underline-offset-4">Piercing íntimo en Arica</Link>
        </nav>

        <div className="mt-8 sm:mt-10 flex flex-wrap gap-1.5 sm:gap-2">
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

        <p className="mt-10 max-w-3xl text-sm text-muted-foreground italic">
          Todos los valores incluyen joyería inicial. Algunos servicios requieren evaluación anatómica previa para confirmar viabilidad, ubicación y tipo de joyería adecuada.
        </p>
      </Section>

      {/* ── 3. JOYERÍA ───────────────────────────────────────────────────────── */}
      <Section id="joyeria">
        <SectionHead
          eyebrow="Joyería"
          title="Joyería inicial incluida en cada piercing en Arica"
          intro="Cada perforación incluye joyería seleccionada según la zona, anatomía y proceso de cicatrización. La elección de la joya favorece comodidad, estabilidad y una correcta evolución del piercing."
        />

        <div className="mt-4">
          <Link
            to="/servicios/$slug"
            params={{ slug: "cambio-joyeria-piercing-arica" }}
            className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-[var(--gold)] hover:opacity-70 transition-opacity"
            aria-label="Ver servicio de cambio de joyería para piercing en Arica"
          >
            Cambio de joyería →
          </Link>
        </div>

        <div className="mt-8 lg:mt-10 jewelry-marquee-outer">
          <div className="jewelry-marquee-inner" aria-hidden="false">
            <figure className="jm-wide">
              <img src={joyeriaPremiumArica} alt="Joyería premium para piercing en Arica en tonos dorado y plata utilizada por Cotepiercing" loading="lazy" width={680} height={420} />
              <figcaption className="sr-only">Joyería premium para piercing en Arica en tonos dorado y plata — Cotepiercing</figcaption>
            </figure>
            <figure className="jm-tall">
              <img src={joyeriaSatin} alt="Joyería de piercing premium sobre tela satinada utilizada por Cotepiercing en Arica" loading="lazy" width={600} height={800} />
              <figcaption className="sr-only">Joyería de piercing premium sobre tela satinada — Cotepiercing Arica</figcaption>
            </figure>
            <figure className="jm-tall">
              <img src={earImg} alt="Piercing de oreja en Arica con composición de piercings finos y joyería premium realizada por Cotepiercing" loading="lazy" width={600} height={800} />
              <figcaption className="sr-only">Piercing de oreja en Arica con joyería premium — Cotepiercing</figcaption>
            </figure>
            <figure className="jm-square">
              <img src={joyeriaMarmol} alt="Joyería para piercing en Arica sobre fondo mármol estilo premium de Cotepiercing" loading="lazy" width={600} height={450} />
              <figcaption className="sr-only">Joyería para piercing en Arica sobre fondo mármol premium — Cotepiercing</figcaption>
            </figure>
            <figure className="jm-wide">
              <img src={joyeriaDetalle} alt="Detalle de joyería para piercing en Arica en acero quirúrgico dorado y plata de Cotepiercing" loading="lazy" width={680} height={420} />
              <figcaption className="sr-only">Detalle de joyería para piercing en Arica en acero quirúrgico dorado y plata — Cotepiercing</figcaption>
            </figure>
            {/* Set 2 — loop sin cortes (aria-hidden) */}
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

      {/* ── 4. EVALUACIÓN ANATÓMICA ──────────────────────────────────────────── */}
      <Section className="bg-[var(--stone)]/40">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <img
              src={earImg}
              alt="Piercing nostril en Arica con evaluación anatómica previa realizado por Cotepiercing"
              loading="lazy"
              width={900}
              height={1100}
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
          <div className="lg:col-span-6">
            <SectionHead
              eyebrow="Diseño según anatomía"
              title="Piercings personalizados según tu anatomía y estilo"
              intro="Antes de realizar ciertos piercings, se evalúa la anatomía de la zona para determinar si la perforación es viable, segura y estéticamente armónica. Así evitamos malas posiciones, presión innecesaria, irritaciones o procesos de cicatrización complejos."
            />
            <blockquote className="mt-10 font-serif text-2xl lg:text-3xl italic text-foreground/85 leading-snug border-l-2 border-[var(--gold)] pl-6">
              "No perforo cuerpos, diseño anatomías."
            </blockquote>
            <div className="mt-8">
              <Link
                to="/servicios/$slug"
                params={{ slug: "evaluacion-piercing-irritado-arica" }}
                className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-[var(--gold)] hover:opacity-70 transition-opacity"
                aria-label="Ver servicio de evaluación anatómica para piercing en Arica"
              >
                Evaluación profesional →
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 5. CUIDADOS ──────────────────────────────────────────────────────── */}
      <Section id="cuidados">
        <SectionHead
          eyebrow="Cuidados"
          title="Cuidados después de hacerte un piercing"
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
                ["Oreja", "Evitar dormir sobre la zona, audífonos, cascos, cabello enganchado y presión directa."],
                ["Nariz y rostro", "Evitar maquillaje, skincare activo, toallas, mascarillas y manipulación."],
                ["Labio y boca", "Mantener higiene oral, usar enjuague sin alcohol y evitar jugar con la joya."],
                ["Cuerpo", "Evitar ropa apretada, golpes, presión y humedad excesiva."],
                ["Íntimos", "Servicio con indicaciones privadas según evaluación, anatomía y tipo de perforación."],
                ["Surface y Microdermal", "Evitar golpes, tirones, presión, ropa ajustada y manipulación directa."],
              ].map(([title, body]) => (
                <AccordionItem key={title} value={title}>
                  <AccordionTrigger className="font-serif text-lg">
                    {title}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {body}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <div className="mt-14 pt-10 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-serif text-lg lg:text-xl text-foreground">
              ¿Tu piercing está irritado o tiene un bultito?
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Cotepiercing ofrece evaluaciones profesionales en Arica. No manipules la zona por tu cuenta.
            </p>
          </div>
          <a
            href="#reserva"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 border border-[var(--gold)] text-[var(--gold)] text-[11px] tracking-[0.22em] uppercase hover:bg-[var(--gold)] hover:text-white transition-colors"
            aria-label="Reservar evaluación de piercing en Cotepiercing Arica"
          >
            Reservar evaluación
          </a>
        </div>
      </Section>

      {/* ── 6. SOBRE MARÍA JOSÉ ──────────────────────────────────────────────── */}
      <Section id="sobre" className="bg-[var(--stone)]/40">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <img
              src={aboutImg}
              alt="María José, piercer profesional de Cotepiercing en Arica, Chile, con 8 años de experiencia en perforaciones corporales."
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
              title="María José, piercer profesional en Arica"
              intro="María José es piercer profesional en Arica, Chile, con 8 años de experiencia en perforaciones corporales. Cuenta con formación en body piercing básico, intermedio y avanzado, y curso de asepsia y seguridad. En Cotepiercing trabaja con un enfoque seguro, estético y personalizado, priorizando la higiene, la precisión técnica y la elección adecuada de la joyería para cada anatomía."
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild variant="gold" size="lg">
                <a href={waLink()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" />
                  Reservar por WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 7. SERVICIOS COMPLEMENTARIOS ─────────────────────────────────────── */}
      <Section>
        <SectionHead
          eyebrow="Evaluación y cuidado"
          title="Evaluación de piercing irritado en Arica"
          intro="Realizamos evaluaciones profesionales para perforaciones con irritación, bultitos, granulomas, queloides, cambios de joyería o reconstrucción de lóbulos. Cada caso se revisa de forma individual."
        />
        <div className="mt-8 sm:mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {[
            "Evaluación de piercing irritado",
            "Cambio de joyería",
            "Retiro de joyería",
            "Evaluación de granulomas",
            "Evaluación de queloides o granulomas",
            "Reconstrucción de lóbulos",
            "Revisión de cicatrización",
          ].map((label) => (
            <div key={label} className="bg-background px-5 py-4 sm:p-7 flex items-start gap-3 sm:gap-4">
              <span className="mt-1.5 sm:mt-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[var(--gold)] shrink-0" />
              <p className="text-[14px] sm:text-[15px]">{label}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm text-muted-foreground italic">
          Si hay dolor intenso, fiebre, calor excesivo, secreción con mal olor o síntomas preocupantes, se recomienda acudir a atención médica.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#cuidados"
            className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-[var(--gold)] hover:opacity-70 transition-opacity"
            aria-label="Ver guía de cuidados post-piercing en Arica"
          >
            Ver cuidados generales →
          </a>
          <a
            href="#reserva"
            className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-[var(--gold)] hover:opacity-70 transition-opacity"
            aria-label="Reservar evaluación de piercing en Cotepiercing Arica"
          >
            Reservar evaluación →
          </a>
        </div>
      </Section>

      {/* ── 8. PIERCINGS ÍNTIMOS ─────────────────────────────────────────────── */}
      <Section className="bg-[var(--stone)]/40">
        <div className="max-w-3xl">
          <div className="eyebrow mb-4">Privado</div>
          <h2 className="font-serif text-3xl lg:text-5xl leading-tight">
            Piercings íntimos en Arica
          </h2>
          <div className="gold-rule mt-8" />
          <p className="mt-8 text-base lg:text-lg text-muted-foreground leading-relaxed">
            Servicio realizado con privacidad, higiene rigurosa y evaluación anatómica previa. La viabilidad depende de la anatomía, condiciones de seguridad y criterio profesional.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <Button asChild variant="goldOutline" size="lg">
              <a
                href={waLink("Hola María José, quiero consultar disponibilidad para piercing íntimo.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Consultar disponibilidad
              </a>
            </Button>
            <Link
              to="/servicios/$slug"
              params={{ slug: "piercing-intimo-femenino-arica" }}
              className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-[var(--gold)] hover:opacity-70 transition-opacity"
              aria-label="Ver piercing íntimo femenino en Arica"
            >
              Ver piercings íntimos →
            </Link>
          </div>
        </div>
      </Section>

      {/* ── 9. GALERÍA ───────────────────────────────────────────────────────── */}
      <Section id="galeria">
        <SectionHead
          eyebrow="Galería"
          title="Galería de piercings profesionales en Arica"
          intro="Explora algunos trabajos realizados por María José en Cotepiercing: perforaciones, joyería corporal y procedimientos especializados con enfoque profesional, seguro y personalizado."
        />
        <div className="mt-8 sm:mt-12">
          {/* Mobile Marquee */}
          <div className="flex sm:hidden relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex animate-marquee gap-3 min-w-max hover:[animation-play-state:paused]">
              {[...galleryItems, ...galleryItems].map((g, i) => (
                <button
                  key={`mobile-${g.filename}-${i}`}
                  type="button"
                  onClick={() => setLightbox(g)}
                  className="group relative block w-[160px] h-[220px] shrink-0 overflow-hidden rounded-xl border border-border bg-[var(--stone)] shadow-sm"
                  aria-label={`Ampliar: ${g.caption}`}
                >
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="mt-1 font-serif text-white text-[13px] leading-tight line-clamp-2">
                      {g.caption}
                    </p>
                  </div>
                </button>
              ))}
            </div>
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
                  <p className="mt-1 font-serif text-white text-lg leading-snug">
                    {g.caption}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-12 text-center">
          <a
            href="#servicios"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.24em] uppercase text-[var(--gold)] hover:opacity-70 transition-opacity"
            aria-label="Explorar todos los servicios de piercing en Arica de Cotepiercing"
          >
            Explorar todos los servicios →
          </a>
        </div>
      </Section>

      {/* GALLERY LIGHTBOX */}
      <Dialog open={!!lightbox} onOpenChange={(o) => !o && setLightbox(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-background border-border">
          {lightbox && (
            <div className="grid md:grid-cols-[1.6fr_1fr]">
              <div className="bg-black flex items-center justify-center max-h-[80vh]">
                <img
                  src={lightbox.src}
                  alt={lightbox.alt}
                  className="w-full h-full max-h-[80vh] object-contain"
                />
              </div>
              <div className="p-7 lg:p-9 flex flex-col">
                <DialogHeader className="text-left space-y-3">
                  <p className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
                    {lightbox.category}
                  </p>
                  <DialogTitle className="font-serif text-2xl lg:text-3xl leading-tight">
                    {lightbox.caption}
                  </DialogTitle>
                </DialogHeader>
                <div className="gold-rule mt-5" />
                <DialogDescription className="mt-5 text-[15px] leading-relaxed text-foreground/75">
                  {lightbox.alt}
                </DialogDescription>
                <div className="mt-7">
                  <Button asChild variant="gold" size="lg" className="w-full">
                    <a
                      href={waLink(`Hola María José, vi tu trabajo "${lightbox.caption}" y quiero más información.`)}
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

      {/* ── 10. FAQ ──────────────────────────────────────────────────────────── */}
      <Section className="bg-[var(--stone)]/40">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <SectionHead eyebrow="FAQ" title="Preguntas frecuentes sobre piercing en Arica" />
          </div>
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="border-t border-border">
              {[
                [
                  "¿Dónde puedo hacerme un piercing en Arica?",
                  "Puedes hacerte un piercing en Arica con Cotepiercing, atendido por María José en Recina Tattoo, San Marcos 393. María José es piercer profesional con 8 años de experiencia, formación en body piercing básico, intermedio y avanzado, y curso de asepsia y seguridad.",
                ],
                [
                  "¿Cómo puedo reservar un piercing con Cotepiercing?",
                  "Puedes reservar directamente por WhatsApp al +56 9 4856 6852. Para confirmar tu hora se solicita un abono previo. Cotepiercing atiende de lunes a viernes de 10:00 a 20:00, y sábados de 11:00 a 20:00.",
                ],
                [
                  "¿Los piercings incluyen joyería inicial?",
                  "Sí. Todos los servicios de Cotepiercing incluyen joyería inicial seleccionada según la zona, la anatomía y el proceso de cicatrización esperado. No necesitas comprar joyería por separado.",
                ],
                [
                  "¿Cuánto cuesta hacerse un piercing en Arica?",
                  "En Cotepiercing los precios varían según el tipo de piercing. El lóbulo parte en $25.000 CLP, los piercings de cartílago y nariz entre $28.000 y $35.000 CLP, y los piercings más complejos como Industrial o Microdermal llegan a $45.000 CLP. Todos incluyen joyería inicial.",
                ],
                [
                  "¿Qué piercing me conviene si es mi primera vez?",
                  "Para una primera vez, los piercings más recomendados son el lóbulo y el nostril, por su proceso de cicatrización más sencillo y su versatilidad estética. María José puede orientarte durante la consulta previa según tu anatomía y preferencias.",
                ],
                [
                  "¿Me pueden decir si un piercing me quedará bien antes de hacerlo?",
                  "Sí. Antes de ciertos piercings, María José realiza una evaluación anatómica previa para determinar si la perforación es viable, segura y estéticamente armónica para tu anatomía. Esto evita malas posiciones, presión innecesaria y procesos de cicatrización complicados.",
                ],
                [
                  "¿Qué hago si tengo un piercing irritado o con un \"bolito\"?",
                  "No manipules la zona ni cambies la joyería por tu cuenta. Cotepiercing ofrece evaluaciones profesionales para piercings irritados, granulomas y queloides. Si presentas dolor intenso, fiebre, calor excesivo, secreción con mal olor u otros síntomas preocupantes, acude a atención médica.",
                ],
                [
                  "¿Cotepiercing realiza limpiezas o intervenciones de piercings?",
                  "Sí. Cotepiercing ofrece servicios complementarios como evaluación de piercing irritado, cambio de joyería, retiro de joyería, evaluación de granulomas y queloides, revisión de cicatrización y reconstrucción de lóbulos.",
                ],
                [
                  "¿Puedo hacerme un piercing si soy menor de edad?",
                  "Consulta directamente por WhatsApp para conocer las condiciones específicas según tu edad y el tipo de piercing que deseas. Cotepiercing aplica criterios de seguridad y responsabilidad profesional en cada caso.",
                ],
                [
                  "¿Qué piercings no realiza Cotepiercing?",
                  "Cotepiercing no realiza Snake Eyes, Bridge ni otros procedimientos que no cumplan con criterios de seguridad profesional. La viabilidad de cada piercing se evalúa caso a caso según la anatomía del cliente y los estándares de práctica segura.",
                ],
              ].map(([q, a]) => (
                <AccordionItem key={q} value={q}>
                  <AccordionTrigger className="font-serif text-lg py-6">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    <p>{a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Section>

      {/* ── 11. RESERVA / UBICACIÓN ──────────────────────────────────────────── */}
      <Section id="reserva">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7">
            <SectionHead
              eyebrow="Reserva"
              title="Reserva tu piercing en Arica por WhatsApp"
              intro="Agenda tu piercing o evaluación directamente por WhatsApp. Indica el servicio que quieres realizar, zona del cuerpo y disponibilidad horaria para coordinar tu atención."
            />
            <div className="mt-8 sm:mt-10">
              <a
                href={waLink()}
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
                    Recina Tattoo<br />
                    San Marcos 393, Arica, Chile
                  </address>
                  <p className="mt-1 text-[13px] text-muted-foreground">
                    Cotepiercing atiende en Recina Tattoo, ubicado en San Marcos 393, Arica, Chile.
                  </p>
                  <a
                    href="https://maps.app.goo.gl/d3F2wC6gm6gT2wpZ8"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ver ubicación de Cotepiercing en Google Maps, San Marcos 393, Arica"
                    className="inline-flex items-center gap-1.5 mt-3 text-[11px] tracking-[0.2em] uppercase text-[var(--gold)] hover:opacity-70 transition-opacity"
                  >
                    <MapPin className="w-3 h-3" strokeWidth={1.6} />
                    Ver en Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div className="overflow-hidden border border-border shadow-sm" style={{ borderRadius: "4px" }}>
              <iframe
                title="Mapa de ubicación de Cotepiercing en Recina Tattoo, San Marcos 393, Arica — piercing en Arica"
                src="https://maps.google.com/maps?q=San+Marcos+393+Arica+Chile&output=embed&hl=es&z=16"
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
                  <li>Lunes a viernes · 10:00 — 20:00</li>
                  <li>Sábado · 11:00 — 20:00</li>
                  <li className="text-muted-foreground">Domingo · cerrado</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-border bg-background py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div className="font-serif text-lg tracking-[0.2em] uppercase">Cotepiercing</div>
              <p className="mt-1 text-xs text-muted-foreground">
                Recina Tattoo · San Marcos 393, Arica, Chile
              </p>
            </div>
            <nav aria-label="Enlaces de pie de página">
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {[
                  { href: "#servicios", label: "Servicios" },
                  { href: "#galeria", label: "Galería" },
                  { href: "#cuidados", label: "Cuidados" },
                  { href: "#sobre", label: "Sobre mí" },
                  { href: "#reserva", label: "Reservar hora" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-[var(--gold)] transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
                <li>
                  <Link
                    to="/"
                    className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-[var(--gold)] transition-colors"
                  >
                    Inicio
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
              Precisión piercing · Timeless you
            </p>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} María José — Cotepiercing, Arica, Chile
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
