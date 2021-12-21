import { Component, OnInit } from '@angular/core';
import {VotingInfo, VotingResult, VotingService} from "../../../services/voting/voting.service";
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
  legendPosition: string = 'below';
  usernamesToAdd: string[] = [];
  votingResult: VotingResult[] = [];
  resultVisible: boolean = false;
  totalOfAnswers: number = 0;

  constructor(private votingService: VotingService,public dialog: MatDialog, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.routeConfig?.path === 'voting/:votingId'){
      let votingId: any;
      votingId = this.activatedRoute.snapshot.paramMap.get('votingId');
      this.votingService.getVotingWithAnswers(votingId).subscribe(data=>{
        this.votingInfo = data;
      });
      this.votingService.getVotingResultForVoting(votingId).subscribe(result=>{
        this.votingResult = result;
        this.votingResult.forEach(result=>{
          this.totalOfAnswers+= result.value;
        })
      });
    }
  }
  showResult(){
    this.resultVisible = !this.resultVisible;
  }
  getNumberOfResultForAnswer(answerId: number): VotingResult{
    let votingResultForAnswer = {} as VotingResult;
    this.votingResult.forEach(result=>{
      if(result.answerId === answerId)
        votingResultForAnswer =  result;
    })
    return votingResultForAnswer;
  }

  openShareVotingDialog(): void {
    const dialogRef = this.dialog.open(ShareToUserDialogComponent, {
      width: '700px',
      data: {usernames: this.usernamesToAdd}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.usernamesToAdd = result;
      if(this.usernamesToAdd != null){
        this.votingService.shareVotingToUser(this.usernamesToAdd, this.votingInfo.votingId)
          .subscribe(result=>{
            console.log(result);
          }, error=>{
            console.log(error);
          })
      }
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
