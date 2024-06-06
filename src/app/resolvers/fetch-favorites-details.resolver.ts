import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {TvShowDetails} from "../models/tv-show-details.model";
import {FAVORITES_KEY} from "../constants/application-contants";
import {inject} from "@angular/core";
import {StorageService} from "../services/storage.service";
import {TvShowIds} from "../types/types";
import {TvShowsHttpService} from "../services/tv-shows-http.service";
import {forkJoin, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Episode} from "../models/episode.model";

export const fetchFavoritesDetailsResolver: ResolveFn<Observable<TvShowDetails[]>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<TvShowDetails[]> => {

  const tvShowHttpService = inject(TvShowsHttpService);
  const favoriteTvShowIds = inject(StorageService<TvShowIds>).get(FAVORITES_KEY) as string[];

  const tvShowDetails$ = favoriteTvShowIds.map(tvShowId => tvShowHttpService.getTvShowDetailsFromApi(tvShowId));

  return forkJoin(tvShowDetails$)
    .pipe(
      map(tvShowDetails => {
        const order = [
          'In Development',
          'Running',
          'To Be Determined',
          'Canceled/Ended',
          'Ended',
          'Returning Series'
        ];

        // TODO: sort based on cuntdown. cuntdown is type Episode with a date.

        const getNextEpisodeAirDate = (episodes: Episode[]): Date | null => {
          const today = new Date();
          const futureEpisodes = episodes
            .map(episode => new Date(episode.air_date))
            .filter(airDate => airDate >= today);
          return futureEpisodes.length > 0 ? futureEpisodes[0] : null;
        };

        return tvShowDetails.sort((tvShow1: TvShowDetails, tvShow2: TvShowDetails) => {
          const tvShow1StatusIndex = order.indexOf(tvShow1.status);
          const tvShow2StatusIndex = order.indexOf(tvShow2.status);

          if (tvShow1StatusIndex === tvShow2StatusIndex) {
            if(tvShow1StatusIndex === 1) {
              const tvShow1NextEpisodeDate = getNextEpisodeAirDate(tvShow1.episodes);
              const tvShow2NextEpisodeDate = getNextEpisodeAirDate(tvShow2.episodes);

              if (tvShow1NextEpisodeDate && tvShow2NextEpisodeDate) {
                return tvShow1NextEpisodeDate.getTime() - tvShow2NextEpisodeDate.getTime();
              } else if (tvShow1NextEpisodeDate) {
                return -1;
              } else if (tvShow2NextEpisodeDate) {
                return 1;
              }

            }

            return tvShow1.name.localeCompare(tvShow2.name);
          }

          return tvShow1StatusIndex - tvShow2StatusIndex;
        });
      })
    );
};
