import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from '../../menu/menu.component';
import { PartnerCategory } from '../../interfaces/partner_category';
import { DataService } from '../../services/data.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.page.html',
  styleUrls: ['./partners.page.scss'],
})
export class PartnersPage implements ViewWillEnter {
  settings = {};
  title = '';
  categories : Array<PartnerCategory>;

  constructor(private router: Router, public menu: MenuComponent, private dataService: DataService) { }

  async ionViewWillEnter() {
    this.settings = await this.dataService.getSettings();
    this.title = await this.dataService.getGUIText('APP_PARTNERS_TITLE');
    this.categories = await this.dataService.getPartnerCategories();
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