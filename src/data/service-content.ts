export type Category =
  | "Oreja"
  | "Nariz y rostro"
  | "Labio y boca"
  | "Cuerpo"
  | "Íntimos"
  | "Evaluación";

export type ServiceContent = {
  name: string;
  zone: string;
  price: string;
  healing: string;
  evaluation: "Recomendada" | "Obligatoria" | "—";
  category: Category;
  imageAlt: string;
  description: string;
  slug: string;
};

const make = (
  service: Omit<ServiceContent, "description"> & { description?: string },
): ServiceContent => ({
  ...service,
  description:
    service.description ??
    `${service.name} realizado con técnica profesional, asepsia clínica y joyería inicial incluida. Ubicación: ${service.zone}. La perforación se evalúa según anatomía para asegurar viabilidad, comodidad y un proceso de cicatrización óptimo.`,
});

export const serviceContent: ServiceContent[] = [
  make({
    name: "Lóbulo",
    zone: "Oreja",
    price: "$25.000",
    healing: "2 a 3 meses",
    evaluation: "—",
    category: "Oreja",
    slug: "piercing-lobulo-oreja-arica",
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
    imageAlt: "Piercing industrial en oreja con barra dorada realizado por Cotepiercing en Arica",
  }),
  make({
    name: "Nostril",
    zone: "Nariz",
    price: "$28.000",
    healing: "4 a 6 meses",
    evaluation: "Recomendada",
    category: "Nariz y rostro",
    slug: "piercing-nostril-nariz-arica",
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
    imageAlt: "Eyebrow piercing o piercing de ceja con joyería dorada realizado por Cotepiercing",
  }),
  make({
    name: "Labret",
    zone: "Labio",
    price: "$30.000",
    healing: "2 a 3 meses",
    evaluation: "Recomendada",
    category: "Labio y boca",
    slug: "piercing-labret-labio-arica",
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
    imageAlt: "Piercing smiley en frenillo superior con joyería dorada realizado por Cotepiercing",
  }),
  make({
    name: "Ombligo",
    zone: "Abdomen",
    price: "$35.000",
    healing: "6 a 12 meses",
    evaluation: "Recomendada",
    category: "Cuerpo",
    slug: "piercing-ombligo-abdomen-arica",
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
    imageAlt: "Piercing surface en cuerpo con joyería dorada realizado por Cotepiercing",
  }),
  make({
    name: "Íntimo femenino",
    zone: "Íntimo",
    price: "Consultar",
    healing: "Variable",
    evaluation: "Obligatoria",
    category: "Íntimos",
    slug: "piercing-intimo-femenino-arica",
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
    imageAlt:
      "Piercing íntimo masculino realizado con privacidad e higiene rigurosa por Cotepiercing",
  }),
  make({
    name: "Evaluación de piercing irritado",
    zone: "—",
    price: "$10.000",
    healing: "—",
    evaluation: "—",
    category: "Evaluación",
    slug: "evaluacion-piercing-irritado-arica",
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
