# Prueba Maquetador Web (Responsive) - Waveless

## Descripción

Maquetación responsive de la home de Waveless, construida como una app Angular 20, con un componente por bloque de la interfaz y signals para el comportamiento (filtros, modal de desglose de precios, carrusel, menú mobile).

## Instalación

```
npm install
npm start
```

Entorno: `http://localhost:4200`.

## Estructura del proyecto

```
src/
├─ index.html
├─ styles.scss
└─ app/
   ├─ app.html / app.ts / app.scss    composición de la página
   ├─ layout/
   │  ├─ header/         logo, nav, botón "Reserva", menú hamburguesa en tablet/mobile
   │  └─ footer/
   ├─ features/home/
   │  ├─ hero/            imagen, título, CTA, carrusel (Swiper)
   │  ├─ filters/         filtros
   │  └─ filter-results/  compone filters + grid de cards,
   ├─ components/
   │  ├─ card/             tarjeta individual de destino
   │  ├─ card-price-details/  desglose de precios
   │  ├─ modal/            modal/popover genérico
   │  ├─ tooltip/          tooltip genérico
   │  ├─ icon/
   │  └─ title/            título + subtítulo de la sección de resultados
   └─ models/
      └─ destination.ts    modelo de datos de un destino
```

`features/` agrupa los bloques propios de la home.
`components/` las piezas genéricas que no dependen de esa pantalla en concreto y podrían reutilizarse en otra página.

## Decisiones técnicas

- **Angular 20**, standalone components (sin NgModules), signals para todo el estado (`signal`, `computed`, `input`, `output`, `effect`, `viewChild`). Sin routing: al ser solo una única página son necesarios.
- **Sass** por componente, con encapsulación automática de Angular. Nomenclatura **BEM** en todos los ficheros `.scss`.
- **Variables**: toda la paleta de colores, Los breakpoints (`$breakpoint-tablet`, `$breakpoint-desktop`, `$breakpoint-wide`). Se usan los breakpoints con `@use 'styles' as bp;` gracias a `stylePreprocessorOptions.includePaths: ["src"]` en `angular.json`.
- **Tipografía en `rem`**: todos los `font-size` del proyecto están en `rem` en lugar de `px` por accesibilidad.
- **Sistema de botones**: `.btn-primary` / `.btn-secondary` centralizan lo común a todos los botones de acción (radio, cursor, tipografía, peso), dejando el color fuera de esas clases porque cada botón lo necesita distinto.
- **Modal accesible y reutilizable** (`components/modal`): un único componente cubre tanto el modal de desglose de precios como los popovers "anchored" del hero. Gestiona `role="dialog"` + `aria-modal`, cierre con tecla Escape, un focus-trap básico dentro del panel mientras está abierto, y devuelve el foco al elemento que lo abrió al cerrarse.
- **Carrusel del hero**: Swiper 14 en su build de Web Components (`swiper/element/bundle`), sin wrapper de Angular adicional.
- **Menú de navegación mobile/tablet**: por debajo de 1024px el `<nav>` se oculta y se abre como panel desplegable, con el botón hamburguesa accesible (`aria-expanded`, `aria-label`). El indicador de link activo (línea + triángulo naranja) solo se pinta en el nav horizontal de desktop; en el desplegable mobile como no formaba parte del diseño, he decidido que el link activo se distinga solo con negrita.
- **Filtrado de resultados**: `filter-results.ts` deja preparada la lógica de filtrado real (signals de destinos, filtros activos y lista filtrada) pero el listado que se pinta en la plantilla sigue siendo el markup fijo de las tarjetas, ya que esta prueba es una revisión de maquetación sobre datos estáticos. Se deja documentado en el propio fichero como boceto de cómo se conectaría el filtrado en una siguiente iteración.

## Accesibilidad

Uso de la extensión `Lighthouse Chrome` para la revisión de toda la Accesibilidad de la maqueta a partir del criterio WCAG 1.4.4 incluyendo su funcionamiento óptimo en pantallas Escritorio/Tablet/Móvil.

- Navegación completa por teclado en header, filtros y modal (incluye focus-visible en checkboxes, inputs de precio, botón hamburguesa y links).
- Modal con `role="dialog"`, `aria-modal`, cierre con Escape y gestión de foco (entra al abrir, vuelve al disparador al cerrar).
- Textos alternativos: iconos decorativos con `alt=""`/`aria-hidden`, iconos con significado propio con `alt` descriptivo.
- Contraste de color revisado sobre la paleta de `styles.scss` (AA para texto normal y grande).
- Tipografía en `rem`: todos los `font-size` usan `rem` en lugar de `px`. `rem`, así que cuando la persona usuaria activa el ajuste de "tamaño de texto" del navegador, el texto de la web escala junto con ese ajuste.

## Notas

- He decidio maquetar el proyecto de una manera muy simple y limpia en este framework (Angular v20) porque me permite demostrar mis conocimientos, y es, a mi parecer, una manera bastante ágil de generar y optimizar el código lo máximo posible, garantizando que la forma de trabajar sea lo más similar posible a las tecnologías requeridas.
- El enlace "Ver 21 más" de los filtros y el filtrado real de resultados son solo visuales, sin lógica de negocio conectada.
