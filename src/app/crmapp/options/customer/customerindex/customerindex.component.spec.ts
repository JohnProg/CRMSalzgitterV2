import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerindexComponent } from './customerindex.component';

describe('CustomerindexComponent', () => {
  let component: CustomerindexComponent;
  let fixture: ComponentFixture<CustomerindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
