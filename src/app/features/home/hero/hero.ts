import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
import type { SwiperContainer } from 'swiper/element';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// Registra los custom elements <swiper-container>/<swiper-slide> una sola vez.
register();

interface HeroSlide {
  title: string;
  subtitle: string;
  image: string;
}

@Component({
  selector: 'wl-hero',
  imports: [FaIconComponent],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  // Necesario porque <swiper-container>/<swiper-slide> son Web Components,
  // no componentes Angular: sin esto, el compilador los marca como error.
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Hero {
  protected readonly faChevronLeft = faChevronLeft;
  protected readonly faChevronRight = faChevronRight;

  protected readonly swiperRef = viewChild<ElementRef<SwiperContainer>>('swiperEl');

  // Los puntos de paginación viven en el Shadow DOM de <swiper-container>, así que
  // el CSS normal de hero.scss no les llega. injectStyles es la vía que da Swiper
  // para meter CSS ahí dentro.
  // El círculo visible se queda pequeño (10px, como en el diseño), pero la zona
  // clicable real pasa a 24x24px: si no, axe/Lighthouse lo marcan como "touch
  // target" insuficiente (mínimo 24px, WCAG 2.5.8). El punto de verdad (::after)
  // va centrado dentro de esa caja invisible más grande.
  protected readonly paginationStyles = [
    `
    .swiper-pagination-bullet {
      align-items: center;
      background: transparent;
      display: inline-flex;
      height: 24px;
      justify-content: center;
      opacity: 1;
      width: 24px;
    }
    .swiper-pagination-bullet-active {
      background: transparent;
    }
    .swiper-pagination-bullet::after {
      background-color: var(--swiper-pagination-bullet-inactive-color, #fff);
      border: 1px solid var(--color-white, #fff);
      border-radius: 50%;
      box-sizing: border-box;
      content: '';
      display: block;
      height: 10px;
      opacity: var(--swiper-pagination-bullet-inactive-opacity, 0.6);
      width: 10px;
    }
    .swiper-pagination-bullet-active::after {
      background-color: var(--swiper-pagination-color, var(--color-orange));
      opacity: 1;
    }
    `,
  ];

  // De momento repetimos la misma imagen/textos en los 3 slides (solo tienes
  // background-img-hero.png). En cuanto tengas más imágenes/destinos, cambia
  // el image/title/subtitle de cada uno para que cada slide sea distinto.
  protected readonly slides: HeroSlide[] = [
    {
      title: 'Ruta por Australia',
      subtitle: 'Si te va la aventura, no te lo puedes perder',
      image: '/img/background-img-hero.png',
    },
    {
      title: 'Ruta por Australia',
      subtitle: 'Si te va la aventura, no te lo puedes perder',
      image: '/img/background-img-hero.png',
    },
    {
      title: 'Ruta por Australia',
      subtitle: 'Si te va la aventura, no te lo puedes perder',
      image: '/img/background-img-hero.png',
    },
  ];

  protected slidePrev(): void {
    this.swiperRef()?.nativeElement.swiper?.slidePrev();
  }

  protected slideNext(): void {
    this.swiperRef()?.nativeElement.swiper?.slideNext();
  }
}
