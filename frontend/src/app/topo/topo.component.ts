import { Component } from '@angular/core';
import { AutenticacaoService } from '../shared/services/autenticacao.service';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
})
export class TopoComponent {
  
  public autenticado: boolean = true;

  constructor(private autenticacaoService: AutenticacaoService) {}
  
  ngOnInit(): void {
    this.autenticacaoService.subjectLogin
      .subscribe(res => this.autenticado = res === 'entrou');
  }

  public sair(): void {
    this.autenticacaoService.sair();
  }
}
