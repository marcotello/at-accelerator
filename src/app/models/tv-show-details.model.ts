import {Episode} from "./episode.model";
import {TvShow} from "./tv-show.model";

export interface TvShowDetails extends TvShow {
  url: string;
  description: string;
  description_source: string;
  runtime: number;
  youtube_link: string;
  image_path: string;
  rating: number;
  rating_count: string;
  countdown: null | Episode;
  genres: string[];
  pictures: any[];
  episodes: Episode[];
}
