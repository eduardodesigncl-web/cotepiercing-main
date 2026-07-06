import { createFileRoute } from "@tanstack/react-router";
import { CategoryLanding } from "@/components/site/CategoryLanding";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/servicios/oreja")({
  head: () => ({
    meta: [{ title: "Piercings de oreja en Arica | Cotepiercing" }],
    links: [{ rel: "canonical", href: `${SITE_URL}/servicios/oreja` }],
  }),
  component: () => (
    <CategoryLanding
      category="Oreja"
      eyebrow="Servicios · Oreja"
      title="Piercings de oreja en Arica"
      intro="Lobe, upper lobe, helix, tragus, conch, flat, daith, rook, industrial y expansión con joyería inicial incluida."
      guidance="La forma y grosor del cartílago cambian en cada persona. Por eso, la ubicación y viabilidad de los piercings de oreja se confirman antes de perforar."
    />
  ),
});
