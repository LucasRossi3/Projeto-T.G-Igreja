import { TestBed } from '@angular/core/testing';
import { MembroService } from './membro.service';

describe('MembrosService', () => {
  let service: MembroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
