import { Injectable } from '@angular/core';
import {TvShow} from "../models/tv-show.model";
import {map, Observable} from "rxjs";
import {TvShowsApiResponse} from "../models/tv-shows-api-response.model";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TvShowsHttpService {

  private BASE_URL = 'https://www.episodate.com/api';
  private MOST_POPULAR_TV_SHOWS_URL = this.BASE_URL + '/most-popular?page=1';
  private SEARCH_TV_SHOWS_URL = this.BASE_URL + '/search';

  constructor(private http: HttpClient) { }

  public fetchMostPopularTVShows(): Observable<TvShow[]> {
    return this.http
      .get<TvShowsApiResponse>(this.MOST_POPULAR_TV_SHOWS_URL)
      .pipe(
        map(response => response.tv_shows)
      );
  }

  public searchTVShows(name: string): Observable<TvShow[]> {

    let queryParams = new HttpParams();
    queryParams = queryParams.append("q", name);
    queryParams = queryParams.append("page",1);

    return this.http
      .get<TvShowsApiResponse>(this.SEARCH_TV_SHOWS_URL, {params:queryParams})
      .pipe(
        map(response => response.tv_shows)
      );
  }
}
