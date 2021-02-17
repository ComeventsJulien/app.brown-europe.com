import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements ViewWillEnter {
  state: string = 'IDLE';

  constructor(
    private dataService: DataService
  ) { }

  async ionViewWillEnter() { }

  async loadDataApi() {
    this.state = 'WAITING';
    await this.dataService.loadFromAPI().then(async () => {
      this.state = 'DONE'
    });
  }

  async deleteLocalData() {
    await this.dataService.clear();
  }
}