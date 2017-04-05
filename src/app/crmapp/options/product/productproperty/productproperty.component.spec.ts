import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductpropertyComponent } from './productproperty.component';

describe('ProductpropertyComponent', () => {
  let component: ProductpropertyComponent;
  let fixture: ComponentFixture<ProductpropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductpropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductpropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
