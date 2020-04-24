import { CapitalizePipe } from './capitalize.pipe';
import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  selector:'testingComponent',
  template:'<p>{{message|capitalize}}</p>'
})
class TestingComponent
{
 message:string='jasmine framework';
}

describe('CapitalizePipe', () => {
  
  let fixture:ComponentFixture<TestingComponent>;
  let component:TestingComponent;
  let para:DebugElement;

  beforeEach(()=>{
   TestBed.configureTestingModule({
     declarations:[TestingComponent,CapitalizePipe]
   });
   fixture=TestBed.createComponent(TestingComponent);
   component=fixture.componentInstance;
   para=fixture.debugElement.query(By.css('p'));
   fixture.detectChanges();
  })

  it('should create an instance', () => { 
    const pipe = new CapitalizePipe();
    expect(pipe).toBeTruthy();
  });

  it('should capitalize first letter of each word in given value',() =>
  {
    expect(para.nativeElement.innerText).toEqual('Jasmine Framework');
  });
});
