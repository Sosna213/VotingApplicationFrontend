import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  goToLoginPage() {
    this.router.navigate(['login']);
  }

  goToHomePage() {
    this.router.navigate(['']);
  }

  logout() {
    this.authService.logout();
    this.goToHomePage();
  }

  goToVotingSearchPage() {
    this.router.navigate(['voting-search']);
  }

  goToRegisterPage() {
    this.router.navigate(['register']);
  }

  isLoggedIn(): boolean {
    return this.localStorageService.isLoggedIn();
  }

  goToVotingSharedToMe() {
    this.router.navigate(['voting-shared-to-me']);
  }

  goToUserGroupSearch() {
    this.router.navigate(['user-group-search']);
  }

  goToCreateVotingPage() {
    this.router.navigate(['create-voting']);
  }
}
