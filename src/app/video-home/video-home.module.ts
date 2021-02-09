import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoHomePageRoutingModule } from './video-home-routing.module';

import { VideoHomePage } from './video-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoHomePageRoutingModule
  ],
  declarations: [VideoHomePage]
})
export class VideoHomePageModule {}
