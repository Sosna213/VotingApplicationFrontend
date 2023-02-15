import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserGroupAdd, UserGroupEdit, UserGroupInfo} from "./user-group.types";
import { TokenDecoderService } from '../../../services/token-decoder/token-decoder.service';

@Injectable({
  providedIn: 'root',
})
export class UserGroupService {
  constructor(private decoder: TokenDecoderService, private http: HttpClient) {}

  addUserGroup(userGroupToAdd: UserGroupAdd): Observable<unknown> {
    userGroupToAdd.ownerUsername = this.decoder.getUsernameFromToken();
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(userGroupToAdd);
    return this.http.post('/users-group/add', body, { headers });
  }

  deleteUserGroupById(userGroupId: number) {
    return this.http.delete(`/user-group/delete/${userGroupId}`);
  }

  editUserGroup(userGroupEdit: UserGroupEdit): Observable<unknown> {
    userGroupEdit.userGroupAddDTO.ownerUsername =
      this.decoder.getUsernameFromToken();
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(userGroupEdit);
    return this.http.put('/users-group/edit', body, { headers });
  }

  getUserGroupsForUser(): Observable<UserGroupInfo[]> {
    const username = this.decoder.getUsernameFromToken();
    return this.http.get<UserGroupInfo[]>(`/user-group/${username}`);
  }
}
