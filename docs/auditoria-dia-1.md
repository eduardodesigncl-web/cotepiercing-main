# Auditoría Día 1 — arquitectura técnica

Fecha: 22 de junio de 2026

Rama: `cote`

Respaldo: `backup-pre-arquitectura-2026-06-22`

Commit respaldado: `df4a99b8c0d055c4c5bfe099c521513082c8c0f0`

Origen temporal: `https://cotepiercing-main.eduardo-design-cl.workers.dev`

## Estado inicial

- GitHub local, `origin/cote` y el origen temporal correspondían al contenido de `df4a99b`.
- El sitemap y los canonicals de páginas institucionales utilizaban barra final.
- TanStack redirigía esas variantes temporalmente con `307` hacia URLs sin barra.
- Existían dos copias físicas del archivo de verificación de Google; el servidor de assets local
  interceptaba una de ellas y producía una redirección incorrecta.
- No existía una huella pública que permitiera comparar inequívocamente GitHub y Cloudflare.
- El acceso de Wrangler a la API de Cloudflare no está disponible en este equipo porque falta
  `CLOUDFLARE_API_TOKEN`; se incorporó el binding oficial `version_metadata` para consultar el ID
  de versión desde la propia aplicación sin exponer credenciales.

## Convención URL cerrada

- La portada conserva `https://cotepiercing.cl/`.
- Todas las demás páginas usan URL sin barra final.
- Las variantes HTML con barra final responden un único `301 Moved Permanently`.
- Las query strings se conservan sin cambios.
- No se normalizan como páginas HTML las rutas `/api/*`, archivos con extensión ni la raíz.
- Sitemap, canonical, navegación, footer, breadcrumbs y enlaces contextuales usan la URL final.

Ejemplo:

```text
/servicios/?utm_source=auditoria&x=1
301 Location: /servicios?utm_source=auditoria&x=1
/servicios
200
```

## Control de las 42 URLs

La tabla corresponde a la auditoría local de la compilación de producción. En todas las filas se
verificaron además title, meta description, canonical coincidente, un único H1 y ausencia de
`noindex`.

|   # | URL canónica                                                          | Canónica | Variante con `/` | SEO base |
| --: | --------------------------------------------------------------------- | -------: | ---------------: | -------: |
|   1 | https://cotepiercing.cl/                                              |      200 |        No aplica |       OK |
|   2 | https://cotepiercing.cl/piercing-arica                                |      200 |        301 → 200 |       OK |
|   3 | https://cotepiercing.cl/servicios                                     |      200 |        301 → 200 |       OK |
|   4 | https://cotepiercing.cl/servicios/oreja                               |      200 |        301 → 200 |       OK |
|   5 | https://cotepiercing.cl/servicios/nariz-rostro                        |      200 |        301 → 200 |       OK |
|   6 | https://cotepiercing.cl/servicios/labio-boca                          |      200 |        301 → 200 |       OK |
|   7 | https://cotepiercing.cl/servicios/cuerpo                              |      200 |        301 → 200 |       OK |
|   8 | https://cotepiercing.cl/servicios/privado                             |      200 |        301 → 200 |       OK |
|   9 | https://cotepiercing.cl/estudio                                       |      200 |        301 → 200 |       OK |
|  10 | https://cotepiercing.cl/precios                                       |      200 |        301 → 200 |       OK |
|  11 | https://cotepiercing.cl/evaluacion                                    |      200 |        301 → 200 |       OK |
|  12 | https://cotepiercing.cl/sobre-cote                                    |      200 |        301 → 200 |       OK |
|  13 | https://cotepiercing.cl/joyeria                                       |      200 |        301 → 200 |       OK |
|  14 | https://cotepiercing.cl/privacidad                                    |      200 |        301 → 200 |       OK |
|  15 | https://cotepiercing.cl/servicios/piercing-lobulo-oreja-arica         |      200 |        301 → 200 |       OK |
|  16 | https://cotepiercing.cl/servicios/piercing-segundo-lobulo-oreja-arica |      200 |        301 → 200 |       OK |
|  17 | https://cotepiercing.cl/servicios/piercing-helix-oreja-arica          |      200 |        301 → 200 |       OK |
|  18 | https://cotepiercing.cl/servicios/piercing-forward-helix-oreja-arica  |      200 |        301 → 200 |       OK |
|  19 | https://cotepiercing.cl/servicios/piercing-tragus-oreja-arica         |      200 |        301 → 200 |       OK |
|  20 | https://cotepiercing.cl/servicios/piercing-conch-oreja-arica          |      200 |        301 → 200 |       OK |
|  21 | https://cotepiercing.cl/servicios/piercing-daith-oreja-arica          |      200 |        301 → 200 |       OK |
|  22 | https://cotepiercing.cl/servicios/piercing-rook-oreja-arica           |      200 |        301 → 200 |       OK |
|  23 | https://cotepiercing.cl/servicios/piercing-industrial-oreja-arica     |      200 |        301 → 200 |       OK |
|  24 | https://cotepiercing.cl/servicios/piercing-nostril-nariz-arica        |      200 |        301 → 200 |       OK |
|  25 | https://cotepiercing.cl/servicios/piercing-septum-nariz-arica         |      200 |        301 → 200 |       OK |
|  26 | https://cotepiercing.cl/servicios/piercing-ceja-eyebrow-arica         |      200 |        301 → 200 |       OK |
|  27 | https://cotepiercing.cl/servicios/piercing-labret-labio-arica         |      200 |        301 → 200 |       OK |
|  28 | https://cotepiercing.cl/servicios/piercing-medusa-labio-arica         |      200 |        301 → 200 |       OK |
|  29 | https://cotepiercing.cl/servicios/piercing-madonna-monroe-labio-arica |      200 |        301 → 200 |       OK |
|  30 | https://cotepiercing.cl/servicios/piercing-smiley-frenillo-arica      |      200 |        301 → 200 |       OK |
|  31 | https://cotepiercing.cl/servicios/piercing-ombligo-abdomen-arica      |      200 |        301 → 200 |       OK |
|  32 | https://cotepiercing.cl/servicios/piercing-pezon-intimo-arica         |      200 |        301 → 200 |       OK |
|  33 | https://cotepiercing.cl/servicios/piercing-microdermal-cuerpo-arica   |      200 |        301 → 200 |       OK |
|  34 | https://cotepiercing.cl/servicios/piercing-surface-cuerpo-arica       |      200 |        301 → 200 |       OK |
|  35 | https://cotepiercing.cl/servicios/piercing-intimo-femenino-arica      |      200 |        301 → 200 |       OK |
|  36 | https://cotepiercing.cl/servicios/piercing-intimo-masculino-arica     |      200 |        301 → 200 |       OK |
|  37 | https://cotepiercing.cl/servicios/evaluacion-piercing-irritado-arica  |      200 |        301 → 200 |       OK |
|  38 | https://cotepiercing.cl/servicios/cambio-joyeria-piercing-arica       |      200 |        301 → 200 |       OK |
|  39 | https://cotepiercing.cl/servicios/retiro-joyeria-piercing-arica       |      200 |        301 → 200 |       OK |
|  40 | https://cotepiercing.cl/servicios/evaluacion-granuloma-piercing-arica |      200 |        301 → 200 |       OK |
|  41 | https://cotepiercing.cl/servicios/evaluacion-queloide-piercing-arica  |      200 |        301 → 200 |       OK |
|  42 | https://cotepiercing.cl/servicios/reconstruccion-lobulos-arica        |      200 |        301 → 200 |       OK |

## Sitemap, robots y errores

- `sitemap.xml`: 42 URLs únicas, canónicas, sin barra final salvo la raíz y con `lastmod`
  `2026-06-22`.
- `robots.txt`: permite el rastreo y declara `https://cotepiercing.cl/sitemap.xml`.
- Página inexistente: devuelve HTTP `404` real y contenido de página no encontrada.
- Error `500`: la respuesta de contingencia es HTML genérico; no incluye stack trace, objeto de error
  ni detalles internos.
- Google Search Console: `/google6dcbd8f7e36626a2.html` responde `200` desde el Worker.
- Google Reviews: `/api/google-reviews` responde `200`, actualmente en fallback hasta configurar
  credenciales.

## Seguridad y caché

Verificado:

- `Strict-Transport-Security`
- `Content-Security-Policy`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`
- `X-Frame-Options: SAMEORIGIN`
- HTML: `Cache-Control: public, max-age=0, must-revalidate`
- Assets versionados: caché inmutable de un año
- Sitemap, robots y `llms.txt`: caché de una hora con revalidación
- Reviews: caché CDN de 24 horas y `stale-while-revalidate`
- `/version.json`: `Cache-Control: no-store`
- Búsqueda estática de secretos: sin credenciales detectadas en archivos versionados

## Verificación GitHub–Cloudflare

Cada respuesta del Worker expone:

```text
X-App-Commit: <SHA completo>
```

`/version.json` expone:

```json
{
  "commit": "<SHA completo>",
  "buildTime": "<fecha ISO-8601>",
  "cloudflareVersion": {
    "id": "<ID de versión de Cloudflare>",
    "tag": "<tag de Cloudflare>",
    "timestamp": "<fecha de creación>"
  }
}
```

La auditoría `npm run audit:day1 -- <URL>` compara esa huella con el commit esperado y falla si no
coinciden. En producción también exige que el ID del binding de Cloudflare coincida con el header
`X-Cloudflare-Worker-Version`. Wrangler podrá usarse como comprobación adicional cuando se
proporcione un `CLOUDFLARE_API_TOKEN`.

### Despliegue técnico verificado

- Commit GitHub: `caa5963d47ee2f302b87cbbfe7a0f1ed44a1a1ea`
- ID de versión Cloudflare: `654a26cb-d2f9-4c65-b198-8aa2adac0fd6`
- Fecha de build: `2026-06-22T16:07:52.744Z`
- Resultado de `audit:day1` remoto: 42/42 URLs conformes, sin fallos.
- Este registro se añadió en un commit exclusivamente documental posterior al despliegue técnico.

## Riesgos y pendientes fuera del Día 1

- Falta comprar y conectar `cotepiercing.cl`.
- Falta acceso administrativo a Cloudflare para consultar versiones y gestionar secretos.
- Falta configurar Google Places para mostrar reseñas reales.
- Search Console debe verificarse sobre el dominio final y recibir el sitemap.
- Metadatos GEO avanzados, malla interna, Analytics, rendimiento Lighthouse y off-page pertenecen a
  los siguientes días.

## Comandos de validación

```bash
npm run lint
npm run build
npm run typecheck
npx wrangler deploy --dry-run
npm run audit:day1 -- http://127.0.0.1:4173
git diff --check
```
