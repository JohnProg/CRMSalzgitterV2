import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomdialogcrmComponent } from './customdialogcrm.component';

describe('CustomdialogcrmComponent', () => {
  let component: CustomdialogcrmComponent;
  let fixture: ComponentFixture<CustomdialogcrmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomdialogcrmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomdialogcrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
