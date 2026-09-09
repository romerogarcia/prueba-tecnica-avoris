import { Component } from '@angular/core';
import { Header } from './layout/header/header';
import { Hero } from './components/hero/hero';
import { Title } from './components/title/title';
import { Results } from './components/results/results';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'wl-root',
  imports: [Header, Hero, Title, Results, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
