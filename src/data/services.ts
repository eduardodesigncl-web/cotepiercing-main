// ─── Imágenes por categoría (fallback / servicios sin imagen individual) ───
import { optimizedImageSrc, optimizedImageSrcSet } from "@/lib/responsive-images";
import catOreja from "@/assets/cat-oreja.jpg";
import catNariz from "@/assets/cat-nariz.jpg";
import catLabio from "@/assets/cat-labio.jpg";
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
import imgAntihelix from "@/assets/servicios/piercing-antihelix-oreja-cotepiercing.webp";
import imgFlat from "@/assets/servicios/piercing-flat-oreja-cotepiercing.webp";

// ─── Nariz y rostro ──────────────────────────────────────────────────────────
import imgNostril from "@/assets/servicios/piercing-nostril-nariz-cotepiercing.webp";
import imgHighNostril from "@/assets/servicios/piercing-high-nostril-nariz-cotepiercing.webp";
import imgSeptum from "@/assets/servicios/piercing-septum-nariz-cotepiercing.webp";
import imgCeja from "@/assets/servicios/piercing-ceja-eyebrow-piercing-cotepiercing.webp";
import imgThirdEye from "@/assets/servicios/piercing-third-eye-rostro-cotepiercing.webp";
import imgBridge from "@/assets/servicios/piercing-bridge-rostro-cotepiercing.webp";
import imgAustinBar from "@/assets/servicios/piercing-austin-bar-nariz-cotepiercing.webp";
import imgNasallang from "@/assets/servicios/piercing-nasallang-nariz-cotepiercing.webp";
import imgSeptril from "@/assets/servicios/piercing-septril-nariz-cotepiercing.webp";

// ─── Labio y boca ────────────────────────────────────────────────────────────
import imgLabret from "@/assets/servicios/piercing-labret-labio-cotepiercing.webp";
import imgMedusa from "@/assets/servicios/piercing-medusa-labio-cotepiercing.webp";
import imgMadonnaMonroe from "@/assets/servicios/piercing-madonna-monroe-labio-cotepiercing.webp";
import imgMadonna from "@/assets/servicios/piercing-madonna-labio-cotepiercing.webp";
import imgSmiley from "@/assets/servicios/piercing-smiley-frenillo-cotepiercing.webp";
import imgAngelBites from "@/assets/servicios/piercing-angel-bites-labio-cotepiercing.webp";
import imgCanineBites from "@/assets/servicios/piercing-canine-bites-labio-cotepiercing.webp";
import imgCyberBites from "@/assets/servicios/piercing-cyber-bites-labio-cotepiercing.webp";
import imgDolphinBites from "@/assets/servicios/piercing-dolphin-bites-labio-cotepiercing.webp";
import imgSnakeBites from "@/assets/servicios/piercing-snake-bites-labio-cotepiercing.webp";
import imgSpiderBites from "@/assets/servicios/piercing-spider-bites-labio-cotepiercing.webp";
import imgSharkBites from "@/assets/servicios/piercing-shark-bites-labio-cotepiercing.webp";
import imgLabretVertical from "@/assets/servicios/piercing-labret-vertical-labio-cotepiercing.webp";
import imgLabretHorizontal from "@/assets/servicios/piercing-labret-horizontal-labio-cotepiercing.webp";
import imgLengua from "@/assets/servicios/piercing-lengua-boca-cotepiercing.webp";

// ─── Cuerpo ──────────────────────────────────────────────────────────────────
import imgOmbligo from "@/assets/servicios/piercing-ombligo-abdomen-cotepiercing.webp";
import imgMicrodermal from "@/assets/servicios/piercing-microdermal-mejilla-cotepiercing.webp";
import imgSurface from "@/assets/servicios/piercing-surface-cuerpo-cotepiercing.webp";
import imgExpansion from "@/assets/servicios/expansion-lobulo-cotepiercing.webp";

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
  cardImage: string;
  cardImageSrcSet: string;
  imageAlt: string;
  description: string;
  slug: string;
};

const make = (
  s: Omit<Service, "cardImage" | "cardImageSrcSet" | "description"> & { description?: string },
): Service => ({
  ...s,
  cardImage: optimizedImageSrc("services", s.image, 520),
  cardImageSrcSet: optimizedImageSrcSet("services", s.image, [360, 520, 720]),
  description:
    s.description ??
    `${s.name} realizado con técnica profesional, asepsia clínica y joyería inicial incluida. Ubicación: ${s.zone}. La perforación se evalúa según anatomía para asegurar viabilidad, comodidad y un proceso de cicatrización óptimo.`,
});

export const services: Service[] = [
  // ── Oreja ────────────────────────────────────────────────────────────────
  make({
    name: "Lobe",
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
    name: "Upper Lobe",
    zone: "Oreja",
    price: "$25.000",
    healing: "2 a 3 meses",
    evaluation: "—",
    category: "Oreja",
    slug: "piercing-segundo-lobulo-oreja-arica",
    image: imgSegundoLobulo,
    imageAlt:
      "Upper lobe o segundo piercing de lóbulo en oreja realizado por Cotepiercing en Arica",
  }),
  make({
    name: "Antitragus",
    zone: "Oreja",
    price: "$25.000",
    healing: "6 a 12 meses",
    evaluation: "Obligatoria",
    category: "Oreja",
    slug: "piercing-antitragus-oreja-arica",
    image: catOreja,
    imageAlt: "Piercing antitragus de oreja realizado por Cotepiercing en Arica",
  }),
  make({
    name: "Tragus",
    zone: "Oreja",
    price: "$25.000",
    healing: "6 a 9 meses",
    evaluation: "Recomendada",
    category: "Oreja",
    slug: "piercing-tragus-oreja-arica",
    image: imgTragus,
    imageAlt: "Piercing tragus en oreja con joyería dorada realizado por Cotepiercing en Arica",
  }),
  make({
    name: "Antihelix",
    zone: "Oreja",
    price: "$25.000",
    healing: "6 a 12 meses",
    evaluation: "Obligatoria",
    category: "Oreja",
    slug: "piercing-antihelix-oreja-arica",
    image: imgAntihelix,
    imageAlt: "Piercing antihelix de oreja realizado por Cotepiercing en Arica",
  }),
  make({
    name: "Helix",
    zone: "Oreja",
    price: "$20.000",
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
    price: "$35.000",
    healing: "6 a 9 meses",
    evaluation: "Recomendada",
    category: "Oreja",
    slug: "piercing-forward-helix-oreja-arica",
    image: imgForwardHelix,
    imageAlt:
      "Piercing forward helix en cartílago frontal de oreja con joyería dorada realizado por Cotepiercing",
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
    name: "Flat",
    zone: "Oreja",
    price: "$30.000",
    healing: "6 a 12 meses",
    evaluation: "Recomendada",
    category: "Oreja",
    slug: "piercing-flat-oreja-arica",
    image: imgFlat,
    imageAlt: "Piercing flat en oreja realizado por Cotepiercing en Arica",
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
    name: "Industrial",
    zone: "Oreja",
    price: "$35.000",
    healing: "9 a 12 meses",
    evaluation: "Obligatoria",
    category: "Oreja",
    slug: "piercing-industrial-oreja-arica",
    image: imgIndustrial,
    imageAlt: "Piercing industrial en oreja con barra dorada realizado por Cotepiercing en Arica",
  }),

  // ── Nariz y rostro ────────────────────────────────────────────────────────
  make({
    name: "Third Eye",
    zone: "Rostro",
    price: "$50.000",
    healing: "3 a 6 meses",
    evaluation: "Obligatoria",
    category: "Nariz y rostro",
    slug: "piercing-third-eye-rostro-arica",
    image: imgThirdEye,
    imageAlt: "Piercing third eye en rostro realizado por Cotepiercing en Arica",
  }),
  make({
    name: "Bridge",
    zone: "Rostro",
    price: "$35.000",
    healing: "3 a 6 meses",
    evaluation: "Obligatoria",
    category: "Nariz y rostro",
    slug: "piercing-bridge-rostro-arica",
    image: imgBridge,
    imageAlt: "Piercing bridge en rostro realizado por Cotepiercing en Arica",
  }),
  make({
    name: "High Nostril",
    zone: "Nariz",
    price: "$35.000",
    healing: "4 a 6 meses",
    evaluation: "Obligatoria",
    category: "Nariz y rostro",
    slug: "piercing-high-nostril-nariz-arica",
    image: imgHighNostril,
    imageAlt: "Piercing high nostril en nariz realizado por Cotepiercing",
  }),
  make({
    name: "Nasallang",
    zone: "Nariz",
    price: "$50.000",
    healing: "6 a 12 meses",
    evaluation: "Obligatoria",
    category: "Nariz y rostro",
    slug: "piercing-nasallang-nariz-arica",
    image: imgNasallang,
    imageAlt: "Piercing nasallang en nariz realizado por Cotepiercing en Arica",
  }),
  make({
    name: "Austin Bar",
    zone: "Nariz",
    price: "$40.000",
    healing: "4 a 6 meses",
    evaluation: "Obligatoria",
    category: "Nariz y rostro",
    slug: "piercing-austin-bar-nariz-arica",
    image: imgAustinBar,
    imageAlt: "Piercing Austin Bar en nariz realizado por Cotepiercing en Arica",
  }),
  make({
    name: "Nostril",
    zone: "Nariz",
    price: "$20.000",
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
    price: "$30.000",
    healing: "3 a 6 meses",
    evaluation: "Obligatoria",
    category: "Nariz y rostro",
    slug: "piercing-septum-nariz-arica",
    image: imgSeptum,
    imageAlt: "Piercing septum en nariz con aro dorado realizado por Cotepiercing",
  }),
  make({
    name: "Septril",
    zone: "Nariz",
    price: "$40.000",
    healing: "6 a 12 meses",
    evaluation: "Obligatoria",
    category: "Nariz y rostro",
    slug: "piercing-septril-nariz-arica",
    image: imgSeptril,
    imageAlt: "Piercing septril en nariz realizado por Cotepiercing en Arica",
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
    name: "Angel Bites",
    zone: "Labio",
    price: "$60.000",
    healing: "2 a 3 meses",
    evaluation: "Obligatoria",
    category: "Labio y boca",
    slug: "piercing-angel-bites-labio-arica",
    image: imgAngelBites,
    imageAlt: "Piercing Angel Bites en labio realizado por Cotepiercing en Arica",
  }),
  make({
    name: "Canine Bites",
    zone: "Labio",
    price: "$100.000",
    healing: "2 a 3 meses",
    evaluation: "Obligatoria",
    category: "Labio y boca",
    slug: "piercing-canine-bites-labio-arica",
    image: imgCanineBites,
    imageAlt: "Piercing Canine Bites en labio realizado por Cotepiercing en Arica",
  }),
  make({
    name: "Cyber Bites",
    zone: "Labio",
    price: "$60.000",
    healing: "2 a 3 meses",
    evaluation: "Obligatoria",
    category: "Labio y boca",
    slug: "piercing-cyber-bites-labio-arica",
    image: imgCyberBites,
    imageAlt: "Piercing Cyber Bites en labio realizado por Cotepiercing en Arica",
  }),
  make({
    name: "Dolphin Bites",
    zone: "Labio",
    price: "$60.000",
    healing: "2 a 3 meses",
    evaluation: "Obligatoria",
    category: "Labio y boca",
    slug: "piercing-dolphin-bites-labio-arica",
    image: imgDolphinBites,
    imageAlt: "Piercing Dolphin Bites en labio realizado por Cotepiercing en Arica",
  }),
  make({
    name: "Snake Bites",
    zone: "Labio",
    price: "$60.000",
    healing: "2 a 3 meses",
    evaluation: "Obligatoria",
    category: "Labio y boca",
    slug: "piercing-snake-bites-labio-arica",
    image: imgSnakeBites,
    imageAlt: "Piercing Snake Bites en labio realizado por Cotepiercing en Arica",
  }),
  make({
    name: "Spider Bites",
    zone: "Labio",
    price: "$60.000",
    healing: "2 a 3 meses",
    evaluation: "Obligatoria",
    category: "Labio y boca",
    slug: "piercing-spider-bites-labio-arica",
    image: imgSpiderBites,
    imageAlt: "Piercing Spider Bites en labio realizado por Cotepiercing en Arica",
  }),
  make({
    name: "Shark Bites",
    zone: "Labio",
    price: "$100.000",
    healing: "2 a 3 meses",
    evaluation: "Obligatoria",
    category: "Labio y boca",
    slug: "piercing-shark-bites-labio-arica",
    image: imgSharkBites,
    imageAlt: "Piercing Shark Bites en labio realizado por Cotepiercing en Arica",
  }),
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
    name: "Labret Vertical",
    zone: "Labio",
    price: "$30.000",
    healing: "2 a 3 meses",
    evaluation: "Recomendada",
    category: "Labio y boca",
    slug: "piercing-labret-vertical-labio-arica",
    image: imgLabretVertical,
    imageAlt: "Piercing labret vertical con joyería dorada realizado por Cotepiercing",
  }),
  make({
    name: "Labret Horizontal",
    zone: "Labio",
    price: "$30.000",
    healing: "2 a 3 meses",
    evaluation: "Recomendada",
    category: "Labio y boca",
    slug: "piercing-labret-horizontal-labio-arica",
    image: imgLabretHorizontal,
    imageAlt: "Piercing labret horizontal con joyería dorada realizado por Cotepiercing",
  }),
  make({
    name: "Madonna",
    zone: "Labio",
    price: "$30.000",
    healing: "2 a 3 meses",
    evaluation: "Recomendada",
    category: "Labio y boca",
    slug: "piercing-madonna-monroe-labio-arica",
    image: imgMadonna,
    imageAlt:
      "Piercing Madonna en labio superior lateral con joyería dorada realizado por Cotepiercing",
  }),
  make({
    name: "Meduza",
    zone: "Labio",
    price: "$30.000",
    healing: "2 a 3 meses",
    evaluation: "Recomendada",
    category: "Labio y boca",
    slug: "piercing-medusa-labio-arica",
    image: imgMedusa,
    imageAlt:
      "Piercing meduza sobre el labio superior con joyería dorada realizado por Cotepiercing",
  }),
  make({
    name: "Monroe",
    zone: "Labio",
    price: "$30.000",
    healing: "2 a 3 meses",
    evaluation: "Recomendada",
    category: "Labio y boca",
    slug: "piercing-monroe-labio-arica",
    image: imgMadonnaMonroe,
    imageAlt:
      "Piercing Monroe en labio superior lateral con joyería dorada realizado por Cotepiercing",
  }),
  make({
    name: "Lengua",
    zone: "Boca",
    price: "$35.000",
    healing: "1 a 2 meses",
    evaluation: "Obligatoria",
    category: "Labio y boca",
    slug: "piercing-lengua-boca-arica",
    image: imgLengua,
    imageAlt: "Piercing de lengua realizado por Cotepiercing en Arica",
  }),
  make({
    name: "Smiley",
    zone: "Frenillo",
    price: "$25.000",
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
    name: "Surface",
    zone: "Cuerpo",
    price: "$50.000",
    healing: "6 a 12 meses",
    evaluation: "Obligatoria",
    category: "Cuerpo",
    slug: "piercing-surface-cuerpo-arica",
    image: imgSurface,
    imageAlt: "Piercing surface en cuerpo con joyería dorada realizado por Cotepiercing",
  }),
  make({
    name: "Microdermal",
    zone: "Cuerpo",
    price: "$50.000",
    healing: "3 a 6 meses",
    evaluation: "Obligatoria",
    category: "Cuerpo",
    slug: "piercing-microdermal-cuerpo-arica",
    image: imgMicrodermal,
    imageAlt: "Piercing microdermal en mejilla con joyería dorada realizado por Cotepiercing",
  }),
  make({
    name: "Expansión",
    zone: "Oreja",
    price: "$60.000 hasta 6 mm",
    healing: "Variable",
    evaluation: "Obligatoria",
    category: "Oreja",
    slug: "expansion-lobulo-hasta-6mm-arica",
    image: imgExpansion,
    imageAlt: "Expansión de lóbulo hasta 6 mm realizada por Cotepiercing en Arica",
  }),

  // ── Íntimos ───────────────────────────────────────────────────────────────
  make({
    name: "Nipple",
    zone: "Cuerpo",
    price: "$60.000 c/u",
    healing: "6 a 12 meses",
    evaluation: "Obligatoria",
    category: "Íntimos",
    slug: "piercing-pezon-intimo-arica",
    image: catIntimo,
    imageAlt: "Piercing nipple realizado por Cotepiercing en Arica con joyería inicial incluida",
  }),
  make({
    name: "Par de nipple",
    zone: "Cuerpo",
    price: "$90.000",
    healing: "6 a 12 meses",
    evaluation: "Obligatoria",
    category: "Íntimos",
    slug: "piercing-par-nipple-intimo-arica",
    image: catIntimo,
    imageAlt:
      "Par de piercing nipple realizado por Cotepiercing en Arica con joyería inicial incluida",
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
    description:
      "Lo que tiene aquí es un granuloma, frecuentemente un granuloma piógeno o por cuerpo extraño. Para explicárselo de forma clara: no se trata de una infección grave ni de una herida normal. Es una respuesta de defensa exagerada de su cuerpo. Ante un pequeño estímulo como una perforación, un roce constante, una uña encarnada o una astilla, sus vasos sanguíneos y células de defensa intentaron reparar la zona tan rápido que crearon un exceso de tejido nuevo. Es como si el cuerpo hubiera construido un parche de emergencia demasiado grueso y lleno de sangre.",
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
    description:
      "Lo que estamos observando aquí es un queloide. Para que lo comprendamos de forma sencilla: cuando la piel sufre una herida, el cuerpo produce una proteína llamada colágeno para cerrarla. En su caso, las células encargadas de esto no recibieron la señal de detenerse y siguieron produciendo tejido de más. A diferencia de una cicatriz normal, el queloide desborda los límites de la herida original e invade la piel sana, comportándose como una cicatriz con exceso de energía. Para diseñar el mejor tratamiento para usted, necesito evaluar cuatro aspectos fundamentales de su cicatriz. Primero, la actividad y consistencia: voy a palpar el queloide. Si está muy duro, rojo o inflamado, significa que sigue creciendo de forma activa; si está más blando o pálido, está en una etapa más estable. Segundo, los síntomas asociados: necesito saber si experimenta picazón constante, dolor o punzadas. Estos síntomas indican qué tan inflamados están los nervios internos de la cicatriz. Tercero, el tiempo de evolución: no es lo mismo tratar un queloide que lleva tres meses que uno que lleva cinco años. Cuarto, su historial personal: analizaremos si tiene tendencia familiar o antecedentes de cicatrización similar.",
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
    description:
      "La reconstrucción de lóbulo, conocida médicamente como lobuloplastia, es un procedimiento quirúrgico menor y ambulatorio diseñado para corregir, restaurar o rejuvenecer la estructura anatómica del lóbulo de la oreja. Su objetivo principal es devolver la simetría, consistencia y forma natural a tejidos que han sufrido deformaciones, elongaciones o desgarros completos debido a factores mecánicos o al envejecimiento.",
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

export const categoryNavigation: Record<Category, { href: string; label: string }> = {
  Oreja: { href: "/servicios/oreja", label: "Piercings de oreja" },
  "Nariz y rostro": { href: "/servicios/nariz-rostro", label: "Nariz y rostro" },
  "Labio y boca": { href: "/servicios/labio-boca", label: "Labio y boca" },
  Cuerpo: { href: "/servicios/cuerpo", label: "Piercings de cuerpo" },
  Íntimos: { href: "/servicios/privado", label: "Servicios privados" },
  Evaluación: { href: "/evaluacion", label: "Evaluaciones" },
};
