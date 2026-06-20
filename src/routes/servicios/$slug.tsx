import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { services, type Service } from "@/data/services";
import { Nav } from "@/components/site/Nav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/wa";
import { SITE_URL } from "@/lib/config";
import { SITE } from "@/lib/site";
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
        { property: "og:url", content: `${SITE_URL}/servicios/${params.slug}` },
        {
          property: "og:image",
          content: `${SITE_URL}/cotepiercing-piercing-profesional-arica-chile-og.png`,
        },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/servicios/${params.slug}` }],
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
      <Link
        to="/"
        className="text-[var(--gold)] text-sm uppercase tracking-widest hover:opacity-70"
      >
        ← Volver al inicio
      </Link>
    </div>
  ),
});

function ServicePage() {
  const { service } = Route.useLoaderData() as { service: Service };
  const related = services
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .slice(0, 3);

  // Schema.org Service & Breadcrumb JSON-LD
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.name,
        description: service.description,
        provider: {
          "@type": "HealthAndBeautyBusiness",
          name: "Cotepiercing",
          url: `${SITE_URL}/`,
          telephone: SITE.phoneE164,
          sameAs: [SITE.googleBusinessUrl, SITE.instagramUrl],
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
        url: `${SITE_URL}/servicios/${service.slug}`,
        image: service.image.startsWith("http") ? service.image : `${SITE_URL}${service.image}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Servicios",
            item: `${SITE_URL}/#servicios`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.name,
            item: `${SITE_URL}/servicios/${service.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* BREADCRUMB + BACK */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-28 pb-4">
        <Link
          to="/"
          hash="servicios"
          className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-[var(--gold)] mb-6 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a servicios
        </Link>
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-muted-foreground"
        >
          <Link to="/" className="hover:text-[var(--gold)] transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <Link to="/" hash="servicios" className="hover:text-[var(--gold)] transition-colors">
            Servicios
          </Link>
          <span>/</span>
          <span className="text-foreground">{service.name}</span>
        </nav>
      </div>

      {/* HERO de servicio */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-4 lg:py-8 grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Imagen */}
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-xl h-[300px] sm:h-[400px] lg:h-auto lg:aspect-[4/5] bg-[var(--stone)] w-full">
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
        <div className="lg:col-span-7 pt-2 lg:pt-4">
          {/* Categoría */}
          <div className="eyebrow mb-3 lg:mb-4">{service.category}</div>

          {/* Nombre H1 */}
          <h1 className="font-serif text-4xl lg:text-6xl leading-tight">{service.name}</h1>
          <p className="mt-1 font-serif text-xl lg:text-2xl text-muted-foreground">
            en Arica, Chile
          </p>

          <div className="mt-4 lg:mt-6 font-serif text-2xl lg:text-3xl text-[var(--gold)]">
            {service.price}
          </div>

          <div className="gold-rule mt-6 lg:mt-8" />

          {/* Descripción */}
          <p className="mt-6 lg:mt-8 text-[15px] sm:text-base lg:text-lg text-foreground/80 leading-relaxed">
            {service.description}
          </p>

          {/* Datos clave */}
          <div className="mt-8 lg:mt-10 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="flex flex-col gap-1.5 p-3.5 sm:p-4 rounded-lg bg-[var(--stone)]/30 border border-border">
              <div className="flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-[var(--gold)]" strokeWidth={1.5} />
                <span className="text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                  Joyería
                </span>
              </div>
              <span className="text-[13px] sm:text-[14px] font-medium">Incluida</span>
            </div>

            <div className="flex flex-col gap-1.5 p-3.5 sm:p-4 rounded-lg bg-[var(--stone)]/30 border border-border">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[var(--gold)]" strokeWidth={1.5} />
                <span className="text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                  Cicatrización
                </span>
              </div>
              <span className="text-[13px] sm:text-[14px] font-medium">{service.healing}</span>
            </div>

            <div className="flex flex-col gap-1.5 p-3.5 sm:p-4 rounded-lg bg-[var(--stone)]/30 border border-border">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-3.5 h-3.5 text-[var(--gold)]" strokeWidth={1.5} />
                <span className="text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                  Evaluación
                </span>
              </div>
              <span className="text-[13px] sm:text-[14px] font-medium">{service.evaluation}</span>
            </div>

            <div className="flex flex-col gap-1.5 p-3.5 sm:p-4 rounded-lg bg-[var(--stone)]/30 border border-border">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[var(--gold)]" strokeWidth={1.5} />
                <span className="text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                  Zona
                </span>
              </div>
              <span className="text-[13px] sm:text-[14px] font-medium">{service.zone}</span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 lg:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button asChild variant="gold" size="lg" className="w-full sm:w-auto h-12 sm:h-14">
              <a
                href={waLink(
                  `Hola María José, quiero reservar un piercing ${service.name}. ¿Me puedes indicar disponibilidad?`,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Reservar {service.name} por WhatsApp
              </a>
            </Button>
            <Button
              asChild
              variant="goldOutline"
              size="lg"
              className="w-full sm:w-auto h-12 sm:h-14"
            >
              <Link to="/" hash="servicios">
                <ArrowLeft className="w-4 h-4 mr-2" />
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
              Cada procedimiento se realiza con materiales estériles, guantes quirúrgicos y
              protocolo de higiene estricto para garantizar tu seguridad.
            </p>
          </div>
          <div>
            <div className="eyebrow mb-3">Joyería inicial incluida</div>
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              La joyería inicial está seleccionada según la zona y anatomía. Se elige el material
              adecuado para un proceso de cicatrización óptimo.
            </p>
          </div>
          <div>
            <div className="eyebrow mb-3">Ubicación</div>
            <address className="not-italic text-[15px] text-muted-foreground leading-relaxed">
              Cotepiercing atiende en
              <br />
              <strong className="text-foreground">Recina Tattoo</strong>
              <br />
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

      <SiteFooter />
    </div>
  );
}
