/**
 * Legacy Database Utility
 * Provides a bridge between legacy JS database files and the current TypeScript system
 */

import { Historia, Rua, Cidade, Organizacao, Autor, Obra, Site, Negocio } from '../types';

// Legacy data structure interfaces (from your JS files)
interface LegacyNegocio {
  id: number;
  titulo: string;
  segmento: string;
  foto: string;
  link: string;
}

interface LegacyQuestion {
  question: string;
  answers: string[];
  correct: number;
}

interface LegacyOrg {
  id: number;
  fantasia: string;
  link: string;
  logo: string;
  cor: string;
  sobre: string;
  foto: string;
}

interface LegacyAutor {
  id: number;
  nome: string;
  bio: string;
  obras: number[];
  foto: string;
}

interface LegacyObra {
  id: number;
  titulo: string;
  descricao: string;
  capa: string;
  pago: boolean;
  autorId: number;
  link: string;
}

interface LegacySite {
  id: number;
  nome: string;
  link: string;
  logo: string;
}

// Type definitions for legacy data structures
interface LegacyHistoria {
  id: number;
  rua_id: number;
  criador?: string;
  fotos: string[] | Array<{ url: string; credito?: string | null }>;
  titulo: string;
  descricao: string;
  ano: number;
  coordenadas: number[] | [number, number] | null;
  orgId?: number | null;
}

interface LegacyRua {
  id: number;
  nome: string;
  descricao: string;
  fotos: string | string[];
  cidade_id: number;
  coordenadas: number[] | [number, number];
  relevancia?: number;
}

interface LegacyCidade {
  id: number;
  nome: string;
  descricao: string;
  fotos: string;
  coordenadas: number[] | [number, number];
}

interface LegacyOrganizacao {
  id: number;
  nome: string;
  descricao: string;
  logo: string;
  website?: string;
}

/**
 * Normalizes legacy historia data to current system format
 */
export function normalizeHistoria(legacyHistoria: LegacyHistoria): Historia {
  // Handle different photo formats
  let normalizedFotos: string[];
  
  if (Array.isArray(legacyHistoria.fotos)) {
    if (legacyHistoria.fotos.length > 0 && typeof legacyHistoria.fotos[0] === 'object') {
      // Array of objects with url and credito
      normalizedFotos = (legacyHistoria.fotos as Array<{ url: string; credito: string }>)
        .map(foto => foto.url);
    } else {
      // Array of strings
      normalizedFotos = legacyHistoria.fotos as string[];
    }
  } else {
    normalizedFotos = [legacyHistoria.fotos as string];
  }

  // Ensure coordenadas is a proper tuple
  const normalizedCoordenadas: [number, number] | undefined = 
    legacyHistoria.coordenadas && legacyHistoria.coordenadas.length >= 2
      ? [legacyHistoria.coordenadas[0], legacyHistoria.coordenadas[1]]
      : undefined;

  return {
    id: legacyHistoria.id.toString(),
    rua_id: legacyHistoria.rua_id.toString(),
    titulo: legacyHistoria.titulo,
    descricao: legacyHistoria.descricao,
    fotos: normalizedFotos,
    coordenadas: normalizedCoordenadas,
    ano: legacyHistoria.ano.toString(),
    orgId: legacyHistoria.orgId?.toString()
  };
}

/**
 * Normalizes legacy rua data to current system format
 */
export function normalizeRua(legacyRua: LegacyRua): Rua {
  const normalizedFotos = Array.isArray(legacyRua.fotos) ? legacyRua.fotos[0] : legacyRua.fotos;
  
  // Ensure coordenadas is a proper tuple
  const normalizedCoordenadas: [number, number] | undefined = 
    legacyRua.coordenadas && legacyRua.coordenadas.length >= 2
      ? [legacyRua.coordenadas[0], legacyRua.coordenadas[1]]
      : undefined;
  
  return {
    id: legacyRua.id.toString(),
    nome: legacyRua.nome,
    descricao: legacyRua.descricao,
    fotos: normalizedFotos,
    coordenadas: normalizedCoordenadas,
    cidade_id: legacyRua.cidade_id.toString()
  };
}

/**
 * Normalizes legacy cidade data to current system format
 */
export function normalizeCidade(legacyCidade: LegacyCidade): Cidade {
  return {
    id: legacyCidade.id.toString(),
    nome: legacyCidade.nome,
    estado: 'RS', // Default for Gramado
    populacao: '35000', // Approximate
    descricao: legacyCidade.descricao,
    foto: legacyCidade.fotos
  };
}

/**
 * Normalizes legacy organizacao data to current system format
 */
export function normalizeOrganizacao(legacyOrg: LegacyOrg): Organizacao {
  return {
    id: legacyOrg.id.toString(),
    fantasia: legacyOrg.fantasia,
    link: legacyOrg.link,
    logo: legacyOrg.logo,
    cor: legacyOrg.cor,
    sobre: legacyOrg.sobre,
    foto: legacyOrg.foto
  };
}

/**
 * Normalizes legacy negocio data to current system format
 */
export function normalizeNegocio(legacyNegocio: LegacyNegocio): Negocio {
  return {
    id: legacyNegocio.id.toString(),
    nome: legacyNegocio.titulo,
    endereco: 'Gramado, RS', // Default address
    categoria: legacyNegocio.segmento
  };
}

/**
 * Normalizes legacy autor data to current system format
 */
export function normalizeAutor(legacyAutor: LegacyAutor): Autor {
  return {
    id: legacyAutor.id.toString(),
    nome: legacyAutor.nome,
    bio: legacyAutor.bio,
    obras: legacyAutor.obras,
    foto: legacyAutor.foto,
    link: undefined // Legacy data doesn't have links for authors
  };
}

/**
 * Normalizes legacy obra data to current system format
 */
export function normalizeObra(legacyObra: LegacyObra): Obra {
  return {
    id: legacyObra.id.toString(),
    titulo: legacyObra.titulo,
    descricao: legacyObra.descricao,
    capa: legacyObra.capa,
    pago: legacyObra.pago,
    autorId: legacyObra.autorId,
    link: legacyObra.link
  };
}

/**
 * Normalizes legacy site data to current system format
 */
export function normalizeSite(legacySite: LegacySite): Site {
  return {
    id: legacySite.id.toString(),
    nome: legacySite.nome,
    link: legacySite.link,
    logo: legacySite.logo
  };
}

/**
 * Legacy Database class to manage imported data
 */
export class LegacyDatabase {
  private historias: Historia[] = [];
  private ruas: Rua[] = [];
  private cidades: Cidade[] = [];
  private organizacoes: Organizacao[] = [];
  private negocios: Negocio[] = [];
  private autores: Autor[] = [];
  private obras: Obra[] = [];
  private sites: Site[] = [];
  private questions: LegacyQuestion[] = [];

  /**
   * Load data from legacy JavaScript objects
   */
  loadData(data: {
    historias?: LegacyHistoria[];
    ruas?: LegacyRua[];
    cidades?: LegacyCidade[];
    organizacoes?: LegacyOrg[];
    negocios?: LegacyNegocio[];
    autores?: LegacyAutor[];
    obras?: LegacyObra[];
    sites?: LegacySite[];
    questions?: LegacyQuestion[];
  }) {
    if (data.historias) {
      this.historias = data.historias.map(normalizeHistoria);
    }
    
    if (data.ruas) {
      this.ruas = data.ruas.map(normalizeRua);
    }
    
    if (data.cidades) {
      this.cidades = data.cidades.map(normalizeCidade);
    }
    
    if (data.organizacoes) {
      this.organizacoes = data.organizacoes.map(normalizeOrganizacao);
    }
    
    if (data.negocios) {
      this.negocios = data.negocios.map(normalizeNegocio);
    }
    
    if (data.autores) {
      this.autores = data.autores.map(normalizeAutor);
    }
    
    if (data.obras) {
      this.obras = data.obras.map(normalizeObra);
    }
    
    if (data.sites) {
      this.sites = data.sites.map(normalizeSite);
    }
    
    if (data.questions) {
      this.questions = data.questions;
    }
  }

  // Getter methods
  getHistorias(): Historia[] {
    return this.historias;
  }

  getRuas(): Rua[] {
    return this.ruas;
  }

  getCidades(): Cidade[] {
    return this.cidades;
  }

  getOrganizacoes(): Organizacao[] {
    return this.organizacoes;
  }

  getNegocios(): Negocio[] {
    return this.negocios;
  }

  getAutores(): Autor[] {
    return this.autores;
  }

  getObras(): Obra[] {
    return this.obras;
  }

  getSites(): Site[] {
    return this.sites;
  }

  getQuestions(): LegacyQuestion[] {
    return this.questions;
  }

  // Query methods
  getHistoriaById(id: string): Historia | undefined {
    return this.historias.find(h => h.id.toString() === id);
  }

  getHistoriasByRuaId(ruaId: string): Historia[] {
    return this.historias.filter(h => h.rua_id.toString() === ruaId);
  }

  getRuaById(id: string): Rua | undefined {
    return this.ruas.find(r => r.id.toString() === id);
  }

  getRuasByCidadeId(cidadeId: string): Rua[] {
    return this.ruas.filter(r => r.cidade_id && r.cidade_id.toString() === cidadeId);
  }

  getCidadeById(id: string): Cidade | undefined {
    return this.cidades.find(c => c.id.toString() === id);
  }

  getOrganizacaoById(id: string): Organizacao | undefined {
    return this.organizacoes.find(o => o.id === id);
  }

  getNegocioById(id: string): Negocio | undefined {
    return this.negocios.find(n => n.id === id);
  }

  getAutorById(id: string): Autor | undefined {
    return this.autores.find(a => a.id === id);
  }

  getObraById(id: string): Obra | undefined {
    return this.obras.find(o => o.id === id);
  }

  getSiteById(id: string): Site | undefined {
    return this.sites.find(s => s.id === id);
  }

  // Search methods
  searchHistorias(query: string): Historia[] {
    const lowercaseQuery = query.toLowerCase();
    return this.historias.filter(h => 
      h.titulo.toLowerCase().includes(lowercaseQuery) ||
      h.descricao.toLowerCase().includes(lowercaseQuery)
    );
  }

  searchRuas(query: string): Rua[] {
    const lowercaseQuery = query.toLowerCase();
    return this.ruas.filter(r => 
      r.nome.toLowerCase().includes(lowercaseQuery) ||
      (r.descricao && r.descricao.toLowerCase().includes(lowercaseQuery))
    );
  }

  // Get all data in AppData format
  getAllData() {
    return {
      historias: this.historias,
      ruas: this.ruas,
      cidades: this.cidades,
      orgs: this.organizacoes,
      autores: this.autores,
      obras: this.obras,
      sites: this.sites,
      negocios: this.negocios
    };
  }
}

// Export a singleton instance
export const legacyDb = new LegacyDatabase();
