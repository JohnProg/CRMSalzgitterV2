import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnedriveCallbackComponent } from './onedrive-callback.component';

describe('OnedriveCallbackComponent', () => {
  let component: OnedriveCallbackComponent;
  let fixture: ComponentFixture<OnedriveCallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnedriveCallbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnedriveCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
