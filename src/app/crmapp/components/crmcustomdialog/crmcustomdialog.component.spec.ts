import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmcustomdialogComponent } from './crmcustomdialog.component';

describe('CrmcustomdialogComponent', () => {
  let component: CrmcustomdialogComponent;
  let fixture: ComponentFixture<CrmcustomdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmcustomdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmcustomdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
