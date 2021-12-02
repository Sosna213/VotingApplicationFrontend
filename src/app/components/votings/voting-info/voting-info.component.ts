import { Component, OnInit } from '@angular/core';
import {VotingInfo, VotingService} from "../../../services/voting/voting.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-voting-info',
  templateUrl: './voting-info.component.html',
  styleUrls: ['./voting-info.component.css']
})
export class VotingInfoComponent implements OnInit {

  votingInfo!: VotingInfo;

  constructor(private votingService: VotingService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.routeConfig?.path === 'voting/:votingId'){
      let votingId: any;
      votingId = this.activatedRoute.snapshot.paramMap.get('votingId');
      this.votingService.getVotingWithAnswers(votingId).subscribe(data=>{
        this.votingInfo = data;
      });
    }
  }

  gotToVotingEditPage(){
    this.router.navigate(['edit-voting', this.votingInfo.votingId]);
  }
  deleteVoting(votingId: number){
    this.votingService.deleteVotingById(votingId);
    this.router.navigate(['voting-search']);
  }
}
