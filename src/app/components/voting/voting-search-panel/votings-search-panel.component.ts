import { Component, OnInit } from '@angular/core';
import { VotingService } from '../voting.service';
import { Router } from '@angular/router';
import { Voting } from '../voting.types';

@Component({
  selector: 'app-voting-search-panel',
  templateUrl: './voting-search-panel.component.html',
  styleUrls: ['./voting-search-panel.component.scss'],
})
export class VotingSearchPanelComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'votingName',
    'question',
    'restricted',
    'endDate',
    'explicit',
    'active',
  ];
  clickedRows = new Set<Voting>();
  public votingList!: Voting[];

  constructor(private votingService: VotingService, private router: Router) {}

  ngOnInit(): void {
    this.votingService.getVotingListForUser().subscribe({
      next: (data) => {
        this.votingList = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  public redirectToVotingPage(votingId: number) {
    this.router.navigate(['voting', votingId]);
  }

  goToCreateVotingPage() {
    this.router.navigate(['create-voting']);
  }
}
