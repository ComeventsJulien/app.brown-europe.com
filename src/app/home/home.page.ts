import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { DataService } from '../services/data.service';
import { ColorService } from '../services/color.service';
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
  settings: any = {};

  constructor(private router: Router, public menu: MenuComponent, private dataService: DataService, private _translate: TranslateService, public alertController: AlertController, public colorService: ColorService) { }

  async ionViewDidEnter() {
    if (await this.dataService.getLocalData('resources') == null) {
      this.presentAlertConfirm();
    }
    else {
      this.partners_l1 = await this.dataService.getGUIText('APP_PARTNERS_L1');
      this.partners_l2 = await this.dataService.getGUIText('APP_PARTNERS_L2');
      this.about_l1 = await this.dataService.getGUIText('APP_ABOUT_L1');
      this.about_l2 = await this.dataService.getGUIText('APP_ABOUT_L2');
      this.categories_l1 = await this.dataService.getGUIText('APP_CATEGORIES_L1');
      this.categories_l2 = await this.dataService.getGUIText('APP_CATEGORIES_L2');
      this.locales = await this.dataService.getLocales();
      this.settings = await this.dataService.getSettings();
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
    this._translate.use(code);
    await this.dataService.setCurrentLanguage(code);
    this.partners_l1 = await this.dataService.getGUIText('APP_PARTNERS_L1');
    this.partners_l2 = await this.dataService.getGUIText('APP_PARTNERS_L2');
    this.about_l1 = await this.dataService.getGUIText('APP_ABOUT_L1');
    this.about_l2 = await this.dataService.getGUIText('APP_ABOUT_L2');
    this.categories_l1 = await this.dataService.getGUIText('APP_CATEGORIES_L1');
    this.categories_l2 = await this.dataService.getGUIText('APP_CATEGORIES_L2');    
  }
}