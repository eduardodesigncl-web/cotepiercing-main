import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { SITE, SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/informacion-sanitaria")({
  head: () => ({
    meta: [
      { title: "Información sanitaria verificable | Borrador Cotepiercing" },
      {
        name: "description",
        content:
          "Plantilla borrador para publicar información sanitaria verificable, protocolos y límites de orientación en Cotepiercing.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/informacion-sanitaria` }],
  }),
  component: HealthInformationDraft,
});

function HealthInformationDraft() {
  return (
    <ContentPage
      eyebrow="Borrador legal"
      title="Información sanitaria verificable"
      intro="Plantilla pendiente de revisión y aprobación de la clienta. No debe considerarse información sanitaria final publicada."
    >
      <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
        <section className="border-l-2 border-[var(--gold)] pl-6">
          <h2 className="font-serif text-3xl text-foreground">Estado del documento</h2>
          <p className="mt-4">
            Este texto es un borrador para {SITE.name}. Solo debe completarse con información
            verificable entregada por la clienta, evitando certificaciones, permisos o afirmaciones
            no respaldadas.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl text-foreground">Protocolos de higiene</h2>
          <p className="mt-4">
            Se deben listar únicamente protocolos confirmados: preparación del área, materiales de
            un solo uso, esterilización de joyería cuando corresponda, limpieza de superficies y
            descarte seguro de insumos.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl text-foreground">Límites de la orientación</h2>
          <p className="mt-4">
            La información del sitio y de WhatsApp es orientación general sobre piercing y cuidado
            posterior. No reemplaza atención médica. Ante fiebre, dolor intenso, secreción con mal
            olor, calor excesivo o empeoramiento rápido, se debe buscar evaluación médica.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl text-foreground">Datos por confirmar</h2>
          <p className="mt-4">
            Antes de publicar, se deben confirmar autorizaciones sanitarias, protocolos internos,
            materiales utilizados y cualquier respaldo que la clienta autorice mostrar.
          </p>
        </section>
      </div>
    </ContentPage>
  );
}
