// ─── Imágenes por categoría (fallback / íntimos que no tienen imagen individual) ───
import catIntimo from "@/assets/cat-intimo.jpg";

// ─── Oreja ───────────────────────────────────────────────────────────────────
import imgLobulo from "@/assets/servicios/piercing-lobulo-oreja-cotepiercing.webp";
import imgSegundoLobulo from "@/assets/servicios/piercing-segundo-lobulo-oreja-cotepiercing.webp";
import imgHelix from "@/assets/servicios/piercing-helix-oreja-cotepiercing.webp";
import imgForwardHelix from "@/assets/servicios/piercing-forward-helix-oreja-cotepiercing.webp";
import imgTragus from "@/assets/servicios/piercing-tragus-oreja-cotepiercing.webp";
import imgConch from "@/assets/servicios/piercing-conch-oreja-cotepiercing.webp";
import imgDaith from "@/assets/servicios/piercing-daith-oreja-cotepiercing.webp";
import imgRook from "@/assets/servicios/piercing-rook-oreja-cotepiercing.webp";
import imgIndustrial from "@/assets/servicios/piercing-industrial-oreja-cotepiercing.webp";

// ─── Nariz y rostro ──────────────────────────────────────────────────────────
import imgNostril from "@/assets/servicios/piercing-nostril-nariz-cotepiercing.webp";
import imgSeptum from "@/assets/servicios/piercing-septum-nariz-cotepiercing.webp";
import imgCeja from "@/assets/servicios/piercing-ceja-eyebrow-piercing-cotepiercing.webp";

// ─── Labio y boca ────────────────────────────────────────────────────────────
import imgLabret from "@/assets/servicios/piercing-labret-labio-cotepiercing.webp";
import imgMedusa from "@/assets/servicios/piercing-medusa-labio-cotepiercing.webp";
import imgMadonna from "@/assets/servicios/piercing-madonna-monroe-labio-cotepiercing.webp";
import imgSmiley from "@/assets/servicios/piercing-smiley-frenillo-cotepiercing.webp";

// ─── Cuerpo ──────────────────────────────────────────────────────────────────
import imgOmbligo from "@/assets/servicios/piercing-ombligo-abdomen-cotepiercing.webp";
import imgMicrodermal from "@/assets/servicios/piercing-microdermal-mejilla-cotepiercing.webp";
import imgSurface from "@/assets/servicios/piercing-surface-cuerpo-cotepiercing.webp";

// ─── Evaluaciones ────────────────────────────────────────────────────────────
import imgEvalIrritado from "@/assets/servicios/evaluacion-piercing-irritado-cotepiercing.webp";
import imgCambioJoyeria from "@/assets/servicios/cambio-de-joyeria-piercing-cotepiercing.webp";
import imgRetiroJoyeria from "@/assets/servicios/retiro-de-joyeria-piercing-cotepiercing.webp";
import imgGranuloma from "@/assets/servicios/evaluacion-granuloma-piercing-cotepiercing.webp";
import imgQueloide from "@/assets/servicios/evaluacion-queloide-piercing-cotepiercing.webp";
import imgReconstruccion from "@/assets/servicios/reconstruccion-de-lobulos-cotepiercing.webp";

export type Category =
  | "Oreja"
  | "Nariz y rostro"
  | "Labio y boca"
  | "Cuerpo"
  | "Íntimos"
  | "Evaluación";

export type Service = {
  name: string;
  zone: string;
  price: string;
  healing: string;
  evaluation: "Recomendada" | "Obligatoria" | "—";
  category: Category;
  image: string;
  imageAlt: string;
  description: string;
  slug: string;
};

const make = (s: Omit<Service, "description"> & { description?: string }): Service => ({
  ...s,
  description:
    s.description ??
    `${s.name} realizado con técnica profesional, asepsia clínica y joyería inicial incluida. Ubicación: ${s.zone}. La perforación se evalúa según anatomía para asegurar viabilidad, comodidad y un proceso de cicatrización óptimo.`,
});

export const services: Service[] = [
  // ── Oreja ────────────────────────────────────────────────────────────────
  make({
    name: "Lóbulo",
    zone: "Oreja",
    price: "$25.000",
    healing: "2 a 3 meses",
    evaluation: "—",
    category: "Oreja",
    slug: "piercing-lobulo-oreja-arica",
    image: imgLobulo,
    imageAlt: "Piercing de lóbulo en oreja con joyería dorada realizado por Cotepiercing en Arica",
  }),
  make({
    name: "Segundo lóbulo",
    zone: "Oreja",
    price: "$25.000",
    healing: "2 a 3 meses",
    evaluation: "—",
    category: "Oreja",
    slug: "piercing-segundo-lobulo-oreja-arica",
    image: imgSegundoLobulo,
    imageAlt:
      "Segundo piercing de lóbulo en oreja con joyería dorada realizado por Cotepiercing en Arica",
  }),
  make({
    name: "Helix",
    zone: "Oreja",
    price: "$30.000",
    healing: "6 a 9 meses",
    evaluation: "Recomendada",
    category: "Oreja",
    slug: "piercing-helix-oreja-arica",
    image: imgHelix,
    imageAlt:
      "Piercing helix en cartílago superior de oreja con joyería dorada realizado por Cotepiercing",
  }),
  make({
    name: "Forward Helix",
    zone: "Oreja",
    price: "$32.000",
    healing: "6 a 9 meses",
    evaluation: "Recomendada",
    category: "Oreja",
    slug: "piercing-forward-helix-oreja-arica",
    image: imgForwardHelix,
    imageAlt:
      "Piercing forward helix en cartílago frontal de oreja con joyería dorada realizado por Cotepiercing",
  }),
  make({
    name: "Tragus",
    zone: "Oreja",
    price: "$32.000",
    healing: "6 a 9 meses",
    evaluation: "Recomendada",
    category: "Oreja",
    slug: "piercing-tragus-oreja-arica",
    image: imgTragus,
    imageAlt: "Piercing tragus en oreja con joyería dorada realizado por Cotepiercing en Arica",
  }),
  make({
    name: "Conch",
    zone: "Oreja",
    price: "$35.000",
    healing: "6 a 12 meses",
    evaluation: "Obligatoria",
    category: "Oreja",
    slug: "piercing-conch-oreja-arica",
    image: imgConch,
    imageAlt: "Piercing conch en concha de oreja con joyería dorada realizado por Cotepiercing",
  }),
  make({
    name: "Daith",
    zone: "Oreja",
    price: "$35.000",
    healing: "6 a 12 meses",
    evaluation: "Obligatoria",
    category: "Oreja",
    slug: "piercing-daith-oreja-arica",
    image: imgDaith,
    imageAlt:
      "Piercing daith en pliegue interno de oreja con joyería dorada realizado por Cotepiercing",
  }),
  make({
    name: "Rook",
    zone: "Oreja",
    price: "$35.000",
    healing: "6 a 12 meses",
    evaluation: "Obligatoria",
    category: "Oreja",
    slug: "piercing-rook-oreja-arica",
    image: imgRook,
    imageAlt:
      "Piercing rook en cartílago antihélix de oreja con joyería dorada realizado por Cotepiercing",
  }),
  make({
    name: "Industrial",
    zone: "Oreja",
    price: "$45.000",
    healing: "9 a 12 meses",
    evaluation: "Obligatoria",
    category: "Oreja",
    slug: "piercing-industrial-oreja-arica",
    image: imgIndustrial,
    imageAlt: "Piercing industrial en oreja con barra dorada realizado por Cotepiercing en Arica",
  }),

  // ── Nariz y rostro ────────────────────────────────────────────────────────
  make({
    name: "Nostril",
    zone: "Nariz",
    price: "$28.000",
    healing: "4 a 6 meses",
    evaluation: "Recomendada",
    category: "Nariz y rostro",
    slug: "piercing-nostril-nariz-arica",
    image: imgNostril,
    imageAlt: "Piercing nostril en nariz con joyería dorada fina realizado por Cotepiercing",
  }),
  make({
    name: "Septum",
    zone: "Nariz",
    price: "$32.000",
    healing: "3 a 6 meses",
    evaluation: "Obligatoria",
    category: "Nariz y rostro",
    slug: "piercing-septum-nariz-arica",
    image: imgSeptum,
    imageAlt: "Piercing septum en nariz con aro dorado realizado por Cotepiercing",
  }),
  make({
    name: "Ceja",
    zone: "Rostro",
    price: "$30.000",
    healing: "3 a 6 meses",
    evaluation: "Recomendada",
    category: "Nariz y rostro",
    slug: "piercing-ceja-eyebrow-arica",
    image: imgCeja,
    imageAlt: "Eyebrow piercing o piercing de ceja con joyería dorada realizado por Cotepiercing",
  }),

  // ── Labio y boca ──────────────────────────────────────────────────────────
  make({
    name: "Labret",
    zone: "Labio",
    price: "$30.000",
    healing: "2 a 3 meses",
    evaluation: "Recomendada",
    category: "Labio y boca",
    slug: "piercing-labret-labio-arica",
    image: imgLabret,
    imageAlt: "Piercing labret en labio inferior con joyería dorada realizado por Cotepiercing",
  }),
  make({
    name: "Medusa",
    zone: "Labio",
    price: "$30.000",
    healing: "2 a 3 meses",
    evaluation: "Recomendada",
    category: "Labio y boca",
    slug: "piercing-medusa-labio-arica",
    image: imgMedusa,
    imageAlt:
      "Piercing medusa sobre el labio superior con joyería dorada realizado por Cotepiercing",
  }),
  make({
    name: "Madonna / Monroe",
    zone: "Labio",
    price: "$30.000",
    healing: "2 a 3 meses",
    evaluation: "Recomendada",
    category: "Labio y boca",
    slug: "piercing-madonna-monroe-labio-arica",
    image: imgMadonna,
    imageAlt:
      "Piercing Madonna o Monroe en labio superior lateral con joyería dorada realizado por Cotepiercing",
  }),
  make({
    name: "Smiley",
    zone: "Frenillo",
    price: "$28.000",
    healing: "1 a 2 meses",
    evaluation: "Obligatoria",
    category: "Labio y boca",
    slug: "piercing-smiley-frenillo-arica",
    image: imgSmiley,
    imageAlt: "Piercing smiley en frenillo superior con joyería dorada realizado por Cotepiercing",
  }),

  // ── Cuerpo ────────────────────────────────────────────────────────────────
  make({
    name: "Ombligo",
    zone: "Abdomen",
    price: "$35.000",
    healing: "6 a 12 meses",
    evaluation: "Recomendada",
    category: "Cuerpo",
    slug: "piercing-ombligo-abdomen-arica",
    image: imgOmbligo,
    imageAlt: "Piercing de ombligo con joyería dorada realizado por Cotepiercing",
  }),
  make({
    name: "Pezón",
    zone: "Cuerpo",
    price: "$40.000",
    healing: "6 a 12 meses",
    evaluation: "Obligatoria",
    category: "Íntimos",
    slug: "piercing-pezon-intimo-arica",
    image: catIntimo,
    imageAlt:
      "Piercing corporal profesional realizado por Cotepiercing en Arica con joyería inicial incluida",
  }),
  make({
    name: "Microdermal",
    zone: "Cuerpo",
    price: "$45.000",
    healing: "3 a 6 meses",
    evaluation: "Obligatoria",
    category: "Cuerpo",
    slug: "piercing-microdermal-cuerpo-arica",
    image: imgMicrodermal,
    imageAlt: "Piercing microdermal en mejilla con joyería dorada realizado por Cotepiercing",
  }),
  make({
    name: "Surface",
    zone: "Cuerpo",
    price: "$45.000",
    healing: "6 a 12 meses",
    evaluation: "Obligatoria",
    category: "Cuerpo",
    slug: "piercing-surface-cuerpo-arica",
    image: imgSurface,
    imageAlt: "Piercing surface en cuerpo con joyería dorada realizado por Cotepiercing",
  }),

  // ── Íntimos ───────────────────────────────────────────────────────────────
  make({
    name: "Íntimo femenino",
    zone: "Íntimo",
    price: "Consultar",
    healing: "Variable",
    evaluation: "Obligatoria",
    category: "Íntimos",
    slug: "piercing-intimo-femenino-arica",
    image: catIntimo,
    imageAlt:
      "Piercing íntimo femenino realizado con privacidad e higiene rigurosa por Cotepiercing",
  }),
  make({
    name: "Íntimo masculino",
    zone: "Íntimo",
    price: "Consultar",
    healing: "Variable",
    evaluation: "Obligatoria",
    category: "Íntimos",
    slug: "piercing-intimo-masculino-arica",
    image: catIntimo,
    imageAlt:
      "Piercing íntimo masculino realizado con privacidad e higiene rigurosa por Cotepiercing",
  }),

  // ── Evaluación ────────────────────────────────────────────────────────────
  make({
    name: "Evaluación de piercing irritado",
    zone: "—",
    price: "$10.000",
    healing: "—",
    evaluation: "—",
    category: "Evaluación",
    slug: "evaluacion-piercing-irritado-arica",
    image: imgEvalIrritado,
    imageAlt:
      "Evaluación de piercing irritado realizada por Cotepiercing en un entorno profesional",
  }),
  make({
    name: "Cambio de joyería",
    zone: "—",
    price: "$8.000",
    healing: "—",
    evaluation: "—",
    category: "Evaluación",
    slug: "cambio-joyeria-piercing-arica",
    image: imgCambioJoyeria,
    imageAlt: "Cambio de joyería para piercing realizado por Cotepiercing con atención profesional",
  }),
  make({
    name: "Retiro de joyería",
    zone: "—",
    price: "$5.000",
    healing: "—",
    evaluation: "—",
    category: "Evaluación",
    slug: "retiro-joyeria-piercing-arica",
    image: imgRetiroJoyeria,
    imageAlt: "Retiro de joyería de piercing realizado por Cotepiercing en estudio profesional",
  }),
  make({
    name: "Evaluación de granuloma",
    zone: "—",
    price: "$10.000",
    healing: "—",
    evaluation: "—",
    category: "Evaluación",
    slug: "evaluacion-granuloma-piercing-arica",
    image: imgGranuloma,
    imageAlt: "Evaluación de granuloma en piercing realizada por Cotepiercing",
  }),
  make({
    name: "Evaluación de queloide",
    zone: "—",
    price: "$10.000",
    healing: "—",
    evaluation: "—",
    category: "Evaluación",
    slug: "evaluacion-queloide-piercing-arica",
    image: imgQueloide,
    imageAlt: "Evaluación de queloide en piercing realizada por Cotepiercing",
  }),
  make({
    name: "Reconstrucción de lóbulos",
    zone: "Oreja",
    price: "Consultar",
    healing: "Variable",
    evaluation: "Obligatoria",
    category: "Evaluación",
    slug: "reconstruccion-lobulos-arica",
    image: imgReconstruccion,
    imageAlt: "Reconstrucción de lóbulos realizada por Cotepiercing con enfoque profesional",
  }),
];

export const categories: Category[] = [
  "Oreja",
  "Nariz y rostro",
  "Labio y boca",
  "Cuerpo",
  "Íntimos",
  "Evaluación",
];
