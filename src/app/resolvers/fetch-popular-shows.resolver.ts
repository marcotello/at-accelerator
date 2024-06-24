import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {TvShow} from "../models/tv-show.model";
import {TvShowsHttpService} from "../services/tv-shows-http.service";
import {inject, Signal} from "@angular/core";
import {TvShowsApiResponse} from "../models/tv-shows-api-response.model";

export const fetchPopularShowsResolver: ResolveFn<Signal<TvShowsApiResponse | null>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Signal<TvShowsApiResponse | null> => inject(TvShowsHttpService).getMostPopularTvShows(1);
