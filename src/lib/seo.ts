import {
  categoryNavigation,
  serviceContent,
  type Category,
  type ServiceContent,
} from "../data/service-content.ts";
import { SITE, SITE_URL } from "./site.ts";

export const OG_IMAGE_PATH = "/cotepiercing-piercing-profesional-arica-chile-og.png";
export const SITEMAP_LASTMOD = "2026-06-24";

export type PageSeo = {
  path: string;
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: "website" | "article";
};

const categoryDescriptions: Record<Category, string> = {
  Oreja:
    "Piercings de oreja en Arica: lóbulo, helix, tragus, conch, daith, rook e industrial con joyería inicial y evaluación según anatomía.",
  "Nariz y rostro":
    "Piercings de nariz y rostro en Arica: nostril, septum y ceja con marcación precisa, higiene rigurosa y joyería inicial incluida.",
  "Labio y boca":
    "Piercings de labio y boca en Arica: labret, medusa, Monroe y smiley con joyería seleccionada para labios, mucosa, dientes y encías.",
  Cuerpo:
    "Piercings de cuerpo en Arica: ombligo, microdermal y surface con evaluación anatómica para confirmar viabilidad, ubicación y cuidados.",
  Íntimos:
    "Piercings privados en Arica con atención discreta, higiene rigurosa y evaluación anatómica obligatoria antes de confirmar el procedimiento.",
  Evaluación:
    "Evaluación profesional de piercing irritado en Arica, granulomas, cambios, retiros de joyería y orientación para casos que requieren revisión médica.",
};

export const corePageSeo: PageSeo[] = [
  {
    path: "/",
    title: "Cotepiercing | Piercing profesional en Arica",
    description:
      "Piercing profesional en Arica con María José: evaluación anatómica, asepsia rigurosa, joyería inicial incluida y reserva por WhatsApp.",
    ogTitle: "Cotepiercing | Piercings cerca de ti en Arica",
  },
  {
    path: "/piercing-arica",
    title: "Piercing profesional en Arica | Cotepiercing",
    description:
      "Piercing profesional en Arica con evaluación anatómica, joyería inicial incluida, material estéril y reserva por WhatsApp en Cotepiercing.",
  },
  {
    path: "/servicios",
    title: "Servicios de piercing en Arica | Cotepiercing",
    description:
      "Explora servicios de piercing en Arica por zona corporal, con precios, cicatrización, joyería inicial y evaluación anatómica.",
  },
  {
    path: "/servicios/oreja",
    title: "Piercings de oreja en Arica | Cotepiercing",
    description: categoryDescriptions.Oreja,
  },
  {
    path: "/servicios/nariz-rostro",
    title: "Piercings de nariz y rostro en Arica | Cotepiercing",
    description: categoryDescriptions["Nariz y rostro"],
  },
  {
    path: "/servicios/labio-boca",
    title: "Piercings de labio y boca en Arica | Cotepiercing",
    description: categoryDescriptions["Labio y boca"],
  },
  {
    path: "/servicios/cuerpo",
    title: "Piercings de cuerpo en Arica | Cotepiercing",
    description: categoryDescriptions.Cuerpo,
  },
  {
    path: "/servicios/privado",
    title: "Piercings privados en Arica | Cotepiercing",
    description: categoryDescriptions.Íntimos,
  },
  {
    path: "/estudio",
    title: "Estudio de piercing en Arica | Cotepiercing",
    description:
      "Conoce el espacio de atención de Cotepiercing en Recina Tattoo, San Marcos 393, Arica: asepsia, ubicación y horarios.",
  },
  {
    path: "/precios",
    title: "Precios de piercing en Arica | Cotepiercing",
    description:
      "Consulta precios de piercings, evaluaciones, cambios y retiros de joyería en Cotepiercing Arica. Las perforaciones incluyen joyería inicial.",
  },
  {
    path: "/evaluacion",
    title: "Evaluación de piercing en Arica | Cotepiercing",
    description: categoryDescriptions.Evaluación,
  },
  {
    path: "/sobre-cote",
    title: "María José, piercer profesional en Arica | Cotepiercing",
    description:
      "Conoce el enfoque de María José en Cotepiercing: evaluación anatómica, marcación precisa, asepsia y orientación honesta.",
  },
  {
    path: "/joyeria",
    title: "Joyería para piercing en Arica | Cotepiercing",
    description:
      "Conoce cómo Cotepiercing selecciona la joyería inicial según anatomía, zona, espacio para inflamación y proceso de cicatrización.",
  },
  {
    path: "/privacidad",
    title: "Política de privacidad | Cotepiercing",
    description:
      "Política de privacidad de Cotepiercing: consultas por WhatsApp, fotos autorizadas, redes sociales, enlaces externos y Cloudflare Analytics sin cookies.",
  },
];

export function absoluteUrl(path: string) {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

export function servicePath(service: Pick<ServiceContent, "slug">) {
  return `/servicios/${service.slug}`;
}

export function serviceSeo(service: ServiceContent): PageSeo {
  const title = `${service.name} en Arica | Cotepiercing`;
  const priceText = service.price === "Consultar" ? "valor a consultar" : `precio ${service.price}`;
  return {
    path: servicePath(service),
    title,
    description:
      `${service.name} en Arica con joyería inicial incluida, ${priceText}, cicatrización ${service.healing} y evaluación ${service.evaluation.toLowerCase()}. Reserva por WhatsApp.`.slice(
        0,
        158,
      ),
    ogType: "article",
  };
}

export const servicePageSeo = serviceContent.map(serviceSeo);
export const sitemapPages = [...corePageSeo, ...servicePageSeo];

export function findPageSeo(path: string) {
  return sitemapPages.find((page) => page.path === path);
}

export function seoHead(page: PageSeo, imagePath = OG_IMAGE_PATH) {
  const url = absoluteUrl(page.path);
  const ogTitle = page.ogTitle ?? page.title;
  const ogDescription = page.ogDescription ?? page.description;
  const imageUrl = imagePath.startsWith("http") ? imagePath : `${SITE_URL}${imagePath}`;

  return {
    meta: [
      { title: page.title },
      { name: "description", content: page.description },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: page.ogType ?? "website" },
      { property: "og:site_name", content: SITE.name },
      { property: "og:locale", content: "es_CL" },
      { property: "og:title", content: ogTitle },
      { property: "og:description", content: ogDescription },
      { property: "og:url", content: url },
      { property: "og:image", content: imageUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: ogTitle },
      { name: "twitter:description", content: ogDescription },
      { name: "twitter:image", content: imageUrl },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function itemListSchema({
  id,
  name,
  description,
  items,
}: {
  id: string;
  name: string;
  description: string;
  items: Array<{ name: string; url: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": id,
    name,
    description,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function categoryItemList(category: Category) {
  const categoryPage = categoryNavigation[category];
  return itemListSchema({
    id: `${absoluteUrl(categoryPage.href)}#itemlist`,
    name: categoryPage.label,
    description: categoryDescriptions[category],
    items: serviceContent
      .filter((service) => service.category === category)
      .map((service) => ({
        name: service.name,
        url: absoluteUrl(servicePath(service)),
      })),
  });
}
