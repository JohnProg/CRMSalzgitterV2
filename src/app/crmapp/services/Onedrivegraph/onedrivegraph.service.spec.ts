import { TestBed, inject } from '@angular/core/testing';

import { OnedrivegraphService } from './onedrivegraph.service';

describe('OnedrivegraphService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnedrivegraphService]
    });
  });

  it('should be created', inject([OnedrivegraphService], (service: OnedrivegraphService) => {
    expect(service).toBeTruthy();
  }));
});
