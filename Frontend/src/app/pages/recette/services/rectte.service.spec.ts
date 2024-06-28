import { TestBed } from '@angular/core/testing';

import { RectteService } from './rectte.service';

describe('RectteService', () => {
  let service: RectteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RectteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
