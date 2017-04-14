import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityheaderComponent } from './opportunityheader.component';

describe('OpportunityheaderComponent', () => {
  let component: OpportunityheaderComponent;
  let fixture: ComponentFixture<OpportunityheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
