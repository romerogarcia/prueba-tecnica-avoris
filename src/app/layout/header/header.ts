import { Component } from '@angular/core';

// Header estático: el botón de hamburguesa se queda solo como icono visual
// en mobile/tablet pequeña (de momento no abre ningún listado).
@Component({
  selector: 'wl-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
