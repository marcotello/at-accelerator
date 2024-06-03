import {Component, Input} from '@angular/core';
import {TvShowDetails} from "../models/tv-show-details.model";

@Component({
  selector: 'app-favorites-view',
  templateUrl: './favorites-view.component.html',
  styleUrls: ['./favorites-view.component.css']
})
export class FavoritesViewComponent {

  @Input()
  protected favoriteTvShows!: TvShowDetails[];

}
