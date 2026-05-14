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
import { services, categories, type Category, type Service } from "@/data/services";
import { waLink } from "@/lib/wa";

import heroPortrait from "@/assets/hero-portrait.jpg";
import jewelry1 from "@/assets/jewelry1.jpg";
import jewelry2 from "@/assets/jewelry2.jpg";
import earImg from "@/assets/ear.jpg";
import aboutImg from "@/assets/maria-jose-piercer-profesional-cotepiercing-arica-chile.webp";

import gExpansion from "@/assets/gallery/expansion-lobulo-doble-helix-oreja-cotepiercing.webp";
import gSeptum from "@/assets/gallery/septum-piercing-con-herradura-cotepiercing-arica.webp";
import gSnake from "@/assets/gallery/snake-bites-piercing-labio-cotepiercing-arica.webp";
import gQueloide from "@/assets/gallery/extraccion-queloide-piercing-oreja-cotepiercing-arica.webp";
import gSurfaceCuello from "@/assets/gallery/surface-piercing-cuello-cotepiercing-arica.webp";
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
    src: gSnake,
    filename: "snake-bites-piercing-labio-cotepiercing-arica.webp",
    alt: "Snake Bites piercing en labio con joyería plateada realizado por María José de Cotepiercing en Arica, Chile.",
    category: "Labios",
    caption: "Snake Bites en labio",
  },
  {
    src: gQueloide,
    filename: "extraccion-queloide-piercing-oreja-cotepiercing-arica.webp",
    alt: "Procedimiento de extracción de queloide en piercing de oreja realizado por María José de Cotepiercing en Arica, Chile.",
    category: "Procedimientos",
    caption: "Extracción de queloide",
  },
  {
    src: gSurfaceCuello,
    filename: "surface-piercing-cuello-cotepiercing-arica.webp",
    alt: "Surface piercing en cuello con joyería turquesa realizado por María José de Cotepiercing en Arica, Chile.",
    category: "Surface",
    caption: "Surface en cuello con joyería turquesa",
  },
  {
    src: gEyebrow,
    filename: "eyebrow-piercing-vertical-cotepiercing-arica.webp",
    alt: "Vertical eyebrow piercing realizado por María José de Cotepiercing en Arica, Chile.",
    category: "Rostro",
    caption: "Vertical eyebrow",
  },
  {
    src: gSurfaceEspalda,
    filename: "surface-piercing-espalda-baja-cotepiercing-arica.webp",
    alt: "Surface piercing en espalda baja realizado por María José de Cotepiercing en Arica, Chile.",
    category: "Surface / corporal",
    caption: "Surface en espalda baja",
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
      { title: "Cotepiercing — Piercing profesional en Arica, Chile | María José" },
      {
        name: "description",
        content:
          "Body piercing profesional con María José en Arica, Chile. Lóbulo, helix, nostril, septum, labret, íntimos y evaluaciones. Joyería inicial incluida. Reserva por WhatsApp en Recina Tattoo, San Marcos 393.",
      },
      { property: "og:title", content: "Cotepiercing — Piercing profesional en Arica, Chile" },
      {
        property: "og:description",
        content:
          "Precisión, higiene y diseño en cada detalle. María José — Recina Tattoo, San Marcos 393, Arica.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://cotepiercing.cl" },
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

function Page() {
  const [cat, setCat] = useState<Category>("Oreja");
  const [selected, setSelected] = useState<Service | null>(null);
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const filtered = services.filter((s) => s.category === cat);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      <SchemaScript />

      {/* HERO — full-bleed editorial */}
      <section id="inicio" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <img
          src={heroPortrait}
          alt="Retrato editorial con piercings dorados delicados — Cotepiercing Arica"
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
            <h1 className="font-serif text-[44px] leading-[1] sm:text-6xl lg:text-7xl xl:text-[88px] tracking-tight text-foreground">
              No perforo
              <br />
              cuerpos,{" "}
              <span className="italic">diseño</span>
              <br />
              anatomías.
            </h1>
            <p className="mt-8 max-w-md text-base lg:text-lg text-foreground/75 leading-relaxed">
              Body piercing profesional con enfoque en seguridad, estética y
              evaluación anatómica personalizada.
            </p>
            <div className="mt-10">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto px-12 py-4 rounded-full bg-[var(--gold)] text-white text-[11px] tracking-[0.32em] uppercase hover:opacity-90 transition-opacity"
              >
                Reservar
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
          Cada perforación se realiza considerando anatomía, ubicación, tipo de
          joyería, proceso de cicatrización y cuidado posterior.
        </p>
      </Section>

      {/* SERVICES — image cards */}
      <Section id="servicios" className="bg-[var(--stone)]/40">
        <SectionHead
          eyebrow="Catálogo"
          title="Servicios"
          intro="Explora los servicios de piercing profesional de Cotepiercing en Arica. Cada perforación es realizada por María José con evaluación anatómica, higiene rigurosa, técnica segura y joyería inicial incluida."
        />

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
            <button
              key={s.name}
              onClick={() => setSelected(s)}
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
                {/* Link rastreable por bots — interlinking a página de servicio */}
                <Link
                  to="/servicios/$slug"
                  params={{ slug: s.slug }}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-auto inline-block text-[10px] tracking-[0.2em] uppercase text-[var(--gold)] hover:opacity-70 transition-opacity"
                  aria-label={`Ver detalle de ${s.name} en Cotepiercing`}
                >
                  Ver detalle →
                </Link>
              </div>
            </button>
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-sm text-muted-foreground italic">
          Todos los valores incluyen joyería inicial. Algunos servicios
          requieren evaluación anatómica previa para confirmar viabilidad,
          ubicación y tipo de joyería adecuada.
        </p>
      </Section>

      {/* SERVICE DETAIL DIALOG */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-background border-border">
          {selected && (
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-[4/5] md:aspect-auto bg-[var(--stone)] min-h-[280px]">
                <img
                  src={selected.image}
                  alt={selected.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-7 lg:p-9 flex flex-col">
                <DialogHeader className="text-left space-y-3">
                  <p className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
                    {selected.category} · {selected.zone}
                  </p>
                  <DialogTitle className="font-serif text-3xl lg:text-4xl leading-tight">
                    {selected.name}
                  </DialogTitle>
                  <div className="text-2xl font-serif text-[var(--gold)]">
                    {selected.price}
                  </div>
                </DialogHeader>
                <div className="gold-rule mt-5" />
                <DialogDescription className="mt-5 text-[15px] leading-relaxed text-foreground/75">
                  {selected.description}
                </DialogDescription>
                <ul className="mt-6 text-sm divide-y divide-border border-y border-border">
                  <li className="flex justify-between py-3">
                    <span className="text-muted-foreground">Joyería inicial</span>
                    <span>Incluida</span>
                  </li>
                  <li className="flex justify-between py-3">
                    <span className="text-muted-foreground">Cicatrización</span>
                    <span>{selected.healing}</span>
                  </li>
                  <li className="flex justify-between py-3">
                    <span className="text-muted-foreground">Evaluación</span>
                    <span>{selected.evaluation}</span>
                  </li>
                </ul>
                <div className="mt-7">
                  <Button asChild variant="gold" size="lg" className="w-full">
                    <a
                      href={waLink(
                        `Hola María José, quiero reservar: ${selected.name} (${selected.zone}).`,
                      )}
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

      {/* JEWELRY */}
      <Section id="joyeria">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <SectionHead
              eyebrow="Joyería"
              title="Joyería inicial incluida en cada servicio"
              intro="Cada perforación incluye joyería seleccionada según la zona, anatomía y proceso de cicatrización. La elección de la joya favorece comodidad, estabilidad y una correcta evolución del piercing."
            />
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 gap-3 lg:gap-4">
            <img src={jewelry1} alt="Joyería dorada" loading="lazy" width={800} height={1000} className="w-full aspect-[4/5] object-cover" />
            <img src={jewelry2} alt="Aro dorado" loading="lazy" width={800} height={1000} className="w-full aspect-[4/5] object-cover mt-10" />
            <img src={earImg} alt="Detalle de oreja" loading="lazy" width={900} height={1100} className="w-full aspect-[4/5] object-cover" />
            <img src={jewelry1} alt="Joyería dorada" loading="lazy" width={800} height={1000} className="w-full aspect-[4/5] object-cover mt-10" />
          </div>
        </div>
      </Section>

      {/* ANATOMY */}
      <Section className="bg-[var(--stone)]/40">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <img
              src={earImg}
              alt="Evaluación anatómica"
              loading="lazy"
              width={900}
              height={1100}
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
          <div className="lg:col-span-6">
            <SectionHead
              eyebrow="Diseño según anatomía"
              title="No todas las perforaciones son para todas las anatomías"
              intro="Antes de realizar ciertos piercings, se evalúa la anatomía de la zona para determinar si la perforación es viable, segura y estéticamente armónica. Así evitamos malas posiciones, presión innecesaria, irritaciones o procesos de cicatrización complejos."
            />
            <blockquote className="mt-10 font-serif text-2xl lg:text-3xl italic text-foreground/85 leading-snug border-l-2 border-[var(--gold)] pl-6">
              “No perforo cuerpos, diseño anatomías.”
            </blockquote>
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

        {/* CTA interlinking: cuidados → reserva */}
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
                <a href={waLink()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" />
                  Reservar por WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* EVALUATION SERVICES */}
      <Section>
        <SectionHead
          eyebrow="Evaluación y cuidado"
          title="Servicios complementarios"
          intro="Realizamos evaluaciones profesionales para perforaciones con irritación, bultitos, granulomas, queloides, cambios de joyería o reconstrucción de lóbulos. Cada caso se revisa de forma individual."
        />
        <div className="mt-8 sm:mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {[
            "Evaluación de piercing irritado",
            "Cambio de joyería",
            "Retiro de joyería",
            "Evaluación de granulomas",
            "Evaluación de queloides",
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
          En casos de dolor intenso, fiebre, secreción con mal olor o signos de
          infección, se recomienda acudir a atención médica.
        </p>
        {/* Interlinking: evaluaciones → cuidados y reserva */}
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#cuidados"
            className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-[var(--gold)] hover:opacity-70 transition-opacity"
            aria-label="Ver guía de cuidados post-piercing"
          >
            Ver cuidados generales →
          </a>
          <a
            href="#reserva"
            className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-[var(--gold)] hover:opacity-70 transition-opacity"
            aria-label="Reservar una evaluación en Cotepiercing"
          >
            Reservar evaluación →
          </a>
        </div>
      </Section>

      {/* INTIMATE */}
      <Section className="bg-[var(--stone)]/40">
        <div className="max-w-3xl">
          <div className="eyebrow mb-4">Privado</div>
          <h2 className="font-serif text-3xl lg:text-5xl leading-tight">
            Piercings íntimos
          </h2>
          <div className="gold-rule mt-8" />
          <p className="mt-8 text-base lg:text-lg text-muted-foreground leading-relaxed">
            Servicio realizado con privacidad, higiene rigurosa y evaluación
            anatómica previa. La viabilidad depende de la anatomía, condiciones
            de seguridad y criterio profesional.
          </p>
          <div className="mt-10">
            <Button asChild variant="goldOutline" size="lg">
              <a
                href={waLink("Hola María José, quiero consultar disponibilidad para piercing íntimo.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Consultar disponibilidad
              </a>
            </Button>
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

      {/* FAQ */}
      <Section className="bg-[var(--stone)]/40">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <SectionHead eyebrow="FAQ" title="Preguntas frecuentes" />
          </div>
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="border-t border-border">
              {[
                ["¿Todos los servicios incluyen joyería?", "Sí. Todos los servicios incluyen joyería inicial seleccionada según la zona, anatomía y proceso de cicatrización."],
                ["¿Necesito evaluación antes de perforarme?", "Algunos piercings requieren evaluación anatómica previa para confirmar si son viables y seguros."],
                ["¿Cómo puedo reservar?", "Puedes reservar por WhatsApp. Para confirmar la hora se solicita abono previo."],
                ["¿Cuánto es el abono?", "El monto del abono será informado al momento de coordinar la reserva."],
                ["¿Puedo reagendar mi hora?", "La política de reagendamiento será informada al confirmar la reserva."],
                ["¿Atienden piercings íntimos?", "Sí, se realizan con privacidad, higiene rigurosa y evaluación previa."],
                ["¿Qué hago si mi piercing tiene un bulto o está irritado?", "No manipules la zona ni cambies la joya por tu cuenta. Puedes solicitar una evaluación profesional."],
                ["¿Qué piercings no se realizan?", "No se realizan Snake Eyes, Bridge, Surface de cuello ni otros procedimientos que no cumplan con criterios de seguridad profesional."],
              ].map(([q, a]) => (
                <AccordionItem key={q} value={q}>
                  <AccordionTrigger className="font-serif text-lg py-6">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {a}
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
            <div className="overflow-hidden border border-border shadow-sm" style={{ borderRadius: "4px" }}>
              <iframe
                title="Mapa de ubicación de Cotepiercing en Recina Tattoo, San Marcos 393, Arica"
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

      {/* FOOTER */}
      <footer className="border-t border-border bg-background py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Top row: brand + nav links */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div className="font-serif text-lg tracking-[0.2em] uppercase">Cotepiercing</div>
              <p className="mt-1 text-xs text-muted-foreground">
                Recina Tattoo · San Marcos 393, Arica, Chile
              </p>
            </div>
            {/* Nav links internos — interlinking SEO */}
            <nav aria-label="Enlaces de pie de página">
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {[
                  { href: "#servicios", label: "Servicios" },
                  { href: "#galeria",   label: "Galería" },
                  { href: "#cuidados",  label: "Cuidados" },
                  { href: "#sobre",     label: "Sobre mí" },
                  { href: "#reserva",   label: "Reservar hora" },
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
              </ul>
            </nav>
          </div>
          {/* Bottom row: tagline + copyright */}
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
