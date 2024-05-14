import {effect, inject, Injectable, signal} from '@angular/core';
import {StorageService} from "./storage.service";
import {TvShow} from "../models/tv-show.model";
import { FAVORITES_KEY } from '../constants/application-contants';
import {TvShowId, TvShowIds} from "../types/types";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favoriteTvShowIDsSignal = signal<TvShow[]>([]);

  private storageService = inject(StorageService<TvShowIds>);

  private favoritesSignal = signal<TvShowIds>(this.storageService.get(FAVORITES_KEY));
  readonly favorites = this.favoritesSignal.asReadonly();

  constructor() {
    // Registering an effect to update localStorage so this code will run no matter
    // where and when the signal value is updated - no need for duplication
    effect(() => this.storageService.set(FAVORITES_KEY, this.favoritesSignal()));
  }

  toggleFavorite(id: TvShowId): void {
    const index = this.favoritesSignal().indexOf(id);

    if (index !== -1) {
      this.favoritesSignal.update((favorites) => favorites.filter((favorite) => favorite !== id));
      console.log(this.favoritesSignal());
    } else {
      this.favoritesSignal.update((favorites) => [...favorites, id]);
      console.log(this.favoritesSignal());
    }
  }
}
