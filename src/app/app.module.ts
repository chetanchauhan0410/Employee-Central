import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes,RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { LoginComponent } from './login/login.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { AuthService } from './services/auth-service.service';


const routes:Routes=[
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'employees',component:EmployeesComponent},
  {path:'employeeView',component:EmployeeViewComponent},
  {path:'**',component:EmployeesComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeViewComponent,
    LoginComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
