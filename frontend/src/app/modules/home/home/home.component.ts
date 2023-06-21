import { Component } from '@angular/core';
import { AutenticacaoService } from 'src/app/core/authentication/autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private autenticacaoService: AutenticacaoService) {}

  public sair(): void {
    this.autenticacaoService.sair();
  }
}
