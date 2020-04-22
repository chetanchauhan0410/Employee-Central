import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeViewComponent } from './employee-view.component';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/observable/of';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('EmployeeViewComponent', () => {
  let component: EmployeeViewComponent;
  let fixture: ComponentFixture<EmployeeViewComponent>;
  let nameControl:AbstractControl;
  let designationControl:AbstractControl;
  let updateBtn:DebugElement;

  const activatedRouteStub = {
    paramMap: {
      subscribe() {
        return of({id: 25});
      }
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeViewComponent ],
      providers:[
        { provide: ActivatedRoute, useValue: activatedRouteStub }
    ],
      imports:[ReactiveFormsModule,RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    spyOn(localStorage,'getItem');
    fixture = TestBed.createComponent(EmployeeViewComponent);
    component = fixture.componentInstance;

    nameControl=component.empProfileForm.controls['name'];
    designationControl=component.empProfileForm.controls['designation'];
    updateBtn=fixture.debugElement.query(By.css('button'));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
