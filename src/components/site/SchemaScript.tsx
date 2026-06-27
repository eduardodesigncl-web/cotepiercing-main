/**
 * SchemaScript — inyecta JSON-LD de Schema.org en el <head>.
 * Incluye: LocalBusiness (HealthAndBeautyBusiness) + FAQPage
 */
import { SITE_URL } from "@/lib/config";
import { SITE } from "@/lib/site";
import { faqs } from "@/data/faqs";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "@id": `${SITE_URL}/#local-business`,
  name: SITE.name,
  description:
    "Estudio de body piercing profesional en Arica, Chile. Evaluación anatómica, asepsia clínica y joyería inicial incluida en cada servicio.",
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
    "@type": "Person",
    name: SITE.professional,
    jobTitle: "Piercer profesional",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Catálogo de piercings",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Piercing de lóbulo",
          description: "Perforación de lóbulo con joyería inicial incluida.",
        },
        price: "25000",
        priceCurrency: "CLP",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Piercing septum",
          description:
            "Perforación de septum con evaluación anatómica obligatoria y joyería inicial incluida.",
        },
        price: "32000",
        priceCurrency: "CLP",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Evaluación de piercing irritado",
          description:
            "Evaluación profesional para piercings con irritación, bultitos o signos de infección.",
        },
        price: "10000",
        priceCurrency: "CLP",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cambio de joyería",
          description:
            "Cambio de joyería para piercing realizado con técnica profesional y asepsia clínica.",
        },
        price: "8000",
        priceCurrency: "CLP",
      },
    ],
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
