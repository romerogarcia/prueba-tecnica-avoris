import { Component, input } from '@angular/core';

@Component({
  selector: 'wl-title',
  imports: [],
  templateUrl: './title.html',
  styleUrl: './title.scss',
})
export class Title {
  readonly heading = input('Vive tus propias aventuras');
  readonly subtitle = input('Para los que les gusta explorar y conocer mundo sin complejos.');
}
