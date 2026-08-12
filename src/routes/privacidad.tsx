import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { SITE, SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [{ title: "Política de privacidad | Cotepiercing" }],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacidad` }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <ContentPage
      eyebrow="Información legal"
      title="Política de privacidad"
      intro="Esta política explica cómo Cotepiercing usa la información que entregas al consultar, reservar o contactar por canales externos."
    >
      <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="font-serif text-3xl text-foreground">Responsable y contacto</h2>
          <p className="mt-4">
            El sitio corresponde a {SITE.name}, servicio independiente de piercing profesional en{" "}
            {SITE.locality}, {SITE.countryName}. La ubicación exacta se proporciona por DM al
            confirmar una reserva. Para consultas sobre privacidad o atención, escribe por WhatsApp
            al{" "}
            <a
              href={`https://wa.me/${SITE.whatsappNumber}`}
              data-cta="whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--gold)] underline underline-offset-4"
            >
              {SITE.phoneDisplay}
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl text-foreground">Consultas y reservas</h2>
          <p className="mt-4">
            La información que envías al consultar por WhatsApp, teléfono o redes sociales se usa
            para orientar tu caso, responder dudas, coordinar reservas, confirmar disponibilidad y
            entregar indicaciones relacionadas con el servicio solicitado. Si compartes fotografías
            de una zona a evaluar, se usan solo para orientación previa o seguimiento del caso.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl text-foreground">Fotografías autorizadas</h2>
          <p className="mt-4">
            Las fotografías de trabajos, resultados o procesos se publican solo cuando existe
            autorización para su uso. Puedes solicitar que una imagen autorizada sea retirada de los
            canales de {SITE.name} escribiendo al WhatsApp de contacto.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl text-foreground">Analítica técnica</h2>
          <p className="mt-4">
            Este sitio mantiene Cloudflare Web Analytics como medición técnica cookieless para
            conocer rendimiento, tráfico general y estabilidad del sitio. Esta medición no usa
            cookies y no se mezcla con Google Analytics.
          </p>
          <p className="mt-4">
            El cliente confirmó que no usará Google Analytics ni Google Ads. Por eso este sitio no
            carga gtag, no carga Google Tag Manager y no envía eventos de marketing a Google.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl text-foreground">Enlaces externos</h2>
          <p className="mt-4">
            Al abrir WhatsApp, Instagram, Google Business o Google Reviews abandonas este sitio y
            aplican las políticas de privacidad de esas plataformas. Google Business se usa como
            enlace externo para consultar reseñas; no equivale a Google Analytics.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl text-foreground">Solicitudes</h2>
          <p className="mt-4">
            Puedes solicitar revisión, corrección o eliminación de información entregada en una
            consulta escribiendo por WhatsApp. Las solicitudes recibidas por redes sociales se
            responden en el mismo canal o se derivan a WhatsApp cuando sea necesario coordinar
            atención.
          </p>
        </section>
      </div>
    </ContentPage>
  );
}
