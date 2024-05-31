import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { fetchFavoritesDetailsResolver } from './fetch-favorites-details.resolver';

describe('fetchFavoritesDetailsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => fetchFavoritesDetailsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
