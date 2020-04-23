import { HoverFocusDirective } from './hover-focus.directive';
import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  selector:'testingComponent',
  template:'<button class="btn btn-lg btn-primary btn-block" appHoverFocus></button>'
})
class TestingComponent
{
 
}

let fixture:ComponentFixture<TestingComponent>;
let component:TestingComponent;
let btn:DebugElement;

describe('HoverFocusDirective', () => {
  
  beforeEach(()=>{
   TestBed.configureTestingModule({
     declarations:[TestingComponent,HoverFocusDirective]
   });
   fixture=TestBed.createComponent(TestingComponent);
   component=fixture.componentInstance;
   btn=fixture.debugElement.query(By.css('button'));
  });

  it('should create an instance', () => {
    const directive = new HoverFocusDirective();
    expect(directive).toBeTruthy();
  });

  it('button color should change on mousehover',()=>{
    btn.nativeElement.dispatchEvent(new Event('mouseover'));

    fixture.detectChanges();

    expect(btn.nativeElement.style.backgroundColor).toBe('rgb(51, 102, 153)');
    
    btn.nativeElement.dispatchEvent(new Event('mouseout'));

    fixture.detectChanges();

    expect(btn.nativeElement.style.backgroundColor).toBe('rgb(0, 123, 255)');

  });
});
