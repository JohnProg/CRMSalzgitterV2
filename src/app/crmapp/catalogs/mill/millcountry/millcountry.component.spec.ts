import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MillcountryComponent } from './millcountry.component';

describe('MillcountryComponent', () => {
  let component: MillcountryComponent;
  let fixture: ComponentFixture<MillcountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MillcountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MillcountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
