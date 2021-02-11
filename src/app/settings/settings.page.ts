import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Locale } from '../interfaces/locale';
import { LocaleService } from '../services/locale.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements ViewWillEnter {
  blob: BlobPart;
  locales: Array<Locale>;
  locale: string;
  state: string = 'IDLE';

  constructor(
    private localeService: LocaleService,
  ) { }

  async ionViewWillEnter() { }

  async loadDataApi() {
    this.state = 'WAITING';
    await this.localeService.loadFromAPI().then(() => this.state = 'DONE');
  }

  async deleteLocalData() {
    await this.localeService.clear();
  }
}