/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IncotermComponent } from './incoterm.component';

describe('IncotermComponent', () => {
  let component: IncotermComponent;
  let fixture: ComponentFixture<IncotermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncotermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncotermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
