# Manual de contenido y precios — Cotepiercing

Este sitio deja el contenido editable en archivos de datos tipados. La regla práctica es: cambiar
datos en `src/data` o `src/lib/site.ts`, no textos dentro de componentes, salvo que sea un bloque de
maquetación nuevo.

## Servicios, precios y textos

Archivo principal: `src/data/service-content.ts`.

Cada servicio contiene:

- `name`: nombre visible del servicio.
- `zone`: zona corporal.
- `price`: valor publicado. Usar formato humano, por ejemplo `$30.000` o `Consultar`.
- `healing`: tiempo estimado de cicatrización.
- `evaluation`: `Recomendada`, `Obligatoria` o `—`.
- `category`: una categoría existente.
- `slug`: URL del servicio. Cambiarlo modifica la URL pública.
- `imageAlt`: texto alternativo de la imagen.
- `description`: opcional. Si no existe, se genera una descripción base.

Después de cambiar un precio o texto, ejecutar:

```bash
npm run sitemap
npm run typecheck
npm run build
```

## Imágenes de servicios

Archivo de conexión: `src/data/services.ts`.

Las imágenes se importan y se asignan por `slug` en `serviceImages`. Si se agrega un servicio nuevo,
también hay que agregar su imagen ahí. Si falta una imagen, el sitio usa una imagen de respaldo, pero
para producción conviene dejar cada servicio con imagen propia.

## Datos del negocio

Archivo: `src/lib/site.ts`.

Ahí viven teléfono, WhatsApp, dirección, horarios, URLs externas, coordenadas y datos usados por SEO,
schema y módulos de contacto.

Antes de publicar cambios de negocio, confirmar con la clienta:

- Dirección y lugar de atención.
- Horarios.
- WhatsApp de reservas.
- Medios de pago.
- Links de Google Business e Instagram.

## SEO y sitemap

Archivo SEO: `src/lib/seo.ts`.

Ahí viven títulos, descripciones, canonicals, Open Graph y la lista de páginas indexables. El sitemap
se genera desde esa fuente y desde `service-content.ts` con:

```bash
npm run sitemap
```

El build ya ejecuta ese paso automáticamente.
