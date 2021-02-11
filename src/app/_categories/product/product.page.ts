import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements ViewWillEnter {
  product: any;
  productResources = [];

  constructor(private route: ActivatedRoute, private sanitizer:DomSanitizer, private localeService: LocaleService) { }

  async ionViewWillEnter() {
    this.productResources = [];
    this.product = await this.localeService.getProductOne(this.route.snapshot.paramMap.get('id'));
    this.product.resources.forEach(async (element) => {
      let resource = await this.localeService.getResourceOne(element.id);
      resource.link = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(resource.link));
      this.productResources.push(resource);
    });

    this.productResources.sort((a, b) => {
      if (a.position > b.position) return 1;
      if (b.position > a.position) return -1;
      return 0;
    });
  }

  async ionViewDidLeave() {
    this.product = null;
    this.productResources = [];
  }
}