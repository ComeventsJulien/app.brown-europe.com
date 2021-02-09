import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartnerOnePage } from './partner-one.page';

const routes: Routes = [
  {
    path: '',
    component: PartnerOnePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartnerOnePageRoutingModule {}
