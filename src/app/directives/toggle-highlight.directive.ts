import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appToggleHighlight]',
  standalone: true
})
export class ToggleHighlightDirective implements OnInit {
  private highlightClass = 'highlight';

  @Input({required: true, alias: 'appToggleHighlight'})
  tvShowId!: boolean;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (this.tvShowId) {
      this.el.nativeElement.classList.add(this.highlightClass);
    }
  }

  @HostListener('click')
  onClick() {
    this.tvShowId = !this.tvShowId;
    this.el.nativeElement.classList.toggle(this.highlightClass);
  }
}
