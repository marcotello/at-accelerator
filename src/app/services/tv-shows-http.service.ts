import {Injectable, signal, Signal} from '@angular/core';
import {TvShow} from "../models/tv-show.model";
import {delay, map} from "rxjs";
import {TvShowsApiResponse} from "../models/tv-shows-api-response.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {TvShowTableSpinnerService} from "./tv-show-table-spinner.service";

@Injectable({
  providedIn: 'root'
})
export class TvShowsHttpService {

  private BASE_URL = 'https://www.episodate.com/api';
  private SEARCH_TV_SHOWS_URL = this.BASE_URL + '/search';

  private searchTvShowsSignal = signal<TvShow[]>([]);

  constructor(private http: HttpClient, private tvShowTableSpinnerService: TvShowTableSpinnerService) { }

  public searchTVShows(term: string): Signal<TvShow[]> {

    this.tvShowTableSpinnerService.showSpinner();
    this.searchTvShowsSignal.set([]);

    let queryParams = new HttpParams();
    queryParams = queryParams.append("page",1);

    if(term !== '') {
      queryParams = queryParams.append("q", term);
    }

    this.http.get<TvShowsApiResponse>(this.SEARCH_TV_SHOWS_URL, {params:queryParams}).subscribe(data => {
      this.searchTvShowsSignal.set(data.tv_shows);
    });

    this.tvShowTableSpinnerService.hideSpinner();

    return this.searchTvShowsSignal.asReadonly();
  }
}
