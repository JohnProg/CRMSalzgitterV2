import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpptypestatusComponent } from './opptypestatus.component';

describe('OpptypestatusComponent', () => {
  let component: OpptypestatusComponent;
  let fixture: ComponentFixture<OpptypestatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpptypestatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpptypestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
