import {inject, Injectable, signal, Signal} from '@angular/core';
import {TvShowsApiResponse} from "../models/tv-shows-api-response.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {TvShowTableSpinnerService} from "./tv-show-table-spinner.service";
import {TvShowDetails} from "../models/tv-show-details.model";
import {TvShowDetailsApiResponse} from "../models/tv-show-details-api-response.model";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

const NO_DATA: TvShowsApiResponse = {page: 1, pages: 0, tv_shows: [], total: ""};

@Injectable({
  providedIn: 'root'
})
export class TvShowsHttpService {

  private BASE_URL = 'https://www.episodate.com/api';
  private SEARCH_TV_SHOWS_URL = this.BASE_URL + '/search';
  private TV_SHOW_DETAILS_URL = this.BASE_URL + '/show-details';
  private MOST_POPULAR_TV_SHOWs_URL = this.BASE_URL + '/most-popular';

  private tvShowsSignal = signal<TvShowsApiResponse>(NO_DATA);

  private http = inject(HttpClient);
  private tvShowTableSpinnerService = inject(TvShowTableSpinnerService);


  public searchTVShows(term: string, page: number): Signal<TvShowsApiResponse> {

    this.tvShowTableSpinnerService.showSpinner();
    this.tvShowsSignal.set(NO_DATA);

    let queryParams = new HttpParams();
    queryParams = queryParams.append("page",page);

    if(term !== '') {
      queryParams = queryParams.append("q", term);
    }

    this.http.get<TvShowsApiResponse>(this.SEARCH_TV_SHOWS_URL, {params:queryParams})
      .subscribe(data => {
        this.tvShowsSignal.set(data);
        this.tvShowTableSpinnerService.hideSpinner();
      });

    return this.tvShowsSignal.asReadonly();
  }

  public getTvShowDetails(tvShowId: string): Observable<TvShowDetails> {
    let queryParams = new HttpParams().append("q", tvShowId);

    return this.http.get<TvShowDetailsApiResponse>(this.TV_SHOW_DETAILS_URL, {params: queryParams})
      .pipe(
        map(response => response.tvShow)
      );
  }

  getMostPopularTvShows(page: number): Signal<TvShowsApiResponse> {

    this.tvShowTableSpinnerService.showSpinner();
    this.tvShowsSignal.set(NO_DATA);

    let queryParams = new HttpParams();
    queryParams = queryParams.append("page",page);

    this.http.get<TvShowsApiResponse>(this.MOST_POPULAR_TV_SHOWs_URL,  {params:queryParams})
      .subscribe(data => {
        this.tvShowsSignal.set(data);
        this.tvShowTableSpinnerService.hideSpinner();
      });

    return this.tvShowsSignal.asReadonly();
  }
}
