import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MenuComponent } from '../../menu/menu.component';
import { LocaleService } from '../../services/locale.service';
import { TranslateService } from '@ngx-translate/core';
import { ViewWillEnter } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.page.html',
  styleUrls: ['./partner.page.scss'],
})
export class PartnerPage implements ViewWillEnter {

  item: any;
  title: string;
  locale: string;
  language: string;
  partners: unknown[];
  settings: any;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private apiService: ApiService, private router: Router, public menu: MenuComponent, private localeService: LocaleService, private _translate: TranslateService) { }

  async ionViewWillEnter() {
    this.item = await this.apiService.getLocalData('partner_categories');
    var itemIndex = this.item.findIndex(item => item.id == this.route.snapshot.paramMap.get('category') );
    this.item = this.item[itemIndex];

    this.settings = await this.apiService.getLocalData('settings');
    this.title =  this.route.snapshot.paramMap.get('title');

    this.partners = this.item.partners;
    this.partners= Object.values(this.item.partners);

    if (this.item.image !== null)
      this.item.image = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.item.image));

    if (this.settings[0].sound && this.item.sound!==null)
      this.item.sound = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.item.sound));

    if (this.item.description !== null)
        this.item.description = this.sanitizer.bypassSecurityTrustHtml(this.item.description);
  }

  loadItem(index) {
    let audioPlayer = <HTMLVideoElement>document.getElementById('audio')
    if(audioPlayer) audioPlayer.pause()
    this.router.navigate(['/partner-one', { category: this.route.snapshot.paramMap.get('category'), partner: index, title: this.route.snapshot.paramMap.get('title') }]);
  }
}