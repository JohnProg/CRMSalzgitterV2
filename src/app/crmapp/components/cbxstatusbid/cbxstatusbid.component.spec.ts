/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CbxstatusbidComponent } from './cbxstatusbid.component';

describe('CbxstatusbidComponent', () => {
  let component: CbxstatusbidComponent;
  let fixture: ComponentFixture<CbxstatusbidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbxstatusbidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbxstatusbidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
