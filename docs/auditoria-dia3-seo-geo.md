# Auditoría técnica — Día 3 (Miércoles 24): SEO, GEO, contenido y sitemap dinámico

**Fecha de auditoría:** 2026-06-24
**Rama:** `cote`
**Último commit:** `1201cae` — "Día 2: gate de CI y malla interna (#2)"
**Alcance:** verificación del bloque del Miércoles 24 contra los criterios de aceptación del plan de producción (Días 2–6).

---

## Veredicto

El trabajo del Día 3 está **implementado y verificable en build**. Las nueve tareas del plan están cubiertas. Las verificaciones automáticas reproducibles (typecheck, build, sitemap) pasan en verde.

**Hay un bloqueante operativo, no técnico:** todo el cambio del Miércoles 24 está **sin commitear en `cote`** y nunca pasó por el gate de PR/CI que se definió como obligatorio el Día 2. La calidad del código es buena; el problema es de proceso de entrega.

---

## Verificaciones ejecutadas en esta auditoría

| Check | Resultado | Notas |
| --- | --- | --- |
| `npm run typecheck` (`tsc --noEmit`) | ✅ Verde | Sin errores. |
| `npm run build` | ✅ Verde | `✓ built in 9.57s`. Sitemap se regenera dentro del build. |
| `npm run sitemap` | ✅ Verde | `Generated public/sitemap.xml with 42 URLs`. |
| `npm run lint` | ⚠️ No reejecutado | El reporte previo lo deja verde con 6 warnings preexistentes (Fast Refresh en `src/components/ui/*`). Plausible. |
| `npm run audit:day1` | ⚠️ No reejecutado | Requiere levantar el preview. El reporte previo lo deja verde (42 URLs, 200, canonical/title/description/H1, ≥2 inbound). El auditor es coherente con la fuente dinámica (ver abajo). |

---

## Cobertura de las 9 tareas del Día 3

### 1. Metadatos únicos por página — ✅
Centralizados en [src/lib/seo.ts](../src/lib/seo.ts). `corePageSeo` cubre las 14 rutas core (home, `/piercing-arica`, `/servicios`, las 5 categorías, `/estudio`, `/precios`, `/evaluacion`, `/sobre-cote`, `/joyeria`, `/privacidad`). `serviceSeo()` genera title/description por servicio. `seoHead()` emite `title`, `meta description`, `canonical` y OG. Cada ruta tiene un único `<h1>` (verificado en home `index.tsx:225` y ficha `$slug.tsx:100`; el auditor valida `h1Count === 1`).

### 2. Open Graph específico por página — ✅ (con matiz)
`seoHead()` produce `og:title`/`og:description` con override por página (`ogTitle`/`ogDescription`), `og:url` único, `og:type` (`article` en fichas de servicio) y tarjeta de Twitter. **Matiz:** la imagen OG es única y compartida (`OG_IMAGE_PATH`) para todas las rutas; no hay imagen OG por página. Es aceptable para esta fase, pero queda como mejora.

### 3. ItemList JSON-LD en hubs y categorías — ✅
`itemListSchema()` y `categoryItemList()` en [seo.ts](../src/lib/seo.ts). El hub `/servicios` lo emite ([servicios/index.tsx:44](../src/routes/servicios/index.tsx)) y cada categoría vía [CategoryLanding.tsx:33](../src/components/site/CategoryLanding.tsx).

### 4. Consolidación de entidades con `@id` — ✅
[src/lib/schema.ts](../src/lib/schema.ts) define `LOCAL_BUSINESS_ID`, `PERSON_ID` y `serviceId()`. `HealthAndBeautyBusiness` unifica el negocio (ya no hay `LocalBusiness` duplicado), `Person` (María José) referencia al negocio por `@id`, y los `Service` referencian `provider`/`itemOffered` por `@id`. La home arma un `@graph` consolidado en [SchemaScript.tsx](../src/components/site/SchemaScript.tsx).

### 5. Solo información comprobable (E-E-A-T) — ✅
No se detectan certificaciones ni formación inventada. `Person` declara solo `jobTitle: "Piercer profesional"`. Las descripciones de servicio son genéricas y verificables (técnica, asepsia, joyería incluida). `paymentAccepted: "Efectivo, transferencia bancaria"` y horarios coinciden con los datos del negocio — **confirmar con la clienta antes de publicar el dominio** (pendiente del plan).

### 6. Contenido centralizado + manual — ✅
Contenido editable separado en [src/data/service-content.ts](../src/data/service-content.ts) (340 líneas, tipado). [src/data/services.ts](../src/data/services.ts) quedó solo como capa de conexión de imágenes por `slug`. Manual escrito en [docs/manual-contenido.md](manual-contenido.md).

### 7. Optimización de imágenes LCP — ✅
Héroe y oreja de portada con `<picture>` + `<source>` AVIF/WebP, `srcSet`, `sizes`, `width`/`height` explícitos y `preload`/`fetchPriority="high"` en el héroe ([index.tsx:116, 174–211](../src/routes/index.tsx)). Variantes generadas para hero, ear, about, studio y cat-*. (Validación final del LCP depende de la corrida Lighthouse del Día 5.)

### 8. Sitemap dinámico — ✅
[scripts/generate-sitemap.mjs](../scripts/generate-sitemap.mjs) genera `sitemap.xml` desde `sitemapPages` (core + servicios). El build lo ejecuta automáticamente. **El auditor lee la misma fuente** ([audit-day1.mjs:45–55](../scripts/audit-day1.mjs)) y falla si el conteo del XML no coincide con la fuente dinámica — se eliminó el número mágico `=== 42`. No hay drift posible.

### 9. noindex condicional por hostname — ✅
[server.ts:276–278](../src/server.ts): si `hostname` termina en `.workers.dev` → `X-Robots-Tag: noindex, follow`. El dominio final no lo recibe. `/privacidad` está en `corePageSeo` con `robots: index, follow` y no entra en ninguna regla de noindex.

---

## Hallazgos y riesgos

### 🔴 Bloqueante — Trabajo sin commitear y sin pasar por el gate
Todo el Día 3 (23 archivos modificados + `seo.ts`, `schema.ts`, `service-content.ts`, `generate-sitemap.mjs`, manual y assets nuevos) está como `M`/`??` en el árbol de `cote`. El Día 2 estableció **branch protection**: feature branch → PR → CI verde → merge. Este cambio nunca entró por ese flujo.
**Acción:** crear `feat/dia3-seo-geo`, commitear, abrir PR y dejar que el Action valide antes de mergear. Si el commit se hace directo en `cote`, se salta el gate que el propio plan exige.

### 🟡 Menor — `meta robots` siempre `index, follow`
[seo.ts:158](../src/lib/seo.ts) emite `<meta name="robots" content="index, follow">` en todas las páginas, incluso en `*.workers.dev`. El header `X-Robots-Tag: noindex` prevalece para los crawlers, así que **no rompe** el noindex temporal, pero la etiqueta HTML y el header dicen lo contrario en el Worker temporal. Opcional: condicionar también la meta, o documentar que el header es la fuente de verdad.

### 🟡 Menor — `SITEMAP_LASTMOD` hardcodeado
[seo.ts:10](../src/lib/seo.ts) fija `lastmod = "2026-06-24"` igual para todas las URLs. Es válido, pero hay que recordar actualizarlo (o derivarlo de git/fecha de build) para que no quede congelado tras futuras ediciones de contenido.

### ⚪ Informativo — Untracked fuera de alcance
`.codex/` y `esbuild-test.js` siguen sin trackear. Confirmado fuera de alcance; conviene añadirlos a `.gitignore` para que no contaminen el `git status` ni un futuro scan del CI.

---

## Estado frente al plan global

- **Día 1:** completado y verificado (base de arquitectura/headers/version.json).
- **Día 2:** gate de CI + malla interna mergeado (`#2`).
- **Día 3:** **implementado, pendiente de entrar por PR/gate.**
- **Días 4–6:** no iniciados (analítica configurable, legal, QA/Lighthouse, certificación). El objetivo Lighthouse ≥90 del Día 5 se apoya directamente en la optimización LCP hecha hoy.

## Recomendación inmediata
1. Mover el cambio a `feat/dia3-seo-geo` y abrir PR (cierra el bloqueante).
2. Confirmar que el Action corre `audit:day1` contra el preview y queda verde en CI (no solo local).
3. Añadir `.codex/` y `esbuild-test.js` a `.gitignore`.
4. Anotar los dos hallazgos menores (meta robots / lastmod) como backlog, no bloquean entrega.
