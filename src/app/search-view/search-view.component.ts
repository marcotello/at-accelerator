import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TvShowTableComponent} from '../tv-show-table/tv-show-table.component';
import {FormsModule} from "@angular/forms";
import {TvShowsHttpService} from "../services/tv-shows-http.service";
import {ActivatedRoute} from "@angular/router";
import {TvShow} from "../models/tv-show.model";
import {TvShowTableSpinnerService} from "../services/tv-show-table-spinner.service";
import {FavoritesService} from "../services/favorites.service";
import {PaginatorComponent} from "../paginator/paginator.component";
import {TvShowsApiResponse} from "../models/tv-shows-api-response.model";

@Component({
  selector: 'app-search-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TvShowTableComponent, FormsModule, PaginatorComponent],
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent {

  private isSearch = false;
  private page = 1;
  private pages = 0;
  private totalTvShows = 0;

  private searchTerm: string = "";


  protected tvShowsHttpService = inject(TvShowsHttpService);
  protected tvShowTableSpinnerService = inject(TvShowTableSpinnerService);
  private favoritesService = inject(FavoritesService);

  tvShowsSignalToDisplay: Signal<TvShowsApiResponse | null> = inject(ActivatedRoute).snapshot.data['tvShows'];

  searchTvShow(term = "", event?: Event): void {
    event?.preventDefault();

    this.isSearch = true;
    this.searchTerm = term;

    this.fetchTvShows();
  }

  fetchTvShows(): void {
    if (this.isSearch) {
      this.tvShowsSignalToDisplay = this.tvShowsHttpService.searchTVShows(this.searchTerm);
    } else {
      this.tvShowsSignalToDisplay = this.tvShowsHttpService.getMostPopularTvShows(this.page);
    }
  }
}

