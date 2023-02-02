import {Injectable} from '@angular/core';
import {TokenDecoderService} from "../token-decoder/token-decoder.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";


export interface Voting {
  votingId: number;
  votingName: string;
  restricted: boolean;
  active: boolean;
  explicit: boolean;
  endDate: Date;
  question: string;
}

export type Vote = {
  votingId: number;
  answerId: number;
  userId: string;
}
export type Answer = {
  answerId: number;
  answer: string;
}

export interface VotingInfo {
  votingId: number;
  votingName: string;
  restricted: boolean;
  active: boolean;
  explicit: boolean;
  endDate: string;
  question: string;
  answers: Answer[];
}

export type VotingToken = {
  token: string;
}

export type VotingAdd = {
  userId: number;
  votingName: string;
  restricted: boolean;
  explicit: boolean;
  endDate: Date;
  question: string;
  answers: string[];
}
export type VotingShared = {
  votingDTO: Voting;
  voted: boolean;
}
export type VotingResult = {
  answerId: number
  name: string;
  value: number;
  usernames: string[];
}

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  userId!: number;

  constructor(private decoder: TokenDecoderService, private http: HttpClient) {
  }

  public getVotingListForUser(): Observable<Voting[]> {
    const userId = this.decoder.getUserIdFromToken();
    return this.http.get<Voting[]>(`/voting/forUser/${userId}`);
  }

  public getVotingWithAnswers(votingId: number): Observable<VotingInfo> {
    const votingInfo = new Subject<VotingInfo>();
    this.http.get<VotingInfo>(`/voting/${votingId}`)
      .subscribe(returned => {
        votingInfo.next(returned);
        return votingInfo;
      }, error => {
        console.log(error);
      })
    return votingInfo;
  }

  public saveVoting(votingToSave: VotingAdd): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const body = JSON.stringify(votingToSave);
    return this.http.post("/voting/add", body, {headers});
  }

  public deleteVotingById(votingId: number) {
    return this.http.delete(`/voting/delete/${votingId}`);
  }

  public editVoting(votingToEdit: VotingInfo) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const body = JSON.stringify(votingToEdit);
    return this.http.put("/voting-edit", body, {headers});
  }

  public shareVotingToUser(usernames: string[], votingId: number) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const body = {
      usernames: usernames,
      votingId: votingId
    };
    return this.http.post("/shareToUsers", JSON.stringify(body), {headers});
  }

  public getSharedToMeVoting() {
    const userId = this.decoder.getUserIdFromToken();
    const votingList = new Subject<VotingShared[]>();
    this.http.get<VotingShared[]>(`/votingSharedToUser/${userId}`)
      .subscribe(returned => {
        votingList.next(returned);
        return votingList;
      }, error => {
        console.log(error);
      });
    return votingList;
  }

  public vote(vote: Vote) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const body = JSON.stringify(vote);
    return this.http.post("/vote", body, {headers});
  }

  public deactivateVoting(votingId: number) {
    return this.http.put(`/deactivate-voting/${votingId}`, {});
  }

  public getVotingResultForVoting(votingId: number): Observable<VotingResult[]> {
    return this.http.get<VotingResult[]>(`/voting-result/${votingId}`);
  }
  public getVotingToken(votingId: number): Observable<VotingToken>{
    return this.http.get<VotingToken>(`/voting/get-token/${votingId}`);
  }
}