import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import {LocalStorageService} from "../local-storage/local-storage.service";
import {AuthService} from "../auth/auth.service";
import {TokenInterceptorService} from "../token-interceptor/token-interceptor.service";

export interface DecodedToken {
  exp: number;
  iss: string;
  sub: string;
}

@Injectable({
  providedIn: 'root'
})
export class TokenDecoderService {

  constructor(private localStorageService: LocalStorageService) {
  }

  public getUsernameFromToken(): string {
    const token = this.localStorageService.getItem('token');
    const decoded: DecodedToken = jwt_decode(token);
    return decoded.sub;
  }
}
