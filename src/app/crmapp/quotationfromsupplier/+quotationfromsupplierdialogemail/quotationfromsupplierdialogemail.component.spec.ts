import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationfromsupplierdialogemailComponent } from './quotationfromsupplierdialogemail.component';

describe('QuotationfromsupplierdialogemailComponent', () => {
  let component: QuotationfromsupplierdialogemailComponent;
  let fixture: ComponentFixture<QuotationfromsupplierdialogemailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationfromsupplierdialogemailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationfromsupplierdialogemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
