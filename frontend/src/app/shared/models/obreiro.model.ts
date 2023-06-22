import { Funcao } from "./funcao.model";
import { Pessoa } from "./pessoa.model";

export interface Obreiro {
  id: number,
  pessoa: Pessoa,
  funcao: Funcao
}
