import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationfromsupplierdetailsumaryComponent } from './quotationfromsupplierdetailsumary.component';

describe('QuotationfromsupplierdetailsumaryComponent', () => {
  let component: QuotationfromsupplierdetailsumaryComponent;
  let fixture: ComponentFixture<QuotationfromsupplierdetailsumaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationfromsupplierdetailsumaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationfromsupplierdetailsumaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
