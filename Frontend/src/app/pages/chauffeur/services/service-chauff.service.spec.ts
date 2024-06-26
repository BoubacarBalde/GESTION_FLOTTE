import { TestBed } from '@angular/core/testing';

import { ServiceChauffService } from './service-chauff.service';

describe('ServiceChauffService', () => {
  let service: ServiceChauffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceChauffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
