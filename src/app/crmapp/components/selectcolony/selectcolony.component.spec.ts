import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectcolonyComponent } from './selectcolony.component';

describe('SelectcolonyComponent', () => {
  let component: SelectcolonyComponent;
  let fixture: ComponentFixture<SelectcolonyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectcolonyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectcolonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
