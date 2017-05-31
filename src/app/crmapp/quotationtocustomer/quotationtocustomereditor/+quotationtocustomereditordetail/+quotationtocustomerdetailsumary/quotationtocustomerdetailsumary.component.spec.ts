import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationtocustomerdetailsumaryComponent } from './quotationtocustomerdetailsumary.component';

describe('QuotationtocustomerdetailsumaryComponent', () => {
  let component: QuotationtocustomerdetailsumaryComponent;
  let fixture: ComponentFixture<QuotationtocustomerdetailsumaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationtocustomerdetailsumaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationtocustomerdetailsumaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
