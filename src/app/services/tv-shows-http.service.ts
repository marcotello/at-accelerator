import {inject, Injectable, signal, Signal} from '@angular/core';
import {TvShow} from "../models/tv-show.model";
import {TvShowsApiResponse} from "../models/tv-shows-api-response.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {TvShowTableSpinnerService} from "./tv-show-table-spinner.service";
import {FavoritesService} from "./favorites.service";
import {TvShowDetails} from "../models/tv-show-details.model";
import {TvShowDetailsApiResponse} from "../models/tv-show-details-api-response.model";
import {tap} from "rxjs/operators";
import {EpisodeDetails} from "../models/episode-details.model";

@Injectable({
  providedIn: 'root'
})
export class TvShowsHttpService {

  private BASE_URL = 'https://www.episodate.com/api';
  private SEARCH_TV_SHOWS_URL = this.BASE_URL + '/search';
  private TV_SHOW_DETAILS_URL = this.BASE_URL + '/show-details';

  private searchTvShowsSignal = signal<TvShow[]>([]);
  private tvShowDetailsSignal = signal<TvShowDetails | null>(null);
  private episodeDetailsSignal = signal<EpisodeDetails | null>(null);

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
      .subscribe(data => {
        this.searchTvShowsSignal.set(data.tv_shows);
      });

    this.tvShowTableSpinnerService.hideSpinner();

    return this.searchTvShowsSignal.asReadonly();
  }

  public getTvShowDetails(tvShowId: string): Signal<TvShowDetails | null> {

    this.tvShowDetailsSignal.set(null);
    this.episodeDetailsSignal.set(null);

    let queryParams = new HttpParams().append("q", tvShowId);

    this.http.get<TvShowDetailsApiResponse>(this.TV_SHOW_DETAILS_URL, {params: queryParams})
      .pipe(
        tap(response => {
          const totalEpisodes = response.tvShow.episodes.length;
          const totalSeasons = response.tvShow.episodes.reduce((maxSeason, episode) => {
            return Math.max(maxSeason, episode.season);
          }, 0);

          this.episodeDetailsSignal.set({totalSeasons, totalEpisodes});
        })
      )
      .subscribe(response => {
        this.tvShowDetailsSignal.set(response.tvShow);
      });

    return this.tvShowDetailsSignal.asReadonly();
  }

  public getEpisodeDetails(): Signal<EpisodeDetails | null> {
    return this.episodeDetailsSignal.asReadonly();
  }
}
