import {inject, Injectable, Signal, signal} from '@angular/core';
import {StorageService} from "./storage.service";
import {TvShow} from "../models/tv-show.model";
import { FAVORITES_KEY } from '../constants/application-contants';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favoriteTvShowIDsSignal = signal<number[]>([]);

  private storageService = inject(StorageService);

  public toggleFavorite(tvShowId: TvShow["id"]): Signal<number[]> {
    let tvShowIds = this.getTvShowsFromLocalStorage();

    if (tvShowIds.includes(tvShowId)) {
      tvShowIds.splice(tvShowIds.indexOf(tvShowId), 1);
    } else {
      tvShowIds.push(tvShowId);
    }

    this.saveFavoriteToLocalStorage(tvShowIds);

    this.favoriteTvShowIDsSignal.set(tvShowIds);

    return this.favoriteTvShowIDsSignal.asReadonly();
  }

  public getFavoriteTvShows(): Signal<number[]> {

    const tvShowIds = this.getTvShowsFromLocalStorage();

    this.favoriteTvShowIDsSignal.set(tvShowIds);

    return this.favoriteTvShowIDsSignal.asReadonly();
  }

  private saveFavoriteToLocalStorage(tvShowIds: number[]) : void {
    this.storageService.storeItem<number[]>(FAVORITES_KEY, tvShowIds);
  }

  private getTvShowsFromLocalStorage(): number[] {
    return this.storageService.getItem<number[]>(FAVORITES_KEY) || [];
  }
}
