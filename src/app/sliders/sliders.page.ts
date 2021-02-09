import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewWillEnter, IonSlides } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LocaleService } from '../services/locale.service';
import { TranslateService } from '@ngx-translate/core';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.page.html',
  styleUrls: ['./sliders.page.scss'],
})
export class SlidersPage implements ViewWillEnter {
  @ViewChild (IonSlides) protected slider: IonSlides;
  sliders:Array<any> = [];
  slideOpts = {
    direction: 'horizontal',
    initialSlide: 0,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.params = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { slides } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = swiper.slides.eq(i);
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          let tx = -offset$$1;
          if (!swiper.params.virtualTranslate) tx -= swiper.translate;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
          }
          const slideOpacity = swiper.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
            : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
          $slideEl
            .css({
              opacity: slideOpacity,
            })
            .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, $wrapperEl } = swiper;
        slides.transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          slides.transitionEnd(() => {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;
            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      }
    }
  }

  constructor(private apiService: ApiService, public menu: MenuComponent, private sanitizer:DomSanitizer, private localeService: LocaleService, private _translate: TranslateService) {
  }

  async ionViewWillEnter() {
    this.sliders = await this.apiService.getLocalData('sliders');
    for (let slider of this.sliders) {
      slider.image = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(slider.image));
      console.log(slider.image);
    }
  }

  async slideNext(): Promise<void> {
		await this.slider.slideNext(400);
		return Promise.resolve();
  }

  async slidePrev(): Promise<void> {
		await this.slider.slidePrev(400);
		return Promise.resolve();
  }
}
