import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ReactiveFormsModule, AbstractControl,FormsModule, AbstractFormGroupDirective, FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { inject } from '@angular/core/src/render3';
import { DebugElement } from '@angular/core';
import { By} from '@angular/platform-browser';
import { Routes, Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from '../services/auth-service.service';

import { EmployeesComponent } from '../employees/employees.component';
import { AppComponent } from '../app.component';
import { LoginComponent } from './login.component';
import { CapitalizePipe } from '../pipes/capitalize.pipe';

class MockAuthService { 
  authenticated = false;

  isAuthenticated() {
    return this.authenticated;
  }

  setAuthenticated(value)
  {
    this.authenticated=value;
  }
}


let mockUserList=[
  {username:"chetan.chauhan@globallogic.com",password:"Chetan@123"}
];

const routes:Routes=[
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'employees',component:EmployeesComponent}
];

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service;
  let userName:DebugElement;
  let pwd:DebugElement;
  let submitBtn:DebugElement;
  let userInput:AbstractControl;
  let pwdInput:AbstractControl;
  let loginForm:FormGroup;
  let inputEmailInvalidDiv:DebugElement;
  let inputPasswordInvalidDiv:DebugElement;
  let router:Router;
  let location:Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent,EmployeesComponent,CapitalizePipe],
      providers:[{provide:AuthService,useClass:MockAuthService}],
      imports:[ReactiveFormsModule,RouterTestingModule.withRoutes(routes),FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    service=TestBed.get(AuthService);
    userName=fixture.debugElement.query(By.css('input[type=email]'));
    pwd=fixture.debugElement.query(By.css('#password'));
    submitBtn=fixture.debugElement.query(By.css('button'));
    loginForm=component.loginForm;
    userInput=loginForm.controls['user'];
    pwdInput=loginForm.controls['password'];

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should give true on calling needsLogin method if authentication service returns false for isAuthenticated', () => { 
    service.setAuthenticated(false);

    expect(component.needsLogin()).toBeTruthy();
  });

  it('should give false on calling needsLogin method if authentication service returns true for isAuthenticated', () => {
    spyOn(service,'isAuthenticated').and.returnValue(true);

    expect(component.needsLogin()).toBeFalsy();
    expect(service.isAuthenticated).toHaveBeenCalled();
  });

  it('should show username and password to be empty, no error messages and button disabled initially',()=>{
   inputEmailInvalidDiv=fixture.debugElement.query(By.css('#inputEmailInvalidDiv'));
   inputPasswordInvalidDiv=fixture.debugElement.query(By.css('#inputPasswordInvalidDiv'));
   
   expect(userInput.value).toBe('');
   expect(pwdInput.value).toBe('');
   expect(inputPasswordInvalidDiv).toBeNull();
   expect(inputEmailInvalidDiv).toBeNull();
   expect(submitBtn.nativeElement.disabled).toBeTruthy();
  });

  it('button should be disabled and form should be invalid if one of the username or password is empty',()=>{
   userInput.patchValue('chetan');

   fixture.detectChanges();

   expect(loginForm.valid).toBeFalsy();
   expect(userInput.invalid).toBeTruthy();
   expect(submitBtn.nativeElement.disabled).toBeTruthy();

   pwdInput.patchValue('someValue');
   userInput.patchValue('');
   fixture.detectChanges();

   expect(loginForm.valid).toBeFalsy();
   expect(submitBtn.nativeElement.disabled).toBeTruthy();

  });

  it('should only consider value in email format to be valid for username',()=>{
    userInput.patchValue('chetan.chauhan');
    fixture.detectChanges();
    expect(userInput.invalid).toBeTruthy();
    
    userInput.patchValue('chetan');
    fixture.detectChanges();
    expect(userInput.invalid).toBeTruthy();
    
    userInput.patchValue('chetan.chauhan@globallogic.com');
    fixture.detectChanges();
    expect(userInput.valid).toBeTruthy();
  });

  it('should enable button and show form as valid when both values of username and password are in valid format',()=>{
    userInput.patchValue('chetan.chauhan@globallogic.com')
    pwdInput.patchValue('abcdefgh');

    fixture.detectChanges();

    expect(loginForm.valid).toBeTruthy();
    expect(submitBtn.nativeElement.disabled).toBeFalsy();
  });

  it('should show error message when username is in wrong pattern',()=>{
    userName.nativeElement.value='ch';
    userName.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    inputEmailInvalidDiv=fixture.debugElement.query(By.css('#inputEmailInvalidDiv'));
    inputPasswordInvalidDiv=fixture.debugElement.query(By.css('#inputPasswordInvalidDiv'));
    
    expect(inputEmailInvalidDiv).toBeTruthy();
    expect(inputPasswordInvalidDiv).toBeNull();
  });

  it('should not show error message when user name is in correct format i.e. email',()=>{
    userName.nativeElement.value='chetan.chauhan@globallogic.com';
    userName.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    inputEmailInvalidDiv=fixture.debugElement.query(By.css('#inputEmailInvalidDiv'));
    inputPasswordInvalidDiv=fixture.debugElement.query(By.css('#inputPasswordInvalidDiv'));

    expect(inputEmailInvalidDiv).toBeFalsy();
    expect(inputPasswordInvalidDiv).toBeNull();
  });

  it('should show error message when password is less than minlength i.e. 6',()=>{
    pwd.nativeElement.value='1234';
    pwd.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    inputPasswordInvalidDiv=fixture.debugElement.query(By.css('#inputPasswordInvalidDiv'));

    expect(inputPasswordInvalidDiv).toBeTruthy();
    expect(inputEmailInvalidDiv).toBeNull();
  });

  it('should show error message when password is more than maxlength i.e. 10',()=>{
    pwd.nativeElement.value='123456789101112';
    pwd.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    inputPasswordInvalidDiv=fixture.debugElement.query(By.css('#inputPasswordInvalidDiv'));

    expect(inputPasswordInvalidDiv).toBeTruthy();
    expect(inputEmailInvalidDiv).toBeNull();
  });

  it('should not show error message when password length is valid ',()=>{
    pwd.nativeElement.value='12345678';
    pwd.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    inputPasswordInvalidDiv=fixture.debugElement.query(By.css('#inputPasswordInvalidDiv'));

    expect(inputPasswordInvalidDiv).toBeNull();
    expect(inputEmailInvalidDiv).toBeNull();
  });

  it('should call onSubmit metod on button click',async(()=>{
     spyOn(component,'onSubmit');
     userInput.setValue('chetan.chauhan@globallogic.com')
     pwdInput.setValue('abcdefgh');

     fixture.detectChanges();

     submitBtn.nativeElement.click();

     fixture.whenStable().then(() => {
      expect(component.onSubmit).toHaveBeenCalled();
    });
  }));

  it('should set values in localStorage on button click',async(()=>{
    let spy=spyOn(localStorage,'setItem');
    userInput.setValue('chetan.chauhan@globallogic.com')
    pwdInput.setValue('Chetan@123');

    fixture.detectChanges();

    submitBtn.nativeElement.click();

    fixture.whenStable().then(()=>{
      expect(localStorage.setItem).toHaveBeenCalledTimes(2);
      expect(spy.calls.first().args[0]).toEqual('token');
      expect(spy.calls.mostRecent().args[0]).toEqual('employeelist');
    });
  }));

  it('should do routing to employees view on button click',async(()=>{
    spyOn(router,'navigate');
    userInput.setValue('chetan.chauhan@globallogic.com')
    pwdInput.setValue('Chetan@123');

    fixture.detectChanges();

    submitBtn.nativeElement.click();
    
    fixture.whenStable().then(()=>{
     expect(router.navigate).toHaveBeenCalledWith(['employees']);
    });

  }));

});
