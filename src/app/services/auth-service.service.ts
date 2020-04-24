import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {URLS} from '../mock-employees';

@Injectable()
export class AuthService {

  constructor(private http:HttpClient) { }
 
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  loginApiCall(userObj)
  {
   return this.http.post(URLS.login,userObj);
  }
}
