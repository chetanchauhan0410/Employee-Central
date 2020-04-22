import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
//import {RouterTestingMofule}

const routes:Routes=[
  {path:'employees',component:EmployeesComponent},
  {path:'**',component:EmployeesComponent}
];


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        EmployeesComponent,
        CapitalizePipe
      ],
      imports:[
        RouterTestingModule.withRoutes(routes)
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Employee Central');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Employee Central');
  }));
});
