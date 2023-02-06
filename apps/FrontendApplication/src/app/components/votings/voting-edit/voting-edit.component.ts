import { Component } from '@angular/core';
import {
  VotingService,
} from '../../../services/voting/voting.service';
import { Router } from '@angular/router';
import {VotingInfo} from "../voting.types";

@Component({
  selector: 'app-voting-edit',
  templateUrl: './voting-edit.component.html',
  styleUrls: ['./voting-edit.component.css'],
})
export class VotingEditComponent {
  votingInfo!: VotingInfo;

  constructor(private votingService: VotingService, private router: Router) {}

  submitHandler(votingToEdit: VotingInfo) {
    this.votingService.editVoting(votingToEdit).subscribe({
      next: () => {
        this.router.navigate(['/voting-search']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
