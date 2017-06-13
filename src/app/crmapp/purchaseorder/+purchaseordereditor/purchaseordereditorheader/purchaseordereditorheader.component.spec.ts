import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseordereditorheaderComponent } from './purchaseordereditorheader.component';

describe('PurchaseordereditorheaderComponent', () => {
  let component: PurchaseordereditorheaderComponent;
  let fixture: ComponentFixture<PurchaseordereditorheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseordereditorheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseordereditorheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
