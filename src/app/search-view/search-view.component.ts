import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TvShowTableComponent} from '../tv-show-table/tv-show-table.component';
import {FormsModule} from "@angular/forms";
import {TvShowsHttpService} from "../services/tv-shows-http.service";
import {ActivatedRoute} from "@angular/router";
import {TvShow} from "../models/tv-show.model";
import {TvShowTableSpinnerService} from "../services/tv-show-table-spinner.service";
import {FavoritesService} from "../services/favorites.service";

@Component({
  selector: 'app-search-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TvShowTableComponent, FormsModule],
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent {

  protected tvShowsHttpService = inject(TvShowsHttpService);
  protected tvShowTableSpinnerService = inject(TvShowTableSpinnerService);
  private favoritesService = inject(FavoritesService);

  tvShowsSignalToDisplay: Signal<TvShow[]> = inject(ActivatedRoute).snapshot.data['tvShows'];

  searchTvShow(term = "", event?: Event): void {
    event?.preventDefault();

    this.tvShowsSignalToDisplay = this.tvShowsHttpService.searchTVShows(term);
  }

  toggleFavoriteTvShow($event: any) {
    this.tvShowsSignalToDisplay = this.favoritesService.toggleFavorite($event, this.tvShowsSignalToDisplay());
  }
}

