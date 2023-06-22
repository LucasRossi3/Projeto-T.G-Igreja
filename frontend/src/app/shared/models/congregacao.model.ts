import { Obreiro } from "./obreiro.model";
import { Sede } from "./sede.model";

export interface Congregacao {
  id: number,
  sede: Sede,
  obreiro: Obreiro,
  nome: string,
  endereco: string,
  numEndereco: number,
  complemento: string,
  bairro: string,
  cidade: string,
  uf: string,
  cep: string,
  dataFundacao: Date
}
