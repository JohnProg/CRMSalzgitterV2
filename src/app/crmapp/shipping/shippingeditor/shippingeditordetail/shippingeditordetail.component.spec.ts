import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingeditordetailComponent } from './shippingeditordetail.component';

describe('ShippingeditordetailComponent', () => {
  let component: ShippingeditordetailComponent;
  let fixture: ComponentFixture<ShippingeditordetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingeditordetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingeditordetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
