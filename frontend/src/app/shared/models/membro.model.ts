import { Congregacao } from "./congregacao.model";
import { Pessoa } from "./pessoa.model";

export interface Membro {
  id: number,
  pessoa: Pessoa,
  congregacao: Congregacao
}
