import {Injectable} from '@angular/core';
import {TokenDecoderService} from "../token-decoder/token-decoder.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";


export interface Voting {
  votingId: number;
  votingName: string;
  restricted: boolean;
  endDate: Date;
  question: string;
}
export type Vote ={
  votingId: number;
  answerId: number;
  username: string;
}
export type Answer ={
  answerId: number;
  answer: string;
}
export interface VotingInfo {
  votingId: number;
  votingName: string;
  restricted: boolean;
  endDate: string;
  question: string;
  answers: Answer[];
}

export type VotingAdd = {
  userId: number;
  votingName: string;
  restricted: boolean;
  endDate: Date;
  question: string;
  answers: string[];
}
export type VotingShared = {
  votingDTO: Voting;
  voted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  userId!: number;

  constructor(private decoder: TokenDecoderService, private http: HttpClient) {
  }

  public getVotingListForUser(): Observable<Voting[]>{
    const username = this.decoder.getUsernameFromToken();
    let votingList = new Subject<Voting[]>();
    this.http.get<Voting[]>(`/voting/forUser/${username}`)
      .subscribe(returned =>{
        votingList.next(returned);
        return votingList;
    },error => {
        console.log(error);
      });
    return votingList;
  }

  public getVotingWithAnswers(votingId: number): Observable<VotingInfo>{
    let votingInfo = new Subject<VotingInfo>();
    this.http.get<VotingInfo>(`/voting/${votingId}`)
      .subscribe(returned=>{
        votingInfo.next(returned);
        return votingInfo;
      }, error => {
        console.log(error);
      })
    return votingInfo;
  }

  public saveVoting(votingToSave: VotingAdd): Observable<any>{
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const body = JSON.stringify(votingToSave);
    return this.http.post("/voting/add", body,{headers});
  }
  public deleteVotingById(votingId: number){
    this.http.delete(`/voting/delete/${votingId}`).subscribe(res=>{
      console.log(res);
    }, error => {
      console.log(error);
    });
  }
  public editVoting(votingToEdit: VotingInfo){
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const body = JSON.stringify(votingToEdit);
    return this.http.put("/voting-edit", body,{headers});
  }
  public shareVotingToUser(username: string, votingId: number){
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const body = {
      username: username,
      votingId: votingId
    };
    return this.http.post("/shareToUser", JSON.stringify(body), {headers});
  }

  public getSharedToMeVoting(){
    const username = this.decoder.getUsernameFromToken();
    let votingList = new Subject<VotingShared[]>();
    this.http.get<VotingShared[]>(`/votingSharedToUser/${username}`)
      .subscribe(returned =>{
        votingList.next(returned);
        return votingList;
      },error => {
        console.log(error);
      });
    return votingList;
  }
  public vote(vote: Vote){
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const body = JSON.stringify(vote);
    return this.http.post("/vote", body,{headers});
  }
}
