import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { AutenticacaoGuardService } from './core/guards/autenticacao-guard.service';
import { AcessoComponent } from './modules/home/components/acesso/acesso.component';
import { HomeComponent } from './modules/home/components/home/home.component';

const routes: Routes = [
  { path: '', component: AcessoComponent },
  { path: 'home', component: HomeComponent, canActivate: [AutenticacaoGuardService] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
