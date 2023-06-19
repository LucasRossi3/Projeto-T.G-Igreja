import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/shared/services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public formulario: FormGroup = new FormGroup({
    usuario: new FormControl(null, [ Validators.required, Validators.minLength(6) ]), 
    senha: new FormControl(null, [ Validators.required, Validators.minLength(6) ])
  });

  public errorMessage: string = '';

  constructor(private autenticacaoService: AutenticacaoService, private router: Router) { }

  ngOnInit(): void {
    if (this.autenticacaoService.autenticado())
      this.router.navigateByUrl('/home');
  }

  public autenticarUsuario(): void {
    this.autenticacaoService.autenticarUsuario(this.formulario.value.usuario, this.formulario.value.senha)
      .then(resposta => {
        console.log(resposta);
        
        if (resposta === undefined) {
          this.errorMessage = 'Erro: usuário e/ou senha estão incorretos';
        }
      })
      .catch((error: Error) => this.errorMessage = error.message);
  }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro');
  }
}
