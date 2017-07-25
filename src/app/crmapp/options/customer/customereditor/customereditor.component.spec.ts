import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomereditorComponent } from './customereditor.component';

describe('CustomereditorComponent', () => {
  let component: CustomereditorComponent;
  let fixture: ComponentFixture<CustomereditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomereditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomereditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
