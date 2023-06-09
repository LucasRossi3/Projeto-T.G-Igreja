import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, retry } from 'rxjs';
import { Pessoa } from 'src/app/shared/models/pessoa.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  public pessoaUrl: string = environment.baseUrl + '/pessoas';

  constructor(private httpClient: HttpClient) { }

  // Create
  public cadastrarPessoa(pessoa: Pessoa): Observable<Pessoa> {
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(pessoa);

    return this.httpClient.post<Pessoa>(`${this.pessoaUrl}`, body, { headers });
  }

  // Read
  public getPessoas(): Observable<Pessoa[]> {
    return this.httpClient.get<Pessoa[]>(`${this.pessoaUrl}`);
  }

  public getPessoaByCpf(cpf: number): Observable<any> {
    return this.httpClient.get<any>(`${this.pessoaUrl}?cpf=${cpf}`)
      .pipe(
        retry(3),
        map(res => {
          if (res.length) {
            return res[0];
          }

          throw `Erro: Pessoa não registrada (CPF: ${cpf})`;
        })
      );
  }

  public getPessoaById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.pessoaUrl}?id=${id}`)
      .pipe(
        retry(3),
        map(res => {
          if (res.length) {
            return res[0];
          }

          throw 'Erro: Pessoa não registrada';
        })
      );
  }

  // Update
  public atualizarPessoa(id: number, pessoa: Pessoa): Observable<any> {
    return this.httpClient.put<any>(`${this.pessoaUrl}/${id}`, pessoa);
  }

  // Delete
  public removerPessoa(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.pessoaUrl}/${id}`);
  }
}
