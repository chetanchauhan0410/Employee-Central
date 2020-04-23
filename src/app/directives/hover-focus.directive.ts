import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appHoverFocus]'
})
export class HoverFocusDirective {

  constructor() { }

  @HostBinding("style.background-color") backgroundColor: string;

    @HostListener('mouseover') onHover() {
        this.backgroundColor = '#369';
    }

    @HostListener('mouseout') onLeave() {
        this.backgroundColor = '#007bff';
    }

}
