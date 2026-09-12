import { Component, computed, signal } from '@angular/core';
import { FilterState } from '../filters/filters';
import { Card } from '../../../components/card/card';
import { Destination } from '../../../models/destination';

@Component({
  selector: 'wl-filter-results',
  imports: [Card],
  templateUrl: './filter-results.html',
  styleUrl: './filter-results.scss',
})
// NOTA: Código como boceto de cómo se conectaría el filtrado real en una siguiente iteración
export class FilterResults {
  // Sustituiría a las <wl-card> fijas de filter-results.html cuando haya datos reales.
  protected readonly destinations = signal<Destination[]>([]);

  protected readonly activeFilters = signal<FilterState>({
    activityTags: [],
    priceMin: null,
    priceMax: null,
  });

  // Datos ya filtrados según activeFilters
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

  // Handler
  protected onFiltersChange(filters: FilterState): void {
    this.activeFilters.set(filters);
  }
}
