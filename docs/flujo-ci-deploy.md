# Flujo de CI y despliegue

Fecha de implantación: 23 de junio de 2026

Rama productiva: `cote`

## Flujo obligatorio

1. Crear una rama desde `cote` con prefijo `feat/`, `fix/` o `codex/`.
2. Subir la rama a GitHub y abrir un pull request hacia `cote`.
3. Esperar el check requerido `ci`.
4. Corregir cualquier fallo de secretos, lint, tipos, build o auditoría antes de mezclar.
5. Mezclar el pull request únicamente cuando `ci` esté verde.
6. Cloudflare Workers Builds despliega automáticamente después del merge a `cote`.

No se debe hacer push directo a `cote`.

## Qué bloquea el check `ci`

- Secretos detectados por Gitleaks.
- Errores de ESLint.
- Errores de TypeScript.
- Fallos de compilación.
- Rutas del sitemap que no respondan correctamente.
- Canonical, H1, redirecciones o headers incorrectos.
- Diferencia entre el commit compilado, `X-App-Commit` y `/version.json`.
- Páginas indexables con menos de dos enlaces internos entrantes.

## Configuración requerida en GitHub

La regla de protección de `cote` debe exigir:

- Pull request antes de mezclar.
- Check requerido: `ci`.
- Aplicación de la regla a administradores.
- Bloqueo de force push y eliminación de la rama.
- Cero aprobaciones obligatorias mientras exista una sola persona desarrolladora.

## Comprobación de Cloudflare

En Workers Builds, la rama productiva debe ser exclusivamente `cote`. Las ramas de feature no deben
reemplazar el deployment productivo; si Cloudflare genera previews, deben quedar aislados de
producción.

## Prueba negativa del gate

Abrir un pull request temporal con un error deliberado de lint. La evidencia válida es:

- El job `ci` termina en rojo.
- GitHub muestra el merge bloqueado.
- El deployment productivo de Cloudflare no cambia.

Después de guardar la evidencia, cerrar el pull request de prueba sin mezclarlo.
