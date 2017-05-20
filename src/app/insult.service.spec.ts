import { TestBed, inject } from '@angular/core/testing';

import { InsultService } from './insult.service';

describe('InsultServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InsultService]
    });
  });

  it('should be created', inject([InsultService], (service: InsultService) => {
    expect(service).toBeTruthy();
  }));
});
