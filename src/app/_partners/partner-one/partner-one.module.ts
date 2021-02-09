import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartnerOnePageRoutingModule } from './partner-one-routing.module';

import { PartnerOnePage } from './partner-one.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartnerOnePageRoutingModule
  ],
  declarations: [PartnerOnePage]
})
export class PartnerOnePageModule {}
