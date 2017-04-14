import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitydialogsComponent } from './opportunitydialogs.component';

describe('OpportunitydialogsComponent', () => {
  let component: OpportunitydialogsComponent;
  let fixture: ComponentFixture<OpportunitydialogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunitydialogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunitydialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
