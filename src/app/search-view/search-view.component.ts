import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {CommonModule, ViewportScroller} from '@angular/common';
import {TvShowTableComponent} from '../tv-show-table/tv-show-table.component';
import {FormsModule} from "@angular/forms";
import {TvShowsHttpService} from "../services/tv-shows-http.service";
import {ActivatedRoute} from "@angular/router";
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
  private searchTerm: string = "";
  private readonly viewport = inject(ViewportScroller);

  protected currentPage = 1;


  protected tvShowsHttpService = inject(TvShowsHttpService);
  protected tvShowTableSpinnerService = inject(TvShowTableSpinnerService);
  private favoritesService = inject(FavoritesService);

  tvShowsSignalToDisplay: Signal<TvShowsApiResponse | null> = inject(ActivatedRoute).snapshot.data['tvShows'];

  searchTvShow(term = "", event?: Event): void {
    event?.preventDefault();

    this.isSearch = true;
    this.searchTerm = term;
    this.currentPage = 1;

    this.fetchTvShows();
  }

  fetchTvShows(): void {
    if (this.isSearch) {
      this.tvShowsSignalToDisplay = this.tvShowsHttpService.searchTVShows(this.searchTerm, this.currentPage);
    } else {
      this.tvShowsSignalToDisplay = this.tvShowsHttpService.getMostPopularTvShows(this.currentPage);
    }
  }

  changePage($event: number) {
    this.currentPage = $event;
    this.fetchTvShows();
    this.viewport.scrollToPosition([0, 0]);
  }
}

