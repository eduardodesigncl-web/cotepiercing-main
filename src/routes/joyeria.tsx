import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/ContentPage";
import { SITE_URL } from "@/lib/site";
import premium from "@/assets/joyeria/joyeria-piercing-premium-cotepiercing-arica.webp";
import satin from "@/assets/joyeria/joyeria-piercing-satin-lujo-cotepiercing.webp";
import detail from "@/assets/joyeria/joyeria-piercing-detalle-dorado-plata-cotepiercing.webp";

export const Route = createFileRoute("/joyeria")({
  head: () => ({
    meta: [
      { title: "Joyería para piercing en Arica | Cotepiercing" },
      {
        name: "description",
        content:
          "Conoce cómo Cotepiercing selecciona la joyería inicial según anatomía, zona y proceso de cicatrización.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/joyeria/` }],
  }),
  component: JewelryPage,
});

function JewelryPage() {
  return (
    <ContentPage
      eyebrow="Joyería"
      title="Joyería inicial elegida para tu anatomía"
      intro="La joya inicial forma parte del procedimiento. Su forma y tamaño se seleccionan según la zona, el espacio necesario para inflamación y la evolución esperada."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {[premium, satin, detail].map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`Joyería para piercing utilizada por Cotepiercing en Arica ${index + 1}`}
            loading="lazy"
            className="h-full max-h-[520px] w-full object-cover"
          />
        ))}
      </div>
      <p className="mt-10 text-sm leading-relaxed text-muted-foreground">
        Esta sección es informativa y no funciona como tienda en línea. La disponibilidad, material
        y diseño se confirman al coordinar el servicio.
      </p>
    </ContentPage>
  );
}
