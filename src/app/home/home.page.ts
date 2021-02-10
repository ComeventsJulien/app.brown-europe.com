import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { LocaleService } from '../services/locale.service';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../services/api.service';
import { ViewWillEnter, AlertController, ViewDidEnter } from '@ionic/angular';
import { NetworkService } from '../services/network.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements ViewDidEnter {
  about_l1: string
  about_l2: string
  partner_l1: string
  partner_l2: string
  category_l1: string
  category_l2: string
  language: string
  locale: string
  locales: any;

  constructor(private router: Router, public menu: MenuComponent, private networkService: NetworkService, private localeService: LocaleService, private _translate: TranslateService, private apiService: ApiService, public alertController: AlertController) { }

  async ionViewDidEnter() {
    if (await this.localeService.getLocalData('locale')) {
      this.locale = await this.localeService.getLocalData('locale');
    }
    else {
      this.locale = 'fr';
      this.localeService.setLocalData('locale', 'fr');
    }

    if (this.networkService.getCurrentNetworkStatus() !== 0) {
      this.presentAlertConfirm()
    }

    this._translateLanguage()

    if (await this.apiService.getLocalData('locales')) {
      this.locales = await this.apiService.getLocalData('locales')
    }

    let testData = await this.apiService.getLocalData('resources')
    if (testData == null) {
      this.presentAlertConfirm();
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

  _initialiseTranslation(): void {
    this._translate.get('about_l1').subscribe((res: string) => {
      this.about_l1 = res;
    });
    this._translate.get('about_l2').subscribe((res: string) => {
      this.about_l2 = res;
    });
    this._translate.get('partner_l1').subscribe((res: string) => {
      this.partner_l1 = res;
    });
    this._translate.get('partner_l2').subscribe((res: string) => {
      this.partner_l2 = res;
    });
    this._translate.get('category_l1').subscribe((res: string) => {
      this.category_l1 = res;
    });
    this._translate.get('category_l2').subscribe((res: string) => {
      this.category_l2 = res;
    });
  }

  async _translateLanguage() {
    this._translate.use(this.locale);
    this._initialiseTranslation();
  }

  setLocale(code: string) {
    this.localeService.setLocalData('locale', code);
    this.locale = code;
    this._translateLanguage()
  }
}