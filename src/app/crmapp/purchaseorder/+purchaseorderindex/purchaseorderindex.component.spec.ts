import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseorderindexComponent } from './purchaseorderindex.component';

describe('PurchaseorderindexComponent', () => {
  let component: PurchaseorderindexComponent;
  let fixture: ComponentFixture<PurchaseorderindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseorderindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseorderindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
