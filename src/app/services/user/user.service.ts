import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {UserRegisterModel} from "../../components/register/register.component";
import {TokenDecoderService} from "../token-decoder/token-decoder.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private tokenDecoder: TokenDecoderService) { }

  public registerUser(url: String, data: UserRegisterModel): Observable<Object>{
    let response: any;
    return this.http.post('/register', data);

  }
  public getActiveUserId(): Observable<number>{

    let userId = new Subject<number>()
    let username = this.tokenDecoder.getUsernameFromToken();

    this.http.get<number>(`/userId/${username}`)
      .subscribe(response =>{
        userId.next(response);
        return userId;
      }, error => {
        console.log(error);
      });
    return userId;
  }
  public getUsernames(): Observable<string[]>{
    return this.http.get<string[]>('/usernames');
  }
}
