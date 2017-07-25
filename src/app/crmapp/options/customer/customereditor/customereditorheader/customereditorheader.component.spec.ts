import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomereditorheaderComponent } from './customereditorheader.component';

describe('CustomereditorheaderComponent', () => {
  let component: CustomereditorheaderComponent;
  let fixture: ComponentFixture<CustomereditorheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomereditorheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomereditorheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
