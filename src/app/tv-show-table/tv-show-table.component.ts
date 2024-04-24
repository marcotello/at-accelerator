import {ChangeDetectionStrategy, Component, EventEmitter, inject, input, Output, output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TvShow} from "../models/tv-show.model";
import {FavoritesService} from "../services/favorites.service";

@Component({
  selector: 'app-tv-show-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tv-show-table.component.html',
  styleUrls: ['./tv-show-table.component.css']
})
export class TvShowTableComponent {

  private favoritesService = inject(FavoritesService);

  tvShowsSignal = input.required<TvShow[]>();
  showSpinnerSignal = this.favoritesService.getFavoriteTvShows();

  // New syntax not supported by WebStorm yet
  // tvShowHighlighted = output<number>();
  @Output() tvShowHighlighted = new EventEmitter<number>();

  toggleFavorite(tvShowId: number): void {
    this.tvShowHighlighted.emit(tvShowId);
  }
}
