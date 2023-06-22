import { TestBed } from '@angular/core/testing';

import { CongregacoesService } from './congregacoes.service';

describe('CongregacoesService', () => {
  let service: CongregacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CongregacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
