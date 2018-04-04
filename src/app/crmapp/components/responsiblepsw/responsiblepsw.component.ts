
import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';




@Component({
  selector: 'crm-responsiblepsw-dialog',
  templateUrl: 'responsiblepsw.component.html',
})
export class DialogOverviewResponsiblePswDialog {

  rsppsw: string;
  savepsw: boolean;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewResponsiblePswDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    debugger
    this.dialogRef.close();
  }

}