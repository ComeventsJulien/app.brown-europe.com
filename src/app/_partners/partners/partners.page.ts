import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from '../../menu/menu.component';
import { PartnerCategory } from '../../interfaces/partner_category';
import { LocaleService } from '../../services/locale.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.page.html',
  styleUrls: ['./partners.page.scss'],
})
export class PartnersPage implements ViewWillEnter {
  categories : Array<PartnerCategory>;

  constructor(private router: Router, public menu: MenuComponent, private localeService: LocaleService) { }

  async ionViewWillEnter() {
    this.categories = await this.localeService.getPartnerCategories();
    this.categories.sort((a, b) => {
      if (a.position > b.position) return 1;
      if (b.position > a.position) return -1;
      return 0;
    });
  }
  
  async ionViewDidLeave() {
    this.categories = [];
  }

  loadItem(id) {
    this.router.navigate(['/partner', { id: id }]);
  }
}