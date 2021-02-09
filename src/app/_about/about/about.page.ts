import { Component, OnInit, ViewChild  } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewWillEnter } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { IonSlides } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { MenuComponent } from '../../menu/menu.component';
import { LocaleService } from '../../services/locale.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements ViewWillEnter {
  about: any;
  ressources : Array<object> = [];
  language: string
  locale: string
  @ViewChild (IonSlides) protected slider: IonSlides;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    direction: 'vertical'
  };
  about_l1: string;
  about_l2: string;

  constructor(private apiService: ApiService, public menu: MenuComponent, private router: Router, private sanitizer:DomSanitizer, private localeService: LocaleService, private _translate: TranslateService) { }


  protected async slideNext(): Promise<void> {
		await this.slider.slideNext(400);
		return Promise.resolve();
  }
  
  async ionViewWillEnter() {
    this.about = await this.apiService.getLocalData('about');

    if(await this.localeService.getLocalData('locale'))
      this.locale = await this.localeService.getLocalData('locale')
    else
      this.locale = 'fr'
    this._translateLanguage()
    
    
    if(this.locale!= "fr"){
      let res = []
      const locale = this.locale;
      this.about.forEach(el=>{     
        if(el.aboutTranslates!== undefined){
          var index = el.aboutTranslates.findIndex(function(translate) {
            return translate.locale.code == locale
          })
          if(index!==-1){
            el.aboutTranslates[index].about = el;
            res.push(el.aboutTranslates[index])
          }
        }
      }) 
      this.about = res;      
    }  
  }

  loadItem(i){
    if(i == 4){
      this.router.navigate(['/personalize']);
    }else{
      this.router.navigate(['/about-one', { item: i }]);
    }
    
  }

  loadSliders(){
    this.router.navigate(['/sliders']);
  }

  _initialiseTranslation(): void {
    this._translate.get('about_l1').subscribe((res: string) => {
      this.about_l1 = res;
    });
    this._translate.get('about_l2').subscribe((res: string) => {
      this.about_l2 = res;
    });
  }

  async _translateLanguage() {
    this._translate.use(this.locale);
    this._initialiseTranslation();
  }

  _initTranslate(language) {
    this._translate.setDefaultLang('fr');
    if (language) {
      this.language = language;
    }
    else {
      this.language = 'fr';
    }
    this._translateLanguage();
  }

}
