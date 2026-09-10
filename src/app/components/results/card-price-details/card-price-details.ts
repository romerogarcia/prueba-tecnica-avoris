import { Component, input, output } from '@angular/core';
import { Modal } from '../../modal/modal';

// Por ahora el contenido va hardcodeado (mismo enfoque que wl-card): sirve para
// maquetar y probar la apertura/cierre. Cuando conectemos datos reales, esto
// pasa a recibir un input `destination: Destination` y pintar su priceBreakdown.
@Component({
  selector: 'wl-card-price-details',
  imports: [Modal],
  templateUrl: './card-price-details.html',
  styleUrl: './card-price-details.scss',
})
export class CardPriceDetails {
  readonly open = input<boolean>(false);
  readonly close = output<void>();
}
