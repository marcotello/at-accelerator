import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {TvShowDetails} from "../models/tv-show-details.model";
import {FAVORITES_KEY} from "../constants/application-contants";
import {inject} from "@angular/core";
import {StorageService} from "../services/storage.service";
import {TvShowIds} from "../types/types";
import {TvShowsHttpService} from "../services/tv-shows-http.service";
import {forkJoin, Observable} from "rxjs";

export const fetchFavoritesDetailsResolver: ResolveFn<Observable<TvShowDetails[]>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<TvShowDetails[]> => {

  const tvShowHttpService = inject(TvShowsHttpService);
  const favoriteTvShowIds = inject(StorageService<TvShowIds>).get(FAVORITES_KEY) as string[];

  const tvShowDetails$ = favoriteTvShowIds.map(tvShowId => tvShowHttpService.getTvShowDetailsFromApi(tvShowId));

  return forkJoin(tvShowDetails$);
};
