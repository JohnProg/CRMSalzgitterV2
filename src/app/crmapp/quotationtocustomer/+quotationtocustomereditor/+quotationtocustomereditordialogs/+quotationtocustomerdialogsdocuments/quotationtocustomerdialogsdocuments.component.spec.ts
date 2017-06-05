import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationtocustomerdialogsdocumentsComponent } from './quotationtocustomerdialogsdocuments.component';

describe('QuotationtocustomerdialogsdocumentsComponent', () => {
  let component: QuotationtocustomerdialogsdocumentsComponent;
  let fixture: ComponentFixture<QuotationtocustomerdialogsdocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationtocustomerdialogsdocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationtocustomerdialogsdocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
