import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingeditorComponent } from './shippingeditor.component';

describe('ShippingeditorComponent', () => {
  let component: ShippingeditorComponent;
  let fixture: ComponentFixture<ShippingeditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingeditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
