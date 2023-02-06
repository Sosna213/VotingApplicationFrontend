import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { RegexValidator } from '../../validators/regexp-validators';
import { PasswordMatchValidator } from '../../validators/password-validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRegisterModel } from './register.types';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = this.formBuilder.group(
    {
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        Validators.compose([
          Validators.required,
          RegexValidator(/\d/, { hasNumber: true }),
          RegexValidator(/[A-Z]/, { hasCapitalCase: true }),
          RegexValidator(/[a-z]/, { hasSmallCase: true }),
          RegexValidator(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
            hasSpecialCharacters: true,
          }),
          Validators.minLength(8),
        ]),
      ],
      repeatPassword: [null, Validators.required],
    },
    { validators: [PasswordMatchValidator('password', 'repeatPassword')] }
  );
  hidePassword = true;

  readonly registerUrl = '/register';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      const data: UserRegisterModel = {
        username: this.registerForm.controls['username'].value,
        email: this.registerForm.controls['email'].value,
        password: this.registerForm.controls['password'].value,
      };
      this.userService.registerUser(this.registerUrl, data).subscribe({
        next: () => {
          this.router.navigate(['login']);
        },
        error: (error) => {
          console.error(error);
          this.errorSnackBarOpen(error.error.error);
        },
      });
    } else {
      this.errorSnackBarOpen('Nieprawidłowe dane');
    }
  }

  private errorSnackBarOpen(message: string) {
    this.snackBar.open(message, 'Zamknij', {
      duration: 3 * 1000,
      horizontalPosition: 'right',
    });
  }
}
