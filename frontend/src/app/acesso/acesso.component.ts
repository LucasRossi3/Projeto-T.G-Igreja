import { Component } from '@angular/core';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css']
})
export class AcessoComponent {
  
  public acesso: string = 'login';

  public exibirPainel(event: string): void {
    this.acesso = event;
  }
}
