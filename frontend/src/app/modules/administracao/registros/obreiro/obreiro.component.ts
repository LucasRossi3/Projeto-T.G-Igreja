import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FuncaoService } from 'src/app/core/services/funcao.service';
import { ObreiroService } from 'src/app/core/services/obreiro.service';
import { PessoaService } from 'src/app/core/services/pessoa.service';
import { Funcao } from 'src/app/shared/models/funcao.model';
import { Obreiro } from 'src/app/shared/models/obreiro.model';
import { Pessoa } from 'src/app/shared/models/pessoa.model';

@Component({
  selector: 'app-obreiro',
  templateUrl: './obreiro.component.html',
  styleUrls: ['./obreiro.component.css']
})
export class ObreiroComponent {
  @ViewChild('pessoa') pessoaSelect!: ElementRef;
  @ViewChild('btnEditar') btnEditar!: ElementRef;
  @ViewChild('btnRemover') btnRemover!: ElementRef;

  public funcoes: Funcao[] = [];
  public obreiros: Obreiro[] = [];
  public obreiro: Obreiro = {} as Obreiro;
  public pessoasObreiros: Pessoa[] = [];
  public pessoasNaoObreiros: Pessoa[] = [];
  public pessoas: Pessoa[] = [];
  public novoCadastro: boolean = true;
  public isEditar: boolean = false;

  public formulario: FormGroup = new FormGroup({
    'pessoa': new FormControl(null, [Validators.required]),
    'funcao': new FormControl(null, [Validators.required])
  });

  constructor(
    private obreiroService: ObreiroService,
    private funcaoService: FuncaoService,
    private pessoaService: PessoaService) { }

  ngOnInit() {
    this.getFuncoes();
    this.getObreiros();
  }

  public getFuncoes(): void {
    this.funcaoService.getFuncoes()
      .subscribe({
        next: (funcoes: Funcao[]) => this.funcoes = funcoes,
        error: err => console.log(err)
      });
  }

  public getObreiros(): void {
    this.obreiroService.getObreiros()
      .subscribe({
        next: (obreiros: Obreiro[]) => this.obreiros = obreiros,
        error: err => console.log(err)
      });
  }

  public getPessoasObreiros(): void {
    this.pessoasObreiros = [];

    this.pessoaService.getPessoas()
      .subscribe({
        next: (pessoas: Pessoa[]) => {
          for (let pessoa of pessoas) {
            for (let obreiro of this.obreiros) {
              if (pessoa.id === obreiro.pessoa.id) {
                this.pessoasObreiros.push(pessoa);
                break;
              }
            }
          }

          this.pessoas = this.pessoasObreiros;
        },
        error: err => console.log(err)
      });
  }

  public getPessoasNaoObreiros(): void {
    this.pessoasNaoObreiros = [];

    this.pessoaService.getPessoas()
      .subscribe({
        next: (pessoas: Pessoa[]) => {
          for (let pessoa of pessoas) {
            let encontrou = false;

            for (let obreiro of this.obreiros) {
              if (pessoa.id === obreiro.pessoa.id) {
                encontrou = true;
                break;
              }
            }

            if (!encontrou) {
              this.pessoasNaoObreiros.push(pessoa);
            }
          }

          this.pessoas = this.pessoasNaoObreiros;
        },
        error: err => console.log(err)
      });
  }

  public filtrar(value: string): void {
    const id = parseInt(value);
    if (Number.isNaN(id)) {
      this.getObreiros();
      return;
    }

    this.obreiroService.getObreirosByFuncao(id)
      .subscribe({
        next: (obreiros: Obreiro[]) => this.obreiros = obreiros,
        error: err => console.log(err)
      });
  }

  public novo(): void {
    this.formulario.enable();
    this.limparFormulario();
    this.isEditar = false;
    this.novoCadastro = true;
    this.getPessoasNaoObreiros();
  }

  /* ===== Formulário modal ============ */
  public limparFormulario(): void {
    this.formulario.reset();
  }

  public abrirModal(obreiro: Obreiro): void {
    this.limparFormulario();
    this.getPessoasObreiros();
    this.obreiro = obreiro;

    this.formulario.setValue({
      pessoa: this.obreiro.pessoa.id,
      funcao: this.obreiro.funcao.id
    });

    this.formulario.disable();
    this.novoCadastro = false;
    this.btnEditar.nativeElement.disabled = false;
    this.btnRemover.nativeElement.disabled = false;
  }

  public salvar(): void {
    let idPessoa = this.formulario.get('pessoa')?.value;
    let idFuncao = this.formulario.get('funcao')?.value;

    this.pessoaService.getPessoaById(idPessoa)
      .subscribe({
        next: (pessoa: Pessoa) => {
          this.obreiro.pessoa = pessoa;

          this.funcaoService.getFuncaoById(idFuncao)
            .subscribe({
              next: (funcao: Funcao) => {
                this.obreiro.funcao = funcao;

                if (this.isEditar) {
                  this.obreiroService.atualizarObreiro(this.obreiro.id, this.obreiro)
                    .subscribe({
                      next: (obreiro: Obreiro) => {
                        console.log(obreiro);
                        this.limparFormulario();
                        this.getObreiros();
                      },
                      error: err => console.log(err)
                    });
                } else {
                  this.obreiroService.cadastrarObreiro(this.obreiro)
                    .subscribe({
                      next: (obreiro: Obreiro) => {
                        console.log(obreiro);
                        this.limparFormulario();
                        this.getObreiros();
                      },
                      error: err => console.log(err)
                    });
                }
              },
              error: err => console.log(err)
            });
        },
        error: err => console.log(err)
      });
  }

  public editar(): void {
    this.formulario.enable();
    this.isEditar = true;
    this.formulario.get('pessoa')?.disable();
    this.btnEditar.nativeElement.disabled = true;
    this.btnRemover.nativeElement.disabled = true;
  }

  public remover(): void {
    this.obreiroService.removerObreiro(this.obreiro.id)
      .subscribe({
        next: res => {
          console.log(res);
          this.limparFormulario();
          this.getObreiros();
        },
        error: err => console.log(err)
      });
  }
}
