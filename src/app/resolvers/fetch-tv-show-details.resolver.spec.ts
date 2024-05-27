import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { fetchTvShowDetailsResolver } from './fetch-tv-show-details.resolver';

describe('fetchTvShowDetailsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => fetchTvShowDetailsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
