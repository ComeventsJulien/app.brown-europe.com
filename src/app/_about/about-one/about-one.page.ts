import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuComponent } from '../../menu/menu.component';
import { Router, ActivatedRoute } from '@angular/router';
import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-about-one',
  templateUrl: './about-one.page.html',
  styleUrls: ['./about-one.page.scss'],
})
export class AboutOnePage implements ViewWillEnter {
  item: any;
  itemResources = [];

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, public menu: MenuComponent, private localeService: LocaleService) { }

  async ionViewWillEnter() {
    this.itemResources = [];
    this.item = await this.localeService.getAboutOne(this.route.snapshot.paramMap.get('id'));
    this.item.resources.forEach(async (element) => {
      let resource = await this.localeService.getResourceOne(element.id);
      resource.link = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(resource.link));
      this.itemResources.push(resource);
    });

    this.itemResources.sort((a, b) => {
      if (a.position > b.position) return 1;
      if (b.position > a.position) return -1;
      return 0;
    });
  }

  async ionViewDidLeave() {
    this.item = null;
    this.itemResources = [];
  }
}