import { Component, OnInit } from '@angular/core';
import {Vote, VotingInfo, VotingService} from "../../../services/voting/voting.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {DecodedToken, TokenDecoderService} from "../../../services/token-decoder/token-decoder.service";
import jwt_decode from "jwt-decode";
import {LocalStorageService} from "../../../services/local-storage/local-storage.service";

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  votingInfo!: VotingInfo;
  answerVotedId!: number;
  username!: string;

  constructor(private votingService: VotingService,
              private decoder: TokenDecoderService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private localstorage: LocalStorageService) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.routeConfig?.path === 'vote/:votingId') {
      let votingId: any;
      votingId = this.activatedRoute.snapshot.paramMap.get('votingId');
      this.votingService.getVotingWithAnswers(votingId).subscribe(data=>{
        this.votingInfo = data;
      });
    } else if(this.activatedRoute.snapshot.routeConfig?.path === 'vote/token/:token'){
      let token: any;
      token = this.activatedRoute.snapshot.paramMap.get('token');
      const decoded: DecodedToken = jwt_decode(token);
      if(!(this.localstorage.getItem("votingToken") === token)){
        if(!this.localstorage.checkIfTokenExpired(token)){
          console.log("XDDD2")
          this.votingService.getVotingWithAnswers(parseInt(decoded.sub)).subscribe(data=>{
            this.votingInfo = data;
          });
        }
      }
    }
  }
  vote(){
    const vote: Vote = {
      votingId: this.votingInfo.votingId,
      answerId: this.answerVotedId,
      username: this.decoder.getUsernameFromToken()
    }
    this.votingService.vote(vote)
      .subscribe(result=>{
      console.log("Vote success");
        if(this.activatedRoute.snapshot.routeConfig?.path === 'vote/token/:token'){
          const token = this.activatedRoute.snapshot.paramMap.get('token');
          this.localstorage.setItem("votingToken", token);
        }
      this.router.navigate(['voting-shared-to-me']);
    }, error=>{
      console.log(error);
    });
  }

}
