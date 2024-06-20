import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {TvShow} from "../models/tv-show.model";
import {TvShowsHttpService} from "../services/tv-shows-http.service";
import {inject, Signal} from "@angular/core";

export const fetchPopularShowsResolver: ResolveFn<Signal<TvShow[]>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Signal<TvShow[]> => inject(TvShowsHttpService).getMostPopularTvShows(1);
