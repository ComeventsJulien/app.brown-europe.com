import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment as env } from '../../environments/environment';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  constructor(
    private storage: Storage,
    private apiService: ApiService
  ) { }

  async loadFromAPI() {
    return new Promise((resolve) => {
      this.apiService.getAbout().subscribe(async (data) => {
        for (let item of data) item['sound'] = await this.apiService.getFile(item['sound']);
        await this.setLocalData('about', data);
      });

      this.apiService.getGUI().subscribe(async (data) => {
        await this.setLocalData('guis', data);
      });

      this.apiService.getPartnerCategory().subscribe(async (data) => {
        for (let item of data) item['image'] = await this.apiService.getFile(item['image']);
        for (let item of data) item['sound'] = await this.apiService.getFile(item['sound']);
        await this.setLocalData('partner_categories', data);
      });

      this.apiService.getPartners().subscribe(async (data) => {
        for (let item of data) item['sound'] = await this.apiService.getFile(item['sound']);
        await this.setLocalData('partners', data);
      });

      this.apiService.getCategories().subscribe(async (data) => {
        for (let item of data) item['sound'] = await this.apiService.getFile(item['sound']);
        await this.setLocalData('categories', data);
      });

      this.apiService.getSubCategories().subscribe(async (data) => {
        for (let item of data) item['sound'] = await this.apiService.getFile(item['sound']);
        await this.setLocalData('sub_categories', data);
      });

      this.apiService.getProducts().subscribe(async (data) => {
        for (let item of data) item['image'] = await this.apiService.getFile(item['image']);
        await this.setLocalData('products', data);
      });

      this.apiService.getSliders().subscribe(async (data) => {
        for (let item of data) item['image'] = await this.apiService.getFile(item['image']);
        await this.setLocalData('sliders', data);
      });

      this.apiService.getSettings().subscribe(async (data) => {
        await this.setLocalData('settings', data);
      });

      this.apiService.getLocale().subscribe(async (data) => {
        await this.setLocalData('locales', data);
      });

      this.apiService.getResources().subscribe(async (data) => {
        for (let item of data) item['link'] = await this.apiService.getFile(item['link']);
        await this.setLocalData('resources', data);
        resolve('finish');
      });
    })
  }

  async setLocalData(key: string, data: any) {
    this.storage.set(`${env.storageKey}-${key}`, data);
  }

  async getLocalData(key: string) {
    return this.storage.get(`${env.storageKey}-${key}`);
  }

  async clear() {
    return await this.storage.clear();
  }

  async getLocales() {
    return await this.getLocalData('locales');
  }

  async getLocale() {
    return await this.getLocalData('locale');
  }

  async getAbout() {
    let locale = await this.getLocale();
    let about = await this.getLocalData('about');
    if (locale != 'fr') {
      about = about.map(item => {
        let index = item.aboutTranslates.findIndex(translate => translate.locale.code == locale);
        return Object.assign(item, item.aboutTranslates[index]);
      });
    }

    return about;
  }

  async getAboutOne(id) {
    let locale = await this.getLocale();
    let about = await this.getLocalData('about');
    let aboutOne = about[about.findIndex(item => item.id == id)];

    if (locale != 'fr') {
      let index = aboutOne.aboutTranslates.findIndex(translate => translate.locale.code == locale);
      aboutOne = Object.assign(aboutOne, aboutOne.aboutTranslates[index]);
    }

    return aboutOne;
  }

  async getResources() {
    return await this.getLocalData('resources');
  }

  async getResourceOne(id) {
    let resources = await this.getResources();
    return resources[resources.findIndex(item => item.id == id)];
  }

  async getPartnerCategories() {
    let locale = await this.getLocale();
    let partnerCategories = await this.getLocalData('partner_categories');

    if (locale != 'fr') {
      partnerCategories = partnerCategories.map(item => {
        let index = item.partnerCategoryTranslates.findIndex(translate => translate.locale.code == locale);
        return Object.assign(item, item.partnerCategoryTranslates[index]);
      });
    }

    return partnerCategories;
  }

  async getPartnerCategoryOne(id) {
    let locale = await this.getLocale();
    let partnerCategories = await this.getLocalData('partner_categories');
    let partnerCategory = partnerCategories[partnerCategories.findIndex(item => item.id == id)];

    if (locale != 'fr') {
      let index = partnerCategory.partnerCategoryTranslates.findIndex(translate => translate.locale.code == locale);
      partnerCategory = Object.assign(partnerCategory, partnerCategory.partnerCategoryTranslates[index]);
    }

    return partnerCategory;
  }

  async getPartners() {
    let locale = await this.getLocale();
    let partners = await this.getLocalData('partners');
    
    if (locale != 'fr') {
      partners = partners.map(item => {
        let index = item.partnerTranslates.findIndex(translate => translate.locale.code == locale);
        return Object.assign(item, item.partnerTranslates[index]);
      });
    }

    return partners;
  }

  async getPartnerOne(id) {
    let locale = await this.getLocale();
    let partners = await this.getLocalData('partners');
    let partner = partners[partners.findIndex(item => item.id == id)];

    if (locale != 'fr') {
      let index = partner.partnerTranslates.findIndex(translate => translate.locale.code == locale);
      partner = Object.assign(partner, partner.partnerTranslates[index]);
    }

    return partner;
  }

  async getCategories() {
    let locale = await this.getLocale();
    let categories = await this.getLocalData('categories');

    if (locale != 'fr') {
      categories = categories.map(item => {
        let index = item.translations.findIndex(translate => translate.locale.code == locale);
        return Object.assign(item, item.translations[index]);
      });
    }

    return categories;
  }

  async getCategoryOne(id) {
    let locale = await this.getLocale();
    let categories = await this.getLocalData('categories');
    let category = categories[categories.findIndex(item => item.id == id)];
  
    if (locale != 'fr') {
      let index = category.translations.findIndex(translate => translate.locale.code == locale);
      category = Object.assign(category, category.translations[index]);
    }

    return category;
  }

  async getSubCategories() {
    let locale = await this.getLocale();
    let subCategories = await this.getLocalData('sub_categories');

    if (locale != 'fr') {
      subCategories = subCategories.map(item => {
        let index = item.subCategoryTranslates.findIndex(translate => translate.locale.code == locale);
        return Object.assign(item, item.subCategoryTranslates[index]);
      });
    }

    return subCategories;
  }

  async getSubCategoryOne(id) {
    let locale = await this.getLocale();
    let subCategories = await this.getLocalData('sub_categories');
    let subCategory = subCategories[subCategories.findIndex(item => item.id == id)];

    if (locale != 'fr') {
      let index = subCategory.subCategoryTranslates.findIndex(translate => translate.locale.code == locale);
      subCategory = Object.assign(subCategory, subCategory.subCategoryTranslates[index]);
    }

    return subCategory;
  }

  async getProducts() {
    let locale = await this.getLocale();
    let products = await this.getLocalData('products');

    if (locale != 'fr') {
      products = products.map(item => {
        let index = item.productTranslates.findIndex(translate => translate.locale.code == locale);
        return Object.assign(item, item.productTranslates[index]);
      });
    }

    return products;
  }

  async getProductOne(id) {
    let locale = await this.getLocale();
    let products = await this.getLocalData('products');
    let product = products[products.findIndex(item => item.id == id)];

    if (locale != 'fr') {
      let index = product.productTranslates.findIndex(translate => translate.locale.code == locale);
      product = Object.assign(product, product.productTranslates[index]);
    }

    return product;
  }

  async getSliders() {
    return await this.getLocalData('sliders');
  }

  async getGUIS() {
    let locale = await this.getLocale();
    let guis = await this.getLocalData('guis');

    if (locale != 'fr') {
      guis = guis.map(item => {
        let index = item.translations.findIndex(translate => translate.locale.code == locale);
        return Object.assign(item, item.translations[index]);
      });
    }

    return guis;
  }

  async getGUIText(name) {
    let locale = await this.getLocale();
    let guis = await this.getLocalData('guis');
    let gui = guis[guis.findIndex(item => item.name == name)];

    if (locale != 'fr') {
      let index = gui.guiTranslates.findIndex(translate => translate.locale.code == locale);
      gui = Object.assign(gui, gui.guiTranslates[index]);
    }

    return gui.text;
  }
}