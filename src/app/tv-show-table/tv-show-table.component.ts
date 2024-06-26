import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TvShow} from "../models/tv-show.model";
import {FavoritesService} from "../services/favorites.service";
import {RouterLink} from "@angular/router";
import {ToggleFavoriteDirective} from "../directives/toggle-favorite.directive";
import {TvShowTableSpinnerService} from "../services/tv-show-table-spinner.service";

@Component({
  selector: 'app-tv-show-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterLink, ToggleFavoriteDirective],
  templateUrl: './tv-show-table.component.html',
  styleUrls: ['./tv-show-table.component.css']
})
export class TvShowTableComponent {

  protected favoritesService = inject(FavoritesService);
  protected tvShowTableSpinnerService = inject(TvShowTableSpinnerService);

  tvShowsSignal = input.required<TvShow[]>();
}
