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
  partnerCategories: Array<any> = [];
  categories: Array<any> = [];

  constructor(private router: Router, public menu: ModalController, private localeService: LocaleService) { }

  async ngOnInit() {
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
