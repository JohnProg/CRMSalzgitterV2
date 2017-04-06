import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityindexComponent } from './opportunityindex.component';

describe('OpportunityindexComponent', () => {
  let component: OpportunityindexComponent;
  let fixture: ComponentFixture<OpportunityindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
