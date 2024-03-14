import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import * as Prism from 'prismjs';

@Directive({
  selector: '[appHighlightCode]'
})
export class HighlightCodeDirective implements OnChanges {
  @Input('appHighlightCode') code ='';

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    this.el.nativeElement.textContent = this.code;
    Prism.highlightElement(this.el.nativeElement, false);
  }
}
