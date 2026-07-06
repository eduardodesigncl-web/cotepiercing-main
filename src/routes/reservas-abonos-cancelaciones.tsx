import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { SITE, SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/reservas-abonos-cancelaciones")({
  head: () => ({
    meta: [
      { title: "Reservas, abonos y cancelaciones | Borrador Cotepiercing" },
      {
        name: "description",
        content:
          "Plantilla borrador de política de reservas, abonos, cambios de hora y cancelaciones de Cotepiercing.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/reservas-abonos-cancelaciones` }],
  }),
  component: ReservationsPolicyDraft,
});

function ReservationsPolicyDraft() {
  return (
    <ContentPage
      eyebrow="Borrador legal"
      title="Reservas, abonos y cancelaciones"
      intro="Plantilla pendiente de revisión y aprobación de la clienta. No debe considerarse política final publicada."
    >
      <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
        <section className="border-l-2 border-[var(--gold)] pl-6">
          <h2 className="font-serif text-3xl text-foreground">Estado del documento</h2>
          <p className="mt-4">
            Este texto es un borrador operativo para {SITE.name}. Debe validarse con la clienta
            antes de enlazarse como política definitiva o retirarle el noindex.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl text-foreground">Reserva de hora</h2>
          <p className="mt-4">
            Las horas se coordinan por WhatsApp. La reserva queda sujeta a disponibilidad,
            confirmación del servicio solicitado y evaluación previa cuando corresponda.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl text-foreground">Abonos</h2>
          <p className="mt-4">
            Si se solicita abono, deben definirse monto, medio de pago, plazo de confirmación y
            condiciones para mantener la hora. Estos valores quedan pendientes de confirmación.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl text-foreground">Cambios y cancelaciones</h2>
          <p className="mt-4">
            Los cambios de hora, atrasos, ausencias y cancelaciones deben regularse con plazos
            claros. La clienta debe aprobar si el abono es reembolsable, transferible o imputable a
            una nueva reserva.
          </p>
        </section>
      </div>
    </ContentPage>
  );
}
