import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { services } from "@/data/services";
import { Nav } from "@/components/site/Nav";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/wa";
import { ArrowLeft, MessageCircle, Clock, Stethoscope, Tag, MapPin } from "lucide-react";

export const Route = createFileRoute("/servicios/$slug")({
  head: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) return { meta: [{ title: "Servicio no encontrado — Cotepiercing" }] };

    const title = `${service.name} en Arica — Cotepiercing | Piercing profesional`;
    const description = `${service.description} Zona: ${service.zone}. Cicatrización: ${service.healing}. Precio desde ${service.price} CLP. Reserva por WhatsApp en Cotepiercing, Recina Tattoo, Arica, Chile.`;

    return {
      meta: [
        { title },
        { name: "description", content: description.slice(0, 160) },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: title },
        { property: "og:description", content: description.slice(0, 160) },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `https://cotepiercing.cl/servicios/${params.slug}` },
        { property: "og:image", content: "https://cotepiercing.cl/cotepiercing-piercing-profesional-arica-chile-og.png" },
      ],
      links: [
        { rel: "canonical", href: `https://cotepiercing.cl/servicios/${params.slug}` },
      ],
    };
  },
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  component: ServicePage,
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
      <p className="font-serif text-3xl text-foreground">Servicio no encontrado</p>
      <Link to="/" className="text-[var(--gold)] text-sm uppercase tracking-widest hover:opacity-70">
        ← Volver al inicio
      </Link>
    </div>
  ),
});

function ServicePage() {
  const { service } = Route.useLoaderData();
  const related = services
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .slice(0, 3);

  // Schema.org Service JSON-LD
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "HealthAndBeautyBusiness",
      name: "Cotepiercing",
      url: "https://cotepiercing.cl",
      address: {
        "@type": "PostalAddress",
        streetAddress: "San Marcos 393",
        addressLocality: "Arica",
        addressCountry: "CL",
      },
    },
    areaServed: {
      "@type": "City",
      name: "Arica",
    },
    offers: {
      "@type": "Offer",
      price: service.price.replace(/[^0-9]/g, "") || undefined,
      priceCurrency: "CLP",
      availability: "https://schema.org/InStock",
    },
    url: `https://cotepiercing.cl/servicios/${service.slug}`,
    image: service.image,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* BREADCRUMB + BACK */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-28 pb-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
          <Link to="/" className="hover:text-[var(--gold)] transition-colors">Inicio</Link>
          <span>/</span>
          <Link to="/" hash="servicios" className="hover:text-[var(--gold)] transition-colors">Servicios</Link>
          <span>/</span>
          <span className="text-foreground">{service.name}</span>
        </nav>
      </div>

      {/* HERO de servicio */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-8 grid lg:grid-cols-12 gap-12 items-start">
        {/* Imagen */}
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-xl aspect-[4/5] bg-[var(--stone)]">
            <img
              src={service.image}
              alt={service.imageAlt}
              loading="eager"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-7 pt-4">
          {/* Categoría */}
          <div className="eyebrow mb-4">{service.category}</div>

          {/* Nombre H1 */}
          <h1 className="font-serif text-4xl lg:text-6xl leading-tight">
            {service.name}
          </h1>
          <p className="mt-1 font-serif text-xl lg:text-2xl text-muted-foreground">
            en Arica, Chile
          </p>

          <div className="gold-rule mt-8" />

          {/* Descripción */}
          <p className="mt-8 text-base lg:text-lg text-muted-foreground leading-relaxed">
            {service.description}
          </p>

          {/* Datos clave */}
          <dl className="mt-10 grid sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Tag className="w-4 h-4 text-[var(--gold)] mt-0.5 shrink-0" strokeWidth={1.4} />
              <div>
                <dt className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Precio</dt>
                <dd className="mt-1 font-serif text-xl">{service.price}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[var(--gold)] mt-0.5 shrink-0" strokeWidth={1.4} />
              <div>
                <dt className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Cicatrización</dt>
                <dd className="mt-1 text-[15px]">{service.healing}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Stethoscope className="w-4 h-4 text-[var(--gold)] mt-0.5 shrink-0" strokeWidth={1.4} />
              <div>
                <dt className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Evaluación</dt>
                <dd className="mt-1 text-[15px]">{service.evaluation}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[var(--gold)] mt-0.5 shrink-0" strokeWidth={1.4} />
              <div>
                <dt className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Zona</dt>
                <dd className="mt-1 text-[15px]">{service.zone}</dd>
              </div>
            </div>
          </dl>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild variant="gold" size="lg">
              <a
                href={waLink(`Hola María José, quiero reservar ${service.name} en Cotepiercing.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4" />
                Reservar por WhatsApp
              </a>
            </Button>
            <Button asChild variant="goldOutline" size="lg">
              <Link to="/" hash="servicios">
                <ArrowLeft className="w-4 h-4" />
                Ver todos los servicios
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* INFO ADICIONAL */}
      <section className="bg-[var(--stone)]/40 py-16 mt-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-3 gap-10">
          <div>
            <div className="eyebrow mb-3">Asepsia clínica</div>
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              Cada procedimiento se realiza con materiales estériles, guantes quirúrgicos y protocolo de higiene estricto para garantizar tu seguridad.
            </p>
          </div>
          <div>
            <div className="eyebrow mb-3">Joyería inicial incluida</div>
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              La joyería inicial está seleccionada según la zona y anatomía. Se elige el material adecuado para un proceso de cicatrización óptimo.
            </p>
          </div>
          <div>
            <div className="eyebrow mb-3">Ubicación</div>
            <address className="not-italic text-[15px] text-muted-foreground leading-relaxed">
              Cotepiercing atiende en<br />
              <strong className="text-foreground">Recina Tattoo</strong><br />
              San Marcos 393, Arica, Chile
            </address>
          </div>
        </div>
      </section>

      {/* SERVICIOS RELACIONADOS */}
      {related.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="eyebrow mb-6">Servicios relacionados</div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  to="/servicios/$slug"
                  params={{ slug: s.slug }}
                  className="group block overflow-hidden rounded-xl border border-border bg-card hover:shadow-md transition-shadow"
                >
                  <div className="relative overflow-hidden aspect-[4/3] bg-[var(--stone)]">
                    <img
                      src={s.image}
                      alt={s.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-5">
                    <p className="font-serif text-lg">{s.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{s.price}</p>
                    <p className="mt-3 text-[11px] tracking-[0.2em] uppercase text-[var(--gold)] group-hover:opacity-70 transition-opacity">
                      Ver detalle →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER MÍNIMO */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-serif text-base tracking-[0.2em] uppercase">Cotepiercing</div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} María José — Arica, Chile
          </p>
        </div>
      </footer>
    </div>
  );
}
