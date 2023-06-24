import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CongregacaoService } from 'src/app/core/services/congregacao.service';
import { MembroService } from 'src/app/core/services/membro.service';
import { Membro } from 'src/app/shared/models/membro.model';
import { Pessoa } from 'src/app/shared/models/pessoa.model';
import { PessoaService } from '../../../../core/services/pessoa.service';
import { Congregacao } from '../../../../shared/models/congregacao.model';

@Component({
  selector: 'app-membro',
  templateUrl: './membro.component.html',
  styleUrls: ['./membro.component.css']
})
export class MembroComponent {

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
    private membroService: MembroService,
    private congregacaoService: CongregacaoService,
    private pessoaService: PessoaService) { }

  ngOnInit() {
    this.getCongregacoes();
    this.getMembros();
  }

  public getCongregacoes(): void {
    this.congregacaoService.getCongregacoes()
      .subscribe({
        next: (congregacoes: Congregacao[]) => this.congregacoes = congregacoes,
        error: err => console.log(err)
      });
  }

  public getMembros(): void {
    this.membroService.getMembros()
      .subscribe({
        next: (membros: Membro[]) => this.membros = membros,
        error: err => console.log(err)
      });
  }

  public getPessoasMembros(): void {
    this.pessoasMembros = [];

    this.pessoaService.getPessoas()
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

    this.pessoaService.getPessoas()
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

    this.membroService.getMembrosByCongregacao(id)
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

    this.pessoaService.getPessoaById(idPessoa)
      .subscribe({
        next: (pessoa: Pessoa) => {
          this.membro.pessoa = pessoa;

          this.congregacaoService.getCongregacaoById(idCongregacao)
            .subscribe({
              next: (congregacao: Congregacao) => {
                this.membro.congregacao = congregacao;

                if (this.isEditar) {
                  this.membroService.atualizarMembro(this.membro.id, this.membro)
                    .subscribe({
                      next: (membro: Membro) => {
                        console.log(membro);
                        this.limparFormulario();
                        this.getMembros();
                      },
                      error: err => console.log(err)
                    });
                } else {
                  this.membroService.cadastrarMembro(this.membro)
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
    this.membroService.removerMembro(this.membro.id)
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
