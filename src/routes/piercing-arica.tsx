import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { GoogleReviews } from "@/components/site/GoogleReviews";
import { SITE } from "@/lib/site";
import { findPageSeo, seoHead } from "@/lib/seo";
import { waLink } from "@/lib/wa";

export const Route = createFileRoute("/piercing-arica")({
  head: () => seoHead(findPageSeo("/piercing-arica")!),
  component: PiercingArica,
});

function PiercingArica() {
  return (
    <>
      <ContentPage
        eyebrow="Piercing en Arica"
        title="Piercing profesional en Arica con evaluación anatómica"
        intro="Cotepiercing es el espacio profesional de María José en Arica. Cada servicio comienza revisando la anatomía, la ubicación y la joyería adecuada antes de perforar."
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <section>
            <h2 className="font-serif text-3xl">Atención en el centro de Arica</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              La atención se realiza en {SITE.venue}, {SITE.streetAddress}. Se trabaja con aguja
              estéril descartable, joyería esterilizada en autoclave y desinfección de superficies
              entre clientes.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              <li>Lunes a sábado: 11:00–20:00</li>
              <li>Domingo: cerrado</li>
              <li>Reserva previa por WhatsApp</li>
            </ul>
          </section>
          <section className="border border-border bg-[var(--stone)]/35 p-7">
            <h2 className="font-serif text-3xl">Antes de reservar</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Indica el piercing que te interesa y, cuando corresponda, envía una foto de la zona.
              Así se puede orientar la viabilidad antes de coordinar la hora.
            </p>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex bg-[var(--gold)] px-7 py-3 text-xs uppercase tracking-widest text-white"
            >
              Reservar por WhatsApp
            </a>
          </section>
        </div>
        <section className="mt-16">
          <h2 className="font-serif text-3xl">Servicios disponibles</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {[
              ["/servicios/oreja", "Piercings de oreja"],
              ["/servicios/nariz-rostro", "Nariz y rostro"],
              ["/servicios/labio-boca", "Labio y boca"],
              ["/servicios/cuerpo", "Piercings de cuerpo"],
              ["/servicios/privado", "Servicios privados"],
              ["/evaluacion", "Evaluaciones y cambios de joyería"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="border border-border p-5 text-sm transition-colors hover:border-[var(--gold)]"
              >
                {label} <span className="float-right text-[var(--gold)]">→</span>
              </a>
            ))}
          </div>
        </section>
        <section className="mt-16">
          <h2 className="font-serif text-3xl">Cómo llegar</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Cotepiercing atiende en {SITE.venue}, {SITE.streetAddress}, {SITE.locality}. Confirma tu
            hora antes de asistir.
          </p>
          <a
            href={SITE.mapsShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-xs uppercase tracking-widest text-[var(--gold)]"
          >
            Abrir ubicación en Google →
          </a>
        </section>
      </ContentPage>
      <GoogleReviews />
    </>
  );
}
