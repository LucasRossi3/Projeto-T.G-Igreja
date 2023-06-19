import { Component } from '@angular/core';
import { AutenticacaoService } from '../shared/services/autenticacao.service';

@Component({
  selector: 'app-rodape',
  templateUrl: './rodape.component.html',
  styleUrls: ['./rodape.component.css']
})
export class RodapeComponent {

  public autenticado: boolean = false;

  constructor(private autenticacaoService: AutenticacaoService) {}

  ngOnInit() {
    this.autenticacaoService.subjectLogin
      .subscribe(res => this.autenticado = res === 'entrou');
  }
}
