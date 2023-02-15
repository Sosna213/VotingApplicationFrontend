import { Component, OnInit } from '@angular/core';
import {
  VotingService,
} from '../voting.service';
import { Router } from '@angular/router';
import {VotingShared} from "../voting.types";
import {Observable} from "rxjs";

@Component({
  selector: 'app-shared-to-me-voting-search',
  templateUrl: './shared-to-me-voting-search.component.html',
  styleUrls: ['./shared-to-me-voting-search.component.scss'],
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
  public votingList$!: Observable<VotingShared[]>;

  constructor(private votingService: VotingService, private router: Router) {}

  ngOnInit(): void {
    this.votingList$ = this.votingService.getSharedToMeVoting();
  }

  public redirectToVote(votingId: number) {
    this.router.navigate(['vote', votingId]);
  }
}
