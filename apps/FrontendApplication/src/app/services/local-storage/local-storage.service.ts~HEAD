import {Injectable} from '@angular/core';
import {DecodedToken, TokenDecoderService} from "../token-decoder/token-decoder.service";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    try {
      const item = localStorage.getItem(key);

      return JSON.parse(<string>item);
    } catch (e) {
      console.log(e)
    }
  }

  removeItem(key: string): any {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    if(this.getItem('token') != null){
      const token = this.getItem('token');
      const decoded: DecodedToken = jwt_decode(token);
      if (this.checkIfTokenExpired(decoded)) {
        const refreshToken = this.getItem('refreshToken');
        const refreshDecoded: DecodedToken = jwt_decode(refreshToken);
        if (this.checkIfTokenExpired(refreshDecoded)) {
          return false;
        }
      }
    }
    return this.getItem('token') != null;
  }

  checkIfTokenExpired(token: DecodedToken): boolean {
    return new Date(token.exp * 1000) <= new Date();
  }

}
