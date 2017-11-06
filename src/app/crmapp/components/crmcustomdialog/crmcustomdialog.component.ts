import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export enum DialogResponse {
  None = 0,
  Yes = 1,
  No = 2,
  Cancel = 3
}

@Component({
  selector: 'crm-crmcustomdialog',
  templateUrl: './crmcustomdialog.component.html',
  styleUrls: ['./crmcustomdialog.component.scss']
})
export class CrmcustomdialogComponent  {
  
  textTitle: string;
  textBody: string;
  constructor(
    public dialogRef: MatDialogRef<CrmcustomdialogComponent>
    , @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
      this.textTitle = data.title;
      this.textBody = data.body;

  }

  onNoClick(): void {
    this.closeDialog(DialogResponse.None);
  }

  cancel() {
    this.closeDialog(DialogResponse.Cancel);
  }

  noConfirm() {
     this.closeDialog(DialogResponse.No);
  }

  yesConfirm() {
    this.closeDialog(DialogResponse.Yes);
  }

  closeDialog(resp: DialogResponse) {
    this.dialogRef.close(resp);
  }
}
