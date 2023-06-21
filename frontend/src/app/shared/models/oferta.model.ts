import { Congregacao } from "./congregacao.model"
import { Pessoa } from "./pessoa.model"

export interface Oferta {
  idOferta: number,
  pessoa: Pessoa,
  congregacao: Congregacao,
  dataEntrada: Date,
  tipoEntrada: string,
  valor: number
}