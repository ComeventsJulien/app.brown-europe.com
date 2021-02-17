import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  primaryColor: string = '#007bff';
  secondaryColor: string = '#6c757d';

  setPrimaryColor(primaryColor) {
    this.primaryColor = primaryColor;
  }

  getPrimaryColor() {
    return this.primaryColor;
  }

  setSecondaryColor(secondaryColor) {
    this.secondaryColor = secondaryColor;
  }

  getSecondaryColor() {
    return this.secondaryColor;
  }
}