import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export type UserLoginModel = {
  username: string;
  password: string;
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  });
  hide = true;
  readonly loginUrl = '/login';

  constructor(
    private formBuilder: UntypedFormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const userLoginData: UserLoginModel = {
        username: this.loginForm.controls['username'].value,
        password: this.loginForm.controls['password'].value,
      };
      this.authService.loginUser(this.loginUrl, userLoginData).subscribe(
        (res) => {
          this.localStorage.setItem('token', res.accessToken);
          this.localStorage.setItem('refreshToken', res.refreshToken);
          this.router.navigate(['']);
        },
        (error) => {
          if (error.status === 403) {
            this.errorSnackBarOpen('Nieprawidłowy login lub hasło');
          } else {
            this.errorSnackBarOpen(error.error.error);
          }
        }
      );
    } else {
      this.errorSnackBarOpen('Nieprawidłowe dane');
    }
  }

  private setToken(key: string, token: string): void {
    this.localStorage.setItem(key, token);
  }

  private errorSnackBarOpen(message: string) {
    this.snackBar.open(message, 'Zamknij', {
      duration: 3 * 1000,
      horizontalPosition: 'right',
    });
  }
}
