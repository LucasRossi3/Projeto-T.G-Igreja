import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { AutenticacaoGuardService } from './core/guards/autenticacao-guard.service';
import { FamiliaComponent } from './modules/administracao/registros/familia/familia.component';
import { MembroComponent } from './modules/administracao/registros/membro/membro.component';
import { ObreiroComponent } from './modules/administracao/registros/obreiro/obreiro.component';
import { PessoaComponent } from './modules/administracao/registros/pessoa/pessoa.component';
import { RegistrosComponent } from './modules/administracao/registros/registros.component';
import { UsuarioComponent } from './modules/administracao/registros/usuario/usuario.component';
import { AcessoComponent } from './modules/home/acesso/acesso.component';
import { HomeComponent } from './modules/home/home/home.component';

const routes: Routes = [
  { path: '', component: AcessoComponent },
  { path: 'home', component: HomeComponent, canActivate: [AutenticacaoGuardService] },
  { path: 'administracao/registros', component: RegistrosComponent, canActivate: [AutenticacaoGuardService],
    children: [
      { path: '', component: PessoaComponent },
      { path: 'pessoas', component: PessoaComponent },
      { path: 'familias', component: FamiliaComponent },
      { path: 'membros', component: MembroComponent },
      { path: 'obreiros', component: ObreiroComponent },
      { path: 'usuarios', component: UsuarioComponent },
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
