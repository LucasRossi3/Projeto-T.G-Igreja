import { TestBed } from '@angular/core/testing';
import { CongregacaoService } from './congregacao.service';

describe('CongregacaoService', () => {
  let service: CongregacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CongregacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
