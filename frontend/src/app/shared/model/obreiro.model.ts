import { Funcao } from "./funcao.model";
import { Pessoa } from "./pessoa.model";

export interface Obreiro {
  idObreiro: number,
  pessoa: Pessoa,
  funcao: Funcao
}