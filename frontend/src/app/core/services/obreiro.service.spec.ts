import { TestBed } from '@angular/core/testing';

import { ObreiroService } from './obreiro.service';

describe('ObreiroService', () => {
  let service: ObreiroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObreiroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
