import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeViewComponent } from './employee-view.component';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/observable/of';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CapitalizePipe } from '../pipes/capitalize.pipe';

describe('EmployeeViewComponent', () => {
  let component: EmployeeViewComponent;
  let fixture: ComponentFixture<EmployeeViewComponent>;
  let nameControl:AbstractControl;
  let designationControl:AbstractControl;
  let idControl:AbstractControl;
  let codeControl:AbstractControl;
  let updateBtn:DebugElement;
  let nameInput:DebugElement;

  const activatedRouteStub = {
    paramMap: of(
      {get:(key)=>{
       return '12';
    }})
    };
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeViewComponent,CapitalizePipe],
      providers:[
        { provide: ActivatedRoute, useValue: activatedRouteStub }
    ],
      imports:[ReactiveFormsModule,RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let strMockEmpArr=JSON.stringify([{ id: 11, name: 'marcus smith',designation:'SE',code:'GGL1358' },
    { id: 12, name: 'stuart phillips',designation:'GET',code:'GGL1359' }]);
    spyOn(localStorage,'getItem').and.returnValue(strMockEmpArr);
    fixture = TestBed.createComponent(EmployeeViewComponent);
    component = fixture.componentInstance;
    console.log(component.empId);
    fixture.detectChanges();

    idControl=component.empProfileForm.controls['id'];
    codeControl=component.empProfileForm.controls['code'];
    nameControl=component.empProfileForm.controls['name'];
    designationControl=component.empProfileForm.controls['designation'];
    updateBtn=fixture.debugElement.query(By.css('button'));
    nameInput=fixture.debugElement.query(By.css('#nameInput'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sould initialize control with employee details with given id',async(()=>{
    fixture.whenStable().then(()=>{
    expect(idControl.value).toEqual(12);
    expect(codeControl.value).toEqual('GGL1359');
    expect(nameInput.nativeElement.value).toEqual('Stuart Phillips');
    expect(designationControl.value).toEqual('GET');
    });
  }));

  it('should call function onUpdate',()=>{
    spyOn(localStorage,'setItem');
    updateBtn.nativeElement.click();
    fixture.whenStable().then(()=>{
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });
  
});
