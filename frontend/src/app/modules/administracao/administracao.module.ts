import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CpfPipe } from 'src/app/shared/pipes/cpf.pipe';
import { FamiliasComponent } from './registros/familias/familias.component';
import { PessoasComponent } from './registros/pessoas/pessoas.component';
import { RegistrosComponent } from './registros/registros.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    RegistrosComponent,
    PessoasComponent,
    FamiliasComponent,
    CpfPipe
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
