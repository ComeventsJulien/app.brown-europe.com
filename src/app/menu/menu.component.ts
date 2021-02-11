import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MenuPagePage } from '../menu-page/menu-page.page';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(public modalController: ModalController) {
  }

  ngOnInit(): void {
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: MenuPagePage,
      cssClass: 'my-custom-modal-css'
    });
    return await modal.present();
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
