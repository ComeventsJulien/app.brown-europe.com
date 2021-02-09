import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromotionOnePage } from './promotion-one.page';

const routes: Routes = [
  {
    path: '',
    component: PromotionOnePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromotionOnePageRoutingModule {}
