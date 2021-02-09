import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AboutOnePage } from './about-one.page';

describe('AboutOnePage', () => {
  let component: AboutOnePage;
  let fixture: ComponentFixture<AboutOnePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutOnePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutOnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
