import { OfflineManagerService } from './offline-manager.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NetworkService } from './network.service';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const API_STORAGE_KEY = 'sirmet';
const API_URL = 'http://localhost:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private networkService: NetworkService,
    private storage: Storage,
    private offlineManager: OfflineManagerService,
  ) { }

  getResources(forceRefresh: boolean = false): Observable<any[]> {
    return this.http.get(`${API_URL}resources?visible=true`).pipe(
      map(res => res['hydra:member']),
      tap(res => {
        this.setLocalData('resources', res);
      })
    );
  }

  getSettings(forceRefresh: boolean = false): Observable<any[]> {
    return this.http.get(`${API_URL}settings`).pipe(
      map(res => res['hydra:member']),
      tap(res => {
        this.setLocalData('settings', res);
      })
    );
  }

  getPromotions(forceRefresh: boolean = false): Observable<any[]> {
    return this.http.get(`${API_URL}promotions?visible=true`).pipe(
      map(res => res['hydra:member']),
      tap(res => {
        this.setLocalData('promotions', res);
      })
    );
  }

  getAboutResources(forceRefresh: boolean = false): Observable<any[]> {
    return this.http.get(`${API_URL}about_resources?visible=true`).pipe(
      map(res => res['hydra:member']),
      tap(res => {
        this.setLocalData('about_resources', res);
      })
    );
  }

  getPartnerCategory(forceRefresh: boolean = false): Observable<any[]> {
    return this.http.get(`${API_URL}partner_categories?visible=true`).pipe(
      map(res => res['hydra:member']),
      tap(res => {
        this.setLocalData('partner_categories', res);
      })
    );
  }

  getPartner(forceRefresh: boolean = false): Observable<any[]> {
    return this.http.get(`${API_URL}partners?visible=true`).pipe(
      map(res => res['hydra:member']),
      tap(res => {
        this.setLocalData('partners', res);
      })
    );
  }

  getCategories(forceRefresh: boolean = false): Observable<any[]> {
    return this.http.get(`${API_URL}categories?visible=true`).pipe(
      map(res => res['hydra:member']),
      tap(res => {
        this.setLocalData('categories', res);
      })
    );
  }

  getSubCategories(forceRefresh: boolean = false): Observable<any[]> {
    return this.http.get(`${API_URL}sub_categories?visible=true`).pipe(
      map(res => res['hydra:member']),
      tap(res => {
        this.setLocalData('sub_categories', res);
      })
    );
  }

  getAbout(forceRefresh: boolean = false): Observable<any[]> {
    return this.http.get(`${API_URL}abouts?visible=true`).pipe(
      map(res => res['hydra:member']),
      tap(res => {
        this.setLocalData('about', res);
      })
    );
  }

  getSliders(forceRefresh: boolean = false): Observable<any[]> {
    return this.http.get(`${API_URL}sliders?visible=true`).pipe(
      map(res => res['hydra:member']),
      tap(res => {
        this.setLocalData('sliders', res);
      })
    );
  }

  getLocale(forceRefresh: boolean = false): Observable<any[]> {
    return this.http.get(`${API_URL}locales?visible=true`).pipe(
      map(res => res['hydra:member']),
      tap(res => {
        this.setLocalData('locales', res);
      })
    );
  }

  getPartners() {
    return this.http.get(`${API_URL}partners?visible=true`).pipe(
      map(res => res['hydra:member']),
      tap(res => {
        this.setLocalData('partners', res);
      })
    );
  }

  getProducts() {
    return this.http.get(`${API_URL}products?visible=true`).pipe(
      map(res => res['hydra:member']),
      tap(res => {
        this.setLocalData('products', res);
      })
    );
  }

  setLocalData(key, data) {
    this.storage.set(`${API_STORAGE_KEY}-${key}`, data);
  }

  getLocalData(key) {
    return this.storage.get(`${API_STORAGE_KEY}-${key}`);
  }
}
