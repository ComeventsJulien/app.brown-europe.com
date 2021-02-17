import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from '../../menu/menu.component';
import { ViewWillEnter } from '@ionic/angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements ViewWillEnter {
  settings = {};
  title = '';
  categories: Array<any> = [];

  constructor(private router: Router, public menu: MenuComponent, private dataService: DataService) { }

  async ionViewWillEnter() {
    this.settings = await this.dataService.getSettings();
    this.title = await this.dataService.getGUIText('APP_CATEGORIES_TITLE');
    this.categories = await this.dataService.getCategories();
  }

  loadItem(id) {
    this.router.navigate(['/categorie', { id: id }]);
  }
}