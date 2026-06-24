import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { absoluteUrl, findPageSeo, itemListSchema, seoHead } from "@/lib/seo";

const categories = [
  {
    href: "/servicios/oreja",
    title: "Piercings de oreja",
    text: "Lóbulo, helix, tragus, conch, daith, rook e industrial.",
  },
  {
    href: "/servicios/nariz-rostro",
    title: "Nariz y rostro",
    text: "Nostril, septum y ceja con marcación y evaluación previa.",
  },
  {
    href: "/servicios/labio-boca",
    title: "Labio y boca",
    text: "Labret, medusa, Monroe y smiley con joyería adecuada para la zona.",
  },
  {
    href: "/servicios/cuerpo",
    title: "Piercings de cuerpo",
    text: "Ombligo, microdermal y surface sujetos a viabilidad anatómica.",
  },
  {
    href: "/servicios/privado",
    title: "Servicios privados",
    text: "Atención discreta y evaluación anatómica obligatoria.",
  },
  {
    href: "/evaluacion",
    title: "Evaluaciones",
    text: "Piercings irritados, cambios y retiros de joyería.",
  },
];

export const Route = createFileRoute("/servicios/")({
  head: () => seoHead(findPageSeo("/servicios")!),
  component: ServicesHub,
});

function ServicesHub() {
  const schema = itemListSchema({
    id: `${absoluteUrl("/servicios")}#itemlist`,
    name: "Servicios de piercing en Arica",
    description: findPageSeo("/servicios")!.description,
    items: categories.map((category) => ({
      name: category.title,
      url: absoluteUrl(category.href),
    })),
  });

  return (
    <ContentPage
      eyebrow="Catálogo"
      title="Servicios de piercing en Arica"
      intro="Encuentra cada servicio organizado por zona corporal. Las fichas individuales incluyen precio, tiempo estimado de cicatrización y necesidad de evaluación."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {categories.map((category) => (
          <a
            key={category.href}
            href={category.href}
            className="border border-border p-7 transition-colors hover:border-[var(--gold)]"
          >
            <h2 className="font-serif text-2xl">{category.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{category.text}</p>
            <span className="mt-6 inline-block text-xs uppercase tracking-widest text-[var(--gold)]">
              Ver categoría →
            </span>
          </a>
        ))}
      </div>
    </ContentPage>
  );
}
