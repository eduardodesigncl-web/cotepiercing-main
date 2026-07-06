import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { SITE, SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/atencion-menores")({
  head: () => ({
    meta: [
      { title: "Atención y autorización de menores | Borrador Cotepiercing" },
      {
        name: "description",
        content:
          "Plantilla borrador sobre atención de menores de edad, autorización y requisitos de acompañamiento en Cotepiercing.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/atencion-menores` }],
  }),
  component: MinorsPolicyDraft,
});

function MinorsPolicyDraft() {
  return (
    <ContentPage
      eyebrow="Borrador legal"
      title="Atención y autorización de menores"
      intro="Plantilla pendiente de revisión y aprobación de la clienta. No debe considerarse política final publicada."
    >
      <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
        <section className="border-l-2 border-[var(--gold)] pl-6">
          <h2 className="font-serif text-3xl text-foreground">Estado del documento</h2>
          <p className="mt-4">
            Este texto es un borrador para {SITE.name}. La clienta debe confirmar si atiende a
            menores de edad, edades mínimas, servicios excluidos y requisitos exactos.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl text-foreground">Autorización</h2>
          <p className="mt-4">
            Si se atienden menores, debe definirse autorización expresa de madre, padre o tutor
            legal, documentación requerida y presencia obligatoria durante la atención.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl text-foreground">Evaluación profesional</h2>
          <p className="mt-4">
            La viabilidad del servicio se confirma según anatomía, zona solicitada, madurez para el
            cuidado posterior y criterio profesional. Algunos servicios pueden quedar excluidos.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl text-foreground">Pendiente de aprobación</h2>
          <p className="mt-4">
            Antes de publicar, se deben confirmar requisitos legales aplicables, texto de
            autorización y forma de registro de consentimiento.
          </p>
        </section>
      </div>
    </ContentPage>
  );
}
