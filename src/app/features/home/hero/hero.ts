import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
import type { SwiperContainer } from 'swiper/element';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Icon } from '../../../components/icon/icon';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

register();

interface HeroSlide {
  title: string;
  subtitle: string;
  image: string;
}

@Component({
  selector: 'wl-hero',
  imports: [FaIconComponent, Icon],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Hero {
  protected readonly faChevronLeft = faChevronLeft;
  protected readonly faChevronRight = faChevronRight;

  protected readonly swiperRef = viewChild<ElementRef<SwiperContainer>>('swiperEl');

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
      background-color: transparent;
      border: 1.5px solid var(--color-white, #fff);
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

  protected readonly slides: HeroSlide[] = [
    {
      title: 'Ruta por Australia',
      subtitle: 'Si te va la aventura, no te lo puedes perder',
      image: '/img/background-img-hero.png',
    },
    {
      title: 'Lorem Ipsum',
      subtitle: 'Lorem ipsum dolor sit amet consectetur adipiscing',
      image: '/img/background-img-hero.png',
    },
    {
      title: 'Lorem Ipsum',
      subtitle: 'Lorem ipsum dolor sit amet consectetur adipiscing',
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
