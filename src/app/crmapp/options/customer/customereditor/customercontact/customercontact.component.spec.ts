import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomercontactComponent } from './customercontact.component';

describe('CustomercontactComponent', () => {
  let component: CustomercontactComponent;
  let fixture: ComponentFixture<CustomercontactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomercontactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomercontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
