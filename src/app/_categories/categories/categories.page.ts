import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MenuComponent } from '../../menu/menu.component';
import { ViewWillEnter } from '@ionic/angular';
import { LocaleService } from '../../services/locale.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements ViewWillEnter {
  categories:Array<any> = [];
  category_page_title: string
  category_page_subtitle: string
  language: string
  locale: string

  constructor(private apiService:ApiService, private router: Router, public menu: MenuComponent, private localeService: LocaleService, private _translate: TranslateService) { }

  async ionViewWillEnter() {
    this.categories = await this.apiService.getLocalData('categories')
  }

  loadItem(id:number){
      this.router.navigate(['/categorie', { category: id }]);
  }
}