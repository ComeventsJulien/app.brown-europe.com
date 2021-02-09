import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./_categories/categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'categorie',
    loadChildren: () => import('./_categories/categorie/categorie.module').then( m => m.CategoriePageModule)
  },
  {
    path: 'categorie-one',
    loadChildren: () => import('./_categories/categorie-one/categorie-one.module').then( m => m.CategorieOnePageModule)
  },
  {
    path: 'menu-page',
    loadChildren: () => import('./menu-page/menu-page.module').then( m => m.MenuPagePageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./_about/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'partners',
    loadChildren: () => import('./_partners/partners/partners.module').then( m => m.PartnersPageModule)
  },
  {
    path: 'partner',
    loadChildren: () => import('./_partners/partner/partner.module').then( m => m.PartnerPageModule)
  },
  {
    path: 'partner-one',
    loadChildren: () => import('./_partners/partner-one/partner-one.module').then( m => m.PartnerOnePageModule)
  },
  {
    path: 'promotions',
    loadChildren: () => import('./promotions/promotions.module').then( m => m.PromotionsPageModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./_categories/product/product.module').then( m => m.ProductPageModule)
  },
  {
    path: 'promotion-one',
    loadChildren: () => import('./promotion-one/promotion-one.module').then( m => m.PromotionOnePageModule)
  },
  {
    path: 'video-home',
    loadChildren: () => import('./video-home/video-home.module').then( m => m.VideoHomePageModule)
  },
  {
    path: 'sliders',
    loadChildren: () => import('./sliders/sliders.module').then( m => m.SlidersPageModule)
  },
  {
    path: 'about-one',
    loadChildren: () => import('./_about/about-one/about-one.module').then( m => m.AboutOnePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
