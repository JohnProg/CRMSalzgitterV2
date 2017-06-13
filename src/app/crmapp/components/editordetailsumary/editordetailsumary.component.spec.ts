import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditordetailsumaryComponent } from './editordetailsumary.component';

describe('EditordetailsumaryComponent', () => {
  let component: EditordetailsumaryComponent;
  let fixture: ComponentFixture<EditordetailsumaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditordetailsumaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditordetailsumaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
