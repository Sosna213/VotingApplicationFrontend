import { TestBed } from '@angular/core/testing';

import { TokenDecoderService } from './token-decoder.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

describe('TokenDecoderService', () => {
  let tokenDecoderService: TokenDecoderService;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', [
      'getItem',
    ]);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LocalStorageService,
          useValue: localStorageServiceSpy,
        },
      ],
    });
    tokenDecoderService = TestBed.inject(TokenDecoderService);
  });

  it('should be created', () => {
    expect(tokenDecoderService).toBeTruthy();
  });

  it('should get username', (done: DoneFn) => {
    localStorageServiceSpy.getItem.and.returnValue('token');
    spyOn(tokenDecoderService, 'jwtDecode').and.returnValue({
      exp: 1,
      iss: 'iss',
      sub: 'username',
    });

    expect(tokenDecoderService.getUsernameFromToken()).toEqual('username');

    done();
  });

  it('should return empty string for empty yoken', (done: DoneFn) => {
    localStorageServiceSpy.getItem.and.returnValue(null);
    expect(tokenDecoderService.getUsernameFromToken()).toEqual('');

    done();
  });
});
