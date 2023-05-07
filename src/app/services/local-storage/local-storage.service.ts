import { Injectable } from '@angular/core';
import { DecodedToken } from '../token-decoder/token-decoder.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  jwt_decode = jwt_decode
  clear(): void {
    localStorage.clear();
  }

  getItem(key: string): string | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  isLoggedIn(): boolean {
    const token = this.getItem('token');
    const refreshToken = this.getItem('refreshToken');
    if (token !== null && refreshToken !== null) {
      const decoded: DecodedToken = this.jwt_decode(token);
      if (this.checkIfTokenExpired(decoded)) {
        const refreshDecoded: DecodedToken = this.jwt_decode(refreshToken);
        if (this.checkIfTokenExpired(refreshDecoded)) {
          return false;
        }
      }
    }
    return false;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  checkIfTokenExpired(token: DecodedToken): boolean {
    return new Date(token.exp * 1000) <= new Date();
  }
}
