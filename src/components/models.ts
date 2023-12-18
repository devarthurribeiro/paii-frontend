export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Residencia {
  id?: number;
  endereco: string;
  cargaInstalada: number;
  padraoEntrada: string;
  tipoDisjuntor: string;
  voltagemPadrao: number;
  tipoEletroduto: string;
  possuiDR: boolean;
  possuiDPS: boolean;
}
