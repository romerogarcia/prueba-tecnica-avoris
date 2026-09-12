import { Component } from '@angular/core';
import { Header } from './layout/header/header';
import { Hero } from './features/home/hero/hero';
import { Title } from './components/title/title';
import { Filters } from './features/home/filters/filters';
import { FilterResults } from './features/home/filter-results/filter-results';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'wl-root',
  imports: [Header, Hero, Title, Filters, FilterResults, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
