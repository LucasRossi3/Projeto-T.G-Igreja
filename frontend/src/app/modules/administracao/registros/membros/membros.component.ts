import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CongregacoesService } from 'src/app/core/services/congregacoes.service';
import { MembrosService } from 'src/app/core/services/membros.service';
import { Membro } from 'src/app/shared/models/membro.model';
import { Pessoa } from 'src/app/shared/models/pessoa.model';
import { PessoasService } from '../../../../core/services/pessoas.service';
import { Congregacao } from './../../../../shared/models/congregacao.model';

@Component({
  selector: 'app-membros',
  templateUrl: './membros.component.html',
  styleUrls: ['./membros.component.css']
})
export class MembrosComponent {

  @ViewChild('pessoa') pessoaSelect!: ElementRef;
  @ViewChild('btnEditar') btnEditar!: ElementRef;
  @ViewChild('btnRemover') btnRemover!: ElementRef;

  public congregacoes: Congregacao[] = [];
  public membros: Membro[] = [];
  public pessoasNaoMembros: Pessoa[] = [];
  public pessoasMembros: Pessoa[] = [];
  public pessoas: Pessoa[] = [];
  public membro: Membro = {} as Membro;
  public novoCadastro: boolean = true;
  public isEditar: boolean = false;

  public formulario: FormGroup = new FormGroup({
    'pessoa': new FormControl(null, [Validators.required]),
    'congregacao': new FormControl(null, [Validators.required])
  });

  constructor(
    private membrosService: MembrosService,
    private congregacoesService: CongregacoesService,
    private pessoasService: PessoasService) { }

  ngOnInit() {
    this.getCongregacoes();
    this.getMembros();
  }

  public getCongregacoes(): void {
    this.congregacoesService.getCongregacoes()
      .subscribe({
        next: (congregacoes: Congregacao[]) => this.congregacoes = congregacoes,
        error: err => console.log(err)
      });
  }

  public getMembros(): void {
    this.membrosService.getMembros()
      .subscribe({
        next: (membros: Membro[]) => this.membros = membros,
        error: err => console.log(err)
      });
  }

  public getPessoas(): void {
    this.pessoasService.getPessoas()
      .subscribe({
        next: (pessoas: Pessoa[]) => this.pessoas = pessoas,
        error: err => console.log(err)
      });
  }

  public getPessoasMembros(): void {
    this.pessoasMembros = [];

    this.pessoasService.getPessoas()
      .subscribe({
        next: (pessoas: Pessoa[]) => {
          for (let pessoa of pessoas) {
            for (let membro of this.membros) {
              if (pessoa.id === membro.pessoa.id) {
                this.pessoasMembros.push(pessoa);
                break;
              }
            }
          }

          this.pessoas = this.pessoasMembros;
        },
        error: err => console.log(err)
      });
  }

  public getPessoasNaoMembros(): void {
    this.pessoasNaoMembros = [];

    this.pessoasService.getPessoas()
      .subscribe({
        next: (pessoas: Pessoa[]) => {
          for (let pessoa of pessoas) {
            let encontrou = false;

            for (let membro of this.membros) {
              if (pessoa.id === membro.pessoa.id) {
                encontrou = true;
                break;
              }
            }

            if (!encontrou) {
              this.pessoasNaoMembros.push(pessoa);
            }
          }

          this.pessoas = this.pessoasNaoMembros;
        },
        error: err => console.log(err)
      });
  }

  public filtrar(value: string): void {
    const id = parseInt(value);
    if (Number.isNaN(id)) {
      this.getMembros();
      return;
    }

    this.membrosService.getMembrosByCongregacao(id)
      .subscribe({
        next: (membros: Membro[]) => this.membros = membros,
        error: err => console.log(err)
      });
  }

  public novo(): void {
    this.formulario.enable();
    this.limparFormulario();
    this.isEditar = false;
    this.novoCadastro = true;
    this.getPessoasNaoMembros();
  }

  /* ===== Formulário modal ============ */
  public limparFormulario(): void {
    this.formulario.reset();
  }

  public abrirModal(membro: Membro): void {
    this.limparFormulario();
    this.getPessoasMembros();
    this.membro = membro;

    this.formulario.setValue({
      pessoa: this.membro.pessoa.id,
      congregacao: this.membro.congregacao.id
    });

    this.formulario.disable();
    this.novoCadastro = false;
    this.btnEditar.nativeElement.disabled = false;
    this.btnRemover.nativeElement.disabled = false;
  }

  public salvar(): void {
    let idPessoa = this.formulario.get('pessoa')?.value;
    let idCongregacao = this.formulario.get('congregacao')?.value;

    this.pessoasService.getPessoaById(idPessoa)
      .subscribe({
        next: (pessoa: Pessoa) => {
          this.membro.pessoa = pessoa;

          this.congregacoesService.getCongregacaoById(idCongregacao)
            .subscribe({
              next: (congregacao: Congregacao) => {
                this.membro.congregacao = congregacao;

                if (this.isEditar) {
                  this.membrosService.atualizarMembro(this.membro.id, this.membro)
                    .subscribe({
                      next: (membro: Membro) => {
                        console.log(membro);
                        this.limparFormulario();
                        this.getMembros();
                      },
                      error: err => console.log(err)
                    });
                } else {
                  this.membrosService.cadastrarMembro(this.membro)
                    .subscribe({
                      next: (membro: Membro) => {
                        console.log(membro);
                        this.limparFormulario();
                        this.getMembros();
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
    this.membrosService.removerMembro(this.membro.id)
      .subscribe({
        next: res => {
          console.log(res);
          this.limparFormulario();
          this.getMembros();
        },
        error: err => console.log(err)
      });
  }
}
