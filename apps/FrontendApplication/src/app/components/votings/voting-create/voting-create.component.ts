import { Component, OnInit } from '@angular/core';
import {
  VotingAdd,
  VotingService,
} from '../../../services/voting/voting.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-voting-create',
  templateUrl: './voting-create.component.html',
  styleUrls: ['./voting-create.component.css'],
})
export class VotingCreateComponent {
  constructor(
    private votingService: VotingService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  submitHandler(votingToAdd: VotingAdd) {
    this.votingService.saveVoting(votingToAdd).subscribe(
      () => {
        this.router.navigate(['/voting-search']);
      },
      (error) => {
        this.errorSnackBarOpen(error.error.error);
      }
    );
  }

  private errorSnackBarOpen(message: string) {
    this.snackBar.open(message, 'Zamknij', {
      duration: 3 * 1000,
      horizontalPosition: 'right',
    });
  }
}
