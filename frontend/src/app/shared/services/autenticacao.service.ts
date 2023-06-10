import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  public idToken: string = '';
  public usuariosUrl: string = environment.baseUrl + '/usuarios';

  constructor(private httpClient: HttpClient, private router: Router) { }
  
  // Cadastrar usuário
  public cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(usuario);

    return this.httpClient.post<Usuario>(`${this.usuariosUrl}`, body, { headers });
  }

  // Autenticar usuário
  public autenticarUsuario(email: string, senha: string): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.usuariosUrl}?email=${email}&senha=${btoa(senha)}`))
      .then(resposta => {
        if (resposta.length) {
          this.idToken = btoa(email + senha);
          localStorage.setItem('idToken', this.idToken);
          this.router.navigateByUrl('/home');

          return resposta[0];
        }
      });
  }

  // Usuário autenticado
  public autenticado(): boolean {
    if (this.idToken === '') {
      let token: string | null = localStorage.getItem('idToken');
      token === null ? this.router.navigateByUrl('') : this.idToken = token;
    }
    
    return this.idToken !== '';
  }

  // SignOut
  public sair(): void {
    localStorage.removeItem('idToken');
    this.idToken = '';
    this.router.navigateByUrl('');
  }
}
