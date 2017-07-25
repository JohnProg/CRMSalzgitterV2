import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingindexComponent } from './shippingindex.component';

describe('ShippingindexComponent', () => {
  let component: ShippingindexComponent;
  let fixture: ComponentFixture<ShippingindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
