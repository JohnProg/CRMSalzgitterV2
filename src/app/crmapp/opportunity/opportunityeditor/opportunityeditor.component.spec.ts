import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityeditorComponent } from './opportunityeditor.component';

describe('OpportunityeditorComponent', () => {
  let component: OpportunityeditorComponent;
  let fixture: ComponentFixture<OpportunityeditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityeditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
