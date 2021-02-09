import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategorieOnePageRoutingModule } from './categorie-one-routing.module';

import { CategorieOnePage } from './categorie-one.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategorieOnePageRoutingModule
  ],
  declarations: [CategorieOnePage]
})
export class CategorieOnePageModule {}
