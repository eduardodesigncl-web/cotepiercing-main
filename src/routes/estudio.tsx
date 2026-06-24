import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { SITE } from "@/lib/site";
import { findPageSeo, seoHead } from "@/lib/seo";
import studio from "@/assets/gallery/estudio-piercing-cotepiercing-espacio-de-trabajo.webp";

export const Route = createFileRoute("/estudio")({
  head: () => seoHead(findPageSeo("/estudio")!),
  component: StudioPage,
});

function StudioPage() {
  return (
    <ContentPage
      eyebrow="El estudio"
      title="Estudio de piercing en Arica"
      intro="Un espacio preparado para realizar perforaciones con privacidad, orden y un protocolo de higiene consistente."
    >
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <img
          src={studio}
          alt="Espacio de atención de Cotepiercing en Arica"
          width={900}
          height={1200}
          className="w-full"
        />
        <div>
          <h2 className="font-serif text-3xl">Asepsia y preparación</h2>
          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <li>Aguja estéril, descartable y de un solo uso.</li>
            <li>Joyería esterilizada en autoclave.</li>
            <li>Superficies desinfectadas entre clientes.</li>
            <li>Evaluación anatómica y marcación previa.</li>
          </ul>
          <h2 className="mt-10 font-serif text-3xl">Ubicación y horario</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {SITE.venue}, {SITE.streetAddress}, {SITE.locality}. Atención de lunes a sábado entre
            11:00 y 20:00, con reserva previa.
          </p>
        </div>
      </div>
    </ContentPage>
  );
}
