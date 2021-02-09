import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MenuComponent } from '../../menu/menu.component';
import { ViewWillEnter } from '@ionic/angular';
import { LocaleService } from '../../services/locale.service';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.page.html',
  styleUrls: ['./categorie.page.scss'],
})
export class CategoriePage implements ViewWillEnter {

  item : any;
  title: string;
  subcategories: Array<string>
  language: string
  locale: string
  selectedCategory: any;
  settings: any;

  constructor(private route: ActivatedRoute, private sanitizer:DomSanitizer, private apiService : ApiService, private router: Router, public menu: MenuComponent, private localeService: LocaleService, private _translate: TranslateService) { }

  async ionViewWillEnter() {
    this.settings = await this.apiService.getLocalData('settings');
    var categories = await this.apiService.getLocalData('categories');
    this.item = categories[categories.findIndex(item => item.id == this.route.snapshot.paramMap.get('category'))];
    this.subcategories = this.item.subCategories;

    if (this.settings[0].sound && this.item.sound!==null) {
      this.item.sound = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.item.sound));
    }
  }

  loadItem(index:string) {
    if (this.settings[0].sound && this.item.sound!==null){
      let audioPlayer = <HTMLVideoElement>document.getElementById('audio')
      audioPlayer.pause()
    }
    this.router.navigate(['/categorie-one', { sub_category: index }]);
  }

  loadPromotions(){
    if (this.settings[0].sound && this.item.sound!==null){
      let audioPlayer = <HTMLVideoElement>document.getElementById('audio')
      audioPlayer.pause()
    }
    this.router.navigate(['/promotions', { category: this.route.snapshot.paramMap.get('category'), title: this.title }]);
  }
}
