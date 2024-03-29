import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { interval, Observable, Subscription, tap } from 'rxjs';
import { UserLoginModel } from '../../components/user-management/login/login.types';
import { DecodedToken } from '../token-decoder/token-decoder.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  tokenSubscription?: Subscription;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  loginUser(
    url: string,
    userLoginData: UserLoginModel
  ): Observable<LoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<LoginResponse>(
        `/login?username=${userLoginData.username}&password=${userLoginData.password}`,
        { headers: headers }
      )
      .pipe(tap(() => this.runCheckTokenExpired()));
  }

  logout(): void {
    this.localStorageService.removeItem('token');
    this.localStorageService.removeItem('refreshToken');
    this.router.navigate(['']);
    this.tokenSubscription?.unsubscribe();
  }

  refreshToken(): Observable<{ accessToken: string; refreshToken: string }> {
    return this.http
      .get<{ accessToken: string; refreshToken: string }>('/token-refresh')
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

  private runCheckTokenExpired() {
    const source = interval(2*60*1000);
    this.tokenSubscription = source.subscribe(() => this.checkIsLoggedIn());
  }

  private checkIsLoggedIn() {
    const refreshToken = this.localStorageService.getItem('refreshToken');
    const refreshDecoded: DecodedToken = jwt_decode(refreshToken);

    if (this.localStorageService.checkIfTokenExpired(refreshDecoded)) {
      console.log('Token expired');
      this.logout();
    }
  }
}
