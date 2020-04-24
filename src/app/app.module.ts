import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes,RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { LoginComponent } from './login/login.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { AuthService } from './services/auth-service.service';
import { HoverFocusDirective } from './directives/hover-focus.directive';
import { AuthGuard } from './guards/auth.guard';


const routes:Routes=[
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'employees',component:EmployeesComponent,canActivate:[AuthGuard]},
  {path:'employeeView',component:EmployeeViewComponent,canActivate:[AuthGuard]},
  {path:'**',component:EmployeesComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeViewComponent,
    LoginComponent,
    CapitalizePipe,
    HoverFocusDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
