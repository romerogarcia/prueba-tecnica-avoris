# Prueba Maquetador Web (Responsive) - Waveless

## Descripción

Maquetación responsive de la home de Waveless, construida como una app Angular 20, con un componente por bloque de la interfaz y JavaScript para los filtros de la pantalla de disponibilidad.

## Decisiones técnicas

- **Angular 20**, standalone components (sin NgModules), signals para el estado (`signal`, `computed`, `input`, `output`).
- **CSS puro** por componente (Angular encapsula los estilos automáticamente a cada componente, así que no hay colisiones de nombres entre bloques).
- Sin routing ni SSR: es una única página (home), no hacían falta.

## Instalación

Nota importante: es necesario tener mínimo las versiones de v20.19 o v22.12 de Node.js

npm install
npm start

Entorno: `http://localhost:4200`.

## Estructura del proyecto

- `src/index.html` - solo el `<wl-root>`, sin marcado propio.
- `src/app/app.html` - composición de la página: la lista de componentes en el orden en que aparecen (header, hero, intro, results, footer).
- `src/app/components/` - un componente por bloque, cada uno con su `.html`, `.css` y `.ts`:
  - `header/` - logo, nav, botón "Reserva", hamburguesa en tablet pequeña/móvil.
  - `hero/` - imagen, título, CTA, carrusel.
  - `intro/` - título + subtítulo de la sección.
  - `filters/` - filtros (aside en desktop, drawer en tablet/móvil).
  - `card/` - tarjeta individual de destino.
  - `results/` - compone filters + grid de cards + price-breakdown, y lleva el estado de filtrado.
  - `price-breakdown/` - popover/modal de "Desglose de precios".
  - `footer/`
- `src/app/models/destination.ts` - modelo de datos compartido entre `results` y `card`.
- `src/styles.css` - variables de color/tipografía y estilos globales.

notas
Font Awesome
