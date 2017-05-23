import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionopportunityComponent } from './actionopportunity.component';

describe('ActionopportunityComponent', () => {
  let component: ActionopportunityComponent;
  let fixture: ComponentFixture<ActionopportunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionopportunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionopportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
