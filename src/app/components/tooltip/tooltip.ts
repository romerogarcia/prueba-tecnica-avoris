import { Component, input, signal } from '@angular/core';

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
  
  // Prevenimos que se marque/desmarque los checkboxs
  protected onClick(event: MouseEvent): void {
    event.stopPropagation();
    this.show();
  }
}
