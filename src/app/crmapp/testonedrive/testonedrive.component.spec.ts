import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestonedriveComponent } from './testonedrive.component';

describe('TestonedriveComponent', () => {
  let component: TestonedriveComponent;
  let fixture: ComponentFixture<TestonedriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestonedriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestonedriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
