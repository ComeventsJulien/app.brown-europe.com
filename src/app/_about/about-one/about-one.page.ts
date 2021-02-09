import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { MenuComponent } from '../../menu/menu.component';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { LocaleService } from '../../services/locale.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about-one',
  templateUrl: './about-one.page.html',
  styleUrls: ['./about-one.page.scss'],
})
export class AboutOnePage implements ViewWillEnter {
  slider: any;
  about: any;
  item: any;
  ressources: any[];
  locale: any;

  constructor(private route: ActivatedRoute, private apiService: ApiService, public menu: MenuComponent, private router: Router, private sanitizer:DomSanitizer, private localeService: LocaleService, private _translate: TranslateService) { }

  async ionViewWillEnter() {
    this.about = await this.apiService.getLocalData('about');
    let resources = await this.apiService.getLocalData('about_resources');

    var itemIndex = this.about.findIndex(item => item.id == this.route.snapshot.paramMap.get('item') );
    this.item = this.about[itemIndex];

    this.ressources=[]
    resources.forEach(element => {
      element.link = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(element.link));
      this.ressources.push(element)
    });

    this.item.aboutResources.forEach((element, index) => {
      var ressourceIndex = resources.findIndex(ressource => ressource['@id'] == element['@id'])
      let ressource = resources[ressourceIndex];
      if(!ressource.link)
        ressource.link = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(ressource.link));
        this.item.aboutResources[index] = resources[ressourceIndex]
    });

    if(await this.localeService.getLocalData('locale'))
      this.locale = await this.localeService.getLocalData('locale')

    if(this.locale!= "fr"){
      const locale = this.locale;
      if(this.item.aboutTranslates!== undefined){
        var index = this.item.aboutTranslates.findIndex(function(translate) {
          return translate.locale.code == locale
        })
        if(index!==-1){
          this.item.title = this.item.aboutTranslates[index].title;
          this.item.description = this.item.aboutTranslates[index].description;
        }
      }
    }

    function compare(a, b) {
      if (a.position > b.position) return 1;
      if (b.position > a.position) return -1;
    
      return 0;
    }

    this.item.aboutResources.sort(compare);
  }

}
