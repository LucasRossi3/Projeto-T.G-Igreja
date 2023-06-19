import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { AutenticacaoService } from 'src/app/shared/services/autenticacao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  @Output() exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public formulario: FormGroup = new FormGroup({
    email: new FormControl(null, [ Validators.required, Validators.minLength(6), Validators.email ]),
    nome: new FormControl(null, [ Validators.required, Validators.minLength(6), Validators.maxLength(50) ]),
    usuario: new FormControl(null, [ Validators.required, Validators.minLength(6), Validators.maxLength(20) ]),
    senha: new FormControl(null, [ Validators.required, Validators.minLength(6) ])
  });

  public errorMessage: string = '';

  constructor(private autenticacaoService: AutenticacaoService) { }

  ngOnInit(): void {
  }

  public cadastrarUsuario(): void {
    let usuario: Usuario = this.formulario.value;
    usuario.senha = btoa(usuario.senha);

    // this.autenticacaoService.cadastrarUsuario(usuario).subscribe({
    //   next: (usuario: Usuario) => {
    //     this.exibirPainelLogin();
    //     console.log(usuario);
    //   }, 
    //   error: error => this.errorMessage = error.message
    // });
  }

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login');
  }
}
