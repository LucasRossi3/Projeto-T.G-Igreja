import { Congregacao } from "./congregacao.model"
import { Pessoa } from "./pessoa.model"

export interface Oferta {
  id: number,
  pessoa: Pessoa,
  congregacao: Congregacao,
  dataEntrada: Date,
  tipoEntrada: string,
  valor: number
}
