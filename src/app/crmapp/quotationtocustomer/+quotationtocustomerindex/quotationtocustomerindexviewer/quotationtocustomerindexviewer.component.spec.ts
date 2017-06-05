import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationtocustomerindexviewerComponent } from './quotationtocustomerindexviewer.component';

describe('QuotationtocustomerindexviewerComponent', () => {
  let component: QuotationtocustomerindexviewerComponent;
  let fixture: ComponentFixture<QuotationtocustomerindexviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationtocustomerindexviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationtocustomerindexviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
