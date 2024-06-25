import {Component, EventEmitter, input, Output} from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {

  pageSignal = input.required<number>();
  totalPagesSignal = input.required<number>();

  @Output() nextPage = new EventEmitter<number>();

  goToFirstPage(): void {
    this.nextPage.emit(1);
  }

  goToNextPage(): void {
    const nextPage = this.pageSignal() + 1;
    this.nextPage.emit(nextPage);
  }

  goToPreviousPage(): void {
    const previousPage = this.pageSignal() - 1;
    this.nextPage.emit(previousPage);
  }

  goToLastPage(): void {
    this.nextPage.emit(this.totalPagesSignal());
  }
}
