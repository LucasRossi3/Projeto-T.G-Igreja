import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, retry, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  public idToken: string = '';
  public usuariosUrl: string = environment.baseUrl + '/usuarios';
  public subjectLogin: Subject<string> = new Subject();

  constructor(private httpClient: HttpClient, private router: Router) { }
  
  // Cadastrar usuário
  // public cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
  //   const headers = { 'Content-Type': 'application/json' };
  //   const body = JSON.stringify(usuario);

  //   return this.httpClient.post<Usuario>(`${this.usuariosUrl}`, body, { headers });
  // }

  // Autenticar usuário
  public autenticarUsuario(usuario: string, senha: string): Observable<any> {
    return this.httpClient.get<any>(`${this.usuariosUrl}?usuario=${usuario}&senha=${senha}`)
      .pipe(
        switchMap((res: any) => {
          if (res.length) {
            this.idToken = btoa(usuario + senha);
            localStorage.setItem('idToken', this.idToken);
            this.router.navigateByUrl('/home');

            this.subjectLogin.next('entrou');
            return res[0];
          }

          throw 'Erro: usuário e/ou senha estão incorretos';
        }),
        retry(3)
      );
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

    this.subjectLogin.next('saiu');
    this.router.navigateByUrl('');
  }
}
