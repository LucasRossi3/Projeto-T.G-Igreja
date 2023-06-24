import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, map } from 'rxjs';
import { Funcao } from 'src/app/shared/models/funcao.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuncaoService {

  public funcaoUrl: string = environment.baseUrl + '/funcoes';

  constructor(private httpClient: HttpClient) { }

  // Create
  public cadastrarFuncao(funcao: Funcao): Observable<Funcao> {
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(funcao);

    return this.httpClient.post<Funcao>(`${this.funcaoUrl}`, body, { headers });
  }

  // Read
  public getFuncoes(): Observable<Funcao[]> {
    return this.httpClient.get<Funcao[]>(`${this.funcaoUrl}`);
  }

  public getFuncaoById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.funcaoUrl}?id=${id}`)
      .pipe(
        retry(3),
        map(res => {
          if (res.length) {
            return res[0];
          }

          throw 'Erro: Funcao não registrada';
        })
      );
  }

  // Update
  public atualizarFuncao(id: number, funcao: Funcao): Observable<any> {
    return this.httpClient.put<any>(`${this.funcaoUrl}/${id}`, funcao);
  }

  // Delete
  public removerFuncao(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.funcaoUrl}/${id}`);
  }
}
