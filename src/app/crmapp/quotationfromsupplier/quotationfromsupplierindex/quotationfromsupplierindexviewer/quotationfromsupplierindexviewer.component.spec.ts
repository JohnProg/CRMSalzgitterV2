import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationfromsupplierindexviewerComponent } from './quotationfromsupplierindexviewer.component';

describe('QuotationfromsupplierindexviewerComponent', () => {
  let component: QuotationfromsupplierindexviewerComponent;
  let fixture: ComponentFixture<QuotationfromsupplierindexviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationfromsupplierindexviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationfromsupplierindexviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
