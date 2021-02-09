import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutOnePageRoutingModule } from './about-one-routing.module';

import { AboutOnePage } from './about-one.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutOnePageRoutingModule
  ],
  declarations: [AboutOnePage]
})
export class AboutOnePageModule {}
