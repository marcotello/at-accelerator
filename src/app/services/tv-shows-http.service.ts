import { Injectable } from '@angular/core';
import {TvShow} from "../models/tv-show.model";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TvShowsHttpService {

  constructor() { }

  public fetchMostPopularTVShows(): Observable<TvShow[]> {

    //TODO: Change the mock data with the real API call
    const tvShows: TvShow[] = [
      {
        id: 1,
        name: 'Alone',
        permalink: '',
        start_date: '2015-01-01',
        end_date: null,
        country: 'US',
        network: 'History',
        status: 'Running',
        image_thumbnail_path: 'https://example.com/image/alone.jpg'
      },
      {
        id: 2,
        name: 'Black Mirror',
        permalink: '',
        start_date: '2011-01-01',
        end_date: null,
        country: 'UK',
        network: 'Netflix',
        status: 'To Be Determined',
        image_thumbnail_path: 'https://example.com/image/blackmirror.jpg'
      },
      {
        id: 3,
        name: 'True Detective',
        permalink: '',
        start_date: '2014-01-01',
        end_date: null,
        country: 'US',
        network: 'HBO',
        status: 'Running',
        image_thumbnail_path: 'https://example.com/image/truedetective.jpg'
      }
    ];

    return of(tvShows);
  }
}
