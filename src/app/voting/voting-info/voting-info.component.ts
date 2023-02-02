import { Component, OnInit } from '@angular/core';
import { VotingService } from '../voting.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ShareToUserDialogComponent } from './share-to-user-dialog/share-to-user-dialog.component';
import { DeleteVotingModalComponent } from './delete-voting-modal/delete-voting-modal.component';
import { ShareByLinkDialogComponent } from './share-by-link-dialog/share-by-link-dialog.component';
import {
  VotingInfo,
  VotingResult,
  VotingToken,
} from '../voting.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-voting-info',
  templateUrl: './voting-info.component.html',
  styleUrls: ['./voting-info.component.css'],
})
export class VotingInfoComponent implements OnInit {
  votingInfo$!: Observable<VotingInfo>;
  legendPosition = 'below';
  usernamesToAdd: string[] = [];
  votingResult: VotingResult[] = [];
  resultVisible = false;
  totalOfAnswers = 0;
  votingId!: number;
  votingToken!: VotingToken;

  constructor(
    private votingService: VotingService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.routeConfig?.path === 'voting/:votingId') {
      const id = this.activatedRoute.snapshot.paramMap.get('votingId');
      this.votingId = id ? +id : NaN;
      this.votingInfo$ = this.votingService.getVotingWithAnswers(this.votingId);
      this.votingService
        .getVotingResultForVoting(this.votingId)
        .subscribe((result) => {
          this.votingResult = result;
          this.votingResult.forEach((result) => {
            this.totalOfAnswers += result.value;
          });
        });
    }
  }

  showResult() {
    this.resultVisible = !this.resultVisible;
  }

  getNumberOfResultForAnswer(answerId: number): VotingResult {
    let votingResultForAnswer = {} as VotingResult;
    this.votingResult.forEach((result) => {
      if (result.answerId === answerId) votingResultForAnswer = result;
    });
    return votingResultForAnswer;
  }

  openShareVotingDialog(votingInfo: VotingInfo): void {
    if (votingInfo.restricted) {
      const dialogRef = this.dialog.open(ShareToUserDialogComponent, {
        width: '700px',
        data: { usernames: this.usernamesToAdd },
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.usernamesToAdd = result;
        if (this.usernamesToAdd != null) {
          this.votingService
            .shareVotingToUser(this.usernamesToAdd, votingInfo.votingId)
            .subscribe();
        }
      });
    } else {
      this.votingService.getVotingToken(this.votingId).subscribe((result) => {
        this.dialog.open(ShareByLinkDialogComponent, {
          width: '1100px',
          data: { votingToken: result },
        });
      });
    }
  }

  gotToVotingEditPage(votingInfo: VotingInfo) {
    this.router.navigate(['edit-voting', votingInfo.votingId]);
  }

  deleteVoting(votingId: number) {
    const dialogRef = this.dialog.open(DeleteVotingModalComponent, {
      width: '700px',
      data: { votingId: votingId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != null) {
        this.votingService.deleteVotingById(result.votingId).subscribe(
          () => {
            this.router.navigate(['voting-search']);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  deactivate(votingInfo: VotingInfo) {
    this.votingService.deactivateVoting(votingInfo.votingId).subscribe(
      () => {
        location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
