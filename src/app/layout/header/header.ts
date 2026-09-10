import { Component, signal } from '@angular/core';

// Los 4 links del nav principal. Un union type (mismo patron que
// FilterSection en wl-filters) para que el compilador avise si se escribe
// mal un nombre de link en la plantilla.
type NavLink = 'aventura' | 'destinos' | 'alojamiento' | 'sobre-nosotros';

@Component({
  selector: 'wl-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  // Arranca sin ningun link seleccionado (null), no "aventura" por defecto:
  // el estado activo solo aparece tras un clic del usuario.
  protected readonly activeLink = signal<NavLink | null>(null);

  protected setActiveLink(link: NavLink): void {
    this.activeLink.set(link);
  }
}
