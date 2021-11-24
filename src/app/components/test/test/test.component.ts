import {Component, OnInit} from '@angular/core';
import {User} from "../../../../interfaces/user.interface";
import {catchError, tap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  users: any;
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.http.get<any>('/users').subscribe(
      res => {
        this.users = res;
        console.log(res);
      }
    );
  }

}
