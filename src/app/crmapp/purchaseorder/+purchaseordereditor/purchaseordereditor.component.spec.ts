import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseordereditorComponent } from './purchaseordereditor.component';

describe('PurchaseordereditorComponent', () => {
  let component: PurchaseordereditorComponent;
  let fixture: ComponentFixture<PurchaseordereditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseordereditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseordereditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
