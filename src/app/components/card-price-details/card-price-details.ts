import { Component, input, output } from '@angular/core';
import { Modal } from '../modal/modal';

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
