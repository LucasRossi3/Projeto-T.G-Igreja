import { Obreiro } from "./obreiro.model";
import { Sede } from "./sede.model";

export interface Congregacao {
  idCongregacao: number,
  sede: Sede,
  obreiro: Obreiro,
  nome: string,
  endereco: string,
  num_endereco: number,
  complemento: string,
  bairro: string,
  cidade: string,
  uf: string,
  cep: string,
  data_fundacao: Date
}