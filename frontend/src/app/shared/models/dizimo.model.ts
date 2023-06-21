import { Congregacao } from "./congregacao.model"
import { Pessoa } from "./pessoa.model"

export interface Dizimo {
  idDizimo: number,
  pessoa: Pessoa,
  congregacao: Congregacao,
  dataEntrada: Date,
  tipoEntrada: string,
  valor: number
}