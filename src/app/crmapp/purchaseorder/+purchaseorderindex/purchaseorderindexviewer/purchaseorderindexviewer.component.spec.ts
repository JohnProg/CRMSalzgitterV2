import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseorderindexviewerComponent } from './purchaseorderindexviewer.component';

describe('PurchaseorderindexviewerComponent', () => {
  let component: PurchaseorderindexviewerComponent;
  let fixture: ComponentFixture<PurchaseorderindexviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseorderindexviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseorderindexviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
