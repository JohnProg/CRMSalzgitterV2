import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationtocustomereditorComponent } from './quotationtocustomereditor.component';

describe('QuotationtocustomereditorComponent', () => {
  let component: QuotationtocustomereditorComponent;
  let fixture: ComponentFixture<QuotationtocustomereditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationtocustomereditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationtocustomereditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
