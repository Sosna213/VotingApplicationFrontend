import { Injectable } from '@angular/core';
import {TokenDecoderService} from "../token-decoder/token-decoder.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

export type UserGroupAdd = {
  ownerUsername: string;
  userGroupName: string;
  usernames: string[];
}
export type UserGroupEdit = {
  userGroupAddDTO: UserGroupAdd,
  userGroupId: number;
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
    userGroupToAdd.ownerUsername  = this.decoder.getUserIdFromToken();
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const body = JSON.stringify(userGroupToAdd);
    return this.http.post("/users-group/add", body,{headers});
  }
  public editUserGroup(userGroupEdit: UserGroupEdit){
    userGroupEdit.userGroupAddDTO.ownerUsername  = this.decoder.getUserIdFromToken();
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const body = JSON.stringify(userGroupEdit);
    return this.http.put("/users-group/edit", body,{headers});
  }

  public getUserGroupsForUser(): Observable<UserGroupInfo[]>{
    const userId = this.decoder.getUserIdFromToken();
    return this.http.get<UserGroupInfo[]>(`/user-group/${userId}`);
  }

  public mapUserGroupsToNames(userGroups: UserGroupInfo[]): string[]{
    const userGroupNames: string[] =[];
    userGroups.forEach(userGroup =>{
      userGroupNames.push(userGroup.userGroupName);
    })
      return userGroupNames;
  }
  public deleteUserGroupById(userGroupId: number){
    return this.http.delete(`/user-group/delete/${userGroupId}`);
  }
}
