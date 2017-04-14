import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitydetailComponent } from './opportunitydetail.component';

describe('OpportunitydetailComponent', () => {
  let component: OpportunitydetailComponent;
  let fixture: ComponentFixture<OpportunitydetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunitydetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunitydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
