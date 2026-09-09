import { Component, computed, signal } from '@angular/core';
import { Filters, FilterState } from './filters/filters';
import { Card } from './card/card';
import { Destination } from '../../models/destination';

@Component({
  selector: 'wl-results',
  imports: [Filters, Card],
  templateUrl: './results.html',
  styleUrl: './results.scss',
})
export class Results {
  // TODO: sustituye por los destinos reales (puedes hardcodearlos aquí o moverlos
  // a un JSON/servicio si prefieres). Con 6-9 sería suficiente para ver el filtrado funcionando.
  protected readonly destinations = signal<Destination[]>([]);

  protected readonly activeFilters = signal<FilterState>({
    activityTags: [],
    priceMin: null,
    priceMax: null,
  });

  // Grid ya filtrado según activeFilters(); esto es lo que se pinta con @for en el HTML.
  protected readonly filteredDestinations = computed(() => {
    const filters = this.activeFilters();
    return this.destinations().filter((d) => {
      const matchesTags =
        filters.activityTags.length === 0 ||
        filters.activityTags.some((tag) => d.activityTags.includes(tag));
      const matchesMin = filters.priceMin == null || d.price >= filters.priceMin;
      const matchesMax = filters.priceMax == null || d.price <= filters.priceMax;
      return matchesTags && matchesMin && matchesMax;
    });
  });

  // Solo relevante en tablet/móvil (el botón "Ver filtros").
  protected readonly filtersOpen = signal(false);

  protected toggleFilters(): void {
    this.filtersOpen.update((open) => !open);
  }

  protected onFiltersChange(filters: FilterState): void {
    this.activeFilters.set(filters);
  }
}
