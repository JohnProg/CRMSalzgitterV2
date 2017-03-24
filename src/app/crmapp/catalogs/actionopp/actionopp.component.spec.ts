/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ActionoppComponent } from './actionopp.component';

describe('ActionoppComponent', () => {
  let component: ActionoppComponent;
  let fixture: ComponentFixture<ActionoppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionoppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionoppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
