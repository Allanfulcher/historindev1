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
    },
    { 
      id: '2', 
      rua_id: '2', 
      titulo: 'Memórias das Hortênsias', 
      descricao: 'As flores que deram nome à rua e as histórias dos primeiros moradores da região.',
      fotos: ['https://placehold.co/400x300'],
      coordenadas: [-29.3700, -50.8380],
      ano: '1930',
    },
    { 
      id: '3', 
      rua_id: '3', 
      titulo: 'Borges de Medeiros e Gramado', 
      descricao: 'A conexão histórica entre o político gaúcho e o desenvolvimento da cidade.',
      fotos: ['https://placehold.co/400x300'],
      coordenadas: [-29.3720, -50.8400],
      ano: '1920',
    }
  ],

  ruas: [
    { id: '1', nome: 'Rua Coberta', fotos: 'https://placehold.co/300x200', cidade_id: '1', descricao: 'A famosa rua coberta, símbolo de Gramado' },
    { id: '2', nome: 'Rua das Hortênsias', fotos: 'https://placehold.co/300x200', cidade_id: '1', descricao: 'Rua florida com jardins encantadores' },
    { id: '3', nome: 'Avenida Borges de Medeiros', fotos: 'https://placehold.co/300x200', cidade_id: '1', descricao: 'Principal avenida da cidade' }
  ],

  cidades: [
    { 
      id: '1', 
      nome: 'Gramado', 
      estado: 'Rio Grande do Sul', 
      populacao: '35.000',
      descricao: 'Conhecida como a Suíça Brasileira, Gramado é famosa por sua arquitetura europeia, festivais de cinema e chocolate artesanal.',
      foto: 'https://placehold.co/600x400'
    },
    { 
      id: '2', 
      nome: 'Canela', 
      estado: 'Rio Grande do Sul', 
      populacao: '45.000',
      descricao: 'Cidade vizinha de Gramado, conhecida pela Catedral de Pedra e pelo Parque do Caracol com sua famosa cascata.',
      foto: 'https://placehold.co/600x400'
    },
    { 
      id: '3', 
      nome: 'Nova Petrópolis', 
      estado: 'Rio Grande do Sul', 
      populacao: '22.000',
      descricao: 'Cidade com forte influência alemã, conhecida por suas flores, arquitetura típica e tradições germânicas.',
      foto: 'https://placehold.co/600x400'
    }
  ],

  orgs: [
    {
      id: '1',
      fantasia: 'Arquivo Histórico José Pompeo de Mattos',
      logo: 'https://placehold.co/200x100?text=Arquivo',
      link: 'https://arquivohistorico.gramado.rs.gov.br',
      sobre: 'Principal arquivo histórico da região, guardando documentos importantes da história de Gramado.'
    },
    {
      id: '2',
      fantasia: 'Museu do Perfume',
      logo: 'https://placehold.co/200x100?text=Museu',
      link: 'https://museudoperfume.com.br',
      sobre: 'Preservação da história olfativa local e mundial.'
    },
    {
      id: '3',
      fantasia: 'Instituto Histórico de Gramado',
      logo: 'https://placehold.co/200x100?text=IHG',
      link: 'https://institutohistorico.gramado.rs.gov.br',
      sobre: 'Dedicado à preservação e divulgação da história de Gramado e região.'
    }
  ],

  autores: [
    {
      id: '1',
      nome: 'Maria Silva',
      bio: 'Historiadora especializada em Gramado, autora de diversas obras sobre a região.',
      foto: 'https://placehold.co/300x300?text=Maria',
      obras: [1, 3],
      link: '#'
    },
    {
      id: '2',
      nome: 'João Santos',
      bio: 'Pesquisador da cultura gaúcha e escritor premiado.',
      foto: 'https://placehold.co/300x300?text=Joao',
      obras: [2],
      link: '#'
    },
    {
      id: '3',
      nome: 'Ana Beatriz Rocha',
      bio: 'Pesquisadora da cultura e tradições dos imigrantes na região de Gramado.',
      foto: 'https://placehold.co/300x300?text=Ana',
      obras: [1],
      link: '#'
    }
  ],

  obras: [
    {
      id: '1',
      titulo: 'História de Gramado',
      capa: 'https://placehold.co/400x600?text=História+de+Gramado',
      descricao: 'Uma obra abrangente sobre a história da cidade, desde sua fundação até os dias atuais.',
      link: '#',
      pago: false,
      autorId: 1
    },
    {
      id: '2',
      titulo: 'Tradições Gaúchas',
      capa: 'https://placehold.co/400x600?text=Tradições+Gaúchas',
      descricao: 'Um estudo aprofundado sobre as tradições e cultura do povo gaúcho.',
      link: '#',
      pago: true,
      autorId: 2
    },
    {
      id: '3',
      titulo: 'Arquitetura de Gramado',
      capa: 'https://placehold.co/400x600?text=Arquitetura',
      descricao: 'Estudo sobre a evolução arquitetônica da cidade ao longo dos anos.',
      link: '#',
      pago: false,
      autorId: 1
    }
  ],

  sites: [
    {
      id: '1',
      nome: 'Portal da Prefeitura',
      logo: 'https://placehold.co/200x80?text=Prefeitura',
      link: 'https://gramado.rs.gov.br'
    },
    {
      id: '2',
      nome: 'Gramado Turismo',
      logo: 'https://placehold.co/200x80?text=Turismo',
      link: 'https://gramadoturismo.com.br'
    },
    {
      id: '3',
      nome: 'Memória Viva Gramado',
      logo: 'https://placehold.co/200x80?text=Memória',
      link: 'https://memoriaviva.gramado.rs.gov.br'
    }
  ],

  negocios: [
    { id: '1', nome: 'Café Colonial Bela Vista', endereco: 'Rua das Hortênsias, 123', telefone: '(54) 3286-1234', categoria: 'Gastronomia' },
    { id: '2', nome: 'Pousada do Vale', endereco: 'Avenida Borges de Medeiros, 456', telefone: '(54) 3286-5678', categoria: 'Hospedagem' }
  ]
};
