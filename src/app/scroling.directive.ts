import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScroling]'
})
export class ScrolingDirective {

  constructor(private element: ElementRef, private render: Renderer2) { }

  @HostListener('window:scroll') scrolling() {
    // console.log(document.body);
    
    // if (window.scrollY > 430) {
    //   this.render.addClass(this.element.nativeElement, 'solidNavbar');
    //   this.render.setStyle(this.element.nativeElement, "height", "40px");
    // }
    // else{
    //   this.render.removeClass(this.element.nativeElement, 'solidNavbar');
    //   this.render.setStyle(this.element.nativeElement, "height", "70px");
    // }
  }
}
