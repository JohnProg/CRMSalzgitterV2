import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersectorComponent } from './customersector.component';

describe('CustomersectorComponent', () => {
  let component: CustomersectorComponent;
  let fixture: ComponentFixture<CustomersectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
