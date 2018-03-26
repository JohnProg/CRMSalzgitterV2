import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateemaildocumentComponent } from './templateemaildocument.component';

describe('TemplateemaildocumentComponent', () => {
  let component: TemplateemaildocumentComponent;
  let fixture: ComponentFixture<TemplateemaildocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateemaildocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateemaildocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
