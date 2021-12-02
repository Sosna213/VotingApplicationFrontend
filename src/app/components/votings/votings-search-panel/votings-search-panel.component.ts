import { Component, OnInit } from '@angular/core';
import {Voting, VotingService} from "../../../services/voting/voting.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-votings-search-panel',
  templateUrl: './votings-search-panel.component.html',
  styleUrls: ['./votings-search-panel.component.css']
})
export class VotingsSearchPanelComponent implements OnInit {

  displayedColumns: string[] = ['id', 'votingName', 'question'];
  clickedRows = new Set<Voting>();
  public votingList!: Voting[];

  constructor(private votingService: VotingService, private router: Router) { }

  ngOnInit(): void {
    this.votingService.getVotingListForUser().subscribe(data=>{
      this.votingList = data;
    });
  }
  public redirectToVotingPage(votingId: number){
    this.router.navigate(['voting', votingId])
  }
}
