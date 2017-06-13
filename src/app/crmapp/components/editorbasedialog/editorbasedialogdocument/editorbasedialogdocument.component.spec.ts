import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorbasedialogdocumentComponent } from './editorbasedialogdocument.component';

describe('EditorbasedialogdocumentComponent', () => {
  let component: EditorbasedialogdocumentComponent;
  let fixture: ComponentFixture<EditorbasedialogdocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorbasedialogdocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorbasedialogdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
