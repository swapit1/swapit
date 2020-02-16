import { TestBed } from '@angular/core/testing';

import { ExptetionService } from './exptetion.service';

describe('ExptetionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExptetionService = TestBed.get(ExptetionService);
    expect(service).toBeTruthy();
  });
});
