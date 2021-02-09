import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Network} from '@ngx-pwa/offline';
import {Observable} from 'rxjs';
import {ApiService} from '../services/api.service';
import {Platform, ViewWillEnter} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Locale } from '../interfaces/locale';
import { LocaleService } from '../services/locale.service';
import { TranslateService } from '@ngx-translate/core';
const STORE_URL = 'http://localhost:8000/uploads/images/';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements ViewWillEnter {
  private online: Observable<boolean>;
  blob: BlobPart;
  locales: Array<Locale>;
  locale: string;
  private resources = [];
  private about_resources = [];

  language: string;
  settings_title: string;
  settings_download_title: string;
  settings_download_button: string;
  settings_locale_title: string;
  settings_locale_button: string;
  settings_locale_french: string;
  settings_download_waiting: string;
  settings_download_done: string;
  settings_delete_title: string;
  partnerCategory: any[];

  constructor(
    private router: Router,
    private network: Network,
    private apiService: ApiService,
    private platform: Platform,
    private storage: Storage,
    private localeService: LocaleService,
    private _translate: TranslateService,
    private http: HttpClient){
    this.online = this.network.onlineChanges;
  }

  async ionViewWillEnter() {
    if (await this.localeService.getLocalData('locale')) {
      this.locale = await this.localeService.getLocalData('locale');
    }
    else{
      this.locale = 'fr';
      this.localeService.setLocalData('locale', 'fr');
    }
    if (await this.apiService.getLocalData('locales')) {
      this.locales = await this.apiService.getLocalData('locales');
    }

    this._translateLanguage();
    }

  _initialiseTranslation(): void {
    this._translate.get('settings_title').subscribe((res: string) => {
      this.settings_title = res;
    });
    this._translate.get('settings_download_title').subscribe((res: string) => {
      this.settings_download_title = res;
    });
    this._translate.get('settings_download_button').subscribe((res: string) => {
      this.settings_download_button = res;
    });
    this._translate.get('settings_locale_title').subscribe((res: string) => {
      this.settings_locale_title = res;
    });
    this._translate.get('settings_locale_button').subscribe((res: string) => {
      this.settings_locale_button = res;
    });
    this._translate.get('settings_locale_french').subscribe((res: string) => {
      this.settings_locale_french = res;
    });
    this._translate.get('settings_download_waiting').subscribe((res: string) => {
      this.settings_download_waiting = res;
    });
    this._translate.get('settings_download_done').subscribe((res: string) => {
      this.settings_download_done = res;
    });
    this._translate.get('settings_delete_title').subscribe((res: string) => {
      this.settings_delete_title = res;
    });
  }

  async _translateLanguage() {
    this._translate.use(this.locale);
    this._initialiseTranslation();
  }

  _initTranslate(language) {
    this._translate.setDefaultLang('fr');
    if (language) {
      this.language = language;
    }
    else {
      this.language = 'fr';
    }
    this._translateLanguage();
  }

  async loadDataApi() {
    document.querySelector('#waitingtext').textContent = this.settings_download_waiting;
    await this.apiService.getAbout().subscribe(async (data) => {
      await this.storeContent('about', data, 'sound');
    });
    await this.apiService.getAboutResources().subscribe(async (data) => {
      await this.storeContent('about_resources', data, 'link');
    });
    await this.apiService.getPartnerCategory().subscribe(async (data) => {
      await this.storeContent('partner_categories', data, 'image');
      await this.storeContent('partner_categories', data, 'sound');
    });
    await this.apiService.getPartners().subscribe(async (data) => {
      await this.storeContent('partners', data, 'sound');
    });
    await this.apiService.getCategories().subscribe(async (data) => {
      await this.storeContent('categories', data, 'sound');
    });
    await this.apiService.getSubCategories().subscribe(async (data) => {
      await this.storeContent('sub_categories', data, 'sound');
    });
    await this.apiService.getProducts().subscribe(async (data) => {
      await this.storeContent('products', data, 'image');
    });
    await this.apiService.getSliders().subscribe(async (data) => {
      await this.storeContent('sliders', data, 'image');
    });
    await this.apiService.getSettings().subscribe();
    await this.apiService.getLocale().subscribe((data) => {
      this.locales = data;
    });
    await this.apiService.getPromotions().subscribe();
    await this.apiService.getResources().subscribe(async (data) => {
      await this.storeContent('resources', data, 'link');
      document.querySelector('#waitingtext').textContent = this.settings_download_done;
    });
  }

  async deleteLocalData() {
    await this.storage.clear();
  }

  async getFile(url: string) {
    const http = this.http;
    return new Promise(function(resolve, reject) {
      const res = http.get(url, {responseType: 'blob'});
      resolve(res);
    });
  }

  async storeContent(key: string, data: Array<any>, linkKey: string){
    for (let i = 0; i < data.length; i++) {
      if (data[i][linkKey] !== null){
        await this.getFile(STORE_URL + data[i][linkKey]).then(async (item: Observable<string>) => {
          await item.forEach(blob => {
            data[i][linkKey] = blob;
          });
        });
      }
    }
    await this.apiService.setLocalData(key, data);
  }

  setLocale(code: string){
    this.localeService.setLocalData('locale', code);
    this.locale = code;
    this._translateLanguage();
  }
}