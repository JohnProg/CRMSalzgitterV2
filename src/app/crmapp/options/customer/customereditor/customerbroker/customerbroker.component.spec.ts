import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerbrokerComponent } from './customerbroker.component';

describe('CustomerbrokerComponent', () => {
  let component: CustomerbrokerComponent;
  let fixture: ComponentFixture<CustomerbrokerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerbrokerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerbrokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
