import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseordereditordetailComponent } from './purchaseordereditordetail.component';

describe('PurchaseordereditordetailComponent', () => {
  let component: PurchaseordereditordetailComponent;
  let fixture: ComponentFixture<PurchaseordereditordetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseordereditordetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseordereditordetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
