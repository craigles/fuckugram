import { TestBed, inject } from '@angular/core/testing';

import { InsulterDescriptionsService } from './insulter-descriptions.service';

describe('InsulterDescriptionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InsulterDescriptionsService]
    });
  });

  it('should be created', inject([InsulterDescriptionsService], (service: InsulterDescriptionsService) => {
    expect(service).toBeTruthy();
  }));
});
