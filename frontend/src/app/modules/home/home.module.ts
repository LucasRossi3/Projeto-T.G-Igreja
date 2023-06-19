import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AcessoComponent } from './components/acesso/acesso.component';
import { CadastroComponent } from './components/acesso/cadastro/cadastro.component';
import { LoginComponent } from './components/acesso/login/login.component';
import { HomeComponent } from './components/home/home.component';

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
