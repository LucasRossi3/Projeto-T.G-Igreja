import { Congregacao } from "./congregacao.model";
import { Pessoa } from "./pessoa.model";

export interface Membro {
  idMembro: number,
  pessoa: Pessoa,
  congregacao: Congregacao
}