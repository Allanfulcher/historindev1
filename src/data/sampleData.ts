// Sample data for development and testing
import { AppData } from '../types';

export const sampleData: AppData = {
  historias: [
    { 
      id: '1', 
      rua_id: '1', 
      titulo: 'A História da Rua Coberta', 
      descricao: 'Descubra como surgiu a famosa rua coberta de Gramado e sua importância para o turismo local.',
      fotos: ['https://placehold.co/400x300'],
      coordenadas: [-29.3681, -50.8361],
      ano: '1950',
      personagens: ['Arquiteto João Silva', 'Prefeito Pedro Santos']
    },
    { 
      id: '2', 
      rua_id: '2', 
      titulo: 'Memórias das Hortênsias', 
      descricao: 'As flores que deram nome à rua e as histórias dos primeiros moradores da região.',
      fotos: ['https://placehold.co/400x300'],
      coordenadas: [-29.3700, -50.8380],
      ano: '1930',
      personagens: ['Dona Maria Flores', 'Jardineiro José']
    },
    { 
      id: '3', 
      rua_id: '3', 
      titulo: 'Borges de Medeiros e Gramado', 
      descricao: 'A conexão histórica entre o político gaúcho e o desenvolvimento da cidade.',
      fotos: ['https://placehold.co/400x300'],
      coordenadas: [-29.3720, -50.8400],
      ano: '1920',
      personagens: ['Borges de Medeiros', 'Coronel Diniz']
    }
  ],

  ruas: [
    { id: '1', nome: 'Rua Coberta', fotos: 'https://placehold.co/300x200', cidade_id: '1', descricao: 'A famosa rua coberta, símbolo de Gramado' },
    { id: '2', nome: 'Rua das Hortênsias', fotos: 'https://placehold.co/300x200', cidade_id: '1', descricao: 'Rua florida com jardins encantadores' },
    { id: '3', nome: 'Avenida Borges de Medeiros', fotos: 'https://placehold.co/300x200', cidade_id: '1', descricao: 'Principal avenida da cidade' }
  ],

  cidades: [
    { id: '1', nome: 'Gramado', estado: 'Rio Grande do Sul', populacao: '35.000' },
    { id: '2', nome: 'Canela', estado: 'Rio Grande do Sul', populacao: '45.000' },
    { id: '3', nome: 'Nova Petrópolis', estado: 'Rio Grande do Sul', populacao: '22.000' }
  ],

  orgs: [
    { id: '1', nome: 'Arquivo Histórico José Pompeo de Mattos', descricao: 'Principal arquivo histórico da região', endereco: 'Centro, Gramado' },
    { id: '2', nome: 'Museu do Perfume', descricao: 'Preservação da história olfativa local', endereco: 'Rua Coberta, Gramado' }
  ],

  autores: [
    { id: '1', nome: 'Maria Silva', biografia: 'Historiadora especializada em Gramado', obras: ['História de Gramado'] },
    { id: '2', nome: 'João Santos', biografia: 'Pesquisador da cultura gaúcha', obras: ['Tradições Gaúchas'] }
  ],

  obras: [
    { id: '1', titulo: 'História de Gramado', autor: 'Maria Silva', ano: '2020', editora: 'Editora Serra', paginas: 320 },
    { id: '2', titulo: 'Tradições Gaúchas', autor: 'João Santos', ano: '2019', editora: 'Gaúcha Livros', paginas: 280 }
  ],

  sites: [
    { id: '1', nome: 'Portal da Prefeitura', url: 'https://gramado.rs.gov.br', descricao: 'Site oficial da Prefeitura de Gramado' },
    { id: '2', nome: 'Gramado Turismo', url: 'https://gramadoturismo.com.br', descricao: 'Portal oficial de turismo' }
  ],

  negocios: [
    { id: '1', nome: 'Café Colonial Bela Vista', endereco: 'Rua das Hortênsias, 123', telefone: '(54) 3286-1234', categoria: 'Gastronomia' },
    { id: '2', nome: 'Pousada do Vale', endereco: 'Avenida Borges de Medeiros, 456', telefone: '(54) 3286-5678', categoria: 'Hospedagem' }
  ]
};
