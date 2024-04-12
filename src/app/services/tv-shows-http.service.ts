import { Injectable } from '@angular/core';
import {TvShow} from "../models/tv-show.model";
import {map, Observable, of} from "rxjs";
import {TvShowsApiResponse} from "../models/tv-shows-api-response.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TvShowsHttpService {

  private TV_SHOWS_API_URL = 'https://www.episodate.com/api/most-popular?page=1';

  constructor(private http: HttpClient) { }

  public fetchMostPopularTVShows(): Observable<TvShow[]> {
    return this.http
      .get<TvShowsApiResponse>(this.TV_SHOWS_API_URL)
      .pipe(
        map(response => response.tv_shows)
      );
  }
}
