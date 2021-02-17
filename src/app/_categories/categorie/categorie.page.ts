import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuComponent } from '../../menu/menu.component';
import { ViewWillEnter } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.page.html',
  styleUrls: ['./categorie.page.scss'],
})
export class CategoriePage implements ViewWillEnter {
  settings = {};
  category: any;
  subCategories = [];

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router, public menu: MenuComponent, private dataService: DataService) { }

  async ionViewWillEnter() {
    this.subCategories = [];
    this.settings = await this.dataService.getSettings();
    this.category = await this.dataService.getCategoryOne(this.route.snapshot.paramMap.get('id'));
    this.category.subCategories.forEach(async (subCategory) => {
      this.subCategories.push(await this.dataService.getSubCategoryOne(subCategory.id));
    });
  
    if (this.category.sound) {
      this.category.sound = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.category.sound));
    }
  }
  
  async ionViewDidLeave() {
    this.category = null;
    this.subCategories = [];
  }

  loadItem(id) {
    if (this.category.sound) {
      let audioPlayer = <HTMLVideoElement>document.getElementById('audio')
      audioPlayer.pause()
    }
    this.router.navigate(['/sub-categorie', { id: id }]);
  }
}