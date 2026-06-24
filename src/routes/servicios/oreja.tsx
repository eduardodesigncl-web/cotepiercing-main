import { createFileRoute } from "@tanstack/react-router";
import { CategoryLanding } from "@/components/site/CategoryLanding";
import { findPageSeo, seoHead } from "@/lib/seo";

export const Route = createFileRoute("/servicios/oreja")({
  head: () => seoHead(findPageSeo("/servicios/oreja")!),
  component: () => (
    <CategoryLanding
      category="Oreja"
      eyebrow="Servicios · Oreja"
      title="Piercings de oreja en Arica"
      intro="Lóbulo, helix, tragus, conch, daith, rook e industrial con joyería inicial incluida."
      guidance="La forma y grosor del cartílago cambian en cada persona. Por eso, la ubicación y viabilidad de los piercings de oreja se confirman antes de perforar."
    />
  ),
});
