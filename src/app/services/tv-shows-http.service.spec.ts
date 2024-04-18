import { TestBed } from '@angular/core/testing';

import { TvShowsHttpService } from './tv-shows-http.service';

describe('TvShowsHttpService', () => {
  let service: TvShowsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvShowsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
