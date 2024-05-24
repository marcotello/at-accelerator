import {ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject, signal, Signal} from "@angular/core";
import {TvShowDetails} from "../models/tv-show-details.model";
import {TvShowsHttpService} from "../services/tv-shows-http.service";

export const fetchTvShowDetailsResolver: ResolveFn<Signal<TvShowDetails>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Signal<TvShowDetails> => {
  const tvShowId = route.paramMap.get('tvShowId');

  if(tvShowId !== null) {
    return inject(TvShowsHttpService).getTvShowDetails(tvShowId);
  }

  inject(Router).navigate(['/favorites']);
  return signal<TvShowDetails>({} as TvShowDetails);
};
