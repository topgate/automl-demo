import { TestBed } from '@angular/core/testing';

import { EstimationService } from './estimation.service';

describe('EstimationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstimationService = TestBed.get(EstimationService);
    expect(service).toBeTruthy();
  });
});
