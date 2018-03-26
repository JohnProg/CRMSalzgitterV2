import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiblepswComponent } from './responsiblepsw.component';

describe('ResponsiblepswComponent', () => {
  let component: ResponsiblepswComponent;
  let fixture: ComponentFixture<ResponsiblepswComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsiblepswComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiblepswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
