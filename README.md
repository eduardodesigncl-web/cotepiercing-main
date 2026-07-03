# Cotepiercing

## Reseñas de Google

La sección de reseñas consume `GET /api/google-reviews`. Esa ruta se ejecuta en el Worker y usa Google Places API, por lo que la clave nunca queda expuesta en el navegador.

Variables necesarias:

```bash
GOOGLE_PLACES_API_KEY=...
GOOGLE_PLACE_ID=...
```

`GOOGLE_PLACE_ID` es opcional, pero recomendado para que la integración siempre use la ficha correcta de Cotepiercing en San Marcos 393, 1000576 Arica. Si no se configura, el Worker intenta resolver el lugar con Places Text Search usando el nombre del negocio y la dirección.

Para Cloudflare Workers:

```bash
wrangler secret put GOOGLE_PLACES_API_KEY
wrangler secret put GOOGLE_PLACE_ID
```

Para desarrollo local, copia `.dev.vars.example` como `.dev.vars` y completa los valores.
