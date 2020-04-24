import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth-service.service';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { URLS } from '../mock-employees';


describe('AuthService', () => {
  let httpTestingController: HttpTestingController;
  const userMockObj:object={username:"chetan.chauhan@globallogic.com",password:"Chetan@123"};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports:[HttpClientTestingModule]
    });
    httpTestingController=TestBed.get(HttpTestingController);
  });

  afterEach(() => { 
      httpTestingController.verify();  
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

  it('should return true on passing right user obj', inject([AuthService], (service: AuthService) => { 
    service.loginApiCall(userMockObj).subscribe((testRes)=>{
     expect(testRes['loginStatus']).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:3000/login');

    expect(req.request.method).toEqual('POST');
  }));
  
  it('should call http post with login url and mock object', inject([AuthService,HttpClient], (service: AuthService,http:HttpClient) =>{
    spyOn(http,'post').and.returnValue(of({loginStatus:true}));
    service.loginApiCall(userMockObj).subscribe((testRes)=>{
      expect(http.post).toHaveBeenCalledWith(URLS.login,userMockObj);
      expect(testRes['loginStatus']).toBeTruthy();
     });
  }));

});
