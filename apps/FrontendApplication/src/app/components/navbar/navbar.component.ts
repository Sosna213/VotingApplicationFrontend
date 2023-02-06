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

  isLoggedIn(): boolean {
    return this.localStorageService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.navigate('');
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
