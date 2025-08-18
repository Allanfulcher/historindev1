/**
 * Custom hook for using legacy database data
 * Provides easy access to normalized legacy data in React components
 */

import { useState, useEffect } from 'react';
import { legacyDb, appData } from '../data/legacyData';
import { Historia, Rua, Cidade, Organizacao, AppData } from '../types';

export function useLegacyData() {
  const [data, setData] = useState<AppData>(appData);
  const [loading, setLoading] = useState(false);

  // Get all data
  const getAllData = (): AppData => data;

  // Historia methods
  const getHistorias = (): Historia[] => data.historias;
  
  const getHistoriaById = (id: string): Historia | undefined => 
    legacyDb.getHistoriaById(id);
  
  const getHistoriasByRuaId = (ruaId: string): Historia[] => 
    legacyDb.getHistoriasByRuaId(ruaId);
  
  const searchHistorias = (query: string): Historia[] => 
    legacyDb.searchHistorias(query);

  // Rua methods
  const getRuas = (): Rua[] => data.ruas;
  
  const getRuaById = (id: string): Rua | undefined => 
    legacyDb.getRuaById(id);
  
  const getRuasByCidadeId = (cidadeId: string): Rua[] => 
    legacyDb.getRuasByCidadeId(cidadeId);
  
  const searchRuas = (query: string): Rua[] => 
    legacyDb.searchRuas(query);

  // Cidade methods
  const getCidades = (): Cidade[] => data.cidades;
  
  const getCidadeById = (id: string): Cidade | undefined => 
    legacyDb.getCidadeById(id);

  // Organizacao methods
  const getOrganizacoes = (): Organizacao[] => data.orgs;
  
  const getOrganizacaoById = (id: string): Organizacao | undefined => 
    legacyDb.getOrganizacaoById(id);

  // Utility methods
  const refreshData = () => {
    setData(legacyDb.getAllData());
  };

  return {
    // Data
    data,
    loading,
    
    // Methods
    getAllData,
    refreshData,
    
    // Historia methods
    getHistorias,
    getHistoriaById,
    getHistoriasByRuaId,
    searchHistorias,
    
    // Rua methods
    getRuas,
    getRuaById,
    getRuasByCidadeId,
    searchRuas,
    
    // Cidade methods
    getCidades,
    getCidadeById,
    
    // Organizacao methods
    getOrganizacoes,
    getOrganizacaoById
  };
}

// Specific hooks for individual data types
export function useHistorias() {
  const { getHistorias, getHistoriaById, getHistoriasByRuaId, searchHistorias } = useLegacyData();
  
  return {
    historias: getHistorias(),
    getById: getHistoriaById,
    getByRuaId: getHistoriasByRuaId,
    search: searchHistorias
  };
}

export function useRuas() {
  const { getRuas, getRuaById, getRuasByCidadeId, searchRuas } = useLegacyData();
  
  return {
    ruas: getRuas(),
    getById: getRuaById,
    getByCidadeId: getRuasByCidadeId,
    search: searchRuas
  };
}

export function useCidades() {
  const { getCidades, getCidadeById } = useLegacyData();
  
  return {
    cidades: getCidades(),
    getById: getCidadeById
  };
}

export function useOrganizacoes() {
  const { getOrganizacoes, getOrganizacaoById } = useLegacyData();
  
  return {
    organizacoes: getOrganizacoes(),
    getById: getOrganizacaoById
  };
}
