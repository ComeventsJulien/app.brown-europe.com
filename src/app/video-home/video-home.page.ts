import {Component, OnInit, Sanitizer} from '@angular/core';
import { Router } from '@angular/router';
import {LocaleService} from '../services/locale.service';
import {HttpClient} from '@angular/common/http';
import {ViewWillEnter} from '@ionic/angular';
import {Observable} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';
const STORE_URL = 'https://oe2vlafafp.preview.infomaniak.website/uploads/images/';

@Component({
  selector: 'app-video-home',
  templateUrl: './video-home.page.html',
  styleUrls: ['./video-home.page.scss'],
})
export class VideoHomePage implements ViewWillEnter {

  video: any;
  constructor(private router: Router, private localeService : LocaleService, private http: HttpClient, private sanitizer:DomSanitizer) { }

  loadHome(){
    let audioPlayer = <HTMLVideoElement>document.getElementById('home-video')
    audioPlayer.pause()
    this.router.navigate(['/home']);
  }

  async ionViewWillEnter() {
    let localVideo = await this.localeService.getLocalData('home_video')
    if(localVideo){
      this.video = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(localVideo));
    }else{
      await this.getVideo(STORE_URL + 'home.mp4').then(async (item: Observable<string>) => {
        await item.forEach(blob => {
          this.localeService.setLocalData('home_video', blob)
          this.video = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
        });
      });
    }


  }

  async getVideo(url: string) {
    const http = this.http;
    return new Promise(function(resolve, reject) {
      const res = http.get(url, {responseType: 'blob'});
      resolve(res);
    });
  }

}
