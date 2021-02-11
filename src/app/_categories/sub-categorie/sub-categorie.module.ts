import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SubCategoriePageRoutingModule } from './sub-categorie-routing.module';
import { SubCategoriePage } from './sub-categorie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubCategoriePageRoutingModule
  ],
  declarations: [SubCategoriePage]
})
export class SubCategoriePageModule {}
