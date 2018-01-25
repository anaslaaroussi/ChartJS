import { TestBed, inject } from '@angular/core/testing';

import { ServiceFetchService } from './service-fetch.service';

describe('ServiceFetchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceFetchService]
    });
  });

  it('should be created', inject([ServiceFetchService], (service: ServiceFetchService) => {
    expect(service).toBeTruthy();
  }));
});
