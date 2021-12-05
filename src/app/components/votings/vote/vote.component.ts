import { Component, OnInit } from '@angular/core';
import {Vote, VotingInfo, VotingService} from "../../../services/voting/voting.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenDecoderService} from "../../../services/token-decoder/token-decoder.service";

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  votingInfo!: VotingInfo;
  answerVotedId!: number;
  username!: string;

  constructor(private votingService: VotingService, private decoder: TokenDecoderService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
      let votingId: any;
      votingId = this.activatedRoute.snapshot.paramMap.get('votingId');
      this.votingService.getVotingWithAnswers(votingId).subscribe(data=>{
        this.votingInfo = data;
      });
  }
  vote(){
    const vote: Vote ={
      votingId: this.votingInfo.votingId,
      answerId: this.answerVotedId,
      username: this.decoder.getUsernameFromToken()
    }
    this.votingService.vote(vote)
      .subscribe(result=>{
      console.log("Vote success");
      this.router.navigate(['voting-shared-to-me']);
    }, error=>{
      console.log(error);
    });
  }

}
