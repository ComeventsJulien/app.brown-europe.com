import { Component } from '@angular/core';
import { MenuComponent } from '../../menu/menu.component';
import { ViewDidEnter } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-sub-categorie',
  templateUrl: './sub-categorie.page.html',
  styleUrls: ['./sub-categorie.page.scss'],
})
export class SubCategoriePage implements ViewDidEnter {
  settings = {};
  subCategory: any;
  products = [];

  constructor(private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer, public menu: MenuComponent, private dataService: DataService) { }

  async ionViewDidEnter() {
    this.products = [];
    this.settings = await this.dataService.getSettings();
    this.subCategory = await this.dataService.getSubCategoryOne(this.route.snapshot.paramMap.get('id'));
    this.subCategory.products.forEach(async (product) => {
      this.products.push(await this.dataService.getProductOne(product.id));
    });

    if (this.subCategory.sound) {
      this.subCategory.sound = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.subCategory.sound));
    }

    this.subCategory.products.sort((a, b) => {
      if (a.position > b.position) return 1;
      if (b.position > a.position) return -1;
      return 0;
    });
  }

  async ionViewDidLeave() {
    this.subCategory = null;
    this.products = [];
  }

  loadProduct(id) {
    this.router.navigate(['/product', { id: id }]);
  }
}