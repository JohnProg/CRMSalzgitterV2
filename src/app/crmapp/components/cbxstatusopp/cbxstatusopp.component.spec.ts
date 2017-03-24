/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CbxstatusoppComponent } from './cbxstatusopp.component';

describe('CbxstatusoppComponent', () => {
  let component: CbxstatusoppComponent;
  let fixture: ComponentFixture<CbxstatusoppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbxstatusoppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbxstatusoppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
