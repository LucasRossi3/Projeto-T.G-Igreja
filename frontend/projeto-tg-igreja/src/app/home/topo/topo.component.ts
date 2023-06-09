import { Component } from '@angular/core';
import { AutenticacaoService } from '../../shared/services/autenticacao.service';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css']
})
export class TopoComponent {

  constructor(private autenticacaoService: AutenticacaoService) { }

  public sair(): void {
    this.autenticacaoService.sair();
  }
}
