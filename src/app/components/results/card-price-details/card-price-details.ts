import { Component, input, output } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

// Por ahora el contenido va hardcodeado (mismo enfoque que wl-card): sirve para
// maquetar y probar la apertura/cierre. Cuando conectemos datos reales, esto
// pasa a recibir un input `destination: Destination` y pintar su priceBreakdown.
@Component({
  selector: 'wl-card-price-details',
  imports: [FaIconComponent],
  templateUrl: './card-price-details.html',
  styleUrl: './card-price-details.scss',
})
export class CardPriceDetails {
  readonly open = input<boolean>(false);
  readonly close = output<void>();

  protected readonly faXmark = faXmark;
}
