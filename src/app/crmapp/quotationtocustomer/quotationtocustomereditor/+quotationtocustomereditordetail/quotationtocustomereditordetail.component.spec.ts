import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationtocustomereditordetailComponent } from './quotationtocustomereditordetail.component';

describe('QuotationtocustomereditordetailComponent', () => {
  let component: QuotationtocustomereditordetailComponent;
  let fixture: ComponentFixture<QuotationtocustomereditordetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationtocustomereditordetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationtocustomereditordetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
