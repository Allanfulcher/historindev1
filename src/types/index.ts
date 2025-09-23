// Core data types for the Historin application
export interface Rua {
  id: string;
  nome: string;
  fotos: string;
  cidade_id?: string;
  descricao?: string;
  coordenadas?: [number, number];
}

export interface FotoWithCredit {
  url: string;
  credito: string;
}

export interface Historia {
  id: string;
  rua_id: string;
  titulo: string;
  descricao: string;
  fotos: string[] | FotoWithCredit[];
  coordenadas?: [number, number];
  ano?: string;
  criador?: string;
  tags?: string[];
  orgId?: string;
}

export interface Cidade {
  id: string;
  nome: string;
  estado: string;
  populacao: string;
  descricao?: string;
  foto?: string;
}

export interface Organizacao {
  id: string;
  fantasia: string;
  link: string;
  logo: string;
  cor?: string;
  sobre?: string;
  foto?: string;
}

export interface Autor {
  id: string;
  nome: string;
  bio: string;
  obras: number[];
  foto: string;
  link?: string;
}

export interface Obra {
  id: string;
  titulo: string;
  descricao: string;
  capa: string;
  pago: boolean;
  autorId: number;
  link: string;
}

export interface Site {
  id: string;
  nome: string;
  link: string;
  logo: string;
}

export interface Negocio {
  id: string;
  nome: string;
  endereco: string;
  telefone?: string;
  categoria: string;
}

export interface PreviewContent {
  type: 'rua' | 'historia';
  title: string;
  description: string;
  images?: string[];
  ruaId?: string;
  historiaId?: string;
}

// Application data structure
export interface AppData {
  historias: Historia[];
  ruas: Rua[];
  cidades: Cidade[];
  orgs: Organizacao[];
  autores: Autor[];
  obras: Obra[];
  sites: Site[];
  negocios: Negocio[];
}
