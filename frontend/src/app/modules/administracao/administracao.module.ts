import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { CpfPipe } from 'src/app/shared/pipes/cpf.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { FamiliaComponent } from './registros/familia/familia.component';
import { MembroComponent } from './registros/membro/membro.component';
import { ObreiroComponent } from './registros/obreiro/obreiro.component';
import { PessoaComponent } from './registros/pessoa/pessoa.component';
import { RegistrosComponent } from './registros/registros.component';
import { UsuarioComponent } from './registros/usuario/usuario.component';

@NgModule({
  declarations: [
    RegistrosComponent,
    PessoaComponent,
    FamiliaComponent,
    CpfPipe,
    MembroComponent,
    ObreiroComponent,
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule
  ]
})
export class AdministracaoModule { }
