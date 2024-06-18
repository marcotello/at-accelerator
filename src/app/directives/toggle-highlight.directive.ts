import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appToggleHighlight]',
  standalone: true
})
export class ToggleHighlightDirective implements OnInit {
  private highlightClass = 'highlight';

  @Input() appToggleHighlight!: boolean;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (this.appToggleHighlight === undefined || this.appToggleHighlight === null) {
      console.error('Error: appToggleHighlight directive requires a isHighlighted input boolean.');
      throw new Error('appToggleHighlight directive requires a isHighlighted input boolean.');
    }

    if (this.appToggleHighlight) {
      this.el.nativeElement.classList.add(this.highlightClass);
    }
  }

  @HostListener('click')
  onClick() {
    this.appToggleHighlight = !this.appToggleHighlight;
    this.el.nativeElement.classList.toggle(this.highlightClass);
  }
}
