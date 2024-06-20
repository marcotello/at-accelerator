import {inject, Injectable, Signal, signal} from '@angular/core';
import {TvShowDetails} from "../models/tv-show-details.model";
import {EpisodeDetails} from "../models/episode-details.model";
import {tap} from "rxjs/operators";
import {TvShowsHttpService} from "./tv-shows-http.service";

@Injectable({
  providedIn: 'root'
})
export class TvShowDetailsService {

  private tvShowDetailsSignal = signal<TvShowDetails | null>(null);
  private episodeDetailsSignal = signal<EpisodeDetails | null>(null);

  private tvShowsHttpService = inject(TvShowsHttpService);

  public getTvShowDetails(tvShowId: string): Signal<TvShowDetails | null> {

    this.tvShowDetailsSignal.set(null);
    this.episodeDetailsSignal.set(null);

    this.tvShowsHttpService.getTvShowDetails(tvShowId)
      .pipe(
        tap(tvShowDetails => {
          const totalEpisodes = tvShowDetails.episodes.length;
          const totalSeasons = tvShowDetails.episodes.reduce((maxSeason, episode) => {
            return Math.max(maxSeason, episode.season);
          }, 0);

          this.episodeDetailsSignal.set({totalSeasons, totalEpisodes});
        })
      )
      .subscribe(tvShowDetails => {
        this.tvShowDetailsSignal.set(tvShowDetails);
      });

    return this.tvShowDetailsSignal.asReadonly();
  }

  public getEpisodeDetails(): Signal<EpisodeDetails | null> {
    return this.episodeDetailsSignal.asReadonly();
  }
}
