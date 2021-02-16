import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LocaleService } from '../services/locale.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.page.html',
  styleUrls: ['./menu-page.page.scss'],
})
export class MenuPagePage implements OnInit {
  title = '';
  homeTitle = '';
  aboutTitle = '';
  partnersTitle = '';
  categoriesTitle = '';
  slidersTitle = '';
  partnerCategories: Array<any> = [];
  categories: Array<any> = [];

  constructor(private router: Router, public menu: ModalController, private localeService: LocaleService) { }

  async ngOnInit() {
    console.log('test');
    this.title = await this.localeService.getGUIText('APP_MENU_TITLE');
    this.homeTitle = await this.localeService.getGUIText('APP_HOME_TITLE');
    this.aboutTitle = await this.localeService.getGUIText('APP_ABOUT_TITLE');
    this.partnersTitle = await this.localeService.getGUIText('APP_PARTNERS_TITLE');
    this.categoriesTitle = await this.localeService.getGUIText('APP_CATEGORIES_TITLE');
    this.slidersTitle = await this.localeService.getGUIText('APP_SLIDERS_TITLE');
    this.partnerCategories = await this.localeService.getPartnerCategories();
    this.categories = await this.localeService.getCategories();
  }

  loadPartnerCategory(id) {
    this.router.navigate(['/partner', { id: id }]);
    this.menu.dismiss({
      'dismissed': true
    });
  }

  loadCategory(id) {
    this.router.navigate(['/categorie', { id: id }]);
    this.menu.dismiss({
      'dismissed': true
    });
  }

  loadVideoPage() {
    this.router.navigate(['/video-home']);
    this.menu.dismiss({
      'dismissed': true
    });
  }

  loadHome() {
    this.router.navigate(['/home']);
    this.menu.dismiss({
      'dismissed': true
    });
  }

  loadAbout() {
    this.router.navigate(['/about']);
    this.menu.dismiss({
      'dismissed': true
    });
  }

  loadSliders() {
    this.router.navigate(['/sliders']);
    this.menu.dismiss({
      'dismissed': true
    });
  }
}
