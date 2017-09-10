import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerproductpriceComponent } from './customerproductprice.component';

describe('CustomerproductpriceComponent', () => {
  let component: CustomerproductpriceComponent;
  let fixture: ComponentFixture<CustomerproductpriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerproductpriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerproductpriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
