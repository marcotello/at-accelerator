import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { fetchPopularShowsResolver } from './fetch-popular-shows.resolver';

describe('fetchPopularShowsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => fetchPopularShowsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
