import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationtocustomereditorheaderComponent } from './quotationtocustomereditorheader.component';

describe('QuoationtocustomereditorheaderComponent', () => {
  let component: QuotationtocustomereditorheaderComponent;
  let fixture: ComponentFixture<QuotationtocustomereditorheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationtocustomereditorheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationtocustomereditorheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
