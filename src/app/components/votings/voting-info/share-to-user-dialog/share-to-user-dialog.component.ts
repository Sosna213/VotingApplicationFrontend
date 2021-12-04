import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-share-to-user-dialog',
  templateUrl: './share-to-user-dialog.component.html',
  styleUrls: ['./share-to-user-dialog.component.css']
})
export class ShareToUserDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ShareToUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public username: string,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
