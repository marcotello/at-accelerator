import {Component, inject} from '@angular/core';
import {TvShowDetails} from "../models/tv-show-details.model";
import {FavoritesService} from "../services/favorites.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-favorites-view',
  templateUrl: './favorites-view.component.html',
  styleUrls: ['./favorites-view.component.css']
})
export class FavoritesViewComponent {

  protected favoriteTvShows$: Observable<TvShowDetails[]> =  inject(FavoritesService).getMyFavoriteTvShows();
}
