import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationfromsupplierdetailComponent } from './quotationfromsupplierdetail.component';

describe('QuotationfromsupplierdetailComponent', () => {
  let component: QuotationfromsupplierdetailComponent;
  let fixture: ComponentFixture<QuotationfromsupplierdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationfromsupplierdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationfromsupplierdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
