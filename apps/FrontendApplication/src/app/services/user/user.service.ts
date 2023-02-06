import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenDecoderService } from '../token-decoder/token-decoder.service';
import {UserRegisterModel} from "../../components/register/register.types";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private tokenDecoder: TokenDecoderService
  ) {}

  registerUser(url: string, data: UserRegisterModel): Observable<unknown> {
    return this.http.post('/register', data);
  }

  getActiveUserId(): Observable<number> {
    const username = this.tokenDecoder.getUsernameFromToken();
    return this.http.get<number>(`/userId/${username}`);
  }

  getUsernames(): Observable<string[]> {
    return this.http.get<string[]>('/usernames');
  }
}
