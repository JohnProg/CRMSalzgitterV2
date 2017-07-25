import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingeditorheaderComponent } from './shippingeditorheader.component';

describe('ShippingeditorheaderComponent', () => {
  let component: ShippingeditorheaderComponent;
  let fixture: ComponentFixture<ShippingeditorheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingeditorheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingeditorheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
