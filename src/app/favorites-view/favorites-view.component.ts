import {Component, Input} from '@angular/core';
import {TvShowDetails} from "../models/tv-show-details.model";
import {FavoritesService} from "../services/favorites.service";
import {TvShowId} from "../types/types";

@Component({
  selector: 'app-favorites-view',
  templateUrl: './favorites-view.component.html',
  styleUrls: ['./favorites-view.component.css']
})
export class FavoritesViewComponent {

  constructor(private favoritesService: FavoritesService) {}

  @Input()
  protected favoriteTvShows!: TvShowDetails[];

  removeTvShowFromFavorites(tvShowId: TvShowId) {
    this.favoritesService.toggleFavorite(tvShowId)
    this.favoriteTvShows = this.favoriteTvShows.filter((tvShow) => tvShow.id !== tvShowId)
  }
}
