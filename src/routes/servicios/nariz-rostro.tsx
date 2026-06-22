import { createFileRoute } from "@tanstack/react-router";
import { CategoryLanding } from "@/components/site/CategoryLanding";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/servicios/nariz-rostro")({
  head: () => ({
    meta: [{ title: "Piercings de nariz y rostro en Arica | Cotepiercing" }],
    links: [{ rel: "canonical", href: `${SITE_URL}/servicios/nariz-rostro` }],
  }),
  component: () => (
    <CategoryLanding
      category="Nariz y rostro"
      eyebrow="Servicios · Rostro"
      title="Piercings de nariz y rostro en Arica"
      intro="Nostril, septum y ceja con marcación precisa, técnica profesional y joyería inicial incluida."
      guidance="Al ser zonas de alta visibilidad, revisamos posición, simetría y anatomía antes de realizar la perforación."
    />
  ),
});
