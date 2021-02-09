import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PartnerCategory } from '../interfaces/partner_category';
import { LocaleService } from '../services/locale.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.page.html',
  styleUrls: ['./menu-page.page.scss'],
})
export class MenuPagePage implements OnInit {

  partner_categories : Array<any> = [];
  categories_themes : Array<any> = [];
  settings : Array<any> = [];
  language: string
  locale: string
  categories: any;

  constructor(private route: ActivatedRoute, private apiService : ApiService, private router: Router, public menu : ModalController, private localeService: LocaleService, private _translate: TranslateService) { }

  async ngOnInit() {
    this.partner_categories = await this.apiService.getLocalData('partner_categories')
    this.categories = await this.apiService.getLocalData('categories')
    this.settings = await this.apiService.getLocalData('settings')

    if(await this.localeService.getLocalData('locale'))
      this.locale = await this.localeService.getLocalData('locale')

    if(this.locale!= "fr"){
      let res = []
      const locale = this.locale;
      this.partner_categories.forEach(el=>{    
        if(el.partnerCategoryTranslates!== undefined){
          var index = el.partnerCategoryTranslates.findIndex(function(translate) {
            return translate.locale.code == locale
          })          
          if(index!==-1){
            el.partnerCategoryTranslates[index].partners = el.partners;
            res.push(el.partnerCategoryTranslates[index])
          }
        }
      })      
      this.partner_categories = res;      

      res=[]
      this.categories.forEach(el=>{            
        if(el.translations!== undefined){
          var index = el.translations.findIndex(function(translate) {
            return translate.locale.code == locale
          })          
          if(index!==-1){
            el.translations[index].category = el.partners;
            res.push(el.translations[index])
          }
        }
      })      
      this.categories = res; 
    }
  }

  loadPartnerCategory(id){
    this.router.navigate(['/partner', { category: id }]);
    this.menu.dismiss({
      'dismissed': true
    });
  }

  loadCategory(id){
    this.router.navigate(['/categorie', { category: id }]);
    this.menu.dismiss({
      'dismissed': true
    });
  }

  loadPromotionPage(){
    this.router.navigate(['/promotions']);
    this.menu.dismiss({
      'dismissed': true
    });
  }

  loadVideoPage(){
    this.router.navigate(['/video-home']);
    this.menu.dismiss({
      'dismissed': true
    });
  }

  loadAbout() {
    this.router.navigate(['/about']);
    this.menu.dismiss({
      'dismissed': true
    });
  }

  loadSliders(){
    this.router.navigate(['/sliders']);
    this.menu.dismiss({
      'dismissed': true
    });
  }
}
