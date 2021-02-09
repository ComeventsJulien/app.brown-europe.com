import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const API_STORAGE_KEY = 'local';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  constructor(private storage: Storage) { }

  setLocalData(key: string, data: any) {
    this.storage.set(`${API_STORAGE_KEY}-${key}`, data);
  }
  
  getLocalData(key: string) {
    return this.storage.get(`${API_STORAGE_KEY}-${key}`);
  }
}
