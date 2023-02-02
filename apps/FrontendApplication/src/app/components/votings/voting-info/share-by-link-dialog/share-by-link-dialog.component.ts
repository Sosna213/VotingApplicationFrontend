import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VotingService } from '../../../../services/voting/voting.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-share-by-link-dialog',
  templateUrl: './share-by-link-dialog.component.html',
  styleUrls: ['./share-by-link-dialog.component.css'],
})
export class ShareByLinkDialogComponent {
  constructor(
    public activatedRoute: ActivatedRoute,
    public votingService: VotingService,
    public dialogRef: MatDialogRef<ShareByLinkDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public votingToken: { votingToken: { token: string } }
  ) {}

  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;

  getLink() {
    return `http://localhost:4200/#/vote/token/${this.votingToken.votingToken.token}`;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
