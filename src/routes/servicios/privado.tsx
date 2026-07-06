import { createFileRoute } from "@tanstack/react-router";
import { CategoryLanding } from "@/components/site/CategoryLanding";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/servicios/privado")({
  head: () => ({
    meta: [{ title: "Piercings privados en Arica | Cotepiercing" }],
    links: [{ rel: "canonical", href: `${SITE_URL}/servicios/privado` }],
  }),
  component: () => (
    <CategoryLanding
      category="Íntimos"
      eyebrow="Servicios privados"
      title="Piercings privados en Arica"
      intro="Nipple individual o en par con atención discreta, higiene rigurosa y evaluación anatómica obligatoria antes de confirmar el procedimiento."
      guidance="La consulta se coordina directamente por WhatsApp. La viabilidad, preparación y cuidados se conversan de forma privada."
    />
  ),
});
