import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import {LocalStorageService} from "../local-storage/local-storage.service";

export interface DecodedToken {
  exp: number;
  iss: string;
  sub: string;
}

@Injectable({
  providedIn: 'root'
})
export class TokenDecoderService {

  jwtDecode = jwt_decode;

  constructor(private localStorageService: LocalStorageService) {
  }

  getUsernameFromToken(): string {
    const token = this.localStorageService.getItem('token');
    if(token === null) return '';
    const decoded: DecodedToken = this.jwtDecode(token);
    return decoded.sub;
  }
}
