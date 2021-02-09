import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuComponent } from '../menu/menu.component';
import { LocaleService } from '../services/locale.service';
import { TranslateService } from '@ngx-translate/core';
import { ViewWillEnter } from '@ionic/angular';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.page.html',
  styleUrls: ['./promotions.page.scss'],
})
export class PromotionsPage implements ViewWillEnter {
  selectedCategory: string;
  title: string;
  category: any;
  ressources: any[];
  products: any;
  promotions: any;
  locale: any;
  currentDate: any;

  constructor(private route: ActivatedRoute, private apiService : ApiService, private router: Router, private sanitizer:DomSanitizer, public menu: MenuComponent, private localeService: LocaleService, private _translate: TranslateService) { }

  async ionViewWillEnter() {
    this.currentDate = new Date()
    this.selectedCategory = this.route.snapshot.paramMap.get('category')
    this.title =  this.route.snapshot.paramMap.get('title')
    this.category = await this.apiService.getLocalData('categories');
    this.promotions = await this.apiService.getLocalData('promotions');
    let resources = await this.apiService.getLocalData('resources');
    this.category = this.category[this.selectedCategory];

    this.ressources = [];

    this.promotions.forEach((promotion, index) => {
        if(promotion!== null){
          let currentDate = new Date();
          let endAt = new Date(promotion.endAt);
          if(currentDate > endAt){
            this.promotions.splice(index,1);
          }
          else{
            promotion.product.resources.forEach((element, index) => {
              var ressourceIndex = resources.findIndex(ressource => ressource['@id'] == element['@id'])
              let ressource = resources[ressourceIndex];
              ressource.link = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(ressource.link));
              promotion.product.resources[index] = resources[ressourceIndex]
            });
          }
        }
    });
    if(await this.localeService.getLocalData('locale'))
      this.locale = await this.localeService.getLocalData('locale')

    if(this.locale!= "fr"){
      let res = []
      const locale = this.locale;
      this.promotions.forEach(el=>{
        var index = el.product.productTranslates.findIndex(function(translate) {
          console.log(translate);
          return translate.locale.code == locale
        })
        if(index!==-1){
          el.product.title = el.product.productTranslates[index].title;
          el.product.description = el.product.productTranslates[index].description;
        }
      })
    }
  }

  loadPromotion(index:string){
    this.router.navigate(['/promotion-one', { product: index, category: this.selectedCategory, title: this.title }]);
  }

}
