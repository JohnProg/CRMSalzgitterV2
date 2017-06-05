import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationtocustomereditrdialogsComponent } from './quotationtocustomereditrdialogs.component';

describe('QuotationtocustomereditrdialogsComponent', () => {
  let component: QuotationtocustomereditrdialogsComponent;
  let fixture: ComponentFixture<QuotationtocustomereditrdialogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationtocustomereditrdialogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationtocustomereditrdialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
