import {Episode} from "./episode.model";
import {TvShow} from "./tv-show.model";

export interface TvShowDetails extends TvShow {
  url: string
  description: string
  description_source: any
  runtime: number
  youtube_link: string
  image_path: string
  rating: number
  rating_count: string
  countdown: any
  genres: string[]
  pictures: any[]
  episodes: Episode[]
}
