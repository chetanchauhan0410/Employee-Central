import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth-service.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });

  afterEach(() => { 
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should call localstorage getItem method to retrieve token',inject([AuthService], (service: AuthService) => { 
    spyOn(localStorage,'getItem');
    service.isAuthenticated();
    expect(localStorage.getItem).toHaveBeenCalledWith('token');
  }));

  it('should return true from isAuthenticated when there is a token', inject([AuthService], (service: AuthService) => { 
    spyOn(localStorage,'getItem').and.returnValue('123');
    expect(service.isAuthenticated()).toBeTruthy();
  }));

  it('should return false from isAuthenticated when there is no token', inject([AuthService], (service: AuthService) => { 
    spyOn(localStorage,'getItem');
    expect(service.isAuthenticated()).toBeFalsy();
  }));
});
