import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AcessoComponent } from './acesso/acesso.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { LoginComponent } from './acesso/login/login.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent,
    AcessoComponent,
    LoginComponent,
    CadastroComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
