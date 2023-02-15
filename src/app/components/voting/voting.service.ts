import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Vote,
  Voting,
  VotingAdd,
  VotingInfo,
  VotingResult,
  VotingShared,
  VotingToken,
} from './voting.types';
import { TokenDecoderService } from '../../services/token-decoder/token-decoder.service';

@Injectable({
  providedIn: 'root',
})
export class VotingService {
  userId!: number;

  constructor(private decoder: TokenDecoderService, private http: HttpClient) {}

  deactivateVoting(votingId: number): Observable<unknown> {
    return this.http.put(`/deactivate-voting/${votingId}`, {});
  }

  deleteVotingById(votingId: number): Observable<unknown> {
    return this.http.delete(`/voting/delete/${votingId}`);
  }

  getSharedToMeVoting(): Observable<VotingShared[]> {
    const username = this.decoder.getUsernameFromToken();
    return this.http.get<VotingShared[]>(`/votingSharedToUser/${username}`);
  }

  editVoting(votingToEdit: VotingInfo): Observable<unknown> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(votingToEdit);
    return this.http.put('/voting-edit', body, { headers });
  }

  getVotingListForUser(): Observable<Voting[]> {
    const username = this.decoder.getUsernameFromToken();
    return this.http.get<Voting[]>(`/voting/forUser/${username}`);
  }

  getVotingResultForVoting(votingId: number): Observable<VotingResult[]> {
    return this.http.get<VotingResult[]>(`/voting-result/${votingId}`);
  }

  getVotingToken(votingId: number): Observable<VotingToken> {
    return this.http.get<VotingToken>(`/voting/get-token/${votingId}`);
  }

  getVotingWithAnswers(votingId: number | string): Observable<VotingInfo> {
    return this.http.get<VotingInfo>(`/voting/${votingId}`);
  }

  saveVoting(votingToSave: VotingAdd): Observable<unknown> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(votingToSave);
    return this.http.post('/voting/add', body, { headers });
  }

  shareVotingToUser(
    usernames: string[],
    votingId: number
  ): Observable<unknown> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {
      usernames: usernames,
      votingId: votingId,
    };
    return this.http.post('/shareToUsers', JSON.stringify(body), { headers });
  }

  vote(vote: Vote): Observable<unknown> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(vote);
    return this.http.post('/vote', body, { headers });
  }
}
