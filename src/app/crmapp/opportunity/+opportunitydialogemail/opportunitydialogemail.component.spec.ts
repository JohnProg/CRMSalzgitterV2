import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitydialogemailComponent } from './opportunitydialogemail.component';

describe('OpportunitydialogemailComponent', () => {
  let component: OpportunitydialogemailComponent;
  let fixture: ComponentFixture<OpportunitydialogemailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunitydialogemailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunitydialogemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
