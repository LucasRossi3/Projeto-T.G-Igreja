import { Pessoa } from "./pessoa.model";

export interface Usuario {
  idUsuario: number,
  pessoa: Pessoa,
  usuario: string;
  senha: string;
}
