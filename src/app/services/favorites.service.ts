import {inject, Injectable, signal} from '@angular/core';
import {StorageService} from "./storage.service";
import {TvShow} from "../models/tv-show.model";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favoriteTvShowIDsSignal = signal<[]>([]);

  private storageService = inject(StorageService);

  public saveFavorite(tvShowId: TvShow["id"]) : void {
    
  }
}
