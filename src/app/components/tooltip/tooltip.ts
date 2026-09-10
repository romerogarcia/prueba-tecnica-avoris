import { Component, input, signal } from '@angular/core';

// Tooltip reutilizable: el disparador (icono, texto...) se pasa por
// ng-content, el texto de la burbuja por el input `text`. Se abre con hover
// (ratón) y con focus (teclado), y se cierra al quitar el ratón o el foco.
// El click se mantiene además como apertura (no toggle) para que también
// funcione en táctil, donde no existe hover real.
@Component({
  selector: 'wl-tooltip',
  imports: [],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
})
export class Tooltip {
  readonly text = input<string>('');

  protected readonly open = signal(false);

  protected show(): void {
    this.open.set(true);
  }

  protected hide(): void {
    this.open.set(false);
  }

  protected onClick(event: MouseEvent): void {
    // Evita que el clic "burbujee" hasta un <label> que lo envuelva (p.ej. la
    // fila de un checkbox) y acabe marcando/desmarcando ese checkbox sin querer.
    event.stopPropagation();
    this.show();
  }
}
