import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomermarketComponent } from './customermarket.component';

describe('CustomermarketComponent', () => {
  let component: CustomermarketComponent;
  let fixture: ComponentFixture<CustomermarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomermarketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomermarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
