import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitydocumentsComponent } from './opportunitydocuments.component';

describe('OpportunitydocumentsComponent', () => {
  let component: OpportunitydocumentsComponent;
  let fixture: ComponentFixture<OpportunitydocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunitydocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunitydocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
