import { createFileRoute } from "@tanstack/react-router";
import { CategoryLanding } from "@/components/site/CategoryLanding";
import { findPageSeo, seoHead } from "@/lib/seo";

export const Route = createFileRoute("/servicios/privado")({
  head: () => seoHead(findPageSeo("/servicios/privado")!),
  component: () => (
    <CategoryLanding
      category="Íntimos"
      eyebrow="Servicios privados"
      title="Piercings privados en Arica"
      intro="Atención discreta, higiene rigurosa y evaluación anatómica obligatoria antes de confirmar el procedimiento."
      guidance="La consulta se coordina directamente por WhatsApp. La viabilidad, preparación y cuidados se conversan de forma privada."
    />
  ),
});
