import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPLOYEES } from '../mock-employees';


@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {

  currentEmployee: Employee;
  empId:number;
  employeeList:Employee[];

  empProfileForm = new FormGroup({
    id: new FormControl(''),
    code: new FormControl(''),
    name: new FormControl('',Validators.required),
    designation: new FormControl('',Validators.required)
  });
  constructor(private _activatedRoute:ActivatedRoute,private router:Router) { 
    
    this._activatedRoute.paramMap.subscribe(params => {
      this.empId = Number(params.get("id"));
      this.employeeList=JSON.parse(localStorage.getItem('employeelist'));
      this.currentEmployee=this.employeeList.find((item)=>item.id==this.empId);
      this.empProfileForm.setValue(this.currentEmployee);
    });
  }

  ngOnInit() {
    //alert(JSON.stringify(this.currentEmployee));
    /* value:this.currentEmployee.id, value:this.currentEmployee.code, value:this.currentEmployee.name, value:this.currentEmployee.designation */
  }

  onUpdate()
  { 
    let updatedEmp=this.empProfileForm.value;
    for (var i = 0; i < this.employeeList.length; i++) {
      if (this.employeeList[i].id == this.empId) {
        this.employeeList[i].name = this.empProfileForm.controls['name'].value;
        this.employeeList[i].designation=this.empProfileForm.controls['designation'].value;
        localStorage.setItem('employeelist',JSON.stringify(this.employeeList));
        break;
      }
    }
    let reply = confirm("Proceed to update employee data");
    if (reply == true) {
      this.router.navigate(['employees']);
    } 
  }


}
