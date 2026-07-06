import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { SITE_URL } from "@/lib/site";
import portrait from "@/assets/maria-jose-piercer-profesional-cotepiercing-arica-chile.webp";

export const Route = createFileRoute("/sobre-cote")({
  head: () => ({
    meta: [
      { title: "María José, piercer profesional en Arica | Cotepiercing" },
      {
        name: "description",
        content:
          "Conoce el enfoque de María José en Cotepiercing: evaluación anatómica, marcación precisa, asepsia y orientación honesta.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/sobre-cote` }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <ContentPage
      eyebrow="Sobre Cotepiercing"
      title="María José, piercer profesional en Arica"
      intro="Cotepiercing trabaja desde la evaluación honesta: no todas las perforaciones son adecuadas para todas las anatomías."
    >
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <img
          src={portrait}
          alt="María José, piercer profesional de Cotepiercing en Arica"
          width={900}
          height={1100}
          className="w-full"
        />
        <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
          <p>
            Cada servicio comienza con una conversación sobre el resultado buscado, la anatomía de
            la zona, el tipo de joyería y el proceso de cicatrización.
          </p>
          <p>
            Si una perforación no es viable o presenta un riesgo alto de migración, presión o mala
            cicatrización, se explica antes de realizarla y se propone una alternativa.
          </p>
          <p>
            La atención se realiza con aguja descartable, material estéril, joyería esterilizada en
            autoclave y desinfección del espacio entre clientes.
          </p>
        </div>
      </div>
    </ContentPage>
  );
}
