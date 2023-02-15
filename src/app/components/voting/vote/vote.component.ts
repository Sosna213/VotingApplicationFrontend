import { Component, OnInit } from '@angular/core';
import { VotingService } from '../voting.service';
import { ActivatedRoute, Router } from '@angular/router';

import jwt_decode from 'jwt-decode';
import { Vote, VotingInfo } from '../voting.types';
import { Observable } from 'rxjs';
import { DecodedToken, TokenDecoderService } from '../../../services/token-decoder/token-decoder.service';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
})
export class VoteComponent implements OnInit {
  votingInfo$!: Observable<VotingInfo>;
  answerVotedId!: number;
  username!: string;

  constructor(
    private votingService: VotingService,
    private decoder: TokenDecoderService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private localstorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.routeConfig?.path === 'vote/:votingId') {
      const votingId = this.activatedRoute.snapshot.paramMap.get('votingId');
      if (votingId) {
        this.votingInfo$ = this.votingService.getVotingWithAnswers(votingId);
      }
    } else if (
      this.activatedRoute.snapshot.routeConfig?.path === 'vote/token/:token'
    ) {
      const token = this.activatedRoute.snapshot.paramMap.get('token');
      if (token) {
        const decoded: DecodedToken = jwt_decode(token);
        if (
          !(this.localstorage.getItem('votingToken') === token) &&
          !this.localstorage.checkIfTokenExpired(decoded)
        ) {
          this.votingInfo$ = this.votingService.getVotingWithAnswers(
            parseInt(decoded.sub)
          );
        }
      }
    }
  }

  vote(votingId: number) {
    const vote: Vote = {
      votingId: votingId,
      answerId: this.answerVotedId,
      username: this.decoder.getUsernameFromToken(),
    };
    this.votingService.vote(vote).subscribe({
      next: () => {
        if (
          this.activatedRoute.snapshot.routeConfig?.path === 'vote/token/:token'
        ) {
          const token = this.activatedRoute.snapshot.paramMap.get('token');
          if (token) {
            this.localstorage.setItem('votingToken', token);
          }
        }
        this.router.navigate(['voting-shared-to-me']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
