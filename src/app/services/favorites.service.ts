import {effect, inject, Injectable, signal} from '@angular/core';
import {StorageService} from "./storage.service";
import { FAVORITES_KEY } from '../constants/application-contants';
import {TvShowId, TvShowIds} from "../types/types";
import {BehaviorSubject, forkJoin, Observable, shareReplay, switchMap} from "rxjs";
import {TvShowDetails} from "../models/tv-show-details.model";
import {TvShowsHttpService} from "./tv-shows-http.service";
import {map} from "rxjs/operators";
import {Episode} from "../models/episode.model";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private storageService = inject(StorageService<TvShowIds>);
  private tvShowHttpService = inject(TvShowsHttpService);

  private favoritesSignal = signal<TvShowIds>(this.storageService.get(FAVORITES_KEY));
  readonly favorites = this.favoritesSignal.asReadonly();

  private refreshFavoriteTvShowCache$ = new BehaviorSubject<void>(undefined);
  private favoriteTvShows$: Observable<TvShowDetails[]>;

  constructor() {
    // Registering an effect to update localStorage so this code will run no matter
    // where and when the signal value is updated - no need for duplication
    effect(() => {
      this.storageService.set(FAVORITES_KEY, this.favoritesSignal());
      this.refreshFavoriteTvShowCache$.next();
    });

    this.favoriteTvShows$ = this.getFavoriteTvShowsDetailsWithCache();
  }

  toggleFavorite(id: TvShowId): void {
    const index = this.favoritesSignal().indexOf(id);

    if (index !== -1) {
      this.favoritesSignal.update((favorites) => favorites.filter((favorite) => favorite !== id));
    } else {
      this.favoritesSignal.update((favorites) => [...favorites, id]);
    }
  }

  getMyFavoriteTvShows(): Observable<TvShowDetails[]> {
    return this.favoriteTvShows$;
  }

  getFavoriteTvShowsDetails(): Observable<TvShowDetails[]> {
    const favoriteTvShowIds = this.storageService.get(FAVORITES_KEY) as string[];

    const tvShowDetails$ = favoriteTvShowIds.map(tvShowId => this.tvShowHttpService.getTvShowDetailsFromApi(tvShowId));

    return forkJoin(tvShowDetails$)
      .pipe(
        map(tvShowDetails => this.SortTvShowsByClosestNextEpisode(tvShowDetails))
      );
  }

  getFavoriteTvShowsDetailsWithCache(): Observable<TvShowDetails[]> {
    return this.refreshFavoriteTvShowCache$
     .pipe(
        switchMap(() => this.getFavoriteTvShowsDetails()),
        shareReplay(1)
      );
  }

  private SortTvShowsByClosestNextEpisode(tvShowDetails:  TvShowDetails[]):  TvShowDetails[] {

    const order = [
      'In Development',
      'Running',
      'To Be Determined',
      'Canceled/Ended',
      'Ended',
      'Returning Series'
    ];

    return tvShowDetails.sort((tvShow1: TvShowDetails, tvShow2: TvShowDetails) => {
      const tvShow1StatusIndex = order.indexOf(tvShow1.status);
      const tvShow2StatusIndex = order.indexOf(tvShow2.status);

      if (tvShow1StatusIndex === tvShow2StatusIndex) {
        if (tvShow1StatusIndex === 1) {
          const tvShow1NextEpisodeDate = this.getNextEpisodeAirDate(tvShow1.countdown);
          const tvShow2NextEpisodeDate = this.getNextEpisodeAirDate(tvShow2.countdown);

          if (tvShow1NextEpisodeDate && tvShow2NextEpisodeDate) {
            return tvShow1NextEpisodeDate.getTime() - tvShow2NextEpisodeDate.getTime();
          } else if (tvShow1NextEpisodeDate) {
            return -1;
          } else if (tvShow2NextEpisodeDate) {
            return 1;
          }

        }

        return tvShow1.name.localeCompare(tvShow2.name);
      }

      return tvShow1StatusIndex - tvShow2StatusIndex;
    });
  }

  private getNextEpisodeAirDate(countdown: Episode | null): Date | null {
    if (!countdown) {
      return null;
    }

    const today = new Date();
    const nextEpisodeDate = new Date(countdown.air_date);

    return nextEpisodeDate >= today ? nextEpisodeDate : null;
  }
}
