import { Component, ElementRef, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pessoa } from 'src/app/shared/models/pessoa.model';
import { PessoasService } from './../../../../core/services/pessoas.service';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent {

  @ViewChild('cpf') cpfInput!: ElementRef;
  @ViewChild('btnEditar') btnEditar!: ElementRef;
  @ViewChild('btnRemover') btnRemover!: ElementRef;

  public pessoas: Pessoa[] = [];
  public pessoa: Pessoa = {} as Pessoa;
  public novoCadastro: boolean = true;
  public isEditar: boolean = false;
  public errorMessage: string = '';

  public formulario: FormGroup = new FormGroup({
    'id': new FormControl(null),
    'nome': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
    'email': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
    'cpf': new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(11)]),
    'rg': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(9)]),
    'sexo': new FormControl(null, [Validators.required]),
    'ddd': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(2)]),
    'telefone': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(9)]),
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
    'numEndereco': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]),
    'bairro': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(40)]),
    'complemento': new FormControl(null),
    'cidade': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(40)]),
    'uf': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(2)]),
    'cep': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
  });

  constructor (private pessoasService: PessoasService) { }

  ngOnInit() {
    this.getPessoas();
  }

  public getPessoas(): void {
    this.pessoasService.getPessoas()
    .subscribe({
      next: (pessoas: Pessoa[]) => this.pessoas = pessoas,
      error: err => console.log(err)
    });
  }

  public pesquisar(value: string): void {
    this.errorMessage = '';
    let cpf: number = parseInt(value);

    if (Number.isNaN(cpf)) {
      this.errorMessage = 'Erro: digite um CPF válido'
      return;
    }

    this.pessoasService.getPessoaByCpf(cpf)
      .subscribe({
        next: (pessoa: Pessoa) => {
          this.pessoas = [];
          this.pessoas.push(pessoa);
        },
        error: err => this.errorMessage = err
     });
  }

  public limpar(): void {
    this.cpfInput.nativeElement.value = '';
    this.errorMessage = '';
    this.getPessoas();
  }

  public novo(): void {
    this.formulario.enable();
    this.limparFormulario();
    this.isEditar = false;
    this.novoCadastro = true;
    this.limpar();
  }

  /* ===== Formulário modal ============ */
  public limparFormulario(): void {
    this.formulario.reset();
  }

  public abrirModal(pessoa: Pessoa): void {
    this.pessoa = pessoa;
    this.formulario.setValue(this.pessoa);
    this.formulario.disable();
    this.novoCadastro = false;
    this.btnEditar.nativeElement.disabled = false;
    this.btnRemover.nativeElement.disabled = false;
    this.limpar();
  }

  public salvar(): void {
    if (this.isEditar) {
      this.pessoasService.atualizarPessoa(this.pessoa.id, this.formulario.value)
        .subscribe({
          next: (pessoa: Pessoa) => {
            console.log(pessoa);
            this.limparFormulario();
            this.getPessoas();
          },
          error: err => console.log(err)
      });
    } else {
      this.pessoasService.cadastrarPessoa(this.formulario.value)
        .subscribe({
          next: (pessoa: Pessoa) => {
            console.log(pessoa);
            this.limparFormulario();
            this.getPessoas();
          },
          error: err => console.log(err)
        });
    }
  }

  public editar(): void {
    this.formulario.enable();
    this.isEditar = true;
    this.btnEditar.nativeElement.disabled = true;
    this.btnRemover.nativeElement.disabled = true;
  }

  public remover(): void {
    this.pessoasService.removerPessoa(this.pessoa.id)
      .subscribe({
        next: res => {
          console.log(res);
          this.limparFormulario();
          this.getPessoas();
        },
        error: err => console.log(err)
      });
  }
}
