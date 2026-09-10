import { Component } from '@angular/core';
import { Header } from './layout/header/header';
import { Hero } from './features/home/hero/hero';
import { Title } from './components/title/title';
import { Filters } from './features/home/filters/filters';
import { Results } from './features/home/results/results';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'wl-root',
  imports: [Header, Hero, Title, Filters, Results, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
