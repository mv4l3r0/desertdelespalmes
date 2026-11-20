# Desierto de las Palmas · base del proyecto

Web estática sin paso de compilación. MapLibre GL, GPX propio y relieve 3D.

## Probar en local (sin instalar nada)
Abre `index.html` con doble clic. Las rutas se leen de `data/routes.js`, que lleva el GPX incluido como texto.

## Probar en local con servidor (opcional)
    cd desierto
    python3 -m http.server 8000
Abrir http://localhost:8000 (no funciona abriendo el HTML con doble clic, porque usa fetch).

## Estructura
- `index.html`: página y contenedores.
- `css/style.css`: estilos.
- `js/main.js`: mapa, lectura de GPX, filtros, perfil de altitud y botón 3D.
- `data/routes.json`: lista de rutas (nombre, dificultad, ruta al GPX, descripción).
- `data/gpx/`: un GPX por ruta. El de ejemplo es sintético: reemplázalo.
- `assets/video/`: vídeos comprimidos (MP4/WebM) para los vuelos.

## Añadir una ruta
1. Copia el `.gpx` a `data/gpx/`.
2. Añade una entrada en `data/routes.json`. Distancia y desnivel se calculan solos.

## Pendiente antes de publicar
- Ajustar `CENTER` en `js/main.js` y sustituir el GPX de ejemplo por tracks reales (con su autoría y licencia).
- El mapa base usa OpenFreeMap (gratuito, sin clave). Si el tráfico crece, valora MapTiler, Stadia, Protomaps o un servidor propio. El servidor público de OpenStreetMap bloquea este uso.
- Fijar versiones y, si quieres, alojar MapLibre tú mismo en vez de usar unpkg.
- Añadir aviso legal, política de privacidad y la indicación "guía no oficial".

## Publicar
Cloudflare Pages o Netlify: conecta el repositorio, sin comando de build, directorio de salida `/`.
