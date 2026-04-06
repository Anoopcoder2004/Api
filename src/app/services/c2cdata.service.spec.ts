import { TestBed } from '@angular/core/testing';

import { C2cdataService } from './c2cdata.service';

describe('C2cdataService', () => {
  let service: C2cdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(C2cdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
