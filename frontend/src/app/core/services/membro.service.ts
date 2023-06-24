import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, retry } from 'rxjs';
import { Membro } from 'src/app/shared/models/membro.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembroService {

  public membroUrl: string = environment.baseUrl + '/membros';

  constructor(private httpClient: HttpClient) { }

  // Create
  public cadastrarMembro(membro: Membro): Observable<Membro> {
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(membro);

    return this.httpClient.post<Membro>(`${this.membroUrl}`, body, { headers });
  }

  // Read
  public getMembros(): Observable<Membro[]> {
    return this.httpClient.get<Membro[]>(`${this.membroUrl}`);
  }

  public getMembroById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.membroUrl}?id=${id}`)
      .pipe(
        retry(3),
        map(res => {
          if (res.length) {
            return res[0];
          }

          throw 'Erro: Membro não registrado';
        })
      );
  }

  public getMembrosByCongregacao(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.membroUrl}?congregacao.id=${id}`)
      .pipe(
        retry(3)
      );
  }

  // Update
  public atualizarMembro(id: number, membro: Membro): Observable<any> {
    return this.httpClient.put<any>(`${this.membroUrl}/${id}`, membro);
  }

  // Delete
  public removerMembro(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.membroUrl}/${id}`);
  }
}
