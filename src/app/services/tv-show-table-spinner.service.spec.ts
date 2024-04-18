import { TestBed } from '@angular/core/testing';

import { TvShowTableSpinnerService } from './tv-show-table-spinner.service';

describe('TvShowTableSpinnerService', () => {
  let service: TvShowTableSpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvShowTableSpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
