import { Component, OnInit } from '@angular/core';
import {VotingInfo, VotingService} from "../../../services/voting/voting.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ShareToUserDialogComponent} from "./share-to-user-dialog/share-to-user-dialog.component";


@Component({
  selector: 'app-voting-info',
  templateUrl: './voting-info.component.html',
  styleUrls: ['./voting-info.component.css']
})
export class VotingInfoComponent implements OnInit {

  votingInfo!: VotingInfo;
  usernameToAdd: string = '';

  constructor(private votingService: VotingService,public dialog: MatDialog, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.routeConfig?.path === 'voting/:votingId'){
      let votingId: any;
      votingId = this.activatedRoute.snapshot.paramMap.get('votingId');
      this.votingService.getVotingWithAnswers(votingId).subscribe(data=>{
        this.votingInfo = data;
      });
    }
  }

  openShareVotingDialog(): void {
    const dialogRef = this.dialog.open(ShareToUserDialogComponent, {
      width: '250px',
      data: {username: this.usernameToAdd}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.usernameToAdd = result;
      this.votingService.shareVotingToUser(this.usernameToAdd, this.votingInfo.votingId)
        .subscribe(result=>{
          console.log(result);
        }, error=>{
          console.log(error);
      })
      console.log(this.usernameToAdd);
    });
  }


  gotToVotingEditPage(){
    this.router.navigate(['edit-voting', this.votingInfo.votingId]);
  }

  deleteVoting(votingId: number){
    this.votingService.deleteVotingById(votingId);
    this.router.navigate(['voting-search']);
  }
  deactivate(){
    this.votingService.deactivateVoting(this.votingInfo.votingId).subscribe(result=>{
      console.log(result)
    }, error => {
      console.log(error)
    });
  }
}
