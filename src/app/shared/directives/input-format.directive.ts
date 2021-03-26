import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[inputFormat]'
})
export class InputFormatDirective {

  @Input() format: string | undefined;
  constructor(private el: ElementRef) {}

  @HostListener('focus')
  onFocus(): void {
    console.log('On Focus');
  }

  @HostListener('blur')
  onBlur(): void {
    console.log('On Blur');
    const value: string = this.el.nativeElement.value;
    this.el.nativeElement.value = this.format && this.format === 'upper' ? value.toUpperCase() : value.toLowerCase();
  }

}
