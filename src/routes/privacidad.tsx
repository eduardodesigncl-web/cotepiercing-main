import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { SITE, SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [{ title: "Política de privacidad | Cotepiercing" }],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacidad/` }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <ContentPage
      eyebrow="Información legal"
      title="Política de privacidad"
      intro="Esta política explica qué información técnica puede recopilar el sitio y cómo puedes controlar la medición publicitaria."
    >
      <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="font-serif text-3xl text-foreground">Datos de navegación</h2>
          <p className="mt-4">
            Con tu autorización, Google Analytics y Google Ads pueden registrar páginas visitadas,
            dispositivo, fuente de tráfico y clics de contacto. No se solicitan datos de salud ni
            formularios personales dentro de esta web.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl text-foreground">WhatsApp y Google</h2>
          <p className="mt-4">
            Al abrir WhatsApp, Google Maps o Google Reviews abandonas este sitio y aplican las
            políticas de esas plataformas. El contenido que envíes por WhatsApp se usa únicamente
            para orientar y coordinar la atención.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl text-foreground">Tus preferencias</h2>
          <p className="mt-4">
            Puedes rechazar la medición publicitaria desde el aviso inicial. Para cambiar tu
            decisión, elimina el almacenamiento local del sitio desde la configuración de tu
            navegador.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl text-foreground">Contacto</h2>
          <p className="mt-4">
            Para consultas sobre privacidad, contacta a {SITE.name} mediante el teléfono{" "}
            {SITE.phoneDisplay}.
          </p>
        </section>
      </div>
    </ContentPage>
  );
}
