import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuComponent } from '../../menu/menu.component';
import { PartnerCategory } from '../../interfaces/partner_category';
import { LocaleService } from '../../services/locale.service';
import { TranslateService } from '@ngx-translate/core';
import { ViewWillEnter } from '@ionic/angular';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-partner-one',
  templateUrl: './partner-one.page.html',
  styleUrls: ['./partner-one.page.scss'],
})
export class PartnerOnePage implements ViewWillEnter {

  category : PartnerCategory;
  selectedCategory: string;
  partner : any;
  title : string;
  ressources : Array<object> = [];
  language: string;
  locale: string;
  settings: any;
  partners: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private apiService : ApiService, private router: Router, private sanitizer:DomSanitizer, public menu: MenuComponent, private localeService: LocaleService, private _translate: TranslateService) { }

  async ionViewWillEnter() {
    this.selectedCategory = this.route.snapshot.paramMap.get('category');
    this.title =  this.route.snapshot.paramMap.get('title');
    this.partners = await this.apiService.getLocalData('partners');
    let resources = await this.apiService.getLocalData('resources');
    this.settings = await this.apiService.getLocalData('settings');

    var itemIndex = this.partners.findIndex(item => item.id == this.route.snapshot.paramMap.get('partner') );
    this.partner = this.partners[itemIndex];

    this.ressources = [];
    this.partner.resources.forEach(element => {
      var ressourceIndex = resources.findIndex(ressource => ressource["@id"] == element["@id"]);
      let ressource = resources[ressourceIndex];
      ressource.link = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(ressource.link));
      this.ressources.push(resources[ressourceIndex])
    });

    if(await this.localeService.getLocalData('locale'))
      this.locale = await this.localeService.getLocalData('locale');
          
    if(this.locale!= "fr"){
      let res = [];
      const locale = this.locale;
      if(this.partner.partnerTranslates!== undefined){
        var index = this.partner.partnerTranslates.findIndex(function(translate) {
          return translate.locale.code == locale
        });
        if(index!==-1){
          this.partner.partnerTranslates[index].partner = this.partner;
          this.partner = this.partner.partnerTranslates[index]
        }
      }
    }

    if(this.partner.sound !== null){
      this.partner.sound = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.partner.sound));
    }

    this.partner.description = this.sanitizer.bypassSecurityTrustHtml(this.partner.description)
  }

  async getFile(url: string) {
    const http = this.http;
    return new Promise(function(resolve, reject) {
      const res = http.get(url, {responseType: 'blob'});
      resolve(res);
    });
  }
}
