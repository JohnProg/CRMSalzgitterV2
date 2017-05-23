import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationfromsupplierComponent } from './quotationtfromupplier.component';

describe('QuotationfromsupplierComponent', () => {
  let component: QuotationfromsupplierComponent;
  let fixture: ComponentFixture<QuotationfromsupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationfromsupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationfromsupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
