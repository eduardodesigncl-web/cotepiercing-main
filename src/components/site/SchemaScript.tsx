/**
 * SchemaScript — inyecta JSON-LD de Schema.org en el <head>.
 * Incluye: LocalBusiness (HealthAndBeautyBusiness) + FAQPage
 */
import { SITE_URL } from "@/lib/config";
import { SITE } from "@/lib/site";
import { faqs } from "@/data/faqs";
import { services } from "@/data/services";

const numericPrice = (price: string) =>
  price.match(/\$\d{1,3}(?:\.\d{3})*/)?.[0].replace(/\D/g, "");

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "@id": `${SITE_URL}/#business`,
  name: SITE.name,
  description:
    "Estudio de body piercing profesional en Arica, Chile. Evaluación anatómica, asepsia clínica y joyería inicial incluida en cada servicio.",
  url: SITE_URL,
  priceRange: "$5.000 - $100.000 CLP",
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
    "@type": "Person",
    name: SITE.professional,
    jobTitle: "Piercer profesional",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Catálogo de piercings",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
      },
      price: numericPrice(service.price),
      priceCurrency: "CLP",
    })),
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

export function SchemaScript() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
