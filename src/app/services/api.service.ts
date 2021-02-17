import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient
  ) { }

  getResources(forceRefresh: boolean = false): Observable<any[]> {
    return this.http.get(`${env.apiBase}${env.apiFolder}/resources?visible=true`).pipe(
      map(res => res['hydra:member'])
    );
  }

  getSettings(forceRefresh: boolean = false): Observable<any[]> {
    return this.http.get(`${env.apiBase}${env.apiFolder}/settings`).pipe(
      map(res => res['hydra:member'])
    );
  }

  getGUI(forceRefresh: boolean = false): Observable<any[]> {
    return this.http.get(`${env.apiBase}${env.apiFolder}/guis?visible=true`).pipe(
      map(res => res['hydra:member'])
    );
  }

  getPartnerCategory(forceRefresh: boolean = false): Observable<any[]> {
    return this.http.get(`${env.apiBase}${env.apiFolder}/partner_categories?visible=true`).pipe(
      map(res => res['hydra:member'])
    );
  }

  getPartners(forceRefresh: boolean = false): Observable<any[]> {
    return this.http.get(`${env.apiBase}${env.apiFolder}/partners?visible=true`).pipe(
      map(res => res['hydra:member'])
    );
  }

  getCategories(forceRefresh: boolean = false): Observable<any[]> {
    return this.http.get(`${env.apiBase}${env.apiFolder}/categories?visible=true`).pipe(
      map(res => res['hydra:member'])
    );
  }

  getSubCategories(forceRefresh: boolean = false): Observable<any[]> {
    return this.http.get(`${env.apiBase}${env.apiFolder}/sub_categories?visible=true`).pipe(
      map(res => res['hydra:member'])
    );
  }

  getAbout(forceRefresh: boolean = false): Observable<any[]> {
    return this.http.get(`${env.apiBase}${env.apiFolder}/abouts?visible=true`).pipe(
      map(res => res['hydra:member'])
    );
  }

  getSliders(forceRefresh: boolean = false): Observable<any[]> {
    return this.http.get(`${env.apiBase}${env.apiFolder}/sliders?visible=true`).pipe(
      map(res => res['hydra:member'])
    );
  }

  getLocales(forceRefresh: boolean = false): Observable<any[]> {
    return this.http.get(`${env.apiBase}${env.apiFolder}/locales?visible=true`).pipe(
      map(res => res['hydra:member'])
    );
  }

  getProducts() {
    return this.http.get(`${env.apiBase}${env.apiFolder}/products?visible=true`).pipe(
      map(res => res['hydra:member'])
    );
  }

  getFile(filename: string) {
    return new Promise((resolve) => {
      if (!filename) return resolve(null);
      return this.http.get(env.apiBase + env.uploadFileFolder + '/' + filename, { responseType: 'blob' }).subscribe((blob) => {
        return resolve(blob);
      })
    });
  }
}
