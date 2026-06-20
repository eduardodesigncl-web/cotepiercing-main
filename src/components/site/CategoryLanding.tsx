import { ContentPage } from "./ContentPage";
import { ServiceGrid } from "./ServiceGrid";
import { services, type Category } from "@/data/services";
import { waLink } from "@/lib/wa";

export function CategoryLanding({
  category,
  eyebrow,
  title,
  intro,
  guidance,
}: {
  category: Category;
  eyebrow: string;
  title: string;
  intro: string;
  guidance: string;
}) {
  const items = services.filter((service) => service.category === category);
  return (
    <ContentPage eyebrow={eyebrow} title={title} intro={intro}>
      <div className="mb-12 border-l-2 border-[var(--gold)] pl-6 text-sm leading-relaxed text-muted-foreground">
        {guidance}
      </div>
      <ServiceGrid items={items} />
      <div className="mt-14 border border-border bg-[var(--stone)]/35 p-7 sm:p-9">
        <h2 className="font-serif text-3xl">¿No sabes cuál elegir?</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Envía una fotografía de la zona y cuéntanos qué resultado buscas. La viabilidad y
          ubicación final se confirman según tu anatomía.
        </p>
        <a
          href={waLink(`Hola María José, quiero orientación sobre piercings de ${category}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex bg-[var(--gold)] px-7 py-3 text-xs uppercase tracking-widest text-white"
        >
          Consultar por WhatsApp
        </a>
      </div>
    </ContentPage>
  );
}
