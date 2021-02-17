import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuComponent } from '../../menu/menu.component';
import { DataService } from '../../services/data.service';
import { ViewWillEnter } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.page.html',
  styleUrls: ['./partner.page.scss'],
})
export class PartnerPage implements ViewWillEnter {
  settings = {};
  partnerCategory: any;
  partners = [];

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router, public menu: MenuComponent, private dataService: DataService) { }

  async ionViewWillEnter() {
    this.partners = [];
    this.settings = await this.dataService.getSettings();
    this.partnerCategory = await this.dataService.getPartnerCategoryOne(this.route.snapshot.paramMap.get('id'));
    this.partnerCategory.partners.forEach(async (partner) => {
      this.partners.push(await this.dataService.getPartnerOne(partner.id));
    });

    if (this.partnerCategory.image) {
      this.partnerCategory.image = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.partnerCategory.image));
    }

    if (this.partnerCategory.sound) {
      this.partnerCategory.sound = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.partnerCategory.sound));
    }

    if (this.partnerCategory.description !== null) {
      this.partnerCategory.description = this.sanitizer.bypassSecurityTrustHtml(this.partnerCategory.description);
    }
  }

  async ionViewDidLeave() {
    this.partnerCategory = null;
    this.partners = [];
  }

  loadItem(id) {
    let audioPlayer = <HTMLVideoElement>document.getElementById('audio');
    if (audioPlayer) audioPlayer.pause();
    this.router.navigate(['/partner-one', { id: id }]);
  }
}