import {ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject, signal, Signal} from "@angular/core";
import {TvShowDetails} from "../models/tv-show-details.model";
import {TvShowDetailsService} from "../services/tv-show-details.service";

export const fetchTvShowDetailsResolver: ResolveFn<Signal<TvShowDetails | null>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Signal<TvShowDetails | null> => {
  const tvShowId = route.paramMap.get('tvShowId');

  if(tvShowId !== null) {
    return inject(TvShowDetailsService).getTvShowDetails(tvShowId);
  }

  inject(Router).navigate(['/favorites']);

  return signal<TvShowDetails | null>(null);
};
