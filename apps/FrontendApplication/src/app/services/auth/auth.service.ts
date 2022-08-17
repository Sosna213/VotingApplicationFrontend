import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserLoginModel} from "../../components/login/login.component";
import {LocalStorageService} from "../local-storage/local-storage.service";
import {Observable, catchError, tap, throwError} from "rxjs";

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService) {
  }

  public loginUser(url: string, userLoginData: UserLoginModel): Observable<LoginResponse> {

    const body = JSON.stringify(userLoginData);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    return this.http.post<LoginResponse>('/login', body, {
      headers,
      withCredentials: true
    })
      .pipe(
        catchError((err => {
          console.error(err);
          return throwError(err);
        }))
      );
  }

  refreshToken(): Observable<{ access_token: string; refresh_token: string }> {
    const refreshToken = this.localStorageService.getItem('refreshToken');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post<{access_token: string; refresh_token: string}>("token-refresh", refreshToken, {headers}).pipe(
      tap(response => {
        this.setToken('token', response.access_token);
        this.setToken('refreshToken', response.refresh_token);
      })
    );
  }

  logout(): void {
    this.localStorageService.removeItem('token');
    this.localStorageService.removeItem('refreshToken');
  }

  private setToken(key: string, token: string): void {
    this.localStorageService.setItem(key, token);
  }
}
