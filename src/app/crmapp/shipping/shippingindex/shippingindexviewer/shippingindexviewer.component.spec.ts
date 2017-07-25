import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingindexviewerComponent } from './shippingindexviewer.component';

describe('ShippingindexviewerComponent', () => {
  let component: ShippingindexviewerComponent;
  let fixture: ComponentFixture<ShippingindexviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingindexviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingindexviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
