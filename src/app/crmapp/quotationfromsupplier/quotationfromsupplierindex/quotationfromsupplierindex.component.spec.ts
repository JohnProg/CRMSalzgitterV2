import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationfromsupplierindexComponent } from './quotationfromsupplierindex.component';

describe('QuotationfromsupplierindexComponent', () => {
  let component: QuotationfromsupplierindexComponent;
  let fixture: ComponentFixture<QuotationfromsupplierindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationfromsupplierindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationfromsupplierindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
