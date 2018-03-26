import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSenderDialogComponent } from './email-sender-dialog.component';

describe('EmailSenderDialogComponent', () => {
  let component: EmailSenderDialogComponent;
  let fixture: ComponentFixture<EmailSenderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailSenderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailSenderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
