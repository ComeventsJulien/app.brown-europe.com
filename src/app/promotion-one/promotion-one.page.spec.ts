import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PromotionOnePage } from './promotion-one.page';

describe('PromotionOnePage', () => {
  let component: PromotionOnePage;
  let fixture: ComponentFixture<PromotionOnePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionOnePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PromotionOnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
