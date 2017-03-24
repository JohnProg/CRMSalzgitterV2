/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CbxcountryComponent } from './cbxcountry.component';

describe('CbxcountryComponent', () => {
  let component: CbxcountryComponent;
  let fixture: ComponentFixture<CbxcountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbxcountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbxcountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
