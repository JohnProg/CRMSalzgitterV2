import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityDialogsDocumentsComponent } from './opportunity-dialogs-documents.component';

describe('OpportunityDialogsDocumentsComponent', () => {
  let component: OpportunityDialogsDocumentsComponent;
  let fixture: ComponentFixture<OpportunityDialogsDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityDialogsDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityDialogsDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
