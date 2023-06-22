import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, retry } from 'rxjs';
import { Congregacao } from 'src/app/shared/models/congregacao.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CongregacoesService {

  public congregacoesUrl: string = environment.baseUrl + '/congregacoes';

  constructor(private httpClient: HttpClient) { }

  // Create
  public cadastrarCongregacao(congregacao: Congregacao): Observable<Congregacao> {
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(congregacao);

    return this.httpClient.post<Congregacao>(`${this.congregacoesUrl}`, body, { headers });
  }

  // Read
  public getCongregacoes(): Observable<Congregacao[]> {
    return this.httpClient.get<Congregacao[]>(`${this.congregacoesUrl}`);
  }

  public getCongregacaoById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.congregacoesUrl}?id=${id}`)
      .pipe(
        retry(3),
        map(res => {
          if (res.length) {
            return res[0];
          }

          throw 'Erro: Congregacao não registrada';
        })
      );
  }

  // Update
  public atualizarCongregacao(id: number, congregacao: Congregacao): Observable<any> {
    return this.httpClient.put<any>(`${this.congregacoesUrl}/${id}`, congregacao);
  }

  // Delete
  public removerCongregacao(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.congregacoesUrl}/${id}`);
  }
}
