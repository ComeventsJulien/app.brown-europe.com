import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutOnePage } from './about-one.page';

const routes: Routes = [
  {
    path: '',
    component: AboutOnePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutOnePageRoutingModule {}
