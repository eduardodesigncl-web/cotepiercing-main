import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { ServiceGrid } from "@/components/site/ServiceGrid";
import { services } from "@/data/services";
import { findPageSeo, seoHead } from "@/lib/seo";

export const Route = createFileRoute("/evaluacion")({
  head: () => seoHead(findPageSeo("/evaluacion")!),
  component: EvaluationPage,
});

function EvaluationPage() {
  const items = services.filter((service) => service.category === "Evaluación");
  return (
    <ContentPage
      eyebrow="Evaluación profesional"
      title="¿Tu piercing está irritado o cambió de aspecto?"
      intro="Cada caso se revisa de forma individual para observar la joyería, la ubicación y los cuidados. La evaluación de piercing no reemplaza atención médica."
    >
      <div className="mb-12 border-l-2 border-[var(--gold)] pl-6 text-sm leading-relaxed text-muted-foreground">
        Si presentas fiebre, dolor intenso, calor excesivo, secreción con mal olor o síntomas que
        empeoran, busca atención médica. No retires la joya ni manipules la zona por tu cuenta antes
        de recibir orientación.
      </div>
      <ServiceGrid items={items} />
    </ContentPage>
  );
}
