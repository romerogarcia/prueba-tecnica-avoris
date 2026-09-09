import { Component, input, output } from '@angular/core';

export interface FilterState {
  activityTags: string[]; // ej. ['parapente', 'buceo']
  priceMin: number | null;
  priceMax: number | null;
}

@Component({
  selector: 'wl-filters',
  imports: [],
  templateUrl: './filters.html',
  styleUrl: './filters.scss',
})
export class Filters {
  // En desktop siempre true (CSS lo muestra fijo); en tablet/móvil lo controla results.ts
  // según el botón "Ver filtros".
  readonly open = input<boolean>(true);

  // Avisa a results.ts cada vez que cambian los checkboxes o el rango de precio.
  readonly filtersChange = output<FilterState>();

  // Solo se usa en tablet/móvil, para el botón de cerrar del drawer.
  readonly closeFilters = output<void>();

  // TODO: leer los checkboxes/inputs marcados y llamar a this.filtersChange.emit({...})
}
