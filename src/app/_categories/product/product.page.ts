import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuComponent } from '../../menu/menu.component';
import { LocaleService } from '../../services/locale.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements ViewWillEnter {
  title: string;
  category: any;
  product: any;
  products: any;
  ressources: any[];
  locale: any;
  selectedProduct: string;

  constructor(private route: ActivatedRoute, private apiService : ApiService, private router: Router, private sanitizer:DomSanitizer, public menu: MenuComponent, private localeService: LocaleService, private _translate: TranslateService) { }

  async ionViewWillEnter() {
    this.selectedProduct = this.route.snapshot.paramMap.get('product')
    this.title = this.route.snapshot.paramMap.get('title')

    let resources = await this.apiService.getLocalData('resources');
    this.products = await this.apiService.getLocalData('products');

    var itemIndex = this.products.findIndex(item => item.id == this.route.snapshot.paramMap.get('product') );
    this.product = this.products[itemIndex];
    this.product.resources.forEach((element, index) => {
      var ressourceIndex = resources.findIndex(ressource => ressource.id == element.id)
      let ressource = resources[ressourceIndex];
      ressource.file = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(ressource.link));
      this.product.resources[index] = resources[ressourceIndex]        
    });
  }
}