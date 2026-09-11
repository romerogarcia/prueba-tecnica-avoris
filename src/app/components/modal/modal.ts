import { Component, ElementRef, effect, input, output, signal, viewChild } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

let nextModalId = 0;

// Margen mínimo que dejamos respecto al borde de la pantalla al recolocar un
// popover "anchored" que se sale por algún lado.
const ANCHORED_EDGE_MARGIN = 8;

// Modal genérica y reutilizable (la usan wl-card-price-details y wl-filters):
// el consumidor solo pone el título y el contenido (ng-content), esta se
// encarga del backdrop, la cabecera con la X de cerrar y el layout.
// En mobile siempre es pantalla completa. En tablet+ hay dos variantes
// posibles (excluyentes, cada consumidor usa una): `anchored` la convierte
// en un popover colgado justo debajo de su contenedor padre posicionado
// (wl-card-price-details); `floatLeft` la convierte en un panel anclado al
// borde izquierdo de la pantalla, entre el hero y el footer (la usa
// wl-filters directamente).
@Component({
  selector: 'wl-modal',
  imports: [FaIconComponent],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  readonly open = input<boolean>(false);
  readonly heading = input<string>('');
  readonly anchored = input<boolean>(false);
  readonly floatLeft = input<boolean>(false);
  readonly close = output<void>();

  protected readonly faXmark = faXmark;
  protected readonly headingId = `modal-heading-${nextModalId++}`;

  // Referencia al div.modal, solo para el caso "anchored": necesitamos medir
  // dónde ha quedado pintado en pantalla para saber si se sale por algún borde.
  private readonly panel = viewChild<ElementRef<HTMLElement>>('panel');

  // Corrección horizontal (además del left:-140px fijo del CSS) para que el
  // popover no quede cortado por el borde de la pantalla. 0 = no hace falta
  // corregir nada.
  protected readonly anchoredOffsetX = signal(0);

  constructor() {
    effect(() => {
      const panelEl = this.panel()?.nativeElement;

      if (!this.open() || !this.anchored() || !panelEl) {
        this.anchoredOffsetX.set(0);
        return;
      }

      // requestAnimationFrame: esperamos a que el navegador haya pintado el
      // popover en su posición "por defecto" (la del CSS) antes de medirla.
      requestAnimationFrame(() => this.clampToViewport(panelEl));
    });
  }

  private clampToViewport(panelEl: HTMLElement): void {
    // Esta lógica solo tiene sentido en la variante anchored real (desde
    // 744px, position:absolute vía CSS). En mobile el modal es pantalla
    // completa (position:fixed) y no hay nada que "encajar": si lo dejamos
    // correr igualmente, mide el modal fullscreen (left:0), cree que se sale
    // por la izquierda y le mete un translateX que lo desplaza y lo hace
    // desbordar por la derecha, comiéndose el padding.
    if (getComputedStyle(panelEl).position !== 'absolute') {
      this.anchoredOffsetX.set(0);
      return;
    }

    const rect = panelEl.getBoundingClientRect();

    if (rect.left < ANCHORED_EDGE_MARGIN) {
      // Se sale por la izquierda: lo empujamos a la derecha lo justo.
      this.anchoredOffsetX.set(ANCHORED_EDGE_MARGIN - rect.left);
    } else if (rect.right > window.innerWidth - ANCHORED_EDGE_MARGIN) {
      // Se sale por la derecha: lo empujamos a la izquierda lo justo.
      this.anchoredOffsetX.set(window.innerWidth - ANCHORED_EDGE_MARGIN - rect.right);
    } else {
      // Cabe entero, no hace falta tocarlo.
      this.anchoredOffsetX.set(0);
    }
  }
}
