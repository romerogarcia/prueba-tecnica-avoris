import { NgTemplateOutlet } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '../../../components/tooltip/tooltip';
import { Modal } from '../../../components/modal/modal';

export interface FilterState {
  activityTags: string[]; // ej. ['parapente', 'buceo']
  priceMin: number | null;
  priceMax: number | null;
}

interface ActivityOption {
  label: string;
  checked: boolean;
}

// Las 4 secciones del acordeón de filtros. Un union type en vez de un string
// suelto: así el compilador avisa si en la plantilla escribimos mal el
// nombre de una sección (p.ej. 'aventuraa').
type FilterSection = 'destinos' | 'aventura' | 'alojamiento' | 'precio';

// wl-filters es autocontenido y tiene dos presentaciones del mismo
// formulario (comparten contenido vía <ng-template #filtersContent>, ver
// filters.html): hasta 1199px es un botón "Ver filtros" + wl-modal
// (variante floatLeft); desde 1200px es un aside estático siempre visible,
// a la izquierda de wl-filter-results. Así puede vivir como hermano de wl-filter-results
// en app.html sin que este último sepa nada de aperturas ni modales.
//
// De momento el filtrado en sí sigue sin lógica real (los checkboxes y los
// inputs de precio son estáticos), pero el acordeón (abrir/cerrar cada
// sección de forma independiente) ya es funcional.
@Component({
  selector: 'wl-filters',
  imports: [FaIconComponent, Tooltip, Modal, NgTemplateOutlet],
  templateUrl: './filters.html',
  styleUrl: './filters.scss',
})
export class Filters {
  protected readonly faChevronDown = faChevronDown;
  protected readonly faChevronRight = faChevronRight;

  protected readonly activities: ActivityOption[] = [
    { label: 'Quads', checked: false },
    { label: 'Parapente', checked: true },
    { label: 'Rafting', checked: false },
    { label: 'Explora', checked: true },
    { label: 'Buceo', checked: false },
    { label: 'Paracaídas', checked: false },
    { label: 'Snowboard', checked: false },
    { label: 'Surf', checked: false },
  ];

  // Mismo esquema que `activities` (mismo shape ActivityOption), de momento
  // con texto de relleno: son placeholders hasta que haya opciones reales de
  // destino/alojamiento.
  protected readonly destinationOptions: ActivityOption[] = [
    { label: 'Lorem ipsum', checked: false },
    { label: 'Lorem ipsum', checked: false },
  ];

  protected readonly accommodationOptions: ActivityOption[] = [
    { label: 'Lorem ipsum', checked: false },
    { label: 'Lorem ipsum', checked: false },
  ];

  // Abre/cierra el wl-modal que envuelve el formulario (solo relevante hasta
  // 1200px; el botón que lo dispara se oculta a partir de ahí).
  protected readonly open = signal(false);

  protected toggle(): void {
    this.open.update((open) => !open);
  }

  // Guarda el conjunto de secciones abiertas (puede haber varias a la vez,
  // cada una se abre/cierra de forma independiente). Arranca vacío: al
  // cargar la página ninguna sección está abierta ni marcada como activa.
  protected readonly openSections = signal<ReadonlySet<FilterSection>>(new Set());

  protected isOpen(section: FilterSection): boolean {
    return this.openSections().has(section);
  }

  // Clona el Set y añade/quita solo la sección clicada, sin tocar el resto:
  // por eso abrir una no cierra las demás.
  protected toggleSection(section: FilterSection): void {
    this.openSections.update((current) => {
      const next = new Set(current);
      if (next.has(section)) {
        next.delete(section);
      } else {
        next.add(section);
      }
      return next;
    });
  }

  // Los filtros se aplican en vivo (sin botón de enviar en el diseño), pero al
  // estar dentro de un <form> nativo evitamos que un Enter en los inputs de
  // precio dispare un submit real del navegador (recarga de página).
  protected onSubmit(event: Event): void {
    event.preventDefault();
  }
}
