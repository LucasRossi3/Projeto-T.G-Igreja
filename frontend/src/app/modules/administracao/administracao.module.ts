import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { CpfPipe } from 'src/app/shared/pipes/cpf.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { FamiliasComponent } from './registros/familias/familias.component';
import { MembrosComponent } from './registros/membros/membros.component';
import { ObreirosComponent } from './registros/obreiros/obreiros.component';
import { PessoasComponent } from './registros/pessoas/pessoas.component';
import { RegistrosComponent } from './registros/registros.component';
import { UsuariosComponent } from './registros/usuarios/usuarios.component';

@NgModule({
  declarations: [
    RegistrosComponent,
    PessoasComponent,
    FamiliasComponent,
    CpfPipe,
    MembrosComponent,
    ObreirosComponent,
    UsuariosComponent
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
export class AdministracaoModule {}
