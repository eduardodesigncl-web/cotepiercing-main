import { faqs } from "../data/faqs.ts";
import { serviceContent, type ServiceContent } from "../data/service-content.ts";
import { absoluteUrl, servicePath } from "./seo.ts";
import { SITE, SITE_URL } from "./site.ts";

export const LOCAL_BUSINESS_ID = `${SITE_URL}/#local-business`;
export const PERSON_ID = `${SITE_URL}/#maria-jose`;

export function serviceId(service: Pick<ServiceContent, "slug">) {
  return `${absoluteUrl(servicePath(service))}#service`;
}

function priceValue(price: string) {
  const value = price.replace(/[^0-9]/g, "");
  return value || undefined;
}

export const personSchema = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: SITE.professional,
  jobTitle: "Piercer profesional",
  worksFor: {
    "@id": LOCAL_BUSINESS_ID,
  },
};

export const localBusinessSchema = {
  "@type": "HealthAndBeautyBusiness",
  "@id": LOCAL_BUSINESS_ID,
  name: SITE.name,
  description:
    "Estudio de body piercing profesional en Arica, Chile. Evaluación anatómica, asepsia rigurosa y joyería inicial incluida en cada servicio.",
  url: `${SITE_URL}/`,
  priceRange: "$5.000 - $45.000 CLP",
  currenciesAccepted: "CLP",
  paymentAccepted: "Efectivo, transferencia bancaria",
  image: `${SITE_URL}/cotepiercing-piercing-profesional-arica-chile-og.png`,
  telephone: SITE.phoneE164,
  sameAs: [SITE.googleBusinessUrl, SITE.instagramUrl],
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.streetAddress,
    addressLocality: SITE.locality,
    addressRegion: SITE.region,
    addressCountry: SITE.country,
    postalCode: SITE.postalCode,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE.geo.latitude,
    longitude: SITE.geo.longitude,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "11:00",
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
    "@id": PERSON_ID,
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Catálogo de piercings",
    itemListElement: serviceContent.map((service) => ({
      "@type": "Offer",
      price: priceValue(service.price),
      priceCurrency: "CLP",
      itemOffered: {
        "@id": serviceId(service),
      },
    })),
  },
};

export const faqSchema = {
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

export function serviceSchema(service: ServiceContent, image?: string) {
  const url = absoluteUrl(servicePath(service));
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": serviceId(service),
    name: service.name,
    serviceType: service.category,
    description: service.description,
    provider: {
      "@id": LOCAL_BUSINESS_ID,
    },
    areaServed: {
      "@type": "City",
      name: SITE.locality,
    },
    offers: {
      "@type": "Offer",
      price: priceValue(service.price),
      priceCurrency: "CLP",
      availability: "https://schema.org/InStock",
      url,
    },
    url,
    image,
  };
}
