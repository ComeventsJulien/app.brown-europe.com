import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuComponent } from '../menu/menu.component';
import { LocaleService } from '../services/locale.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-promotion-one',
  templateUrl: './promotion-one.page.html',
  styleUrls: ['./promotion-one.page.scss'],
})
export class PromotionOnePage implements ViewWillEnter {

  selectedSubCategory: string;
  selectedCategory: string;
  title: string;
  category: any;
  sub_category: any;
  product: any;
  ressources: any[];
  locale: any;
  selectedProduct: string;
  subtitle: string;
  promotions: any;
  promotion: any;

  constructor(private route: ActivatedRoute, private apiService : ApiService, private router: Router, private sanitizer:DomSanitizer, public menu: MenuComponent, private localeService: LocaleService, private _translate: TranslateService) { }

  async ionViewWillEnter() {
    this.selectedProduct = this.route.snapshot.paramMap.get('product')    
    this.selectedCategory = this.route.snapshot.paramMap.get('category')

    this.title = this.route.snapshot.paramMap.get('title')
    this.promotions = await this.apiService.getLocalData('promotions');
    let resources = await this.apiService.getLocalData('resources');  
    this.promotion = this.promotions[this.selectedProduct];
    this.ressources = [];
    this.promotion.product.resources.forEach((element, index) => {
      var ressourceIndex = resources.findIndex(ressource => ressource.link == element.link) 
      let ressource = resources[ressourceIndex];
      ressource.file = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(ressource.file));
      this.promotion.product.resources[index] = resources[ressourceIndex]        
    });
    if(await this.localeService.getLocalData('locale'))
      this.locale = await this.localeService.getLocalData('locale')
          
    if(this.locale!= "fr"){
      let res = []
      const locale = this.locale;         
      if(this.promotion.product.productTranslates!== undefined){
        var index = this.sub_category.subCategoryTranslates.findIndex(function(translate) {
          return translate.locale.code == locale
        })        
        if(index!==-1){
          this.promotion.product.productTranslates![index].product = this.promotion.product;
          this.promotion.product = this.promotion.product.productTranslates![index]
        }
      }
    }
  }

}
