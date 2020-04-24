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
    let loginSuccess;
    let user=this.loginForm.get('user').value.toLowerCase();
    let pwd=this.loginForm.get('password').value;
    let payload={username:user,password:pwd};
    this.auth.loginApiCall(payload).subscribe((res)=>{
      loginSuccess=(res['loginStatus'])?true:false;
      this.login(loginSuccess);
    },(err)=>
    {
      console.error('backend not running. Authenticating locally');
      loginSuccess=this.usersList.find((item)=>(item.username==user)&&(item.password==pwd));
      this.login(loginSuccess);
    }
    );
  }

  needsLogin() {
    return !this.auth.isAuthenticated();
  }
  
  login(loginFlag:boolean)
  {
    if(loginFlag)
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
}
