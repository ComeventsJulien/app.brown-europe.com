import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MenuComponent } from '../../menu/menu.component';
import { PartnerCategory } from '../../interfaces/partner_category';
import { LocaleService } from '../../services/locale.service';
import { TranslateService } from '@ngx-translate/core';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.page.html',
  styleUrls: ['./partners.page.scss'],
})
export class PartnersPage implements ViewWillEnter {

  categories : Array<PartnerCategory>;
  partner_page_title: string
  language: string
  locale: string

  constructor(private apiService:ApiService, private router: Router, public menu: MenuComponent, private localeService: LocaleService, private _translate: TranslateService) { }

  async ionViewWillEnter() {
    this.categories = await this.apiService.getLocalData('partner_categories');
    this.categories.sort(sortWithPosition);
    
    function sortWithPosition(a, b) {
      if (a.position > b.position) return 1;
      if (b.position > a.position) return -1;
      return 0;
    }
    
  }

  loadItem(index:number, title: string){
    this.router.navigate(['/partner', { category: index, title: title }]);
  }

}
