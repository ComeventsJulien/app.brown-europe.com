import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VideoHomePage } from './video-home.page';

describe('VideoHomePage', () => {
  let component: VideoHomePage;
  let fixture: ComponentFixture<VideoHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VideoHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
