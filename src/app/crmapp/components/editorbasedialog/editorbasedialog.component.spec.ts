import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorbasedialogComponent } from './editorbasedialog.component';

describe('EditorbasedialogComponent', () => {
  let component: EditorbasedialogComponent;
  let fixture: ComponentFixture<EditorbasedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorbasedialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorbasedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
