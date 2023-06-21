import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/core/authentication/autenticacao.service';
import { Usuario } from 'src/app/shared/models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public formulario: FormGroup = new FormGroup({
    usuario: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
    senha: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  public errorMessage: string = '';

  constructor(private autenticacaoService: AutenticacaoService, private router: Router) {}

  ngOnInit(): void {
    if (this.autenticacaoService.autenticado()) {
      this.router.navigateByUrl('/home');
    }
  }

  public autenticarUsuario(): void {
    this.autenticacaoService.autenticarUsuario(this.formulario.value.usuario, this.formulario.value.senha)
      .subscribe({
        next: (usuario: Usuario) => console.log(usuario),
        error: err => this.errorMessage = err
      });
  }

  // public exibirPainelCadastro(): void {
  //   this.exibirPainel.emit('cadastro');
  // }
}
