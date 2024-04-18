import {TvShow} from "./tv-show.model";

export interface TvShowsApiResponse {
  total: string
  page: number
  pages: number
  tv_shows: TvShow[]
}
