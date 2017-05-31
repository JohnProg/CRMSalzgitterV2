import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionopportunitytemplateemailComponent } from './actionopportunitytemplateemail.component';

describe('ActionopportunitytemplateemailComponent', () => {
  let component: ActionopportunitytemplateemailComponent;
  let fixture: ComponentFixture<ActionopportunitytemplateemailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionopportunitytemplateemailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionopportunitytemplateemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
