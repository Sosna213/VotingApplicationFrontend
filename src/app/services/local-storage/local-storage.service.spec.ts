import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { DecodedToken } from '../token-decoder/token-decoder.service';

describe('LocalStorageService', () => {
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    localStorageService = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(localStorageService).toBeTruthy();
  });

  it('should clear local storage', (done: DoneFn) => {
    localStorageService.clear();
    expect(localStorage.length).withContext('expected localStorage length to be 0').toEqual(0);
    done();
  });

  it('should get item from local storage', (done: DoneFn) => {
    const itemKey = 'token';
    const localStorageGetItemSpy = spyOn(localStorage, 'getItem').and.returnValue({token: 'validToken' }.toString());
    const jsonParseSpy = spyOn(JSON, 'parse').and.returnValue('validToken');

    expect(localStorageService.getItem(itemKey)).withContext('expected token to be validToken').toEqual('validToken');
    expect(localStorageGetItemSpy.calls.count()).withContext('expected localStorage get item to be called once').toEqual(1);
    expect(jsonParseSpy.calls.count()).withContext('expected JSON.parse to be called once').toEqual(1);
    done();
  });

  it('should throw error when there is no item in local storage', (done: DoneFn) => {
    const itemKey = 'token';
    spyOn(localStorage, 'getItem').and.returnValue(null);

    expect(localStorageService.getItem(itemKey)).withContext('expected function to return null').toEqual(null);
    done();
  });

  it('should set item in local storage', (done: DoneFn) => {
    const itemKey = 'token';
    const itemValue = 'validToken';

    localStorageService.setItem(itemKey, itemValue);

    expect(localStorage.getItem(itemKey)).withContext('expected localStorage item to be set').toEqual(JSON.stringify(itemValue));
    localStorage.clear();

    done();
  });

  it('should remove item from local storage', (done: DoneFn) => {
    const itemKey = 'token';
    const itemValue = 'validToken';

    localStorageService.setItem(itemKey, itemValue);

    expect(localStorage.getItem(itemKey)).withContext('expected localStorage item to be set').toEqual(JSON.stringify(itemValue));
    localStorageService.removeItem(itemKey);
    expect(localStorage.getItem(itemKey)).withContext('expected localStorage item to be removed').toEqual(null);

    done();
  });

  it('should check if token expired (should expired)', (done: DoneFn) => {
    const token: DecodedToken = {
      exp: 168346150,
      iss: 'string',
      sub: 'string',
    }
    expect(localStorageService.checkIfTokenExpired(token)).withContext('Should return true').toEqual(true);
    done();
  });

  it('should check if token expired (not expired)', (done: DoneFn) => {
    const token: DecodedToken = {
      exp: new Date().getTime()/1000 + 1000,
      iss: 'string',
      sub: 'string',
    }
    expect(localStorageService.checkIfTokenExpired(token)).withContext('Should return true').toEqual(false);
    done();
  });

  it('check is logged in (token null)', (done: DoneFn) => {
    spyOn(localStorageService, 'getItem').and.returnValue(null);

    expect(localStorageService.isLoggedIn()).withContext('Should return false').toEqual(false);
    done();
  });

  it('check is logged in (token expired)', (done: DoneFn) => {
    spyOn(localStorageService, 'getItem').and.returnValue('token');
    spyOn(localStorageService, 'jwt_decode').and.returnValue('token');
    spyOn(localStorageService, 'checkIfTokenExpired').and.returnValue(true);

    expect(localStorageService.isLoggedIn()).withContext('Should return false').toEqual(false);
    done();
  });
});
