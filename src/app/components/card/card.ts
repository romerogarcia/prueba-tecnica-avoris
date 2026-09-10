import { Component, input, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { CardPriceDetails } from '../card-price-details/card-price-details';

@Component({
  selector: 'wl-card',
  imports: [FaIconComponent, CardPriceDetails],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  readonly imageUrl = input<string>('/img/card-image-1.png');

  protected readonly faChevronDown = faChevronDown;
  protected readonly breakdownOpen = signal(false);

  protected openBreakdown(): void {
    this.breakdownOpen.set(true);
  }

  protected closeBreakdown(): void {
    this.breakdownOpen.set(false);
  }
}
