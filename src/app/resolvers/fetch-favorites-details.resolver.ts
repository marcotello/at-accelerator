import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {TvShowDetails} from "../models/tv-show-details.model";
import {FAVORITES_KEY} from "../constants/application-contants";
import {inject} from "@angular/core";
import {StorageService} from "../services/storage.service";
import {TvShowIds} from "../types/types";
import {TvShowsHttpService} from "../services/tv-shows-http.service";

export const fetchFavoritesDetailsResolver: ResolveFn<TvShowDetails[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): TvShowDetails[] => {

  let favoritesTvShowDetails: TvShowDetails[] = [];

  const favoriteTvShowIds = inject(StorageService<TvShowIds>).get(FAVORITES_KEY);

  inject(TvShowsHttpService).getTvShowDetailsFromApi(favoriteTvShowIds[0])
    .subscribe((tvShowDetails: TvShowDetails) => {
      favoritesTvShowDetails.push(tvShowDetails);
    });

  return favoritesTvShowDetails;
};
