import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from "../../services/local-storage/local-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService, private router: Router) { }

  ngOnInit(): void {
  }
  isLoggedIn(): boolean {
    return this.localStorageService.isLoggedIn();
  }
  goToRegisterPage(){
    this.router.navigate(['register']);
  }
  goToCreateVotingPage(){
    this.router.navigate(['create-voting']);
  }

}
