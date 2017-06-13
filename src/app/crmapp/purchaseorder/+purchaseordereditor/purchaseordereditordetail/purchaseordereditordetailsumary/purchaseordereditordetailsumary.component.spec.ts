import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseordereditordetailsumaryComponent } from './purchaseordereditordetailsumary.component';

describe('PurchaseordereditordetailsumaryComponent', () => {
  let component: PurchaseordereditordetailsumaryComponent;
  let fixture: ComponentFixture<PurchaseordereditordetailsumaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseordereditordetailsumaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseordereditordetailsumaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
