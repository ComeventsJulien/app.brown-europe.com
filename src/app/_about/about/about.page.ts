import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { MenuComponent } from '../../menu/menu.component';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements ViewWillEnter {
  settings = {};
  title = '';
  slidersTitle = '';
  about = [];

  constructor(public menu: MenuComponent, private router: Router, private dataService: DataService) { }

  async ionViewWillEnter() {
    this.settings = await this.dataService.getSettings();
    this.title = await this.dataService.getGUIText('APP_ABOUT_TITLE');
    this.slidersTitle = await this.dataService.getGUIText('APP_SLIDERS_TITLE');
    this.about = await this.dataService.getAbout();
  }

  async ionViewDidLeave() {
    this.about = [];
  }

  loadItem(id){
    this.router.navigate(['/about-one', { id: id }]);
  }

  loadSliders(){
    this.router.navigate(['/sliders']);
  }
}
