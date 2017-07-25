import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerproductComponent } from './customerproduct.component';

describe('CustomerproductComponent', () => {
  let component: CustomerproductComponent;
  let fixture: ComponentFixture<CustomerproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
