import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationfromsupplierdialogsComponent } from './quotationfromsupplierdialogs.component';

describe('QuotationfromsupplierdialogsComponent', () => {
  let component: QuotationfromsupplierdialogsComponent;
  let fixture: ComponentFixture<QuotationfromsupplierdialogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationfromsupplierdialogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationfromsupplierdialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
