import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  goToCreateVotingPage() {
    this.router.navigate(['create-voting']);
  }

  goToRegisterPage() {
    this.router.navigate(['register']);
  }

  isLoggedIn(): boolean {
    return this.localStorageService.isLoggedIn();
  }
}
