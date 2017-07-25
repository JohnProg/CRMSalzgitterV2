import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerrailspurComponent } from './customerrailspur.component';

describe('CustomerrailspurComponent', () => {
  let component: CustomerrailspurComponent;
  let fixture: ComponentFixture<CustomerrailspurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerrailspurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerrailspurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
