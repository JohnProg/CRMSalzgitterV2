import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationtocustomerComponent } from './quotationtocustomer.component';

describe('QuotationtocustomerComponent', () => {
  let component: QuotationtocustomerComponent;
  let fixture: ComponentFixture<QuotationtocustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationtocustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationtocustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
