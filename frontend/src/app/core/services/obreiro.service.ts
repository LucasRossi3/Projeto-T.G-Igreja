import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, retry } from 'rxjs';
import { Obreiro } from 'src/app/shared/models/obreiro.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObreiroService {

  public obreiroUrl: string = environment.baseUrl + '/obreiros';

  constructor(private httpClient: HttpClient) { }

  // Create
  public cadastrarObreiro(obreiro: Obreiro): Observable<Obreiro> {
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(obreiro);

    return this.httpClient.post<Obreiro>(`${this.obreiroUrl}`, body, { headers });
  }

  // Read
  public getObreiros(): Observable<Obreiro[]> {
    return this.httpClient.get<Obreiro[]>(`${this.obreiroUrl}`);
  }

  public getObreiroById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.obreiroUrl}?id=${id}`)
      .pipe(
        retry(3),
        map(res => {
          if (res.length) {
            return res[0];
          }

          throw 'Erro: Obreiro não registrado';
        })
      );
  }

  public getObreirosByFuncao(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.obreiroUrl}?funcao.id=${id}`)
      .pipe(
        retry(3)
      );
  }

  // Update
  public atualizarObreiro(id: number, obreiro: Obreiro): Observable<any> {
    return this.httpClient.put<any>(`${this.obreiroUrl}/${id}`, obreiro);
  }

  // Delete
  public removerObreiro(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.obreiroUrl}/${id}`);
  }
}
