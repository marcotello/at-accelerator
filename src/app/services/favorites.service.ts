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

  public toggleFavorite(favoriteTvShowId: TvShow["id"], tvShows: TvShow[]): Signal<TvShow[]> {

    let favoriteTvShowsFromStorage = this.getFavoriteTvShowsFromLocalStorage();

    let favoriteTvShow = tvShows.find(tvShow => tvShow.id === favoriteTvShowId);

    if(favoriteTvShowsFromStorage.has(favoriteTvShowId)) {
      favoriteTvShow!.isFavorite = false;

      favoriteTvShowsFromStorage.delete(favoriteTvShowId);
    } else {
      favoriteTvShow!.isFavorite = true;

      favoriteTvShowsFromStorage.add(favoriteTvShowId);
    }

    this.saveFavoriteTvShowsToLocalStorage(favoriteTvShowsFromStorage);

    return this.favoriteTvShowIDsSignal.asReadonly();
  }

  public mergeFavoriteTvShows(tvShows: TvShow[]): Signal<TvShow[]> {
    const favoriteTvShows = this.getFavoriteTvShowsFromLocalStorage();

    for (const tvShow of tvShows) {
      if (favoriteTvShows.has(tvShow.id)) {
        tvShow.isFavorite = true;
      }
    }

    this.favoriteTvShowIDsSignal.set(tvShows);

    return this.favoriteTvShowIDsSignal.asReadonly();
  }

  private saveFavoriteTvShowsToLocalStorage(tvShowIds: Set<number>) : void {

    this.storageService.storeItem<number[]>(FAVORITES_KEY, Array.from(tvShowIds));
  }

  private getFavoriteTvShowsFromLocalStorage(): Set<number> {

    const favoriteTvShows = this.storageService.getItem<number[]>(FAVORITES_KEY) || [];

    return new Set<number>(favoriteTvShows);
  }

  private clearFavoriteTvShowsFromLocalStorage(): void {
    this.storageService.removeItem<number[]>(FAVORITES_KEY)
  }
}
