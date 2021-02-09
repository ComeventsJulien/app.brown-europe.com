import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategorieOnePage } from './categorie-one.page';

describe('CategorieOnePage', () => {
  let component: CategorieOnePage;
  let fixture: ComponentFixture<CategorieOnePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorieOnePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategorieOnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
