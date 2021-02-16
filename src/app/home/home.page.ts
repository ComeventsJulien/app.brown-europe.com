import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { LocaleService } from '../services/locale.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements ViewDidEnter {
  partners_l1: string = '';
  partners_l2: string = '';
  about_l1: string = '';
  about_l2: string = '';
  categories_l1: string = '';
  categories_l2: string = '';
  locales: any = [];

  constructor(private router: Router, public menu: MenuComponent, private localeService: LocaleService, private _translate: TranslateService, public alertController: AlertController) { }

  async ionViewDidEnter() {
    if (await this.localeService.getLocale()) {
      this._translate.use(await this.localeService.getLocale());
    }
    else {
      await this.localeService.setLocalData('locale', 'fr');
      this._translate.use('fr');
    }

    let testData = await this.localeService.getLocalData('resources')
    if (testData == null) {
      this.presentAlertConfirm();
    }
    else {
      this.partners_l1 = await this.localeService.getGUIText('APP_PARTNERS_L1');
      this.partners_l2 = await this.localeService.getGUIText('APP_PARTNERS_L2');
      this.about_l1 = await this.localeService.getGUIText('APP_ABOUT_L1');
      this.about_l2 = await this.localeService.getGUIText('APP_ABOUT_L2');
      this.categories_l1 = await this.localeService.getGUIText('APP_CATEGORIES_L1');
      this.categories_l2 = await this.localeService.getGUIText('APP_CATEGORIES_L2');
      this.locales = await this.localeService.getLocales();
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Bienvenue',
      message: 'Veuillez paramètrer l\'application: téléchargement des données et langage utilisé',
      buttons: [
        {
          text: 'Paramètrer',
          handler: () => {
            this.router.navigate(['settings'])
          }
        }
      ]
    });

    await alert.present();
  }

  async setLanguage(code: string) {
    await this.localeService.setLocalData('locale', code);
    this.partners_l1 = await this.localeService.getGUIText('APP_PARTNERS_L1');
    this.partners_l2 = await this.localeService.getGUIText('APP_PARTNERS_L2');
    this.about_l1 = await this.localeService.getGUIText('APP_ABOUT_L1');
    this.about_l2 = await this.localeService.getGUIText('APP_ABOUT_L2');
    this.categories_l1 = await this.localeService.getGUIText('APP_CATEGORIES_L1');
    this.categories_l2 = await this.localeService.getGUIText('APP_CATEGORIES_L2');
    this._translate.use(code);
  }
}