import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategorieOnePage } from './categorie-one.page';

const routes: Routes = [
  {
    path: '',
    component: CategorieOnePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategorieOnePageRoutingModule {}
