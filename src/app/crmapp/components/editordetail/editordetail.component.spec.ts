import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditordetailComponent } from './editordetail.component';

describe('EditordetailComponent', () => {
  let component: EditordetailComponent;
  let fixture: ComponentFixture<EditordetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditordetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditordetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
