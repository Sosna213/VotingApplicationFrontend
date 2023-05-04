import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  AuthService,
  LoginResponse,
} from '../../../services/auth/auth.service';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debugElement: DebugElement;

  let authService: AuthService;
  let authServiceSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        UntypedFormBuilder,
        MatSnackBar,
        Router,
        AuthService,
        LocalStorageService
      ],
      imports: [MatCardModule,BrowserAnimationsModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule, MatInputModule, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    authService = debugElement.injector.get(AuthService);
    authServiceSpy = spyOn(authService, 'loginUser').and.returnValue(of({accessToken: 'accessTokenSuccess', refreshToken: 'refreshTokenSuccess'} as LoginResponse))

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined loginForm', () => {
    expect(component.loginForm).toBeDefined();
  });

  it('should have login button', () => {
    const loginButton = debugElement.nativeElement.querySelector(
      '.login-button'
    );
    expect(loginButton).toBeDefined();
  });

  it('should use login user methode once', () => {
    component.loginForm.setValue({username: 'username', password: 'password'});
    component.onSubmit();
    expect(authServiceSpy).toHaveBeenCalledTimes(1);
  });
});
