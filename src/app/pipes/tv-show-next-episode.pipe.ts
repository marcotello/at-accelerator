import { Pipe, PipeTransform } from '@angular/core';
import {TvShowStatus} from "../types/enums";
import {formatDistanceToNow} from "date-fns";

@Pipe({
  name: 'tvShowNextEpisode',
  standalone: true
})
export class TvShowNextEpisodePipe implements PipeTransform {

  transform(nextEpisodeDate: string | undefined, status: string = TvShowStatus.Canceled): unknown {
    if(nextEpisodeDate === 'null' || nextEpisodeDate === 'undefined') {
      return '';
    }

    if(this.IsShowNoLongerAvailable(status)) {
      return 'Show has ended';
    }

    if(this.IsShowRunningWithNoEpisodes(nextEpisodeDate!, status)) {
      return 'No next episode date';
    }

    return `Next episode ${formatDistanceToNow(new Date(nextEpisodeDate!), {addSuffix: true})}`;
  }

  private IsShowNoLongerAvailable(status: string) {
    return status === TvShowStatus.Canceled ||
      status === TvShowStatus.Ended ||
      status === TvShowStatus.ToBeDetermined ||
      status === TvShowStatus.NoStatus;
  }

  private IsShowRunningWithNoEpisodes(nextEpisodeDate: string, status: string) {
    return !nextEpisodeDate &&
      (status === TvShowStatus.InDevelopment || status === TvShowStatus.Running || status === TvShowStatus.ToBeDetermined);
  }
}
