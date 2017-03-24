/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CbxcolonyComponent } from './cbxcolony.component';

describe('CbxcolonyComponent', () => {
  let component: CbxcolonyComponent;
  let fixture: ComponentFixture<CbxcolonyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbxcolonyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbxcolonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
