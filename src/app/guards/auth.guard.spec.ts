import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth-service.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

let router:Router;

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard,AuthService],
      imports:[RouterTestingModule,HttpClientTestingModule]
    });
    router=TestBed.get(Router);
  });

  it('should ...', inject([AuthGuard,AuthService], (guard: AuthGuard,service:AuthService) => {
    expect(guard).toBeTruthy();
  }));

  it('should call return true if AuthService method returns true', inject([AuthGuard,AuthService], (guard: AuthGuard,service:AuthService) => {
    spyOn(service,'isAuthenticated').and.returnValue(true);

    expect(guard.canActivate(null,null)).toBeTruthy();
  }));

  it('should call return false if AuthService method returns false', inject([AuthGuard,AuthService], (guard: AuthGuard,service:AuthService) => {
    spyOn(service,'isAuthenticated').and.returnValue(false);
    spyOn(router,'navigate');

    //expect(router.navigate).toHaveBeenCalledWith(['login']);
    expect(guard.canActivate(null,null)).toBeFalsy();
  }));

});