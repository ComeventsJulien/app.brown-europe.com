import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../menu/menu.component';
import {ViewDidEnter, ViewWillEnter} from '@ionic/angular';
import { PartnerCategory } from '../../interfaces/partner_category';
import { Partner } from '../../interfaces/partner';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Product } from '../../interfaces/product';
import { LocaleService } from '../../services/locale.service';
import { TranslateService } from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
const STORE_URL = 'https://oe2vlafafp.preview.infomaniak.website/uploads/images/';


@Component({
  selector: 'app-categorie-one',
  templateUrl: './categorie-one.page.html',
  styleUrls: ['./categorie-one.page.scss'],
})
export class CategorieOnePage implements ViewDidEnter {
  category : any;
  selectedSubCategory: string;
  selectedCategory: string;
  sub_category : any;
  settings : any;
  products : Array<Product>;
  title : string;
  subtitle : string;
  ressources : Array<object> = [];
  language: string
  locale: string
  
  constructor(private route: ActivatedRoute, private http: HttpClient, private apiService : ApiService, private router: Router, private sanitizer:DomSanitizer, public menu: MenuComponent, private localeService: LocaleService, private _translate: TranslateService) { }

  async ionViewDidEnter() {
    this.settings = await this.apiService.getLocalData('settings');
    let resources = await this.apiService.getLocalData('resources');
    this.ressources = [];

    var sub_categories = await this.apiService.getLocalData('sub_categories');
    this.sub_category = sub_categories[sub_categories.findIndex(item => item.id == this.route.snapshot.paramMap.get('sub_category'))];

    this.products = this.sub_category.products;
    this.products = Object.values(this.products);

    this.products.forEach(product => {
      if(product.promotion!== null){
        let currentDate = new Date();
        let endAt = new Date(product.promotion.endAt);
        if(currentDate > endAt)
          product.promotion = null
      }
      product.resources.forEach((element, index) => {
        var ressourceIndex = resources.findIndex(ressource => ressource["@id"] == element["@id"])
        let ressource = resources[ressourceIndex];
        ressource.link = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(ressource.link));
        product.resources[index] = resources[ressourceIndex]        
      });    
    });

    if (this.sub_category.sound !== null){
      this.sub_category.sound = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.sub_category.sound));
    }

    function compare(a, b) {
      if (a.position > b.position) return 1;
      if (b.position > a.position) return -1;
    
      return 0;
    }

    this.products.sort(compare);
  }

  loadProduct(id){
    this.router.navigate(['/product', { product: id }]);
  }

  async getFile(url: string) {
    const http = this.http;
    return new Promise(function(resolve, reject) {
      const res = http.get(url, {responseType: 'blob'});
      resolve(res);
    });
  }
}