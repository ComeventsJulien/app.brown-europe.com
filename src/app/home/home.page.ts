import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { LocaleService } from '../services/locale.service';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../services/api.service';
import { AlertController, ViewDidEnter } from '@ionic/angular';
import { NetworkService } from '../services/network.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements ViewDidEnter {
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

    this._translate.use(this.locale);

    if (await this.localeService.getLocalData('locales')) {
      this.locales = await this.localeService.getLocalData('locales')
    }

    let testData = await this.localeService.getLocalData('resources')
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

  setLocale(code: string) {
    this.localeService.setLocalData('locale', code);
    this.locale = code;
    this._translate.use(this.locale);
  }
}