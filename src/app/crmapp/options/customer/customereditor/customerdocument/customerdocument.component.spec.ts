import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerdocumentComponent } from './customerdocument.component';

describe('CustomerdocumentComponent', () => {
  let component: CustomerdocumentComponent;
  let fixture: ComponentFixture<CustomerdocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerdocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
