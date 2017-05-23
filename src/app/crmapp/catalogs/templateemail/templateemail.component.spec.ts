import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateemailComponent } from './templateemail.component';

describe('TemplateemailComponent', () => {
  let component: TemplateemailComponent;
  let fixture: ComponentFixture<TemplateemailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateemailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
