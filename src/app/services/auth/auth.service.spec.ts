import { TestBed } from '@angular/core/testing';

import { AuthService, LoginResponse } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { UserLoginModel } from '../../components/user-management/login/login.types';
import { of } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let authService: AuthService;
  //spy objects
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', [
      'removeItem',
      'setItem',
      'getItem',
      'checkIfTokenExpired'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HttpClient, useValue: httpClientSpy },
        {
          provide: LocalStorageService,
          useValue: localStorageServiceSpy,
        },
        { provide: Router, useValue: routerSpy },
      ],
    });

    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should login user (HttpClient called once) and start token checking', (done: DoneFn) => {
    const loginData: UserLoginModel = {
      username: 'username',
      password: 'password',
    };
    const loginResponse: LoginResponse = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };
    httpClientSpy.post.and.returnValue(of(loginResponse));

    authService.loginUser('/login', loginData).subscribe({
      next: (response) => {
        expect(response).withContext('expected tokens').toEqual(loginResponse);
        done();
      },
      error: done.fail,
    });

    expect(httpClientSpy.post.calls.count()).withContext('one call').toBe(1);
  });

  it('should logout user (both tokens should be removed)', (done: DoneFn) => {
    localStorageServiceSpy.removeItem.and.callThrough();
    authService.logout();
    expect(routerSpy.navigate.calls.count())
      .withContext('router called')
      .toBe(1);
    expect(localStorageServiceSpy.removeItem.calls.count())
      .withContext('local storage remove item called twice')
      .toBe(2);
    done();
  });

  it('should call refresh token (HttpClient called once) and set both', (done: DoneFn) => {
    const refreshResponse: { accessToken: string; refreshToken: string } = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };
    httpClientSpy.get.and.returnValue(of(refreshResponse));

    authService.refreshToken().subscribe({
      next: () => {
        expect(localStorageServiceSpy.setItem.calls.count())
          .withContext('two calls')
          .toBe(2);
        done();
      },
      error: done.fail,
    });

    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it('should start checking token expired', (done: DoneFn) => {
    authService['runCheckTokenExpired']();

    expect(authService.tokenSubscription).toBeDefined();
    authService.tokenSubscription?.unsubscribe();
    done();
  });

  it('should check that token expired (not expired)', (done: DoneFn) => {
    const jwtDecodeSpy = spyOn(authService, 'jwtDecode').and.returnValue({ exp: 0, iss: '', sub: '' });
    localStorageServiceSpy.getItem.and.returnValue('validToken');
    localStorageServiceSpy.checkIfTokenExpired.and.returnValue(false);

    authService['checkIsLoggedIn']();

    expect(jwtDecodeSpy.calls.count()).withContext('decode token once').toBe(1);
    expect(localStorageServiceSpy.getItem.calls.count()).withContext('get token once').toBe(1);
    expect(localStorageServiceSpy.checkIfTokenExpired.calls.count()).withContext('check token once').toBe(1);
    done();
  });

  it('should check that token expired (expired)', (done: DoneFn) => {
    const jwtDecodeSpy = spyOn(authService, 'jwtDecode').and.returnValue({ exp: 0, iss: '', sub: '' });
    const logout = spyOn(authService, 'logout').and.callThrough();
    localStorageServiceSpy.getItem.and.returnValue('validToken');
    localStorageServiceSpy.checkIfTokenExpired.and.returnValue(true);

    authService['checkIsLoggedIn']();

    expect(jwtDecodeSpy.calls.count()).withContext('decode token once').toBe(1);
    expect(localStorageServiceSpy.getItem.calls.count()).withContext('get token once').toBe(1);
    expect(localStorageServiceSpy.checkIfTokenExpired.calls.count()).withContext('check token once').toBe(1);
    expect(logout.calls.count()).withContext('should logout once').toBe(1);
    done();
  });

  it('should check that token expired (token null)', (done: DoneFn) => {
    const logout = spyOn(authService, 'logout').and.callThrough();
    localStorageServiceSpy.getItem.and.returnValue(null);

    authService['checkIsLoggedIn']();

    expect(localStorageServiceSpy.getItem.calls.count()).withContext('get token once').toBe(1);
    expect(logout.calls.count()).withContext('should logout once').toBe(1);
    done();
  });

});
