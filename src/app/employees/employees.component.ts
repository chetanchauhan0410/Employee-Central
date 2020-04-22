import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EMPLOYEES } from '../mock-employees';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  
  emp:Employee={
    id:1,
    name:'John Hopkins',
    code:'ggl1357',
    designation:'Senior Software Engineer'
  };

  employees:Employee[];

  selectedEmployee: Employee;

  constructor(private router:Router) { }

  ngOnInit() {
   this.employees=JSON.parse(localStorage.getItem('employeelist'));
  }

  onSelect(employee: Employee): void {
    this.selectedEmployee = employee;
    this.router.navigate(['employeeView',{id:this.selectedEmployee.id}])
  }

}
