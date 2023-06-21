import { Component, ElementRef, ViewChild } from '@angular/core';
import { PessoasService } from './../../../../core/services/pessoas.service';
import { Pessoa } from 'src/app/shared/models/pessoa.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent {

  public cpfInput: string = '';
  public nomeInput: string = '';
  public pessoas: Pessoa[] = [];

  public formulario: FormGroup = new FormGroup({
    'nome': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
    'email': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
    'cpf': new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(11)]),
    'rg': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(9)]),
    'sexo': new FormControl('Selecione uma opção', [Validators.required]),
    'ddd': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(2)]),
    'telefone': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(9)]),
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]),
    'bairro': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]),
    'complemento': new FormControl(null),
    'cidade': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]),
    'uf': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(2)]),
    'cep': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
  });

  constructor (private pessoasService: PessoasService) { }

  ngOnInit() {
    this.getPessoas();
  }

  public onKey(value: string): void {    
    this.cpfInput = value;
  }

  public getPessoas(): void {
    this.pessoasService.getPessoas()
    .subscribe({
      next: (pessoas: Pessoa[]) => this.pessoas = pessoas,
      error: err => console.log(err)
    });
  }

  public pesquisar(): void {
    if (this.cpfInput === '') {
      this.getPessoas();
      return;
    }

    this.pessoasService.getPessoaByCpf(this.cpfInput)
      .subscribe({
        next: (pessoa: Pessoa) => {
          this.pessoas = [];
          this.pessoas.push(pessoa);
          this.nomeInput = pessoa.nome;
        },
        error: err => console.log(err)
     });
  }

  public limpar(): void {
    this.cpfInput = '';
    this.nomeInput = '';
    this.getPessoas();
  }

  /* Formulário modal */
  public salvar(): void {
  }
}
