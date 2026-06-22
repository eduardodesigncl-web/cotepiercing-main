import { Link } from "@tanstack/react-router";
import type { Service } from "@/data/services";

export function ServiceGrid({ items }: { items: Service[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((service) => (
        <Link
          key={service.slug}
          to="/servicios/$slug"
          params={{ slug: service.slug }}
          className="group overflow-hidden border border-border bg-background transition-colors hover:border-[var(--gold)]"
        >
          <div className="aspect-[4/3] overflow-hidden bg-[var(--stone)]">
            <img
              src={service.image}
              alt={service.imageAlt}
              loading="lazy"
              width={800}
              height={600}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
          <div className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl">{service.name}</h2>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {service.zone}
                </p>
              </div>
              <span className="font-serif text-lg text-[var(--gold)]">{service.price}</span>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Cicatrización: {service.healing}</p>
            <p className="mt-4 text-xs uppercase tracking-widest text-[var(--gold)]">
              Conocer precio y cuidados de {service.name} →
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
