/**
 * SchemaScript — inyecta JSON-LD de Schema.org en el <head>.
 * Incluye: LocalBusiness (HealthAndBeautyBusiness) + FAQPage
 */

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "Cotepiercing",
  description:
    "Estudio de body piercing profesional en Arica, Chile. Evaluación anatómica, asepsia clínica y joyería inicial incluida en cada servicio.",
  url: "https://cotepiercing.cl",
  priceRange: "$5.000 - $45.000 CLP",
  currenciesAccepted: "CLP",
  paymentAccepted: "Efectivo, transferencia bancaria",
  image: "https://cotepiercing.cl/og-image.webp",
  address: {
    "@type": "PostalAddress",
    streetAddress: "San Marcos 393",
    addressLocality: "Arica",
    addressRegion: "Arica y Parinacota",
    addressCountry: "CL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -18.4754,
    longitude: -70.2979,
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
    name: "María José",
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
          description: "Perforación de septum con evaluación anatómica obligatoria y joyería inicial incluida.",
        },
        price: "32000",
        priceCurrency: "CLP",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Evaluación de piercing irritado",
          description: "Evaluación profesional para piercings con irritación, bultitos o signos de infección.",
        },
        price: "10000",
        priceCurrency: "CLP",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cambio de joyería",
          description: "Cambio de joyería para piercing realizado con técnica profesional y asepsia clínica.",
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
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Todos los servicios incluyen joyería?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Todos los servicios de Cotepiercing incluyen joyería inicial seleccionada según la zona, anatomía y proceso de cicatrización.",
      },
    },
    {
      "@type": "Question",
      name: "¿Necesito evaluación antes de perforarme?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Algunos piercings requieren evaluación anatómica previa para confirmar si son viables y seguros. Cotepiercing indica en cada servicio si la evaluación es recomendada u obligatoria.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo puedo reservar en Cotepiercing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Puedes reservar por WhatsApp. Para confirmar la hora se solicita un abono previo. Cotepiercing atiende en Recina Tattoo, San Marcos 393, Arica, Chile.",
      },
    },
    {
      "@type": "Question",
      name: "¿Realizan piercings íntimos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Cotepiercing realiza piercings íntimos femeninos y masculinos con privacidad, higiene rigurosa y evaluación anatómica previa obligatoria.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué hago si mi piercing tiene un bulto o está irritado?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No manipules la zona ni cambies la joya por tu cuenta. Cotepiercing ofrece evaluaciones profesionales para piercings irritados, granulomas y queloides.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto cuesta el cambio de joyería?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El cambio de joyería tiene un valor de $8.000 CLP en Cotepiercing. El retiro de joyería cuesta $5.000 CLP.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué piercings no se realizan en Cotepiercing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No se realizan Snake Eyes, Bridge, Surface de cuello ni otros procedimientos que no cumplan con criterios de seguridad profesional.",
      },
    },
  ],
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
