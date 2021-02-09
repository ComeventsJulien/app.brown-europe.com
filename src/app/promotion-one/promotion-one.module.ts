import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PromotionOnePageRoutingModule } from './promotion-one-routing.module';

import { PromotionOnePage } from './promotion-one.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PromotionOnePageRoutingModule
  ],
  declarations: [PromotionOnePage]
})
export class PromotionOnePageModule {}
