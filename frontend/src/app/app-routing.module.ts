import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { AutenticacaoGuardService } from './core/guards/autenticacao-guard.service';
import { FamiliasComponent } from './modules/administracao/registros/familias/familias.component';
import { PessoasComponent } from './modules/administracao/registros/pessoas/pessoas.component';
import { RegistrosComponent } from './modules/administracao/registros/registros.component';
import { AcessoComponent } from './modules/home/acesso/acesso.component';
import { HomeComponent } from './modules/home/home/home.component';

const routes: Routes = [
  { path: '', component: AcessoComponent },
  { path: 'home', component: HomeComponent, canActivate: [AutenticacaoGuardService] },
  { path: 'administracao/registros', component: RegistrosComponent, canActivate: [AutenticacaoGuardService], 
      children: [
        { path: '', component: PessoasComponent },
        { path: 'pessoas', component: PessoasComponent },
        { path: 'familias', component: FamiliasComponent }
      ] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
