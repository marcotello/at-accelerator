import {inject, Injectable, signal, Signal} from '@angular/core';
import {TvShow} from "../models/tv-show.model";
import {TvShowsApiResponse} from "../models/tv-shows-api-response.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {TvShowTableSpinnerService} from "./tv-show-table-spinner.service";
import {FavoritesService} from "./favorites.service";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TvShowsHttpService {

  private BASE_URL = 'https://www.episodate.com/api';
  private SEARCH_TV_SHOWS_URL = this.BASE_URL + '/search';

  private searchTvShowsSignal = signal<TvShow[]>([]);

  private http = inject(HttpClient);
  private tvShowTableSpinnerService = inject(TvShowTableSpinnerService);
  private favoritesService = inject(FavoritesService);


  public searchTVShows(term: string): Signal<TvShow[]> {

    this.tvShowTableSpinnerService.showSpinner();
    this.searchTvShowsSignal.set([]);

    let queryParams = new HttpParams();
    queryParams = queryParams.append("page",1);

    if(term !== '') {
      queryParams = queryParams.append("q", term);
    }

    this.http.get<TvShowsApiResponse>(this.SEARCH_TV_SHOWS_URL, {params:queryParams})
      .pipe(
        map(data => {
          const favoriteTvShowsIds = this.favoritesService.getFavoriteTvShows();

          data.tv_shows.forEach(tvShow => {
            tvShow.isFavorite = favoriteTvShowsIds().includes(tvShow.id);
          });

          return data.tv_shows;
        })
      ).subscribe(tvShows => {
        this.searchTvShowsSignal.set(tvShows);
      });

    this.tvShowTableSpinnerService.hideSpinner();

    return this.searchTvShowsSignal.asReadonly();
  }
}
