import {Component, Input} from '@angular/core';
import {TvShowDetails} from "../models/tv-show-details.model";
import {FavoritesService} from "../services/favorites.service";

@Component({
  selector: 'app-favorites-view',
  templateUrl: './favorites-view.component.html',
  styleUrls: ['./favorites-view.component.css']
})
export class FavoritesViewComponent {

  constructor(private favoritesService: FavoritesService) {}

  @Input()
  protected favoriteTvShows!: TvShowDetails[];

  removeTvShowFromFavorites($event: number) {
    this.favoritesService.toggleFavorite($event)
    this.favoriteTvShows = this.favoriteTvShows.filter((tvShow) => tvShow.id !== $event)
  }
}
