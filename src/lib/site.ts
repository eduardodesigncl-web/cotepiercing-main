export const SITE = {
  name: "Cotepiercing",
  professional: "María José",
  url: "https://cotepiercing.cl",
  temporaryUrl: "https://cotepiercing-main.eduardo-design-cl.workers.dev",
  phoneDisplay: "+56 9 4856 6852",
  phoneE164: "+56948566852",
  whatsappNumber: "56948566852",
  venue: "Recina Tattoo",
  streetAddress: "San Marcos 393",
  locality: "Arica",
  region: "Arica y Parinacota",
  country: "CL",
  countryName: "Chile",
  postalCode: "1000000",
  openingHours: {
    weekdays: "11:00–20:00",
    saturday: "11:00–20:00",
    sunday: "Cerrado",
  },
  openingHoursText: {
    weekdays: "Lunes a viernes · 11:00–20:00",
    saturday: "Sábado · 11:00–20:00",
    sunday: "Domingo · cerrado",
  },
  mapsShareUrl: "https://share.google/ME2YGIzY4MLKa7LHC",
  mapsEmbedUrl: "https://maps.google.com/maps?q=San+Marcos+393+Arica+Chile&output=embed&hl=es&z=16",
  googleBusinessUrl: "https://www.google.com/search?kgmid=/g/11l5ktjh6h&q=Cotepiercing",
  googleKnowledgeGraphId: "/g/11l5ktjh6h",
  instagramUrl: "https://www.instagram.com/cote_piercing/",
  geo: {
    latitude: -18.4802288,
    longitude: -70.319373,
  },
} as const;

export const SITE_URL = SITE.url;

export const BUSINESS_ADDRESS = `${SITE.streetAddress}, ${SITE.postalCode} ${SITE.locality}, ${SITE.region}`;
export const BUSINESS_ADDRESS_WITH_COUNTRY = `${BUSINESS_ADDRESS}, ${SITE.countryName}`;
export const BUSINESS_LOCATION = `${SITE.venue}, ${BUSINESS_ADDRESS_WITH_COUNTRY}`;
