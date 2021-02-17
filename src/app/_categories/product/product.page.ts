import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from '../../services/data.service';
import { MenuComponent } from '../../menu/menu.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements ViewWillEnter {
  settings = {};
  product: any;
  productResources = [];

  constructor(private route: ActivatedRoute, private sanitizer:DomSanitizer, private dataService: DataService, public menu: MenuComponent) { }

  async ionViewWillEnter() {
    this.productResources = [];
    this.settings = await this.dataService.getSettings();
    this.product = await this.dataService.getProductOne(this.route.snapshot.paramMap.get('id'));
    this.product.resources.forEach(async (element) => {
      let resource = await this.dataService.getResourceOne(element.id);
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