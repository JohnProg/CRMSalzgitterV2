import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerdeliverypointComponent } from './customerdeliverypoint.component';

describe('CustomerdeliverypointComponent', () => {
  let component: CustomerdeliverypointComponent;
  let fixture: ComponentFixture<CustomerdeliverypointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerdeliverypointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerdeliverypointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
