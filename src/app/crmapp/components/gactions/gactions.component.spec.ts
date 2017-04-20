import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GactionsComponent } from './gactions.component';

describe('GactionsComponent', () => {
  let component: GactionsComponent;
  let fixture: ComponentFixture<GactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
