import { createFileRoute } from "@tanstack/react-router";
import { CategoryLanding } from "@/components/site/CategoryLanding";
import { findPageSeo, seoHead } from "@/lib/seo";

export const Route = createFileRoute("/servicios/cuerpo")({
  head: () => seoHead(findPageSeo("/servicios/cuerpo")!),
  component: () => (
    <CategoryLanding
      category="Cuerpo"
      eyebrow="Servicios · Cuerpo"
      title="Piercings de cuerpo en Arica"
      intro="Ombligo, microdermal y surface con evaluación anatómica y conversación clara sobre viabilidad."
      guidance="Estos procedimientos dependen especialmente del tejido, la movilidad y la zona elegida. Si el riesgo de migración o rechazo es alto, se propondrá una alternativa."
    />
  ),
});
