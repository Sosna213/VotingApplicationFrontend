import { Component, OnInit } from '@angular/core';
import {
  VotingService,
  VotingShared,
} from '../../../services/voting/voting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shared-to-me-voting-search',
  templateUrl: './shared-to-me-voting-search.component.html',
  styleUrls: ['./shared-to-me-voting-search.component.css'],
})
export class SharedToMeVotingSearchComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'votingName',
    'question',
    'endDate',
    'voted',
    'active',
    'explicit',
  ];
  clickedRows = new Set<VotingShared>();
  public votingList!: VotingShared[];

  constructor(private votingService: VotingService, private router: Router) {}

  ngOnInit(): void {
    this.votingService.getSharedToMeVoting().subscribe((data) => {
      this.votingList = data;
    });
  }

  public redirectToVote(votingId: number) {
    this.router.navigate(['vote', votingId]);
  }
}
