import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {catchError, Observable, of, throwError} from "rxjs";
import {TvShow} from "../models/tv-show.model";
import {TvShowsHttpService} from "../services/tv-shows-http.service";
import {inject} from "@angular/core";

export const fetchPopularShowsResolver: ResolveFn<Observable<TvShow[]>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<TvShow[]> => inject(TvShowsHttpService).fetchMostPopularTVShows()
  .pipe(
    catchError((error) => {
      console.error('Error fetching popular TV shows', error);
      return of([]);
    })
  );
