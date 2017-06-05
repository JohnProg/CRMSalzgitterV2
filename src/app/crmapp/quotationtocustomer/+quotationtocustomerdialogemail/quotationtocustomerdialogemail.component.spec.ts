import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationtocustomerdialogemailComponent } from './quotationtocustomerdialogemail.component';

describe('QuotationtocustomerdialogemailComponent', () => {
  let component: QuotationtocustomerdialogemailComponent;
  let fixture: ComponentFixture<QuotationtocustomerdialogemailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationtocustomerdialogemailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationtocustomerdialogemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
