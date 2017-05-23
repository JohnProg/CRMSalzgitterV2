import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationfromsupplierheaderComponent } from './quotationfromsupplierheader.component';

describe('QuotationfromsupplierheaderComponent', () => {
  let component: QuotationfromsupplierheaderComponent;
  let fixture: ComponentFixture<QuotationfromsupplierheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationfromsupplierheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationfromsupplierheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
