import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationtocustomerindexComponent } from './quotationtocustomerindex.component';

describe('QuotationtocustomerindexComponent', () => {
  let component: QuotationtocustomerindexComponent;
  let fixture: ComponentFixture<QuotationtocustomerindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationtocustomerindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationtocustomerindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
