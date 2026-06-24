import { createFileRoute } from "@tanstack/react-router";
import { CategoryLanding } from "@/components/site/CategoryLanding";
import { findPageSeo, seoHead } from "@/lib/seo";

export const Route = createFileRoute("/servicios/labio-boca")({
  head: () => seoHead(findPageSeo("/servicios/labio-boca")!),
  component: () => (
    <CategoryLanding
      category="Labio y boca"
      eyebrow="Servicios · Labio y boca"
      title="Piercings de labio y boca en Arica"
      intro="Labret, medusa, Monroe y smiley con joyería seleccionada para la zona."
      guidance="La ubicación y el largo de la joyería deben considerar labios, mucosa, dientes y encías. Cada caso se revisa de forma individual."
    />
  ),
});
