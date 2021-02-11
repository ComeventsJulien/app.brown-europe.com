import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubCategoriePage } from './sub-categorie.page';

const routes: Routes = [
  {
    path: '',
    component: SubCategoriePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubCategoriePageRoutingModule {}
