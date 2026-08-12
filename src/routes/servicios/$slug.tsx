import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { categoryNavigation, services, type Service } from "@/data/services";
import { Nav } from "@/components/site/Nav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/wa";
import { SITE_URL } from "@/lib/config";
import { SITE } from "@/lib/site";
import { SiteBreadcrumbs } from "@/components/site/SiteBreadcrumbs";
import { ArrowLeft, MessageCircle, Clock, Stethoscope, Tag, MapPin } from "lucide-react";

const numericPrice = (price: string) =>
  price.match(/\$\d{1,3}(?:\.\d{3})*/)?.[0].replace(/\D/g, "");

export const Route = createFileRoute("/servicios/$slug")({
  head: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) return { meta: [{ title: "Servicio no encontrado — Cotepiercing" }] };

    const title = `${service.name} en Arica — Cotepiercing | Piercing profesional`;
    const description = `${service.description} Zona: ${service.zone}. Cicatrización: ${service.healing}. Precio desde ${service.price} CLP. Reserva por WhatsApp en ${SITE.name}, Arica.`;

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
  const category = categoryNavigation[service.category];
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
          name: SITE.name,
          url: `${SITE_URL}/`,
          telephone: SITE.phoneE164,
          sameAs: [SITE.googleBusinessUrl, SITE.instagramUrl],
          areaServed: {
            "@type": "City",
            name: SITE.locality,
          },
        },
        areaServed: {
          "@type": "City",
          name: SITE.locality,
        },
        offers: {
          "@type": "Offer",
          price: numericPrice(service.price),
          priceCurrency: "CLP",
          availability: "https://schema.org/InStock",
        },
        url: `${SITE_URL}/servicios/${service.slug}`,
        image: service.image.startsWith("http") ? service.image : `${SITE_URL}${service.image}`,
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
      <div className="mx-auto max-w-7xl px-5 pb-4 pt-24 sm:px-6 lg:px-10 lg:pt-28">
        <Link
          to="/servicios"
          className="mb-5 inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-[var(--gold)] sm:mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a servicios
        </Link>
        <SiteBreadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Servicios", href: "/servicios" },
            { label: category.label, href: category.href },
            { label: service.name, href: `/servicios/${service.slug}` },
          ]}
        />
      </div>

      {/* HERO de servicio */}
      <section className="mx-auto grid max-w-7xl items-start gap-7 px-5 py-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:py-8">
        {/* Imagen */}
        <div className="lg:col-span-5">
          <div className="relative h-[300px] w-full overflow-hidden rounded-lg bg-[var(--stone)] shadow-sm sm:h-[420px] lg:h-auto lg:aspect-[4/5]">
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
        <div className="pt-1 lg:col-span-7 lg:pt-4">
          {/* Categoría */}
          <div className="eyebrow mb-3 lg:mb-4">{service.category}</div>

          {/* Nombre H1 */}
          <h1 className="font-serif text-3xl leading-tight sm:text-4xl lg:text-6xl">
            {service.name}
          </h1>
          <p className="mt-1 font-serif text-lg text-muted-foreground sm:text-xl lg:text-2xl">
            en Arica, Chile
          </p>

          <div className="mt-4 font-serif text-2xl text-[var(--gold)] lg:mt-6 lg:text-3xl">
            {service.price}
          </div>

          <div className="gold-rule mt-5 lg:mt-8" />

          {/* Descripción */}
          <p className="mt-5 text-base leading-relaxed text-foreground/80 lg:mt-8 lg:text-lg">
            {service.description}
          </p>

          {/* Datos clave */}
          <div className="mt-7 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 sm:gap-4 lg:mt-10">
            <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-[var(--stone)]/30 p-4">
              <div className="flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-[var(--gold)]" strokeWidth={1.5} />
                <span className="text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                  Joyería
                </span>
              </div>
              <span className="text-[13px] sm:text-[14px] font-medium">Incluida</span>
            </div>

            <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-[var(--stone)]/30 p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[var(--gold)]" strokeWidth={1.5} />
                <span className="text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                  Cicatrización
                </span>
              </div>
              <span className="text-[13px] sm:text-[14px] font-medium">{service.healing}</span>
            </div>

            <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-[var(--stone)]/30 p-4">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-3.5 h-3.5 text-[var(--gold)]" strokeWidth={1.5} />
                <span className="text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                  Evaluación
                </span>
              </div>
              <span className="text-[13px] sm:text-[14px] font-medium">{service.evaluation}</span>
            </div>

            <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-[var(--stone)]/30 p-4">
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
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 lg:mt-12">
            <Button
              asChild
              variant="gold"
              size="lg"
              className="h-auto min-h-12 w-full whitespace-normal px-4 py-3 text-center leading-relaxed sm:w-auto sm:min-w-64"
            >
              <a
                href={waLink(
                  `Hola María José, quiero reservar un piercing ${service.name}. ¿Me puedes indicar disponibilidad?`,
                )}
                data-cta="reservation"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                <span className="sm:hidden">Reservar por WhatsApp</span>
                <span className="hidden sm:inline">Reservar {service.name} por WhatsApp</span>
              </a>
            </Button>
            <Button
              asChild
              variant="goldOutline"
              size="lg"
              className="h-auto min-h-12 w-full whitespace-normal px-4 py-3 text-center leading-relaxed sm:w-auto"
            >
              <Link to="/servicios">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Ver todos los servicios
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SERVICIOS RELACIONADOS */}
      {related.length > 0 && (
        <section className="border-t border-border/70 py-10 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
            <div className="eyebrow mb-6">Servicios relacionados</div>
            <div className="max-h-[25rem] space-y-3 overflow-y-auto pr-1 sm:max-h-none sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 sm:overflow-visible sm:pr-0 lg:grid-cols-3">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  to="/servicios/$slug"
                  params={{ slug: s.slug }}
                  className="group grid grid-cols-[7rem_minmax(0,1fr)] overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md sm:block sm:rounded-xl"
                >
                  <div className="relative min-h-32 overflow-hidden bg-[var(--stone)] sm:aspect-[4/3]">
                    <img
                      src={s.cardImage}
                      srcSet={s.cardImageSrcSet}
                      sizes="(min-width: 1024px) 31vw, (min-width: 640px) 47vw, 7rem"
                      alt={s.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col justify-center p-4 sm:block sm:p-5">
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

      <section className="border-t border-border bg-[var(--stone)]/25 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <div className="eyebrow mb-6">Antes y después de tu servicio</div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                href: "/evaluacion",
                title: "Evaluación profesional",
                text: "Revisa irritación, cambios, retiros o dudas sobre la viabilidad.",
              },
              {
                href: "/precios",
                title: "Precios de piercing",
                text: "Compara valores y servicios con joyería inicial incluida.",
              },
              {
                href: "/servicios",
                title: "Servicios en Arica",
                text: "Explora las zonas disponibles y elige el servicio que quieres reservar.",
              },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border border-border bg-background p-6 transition-colors hover:border-[var(--gold)]"
              >
                <h2 className="font-serif text-xl">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                <span className="mt-5 inline-block text-xs uppercase tracking-widest text-[var(--gold)]">
                  {item.title} →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
