import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MillproductComponent } from './millproduct.component';

describe('MillproductComponent', () => {
  let component: MillproductComponent;
  let fixture: ComponentFixture<MillproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MillproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MillproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
