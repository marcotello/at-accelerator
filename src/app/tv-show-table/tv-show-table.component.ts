import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TvShow} from "../models/tv-show.model";

@Component({
  selector: 'app-tv-show-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tv-show-table.component.html',
  styleUrls: ['./tv-show-table.component.css']
})
export class TvShowTableComponent {

  tvShowsSignal = input<TvShow[]>([]);

  public getYear(date: string): string {
    if( date === null) {
      return '';
    }

    const separator = this.findDateSeparator(date)

    const splittedDate = date.split(separator);

    return this.findYear(splittedDate);
  }

  private findYear(splittedDate: string[]): string {
    let year = '';

    for (let item of splittedDate) {
      if(item.length === 4) {
        year = item;
        break;
      }
    }

    return year;
  }

  private findDateSeparator(date: string): string {
    let separator = '/';

    if(date.includes('-')) {
      separator = '-';
    }

    return separator;
  }
}
