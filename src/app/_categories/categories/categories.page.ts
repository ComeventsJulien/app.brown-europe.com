import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from '../../menu/menu.component';
import { ViewWillEnter } from '@ionic/angular';
import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements ViewWillEnter {
  title = '';
  categories: Array<any> = [];

  constructor(private router: Router, public menu: MenuComponent, private localeService: LocaleService) { }

  async ionViewWillEnter() {
    this.title = await this.localeService.getGUIText('APP_CATEGORIES_TITLE');
    this.categories = await this.localeService.getCategories();
  }

  loadItem(id) {
    this.router.navigate(['/categorie', { id: id }]);
  }
}