import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmselectchildComponent } from './crmselectchild.component';

describe('CrmselectchildComponent', () => {
  let component: CrmselectchildComponent;
  let fixture: ComponentFixture<CrmselectchildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmselectchildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmselectchildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
