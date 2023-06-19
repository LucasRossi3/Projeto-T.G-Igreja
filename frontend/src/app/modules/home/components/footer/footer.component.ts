import { Component } from '@angular/core';
import { AutenticacaoService } from '../../../../core/authentication/autenticacao.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  public autenticado: boolean = false;

  constructor(private autenticacaoService: AutenticacaoService) {}

  ngOnInit() {
    this.autenticacaoService.subjectLogin.subscribe(
      (res) => (this.autenticado = res === 'entrou')
    );
  }
}
