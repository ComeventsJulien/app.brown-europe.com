import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { LocaleService } from '../../services/locale.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-partner-one',
  templateUrl: './partner-one.page.html',
  styleUrls: ['./partner-one.page.scss'],
})
export class PartnerOnePage implements ViewWillEnter {
  partner: any = null;
  partnerResources: any[] = [];

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private localeService: LocaleService) { }

  async ionViewWillEnter() {
    this.partnerResources = [];
    this.partner = await this.localeService.getPartnerOne(this.route.snapshot.paramMap.get('id'));
    this.partner.resources.forEach(async (element) => {
      let resource = await this.localeService.getResourceOne(element.id);
      resource.link = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(resource.link));
      this.partnerResources.push(resource);
    });

    this.partnerResources.sort((a, b) => {
      if (a.position > b.position) return 1;
      if (b.position > a.position) return -1;
      return 0;
    });

    if (this.partner.sound) {
      this.partner.sound = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.partner.sound));
    }

    if (this.partner.description) {
      this.partner.description = this.sanitizer.bypassSecurityTrustHtml(this.partner.description)
    }
  }

  async ionViewDidLeave() {
    this.partner = null;
    this.partnerResources = [];
  }
}
