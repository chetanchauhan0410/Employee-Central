import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesComponent } from './employees.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CapitalizePipe } from '../pipes/capitalize.pipe';

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;
  let nameSpan:DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesComponent,CapitalizePipe],
      imports:[RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let strMockEmpArr=JSON.stringify([{ id: 11, name: 'marcus smith',designation:'SE',code:'GGL1358' },
    { id: 12, name: 'stuart phillips',designation:'GET',code:'GGL1359' }]);
    spyOn(localStorage,'getItem').and.returnValue(strMockEmpArr);
    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nameSpan=fixture.debugElement.query(By.css('.align-top.name'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should capitalize first characters of each word in name via capitalize pipe',()=>{
    expect(nameSpan.nativeElement.innerText).toEqual('Marcus Smith');
  });

});
