# Desierto de las Palmas · web estática (Cloudflare Pages + GitHub)

Sin paso de compilación: Cloudflare Pages publica la raíz del repositorio. En Pages: framework "None", comando de build vacío, directorio de salida "/".

## Idiomas
Castellano en la raíz, valenciano en /va/ e inglés en /en/. Contenido en data/*.js (personajes, especies, rutas, cronología); textos de interfaz en js/i18n.js.

## Antes de lanzar
1. Quitar el bloque de `_headers` (X-Robots-Tag: noindex), o Google no indexará la web.
2. Contacto: crear una clave en web3forms.com con tu correo y pegarla en data/config.js. Mientras diga PEGA_AQUI_TU_CLAVE, el formulario se oculta.
3. Redirección del dominio secundario (desiertodelaspalmas.org → desertdelespalmes.org): hacerla en el panel (Cloudflare Redirect Rules o el reenvío de URL de Porkbun). Cloudflare Pages no admite redirecciones por dominio en `_redirects`.
4. Añadir sitemap.xml y robots.txt, y registrar la web en Google Search Console.
