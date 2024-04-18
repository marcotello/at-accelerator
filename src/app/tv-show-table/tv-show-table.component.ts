import {ChangeDetectionStrategy, Component, effect, input} from '@angular/core';
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

  tvShowsSignal = input.required<TvShow[]>();
  showSpinnerSignal = input<boolean>();
}
