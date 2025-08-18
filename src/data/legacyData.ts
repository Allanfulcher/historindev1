/**
 * Legacy Data Import Example
 * This file shows how to import and use your legacy JavaScript database
 */

import { legacyDb } from '../utils/legacyDb';

// Your legacy data (copy your existing JS objects here)
const historias = [{
  'id': 1,
  'rua_id': 3,
  'criador': 'Mateus Canova',
  fotos: [{
      url: 'https://i.imgur.com/CNOZBeg.png',
      credito: 'Cesar Augusto'
    },
    {
      url: 'https://i.imgur.com/s7ufpth.png',
      credito: 'Cesar Augusto'
    },
    {
      url: 'https://i.imgur.com/KbhDD97.png',
      credito: 'Cesar Augusto'
    }
  ],
  'titulo': 'Inauguração Lago Joaquina Rita Bier',
  'descricao': 'Inauguração do Lago Joaquina Rita Bier com grande participação da comunidade, marcando a abertura do Parque Hotel.',
  'ano': 1938,
  'coordenadas': [-29.386628049677785, -50.87512615633946]
}];

// Example ruas data (add your actual data here)
const ruas = [{
  'id': 1,
  'nome': 'Av Borges de Medeiros',
  'descricao': 'A Avenida Borges de Medeiros é uma das principais e mais históricas vias de Gramado. Inicialmente, foi uma trilha usada pelos tropeiros que, ao longo do tempo, evoluiu para um caminho e depois para uma estrada. A rua recebeu o nome de Borges de Medeiros, uma homenagem a Antônio Augusto Borges de Medeiros, que foi um influente político gaúcho e governou o estado do Rio Grande do Sul por quase 25 anos, entre o final do século XIX e o início do século XX. Sua administração foi marcada pelo fortalecimento da economia e da política estadual.\n\nApós a emancipação de Gramado, em 1955, a via foi transformada em avenida, consolidando-se como a primeira e mais importante rua da cidade. Ao longo dos anos, a Avenida Borges de Medeiros passou por diversas revitalizações, incluindo a pavimentação e a instalação de cabos subterrâneos, preservando o charme de suas construções de estilo alemão e tornando-a um cartão-postal da cidade.\n\nAlém de sua importância histórica, a avenida é o coração do comércio e do turismo em Gramado. Ela abriga vários pontos turísticos, como o Palácio dos Festivais, e é palco de eventos importantes como o Natal Luz e o Festival de Cinema de Gramado',
  'fotos': ['https://www.correiodopovo.com.br/image/contentid/policy:1.977592:1679269879/borges_CPM01.jpg.jpg?a=3%3A2&$p$a=25b65e6', 'https://www.palaciopiratini.rs.gov.br/upload/recortes/202105/14002739_7115_GDO.jpg'],
  'relevancia': 5,
  'coordenadas': [-29.379848451898166, -50.8729358497256],
  'cidade_id': 1
}, {
  'id': 3,
  'nome': 'Rua do Parque Hotel',
  'descricao': 'Rua histórica onde se localiza o famoso Parque Hotel de Gramado.',
  'fotos': 'https://i.imgur.com/example.png',
  'cidade_id': 1,
  'coordenadas': [-29.386628049677785, -50.87512615633946]
}];

// Example cidades data (add your actual data here)
const cidades = [{
  'id': 1,
  'nome': 'Gramado',
  'descricao': 'Cidade turística da Serra Gaúcha conhecida por sua arquitetura europeia.',
  'fotos': 'https://i.imgur.com/gramado.png',
  'coordenadas': [-29.3788, -50.8755] as [number, number]
}];

// Negocios data
const negocios = [{
  id: 1,
  titulo: 'Museu do trem',
  segmento: 'Museu',
  foto: 'https://static.wixstatic.com/media/4f54af_970a18bb978348bf9060d6486e4580b7~mv2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/4f54af_970a18bb978348bf9060d6486e4580b7~mv2.jpg',
  link: 'https://maps.app.goo.gl/dPoE7c1UxxQtVYaQA'
}];

// Questions data
const questions = [{
  question: "Em que ano foi inaugurado o Lago Joaquina Rita Bier em Gramado?",
  answers: ["1938", "1960", "1970", "1990"],
  correct: 0,
}];

// Organizacoes data (using your Orgs structure)
const organizacoes = [{
  id: 1,
  fantasia: "Câmara de vereadores de Gramado",
  link: "https://www.gramado.rs.leg.br/",
  logo: "https://www.gramado.rs.leg.br/logo.png",
  cor: "#eeefef",
  sobre: "A Câmara de Vereadores de Gramado é uma organização que sempre está presente na disseminação de notícias e conteúdo sobre a cidade.",
  foto: "fotos/historin-equipe.jpg"
}];

// Autores data
const autores = [{
  id: 1,
  nome: "Iraci Casagrande",
  bio: "Gramadense, historiadora",
  obras: [1, 2],
  foto: "https://sociedaderecreiogramadense.com.br/storage/posts/July2019/perfil%20IRACI.jpg"
}];

// Obras data
const obras = [{
  id: 1,
  titulo: "Uma história de Canela",
  descricao: "Um livro do Grande Hotel Canela, em homenagem aos 70 anos de emancipação do municipio.",
  capa: "https://d1o6h00a1h5k7q.cloudfront.net/imagens/img_m/19857/9377442.jpg",
  pago: false,
  autorId: 1,
  link: "https://www.grandehotel.com.br/wp-content/uploads/2021/10/PDF-Livro-Uma-Historia-de-Canela-1.pdf"
}];

// Sites data
const sites = [
  {
      id: 1,
      nome: "Gramado Portal da cidade",
      link: "https://gramado.portaldacidade.com/",
      logo: "https://image.portaldacidade.com/unsafe/300x0/https://bucket.portaldacidade.com/umuarama.portaldacidade.com/img/portals/logo/portal-da-cidade-gramado-657ae91a370ae.png",
  },
  {
      id: 2,
      nome: "Ilton Muller",
      link: "https://www.iltonmuller.com.br/",
      logo: "https://www.iltonmuller.com.br/assets/images/logotipo-iltonmuller.png?v2",
  },
  {
      id: 3,
      nome: "Miron Neto",
      link: "https://www.mironneto.com/",
      logo: "https://irp.cdn-website.com/d469b486/dms3rep/multi/Logo-pb.svg",
  },
  {
      id: 5,
      nome: "Portal Gramado News",
      link: "https://www.portalgramadonews.com.br/",
      logo: "https://portalgramadonews.com.br/wp-content/uploads/2022/11/Logo-GNews-2019-5.png",
  },
  {
      id: 4,
      nome: "IBGE",
      link: "https://cidades.ibge.gov.br/brasil/rs/gramado/panorama",
      logo: "https://blog.1doc.com.br/wp-content/uploads/2024/11/ibge.jpg",
  },
];

// Load the legacy data into the database
legacyDb.loadData({
  historias,
  ruas,
  cidades,
  organizacoes,
  negocios,
  autores,
  obras,
  sites,
  questions
});

// Export the loaded data for use in components
export const appData = legacyDb.getAllData();

// Export individual data arrays for convenience
export { 
  historias as legacyHistorias, 
  ruas as legacyRuas, 
  cidades as legacyCidades, 
  organizacoes as legacyOrganizacoes,
  negocios as legacyNegocios,
  autores as legacyAutores,
  obras as legacyObras,
  sites as legacySites,
  questions as legacyQuestions
};

// Export the database instance for advanced queries
export { legacyDb };
