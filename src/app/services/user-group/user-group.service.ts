import { Injectable } from '@angular/core';
import {TokenDecoderService} from "../token-decoder/token-decoder.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

export type UserGroupAdd = {
  ownerUsername: string;
  userGroupName: string;
  usernames: string[];
}

export type UserGroupInfo = {
  userGroupId: number;
  userGroupName: string;
  usernames: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserGroupService {

  constructor(private decoder: TokenDecoderService, private http: HttpClient) { }

  public addUserGroup(userGroupToAdd: UserGroupAdd){
    userGroupToAdd.ownerUsername  = this.decoder.getUsernameFromToken();
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const body = JSON.stringify(userGroupToAdd);
    return this.http.post("/users-group/add", body,{headers});
  }
  public getUserGroupsForUser(): Observable<UserGroupInfo[]>{
    let username = this.decoder.getUsernameFromToken();
    return this.http.get<UserGroupInfo[]>(`/user-group/${username}`);
  }
}
