import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationindexviewerComponent } from './quotationindexviewer.component';

describe('QuotationindexviewerComponent', () => {
  let component: QuotationindexviewerComponent;
  let fixture: ComponentFixture<QuotationindexviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationindexviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationindexviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
