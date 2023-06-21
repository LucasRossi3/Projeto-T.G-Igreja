import { Component } from '@angular/core';
import { AutenticacaoService } from '../../authentication/autenticacao.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  public autenticado: boolean = this.autenticacaoService.autenticado();

  constructor(private autenticacaoService: AutenticacaoService) {}

  ngOnInit(): void {
    this.autenticacaoService.subjectLogin.subscribe(
      res => this.autenticado = res === 'entrou'
    );
  }

  public sair(): void {
    this.autenticacaoService.sair();
  }
}
