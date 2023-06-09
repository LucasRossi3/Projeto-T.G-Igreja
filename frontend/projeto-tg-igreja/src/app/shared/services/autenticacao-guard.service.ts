import { Injectable } from '@angular/core';
import { AutenticacaoService } from './autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoGuardService {

  constructor(private autenticacaoService: AutenticacaoService) { }

  canActivate(): boolean {
    return this.autenticacaoService.autenticado();
  }
}
