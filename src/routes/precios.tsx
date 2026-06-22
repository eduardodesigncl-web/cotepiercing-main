import { createFileRoute, Link } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { categories, services } from "@/data/services";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/precios")({
  head: () => ({
    meta: [
      { title: "Precios de piercing en Arica | Cotepiercing" },
      {
        name: "description",
        content:
          "Consulta precios de piercings, evaluaciones, cambios y retiros de joyería en Cotepiercing Arica. Los servicios de perforación incluyen joyería inicial.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/precios` }],
  }),
  component: PricesPage,
});

function PricesPage() {
  return (
    <ContentPage
      eyebrow="Valores"
      title="Precios de piercing en Arica"
      intro="Los valores publicados son referenciales y los servicios de perforación incluyen joyería inicial. La viabilidad se confirma según anatomía."
    >
      <div className="space-y-12">
        {categories.map((category) => {
          const items = services.filter((service) => service.category === category);
          return (
            <section key={category}>
              <h2 className="font-serif text-3xl">{category}</h2>
              <div className="mt-5 divide-y divide-border border-y border-border">
                {items.map((service) => (
                  <Link
                    key={service.slug}
                    to="/servicios/$slug"
                    params={{ slug: service.slug }}
                    className="flex items-center justify-between gap-5 py-4 text-sm hover:text-[var(--gold)]"
                  >
                    <span>{service.name}</span>
                    <strong className="font-serif text-lg font-normal">{service.price}</strong>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
      <section className="mt-14 border border-border bg-[var(--stone)]/35 p-7">
        <h2 className="font-serif text-3xl">Joyería inicial y cambios</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Los servicios de perforación incluyen joyería inicial. El material, forma y tamaño se
          confirman según la anatomía y el proceso de cicatrización.
        </p>
        <a
          href="/joyeria"
          className="mt-6 inline-block text-xs uppercase tracking-widest text-[var(--gold)]"
        >
          Revisar criterios de joyería para piercing →
        </a>
      </section>
    </ContentPage>
  );
}
