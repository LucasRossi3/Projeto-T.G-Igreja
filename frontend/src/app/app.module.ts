import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './core/components/header/header.component';
import { CoreModule } from './core/core.module';
import { AdministracaoModule } from './modules/administracao/administracao.module';
import { AssistenciaSocialModule } from './modules/assistencia-social/assistencia-social.module';
import { EstoqueModule } from './modules/estoque/estoque.module';
import { HomeModule } from './modules/home/home.module';
import { ReuniaoModule } from './modules/reuniao/reuniao.module';
import { SharedModule } from './shared/shared.module';
import { FooterComponent } from './modules/home/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    ReuniaoModule,
    AssistenciaSocialModule,
    EstoqueModule,
    AdministracaoModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
