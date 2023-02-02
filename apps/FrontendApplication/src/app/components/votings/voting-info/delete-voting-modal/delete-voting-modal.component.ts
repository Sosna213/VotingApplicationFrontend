import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-voting-modal',
  templateUrl: './delete-voting-modal.component.html',
  styleUrls: ['./delete-voting-modal.component.css'],
})
export class DeleteVotingModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteVotingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public votingId: string[]
  ) {}

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onSubmit() {
    this.dialogRef.close(this.votingId);
  }
}
