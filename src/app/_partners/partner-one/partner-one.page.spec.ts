import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PartnerOnePage } from './partner-one.page';

describe('PartnerOnePage', () => {
  let component: PartnerOnePage;
  let fixture: ComponentFixture<PartnerOnePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerOnePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PartnerOnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
