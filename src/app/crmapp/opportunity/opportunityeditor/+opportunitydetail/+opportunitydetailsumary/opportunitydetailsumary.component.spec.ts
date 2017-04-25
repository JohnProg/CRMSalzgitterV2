import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitydetailsumaryComponent } from './opportunitydetailsumary.component';

describe('+opportunitydetailsumaryComponent', () => {
  let component: OpportunitydetailsumaryComponent;
  let fixture: ComponentFixture<OpportunitydetailsumaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunitydetailsumaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunitydetailsumaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
