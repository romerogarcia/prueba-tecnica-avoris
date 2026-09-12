import { Component, signal } from '@angular/core';

type NavLink = 'aventura' | 'destinos' | 'alojamiento' | 'sobre-nosotros';

@Component({
  selector: 'wl-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly activeLink = signal<NavLink | null>(null);
  protected readonly isMenuOpen = signal(false);

  protected setActiveLink(link: NavLink): void {
    this.activeLink.set(link);
    this.isMenuOpen.set(false);
  }

  protected toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }
}
