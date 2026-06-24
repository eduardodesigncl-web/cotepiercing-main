import catIntimo from "@/assets/cat-intimo.webp";
import imgAbout from "@/assets/maria-jose-piercer-profesional-cotepiercing-arica-chile.webp";
import imgLobulo from "@/assets/servicios/piercing-lobulo-oreja-cotepiercing.webp";
import imgSegundoLobulo from "@/assets/servicios/piercing-segundo-lobulo-oreja-cotepiercing.webp";
import imgHelix from "@/assets/servicios/piercing-helix-oreja-cotepiercing.webp";
import imgForwardHelix from "@/assets/servicios/piercing-forward-helix-oreja-cotepiercing.webp";
import imgTragus from "@/assets/servicios/piercing-tragus-oreja-cotepiercing.webp";
import imgConch from "@/assets/servicios/piercing-conch-oreja-cotepiercing.webp";
import imgDaith from "@/assets/servicios/piercing-daith-oreja-cotepiercing.webp";
import imgRook from "@/assets/servicios/piercing-rook-oreja-cotepiercing.webp";
import imgIndustrial from "@/assets/servicios/piercing-industrial-oreja-cotepiercing.webp";
import imgNostril from "@/assets/servicios/piercing-nostril-nariz-cotepiercing.webp";
import imgSeptum from "@/assets/servicios/piercing-septum-nariz-cotepiercing.webp";
import imgCeja from "@/assets/servicios/piercing-ceja-eyebrow-piercing-cotepiercing.webp";
import imgLabret from "@/assets/servicios/piercing-labret-labio-cotepiercing.webp";
import imgMedusa from "@/assets/servicios/piercing-medusa-labio-cotepiercing.webp";
import imgMadonna from "@/assets/servicios/piercing-madonna-monroe-labio-cotepiercing.webp";
import imgSmiley from "@/assets/servicios/piercing-smiley-frenillo-cotepiercing.webp";
import imgOmbligo from "@/assets/servicios/piercing-ombligo-abdomen-cotepiercing.webp";
import imgMicrodermal from "@/assets/servicios/piercing-microdermal-mejilla-cotepiercing.webp";
import imgSurface from "@/assets/servicios/piercing-surface-cuerpo-cotepiercing.webp";
import imgEvalIrritado from "@/assets/servicios/evaluacion-piercing-irritado-cotepiercing.webp";
import imgCambioJoyeria from "@/assets/servicios/cambio-de-joyeria-piercing-cotepiercing.webp";
import imgRetiroJoyeria from "@/assets/servicios/retiro-de-joyeria-piercing-cotepiercing.webp";
import imgGranuloma from "@/assets/servicios/evaluacion-granuloma-piercing-cotepiercing.webp";
import imgQueloide from "@/assets/servicios/evaluacion-queloide-piercing-cotepiercing.webp";
import imgReconstruccion from "@/assets/servicios/reconstruccion-de-lobulos-cotepiercing.webp";
import {
  categories,
  categoryNavigation,
  serviceContent,
  type Category,
  type ServiceContent,
} from "./service-content";

export type { Category } from "./service-content";
export { categories, categoryNavigation, serviceContent };

export type Service = ServiceContent & {
  image: string;
};

const serviceImages: Record<string, string> = {
  "piercing-lobulo-oreja-arica": imgLobulo,
  "piercing-segundo-lobulo-oreja-arica": imgSegundoLobulo,
  "piercing-helix-oreja-arica": imgHelix,
  "piercing-forward-helix-oreja-arica": imgForwardHelix,
  "piercing-tragus-oreja-arica": imgTragus,
  "piercing-conch-oreja-arica": imgConch,
  "piercing-daith-oreja-arica": imgDaith,
  "piercing-rook-oreja-arica": imgRook,
  "piercing-industrial-oreja-arica": imgIndustrial,
  "piercing-nostril-nariz-arica": imgNostril,
  "piercing-septum-nariz-arica": imgSeptum,
  "piercing-ceja-eyebrow-arica": imgCeja,
  "piercing-labret-labio-arica": imgLabret,
  "piercing-medusa-labio-arica": imgMedusa,
  "piercing-madonna-monroe-labio-arica": imgMadonna,
  "piercing-smiley-frenillo-arica": imgSmiley,
  "piercing-ombligo-abdomen-arica": imgOmbligo,
  "piercing-pezon-intimo-arica": catIntimo,
  "piercing-microdermal-cuerpo-arica": imgMicrodermal,
  "piercing-surface-cuerpo-arica": imgSurface,
  "piercing-intimo-femenino-arica": catIntimo,
  "piercing-intimo-masculino-arica": catIntimo,
  "evaluacion-piercing-irritado-arica": imgEvalIrritado,
  "cambio-joyeria-piercing-arica": imgCambioJoyeria,
  "retiro-joyeria-piercing-arica": imgRetiroJoyeria,
  "evaluacion-granuloma-piercing-arica": imgGranuloma,
  "evaluacion-queloide-piercing-arica": imgQueloide,
  "reconstruccion-lobulos-arica": imgReconstruccion,
};

export const services: Service[] = serviceContent.map((service) => ({
  ...service,
  image: serviceImages[service.slug] ?? imgAbout,
}));
