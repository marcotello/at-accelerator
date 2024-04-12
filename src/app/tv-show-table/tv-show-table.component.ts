import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import { CommonModule } from '@angular/common';
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

    return date.substring(0, 4)
  }
}
