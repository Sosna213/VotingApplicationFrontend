import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Observable, tap } from 'rxjs';
import {UserLoginModel} from "../../user-management/login/login.types";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  loginUser(url: string, userLoginData: UserLoginModel): Observable<LoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<LoginResponse>(
      `/login?username=${userLoginData.username}&password=${userLoginData.password}`,
      { headers: headers }
    );
  }

  logout(): void {
    this.localStorageService.removeItem('token');
    this.localStorageService.removeItem('refreshToken');
  }

  refreshToken(): Observable<{ accessToken: string; refreshToken: string }> {
    const refreshToken = this.localStorageService.getItem('refreshToken');
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    return this.http
      .post<{ accessToken: string; refreshToken: string }>(
        'token-refresh',
        refreshToken,
        { headers }
      )
      .pipe(
        tap((response) => {
          this.setToken('token', response.accessToken);
          this.setToken('refreshToken', response.refreshToken);
        })
      );
  }

  private setToken(key: string, token: string): void {
    this.localStorageService.setItem(key, token);
  }
}
