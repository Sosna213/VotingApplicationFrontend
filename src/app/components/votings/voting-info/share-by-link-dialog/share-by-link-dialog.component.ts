import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../../../services/user/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {map, startWith} from "rxjs";
import {VotingService, VotingToken} from "../../../../services/voting/voting.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-share-by-link-dialog',
  templateUrl: './share-by-link-dialog.component.html',
  styleUrls: ['./share-by-link-dialog.component.css']
})
export class ShareByLinkDialogComponent implements OnInit {

  constructor(
    public activatedRoute: ActivatedRoute,
    public votingService: VotingService,
    public dialogRef: MatDialogRef<ShareByLinkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public votingToken: any
  ) {
  }

  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
  }

  getLink() {
    return `http://localhost:4200/#/vote/token/${this.votingToken.votingToken.token}`
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
