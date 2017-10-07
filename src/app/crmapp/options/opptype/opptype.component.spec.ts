import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpptypeComponent } from './opptype.component';

describe('OpptypeComponent', () => {
  let component: OpptypeComponent;
  let fixture: ComponentFixture<OpptypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpptypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpptypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
