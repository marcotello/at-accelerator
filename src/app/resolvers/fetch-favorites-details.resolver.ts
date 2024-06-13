import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {TvShowDetails} from "../models/tv-show-details.model";
import {inject} from "@angular/core";
import {Observable} from "rxjs";
import {FavoritesService} from "../services/favorites.service";

export const fetchFavoritesDetailsResolver: ResolveFn<Observable<TvShowDetails[]>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<TvShowDetails[]> => inject(FavoritesService).getMyFavoriteTvShows();
