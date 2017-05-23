import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationfromsupplierdialogsdocumentsComponent } from './quotationfromsupplierdialogsdocuments.component';

describe('QuotationfromsupplierdialogsdocumentsComponent', () => {
  let component: QuotationfromsupplierdialogsdocumentsComponent;
  let fixture: ComponentFixture<QuotationfromsupplierdialogsdocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationfromsupplierdialogsdocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationfromsupplierdialogsdocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
