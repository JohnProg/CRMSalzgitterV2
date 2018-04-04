import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteroppComponent } from './filteropp.component';

describe('FilteroppComponent', () => {
  let component: FilteroppComponent;
  let fixture: ComponentFixture<FilteroppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilteroppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteroppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
