import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { MenuComponent } from '../../menu/menu.component';
import { LocaleService } from '../../services/locale.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements ViewWillEnter {
  title = '';
  about = [];

  constructor(public menu: MenuComponent, private router: Router, private localeService: LocaleService) { }

  async ionViewWillEnter() {
    this.title = await this.localeService.getGUIText('APP_ABOUT_TITLE');
    this.about = await this.localeService.getAbout();
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
