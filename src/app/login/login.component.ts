import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {USERS,EMPLOYEES} from '../mock-employees';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usersList=USERS;
  isUserLoggedIn:boolean;
  loginForm = new FormGroup({
    user: new FormControl('',[Validators.required,Validators.pattern(/\S+@\S+\.\S+/)]),
    password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(10)])
  });

  constructor(private router:Router,private auth:AuthService) {
    
  }
 
  ngOnInit() {
   this.isUserLoggedIn=localStorage.getItem('token')?true:false;
  }

  onSubmit()
  {
    let user=this.loginForm.get('user').value.toLowerCase();
    let pwd=this.loginForm.get('password').value;
    let loginSuccess=this.usersList.find((item)=>(item.username==user)&&(item.password==pwd));
    if(loginSuccess)
    {
      localStorage.setItem('token','loggedIn');
      localStorage.setItem('employeelist',JSON.stringify(EMPLOYEES));
      this.router.navigate(['employees']);
    }
    else
    {
      alert("invalid user/password");
    }
  }

  needsLogin() {
    return !this.auth.isAuthenticated();
  }

}
