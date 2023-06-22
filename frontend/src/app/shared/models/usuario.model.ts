import { Pessoa } from "./pessoa.model";

export interface Usuario {
  id: number,
  pessoa: Pessoa,
  usuario: string;
  senha: string;
}
