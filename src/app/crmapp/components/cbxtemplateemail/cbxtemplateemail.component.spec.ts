/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CbxtemplateemailComponent } from './cbxtemplateemail.component';

describe('CbxtemplateemailComponent', () => {
  let component: CbxtemplateemailComponent;
  let fixture: ComponentFixture<CbxtemplateemailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbxtemplateemailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbxtemplateemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
