import {inject, Injectable, Signal, signal} from '@angular/core';
import {StorageService} from "./storage.service";
import {TvShow} from "../models/tv-show.model";
import { FAVORITES_KEY } from '../constants/application-contants';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favoriteTvShowIDsSignal = signal<TvShow[]>([]);

  private storageService = inject(StorageService);

  public toggleFavorite(tvShowId: TvShow["id"], tvShows: TvShow[]): Signal<TvShow[]> {
    for (const tvShow of tvShows) {
      if (tvShow.id === tvShowId) {
        tvShow.isFavorite = !tvShow.isFavorite;
      }
    }

    this.favoriteTvShowIDsSignal.set(tvShows);

    this.removeTvShowsFromLocalStorage();

    const favoriteTvShows = tvShows.filter(tvShow => tvShow.isFavorite);

    this.saveTvShowsToLocalStorage(favoriteTvShows);

    return this.favoriteTvShowIDsSignal.asReadonly();
  }

  public getFavoriteTvShows(): Signal<TvShow[]> {

    const tvShowIds = this.getTvShowsFromLocalStorage();

    this.favoriteTvShowIDsSignal.set(tvShowIds);

    return this.favoriteTvShowIDsSignal.asReadonly();
  }

  public mergeFavoriteTvShows(tvShows: TvShow[]): Signal<TvShow[]> {
    const favoriteTvShows = this.getTvShowsFromLocalStorage();

    for (const tvShow of tvShows) {
      if (favoriteTvShows.find(favoriteTvShow => favoriteTvShow.id === tvShow.id)) {
        tvShow.isFavorite = true;
      }
    }

    this.favoriteTvShowIDsSignal.set(tvShows);

    return this.favoriteTvShowIDsSignal.asReadonly();
  }

  private saveTvShowsToLocalStorage(tvShowIds: TvShow[]) : void {
    this.storageService.storeItem<TvShow[]>(FAVORITES_KEY, tvShowIds);
  }

  private getTvShowsFromLocalStorage(): TvShow[] {
    return this.storageService.getItem<TvShow[]>(FAVORITES_KEY) || [];
  }

  private removeTvShowsFromLocalStorage(): void {
    this.storageService.removeItem<TvShow[]>(FAVORITES_KEY)
  }
}
