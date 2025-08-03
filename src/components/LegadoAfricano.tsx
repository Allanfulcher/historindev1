import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Historia } from '../types';

// LegadoAfricano Component - African Legacy Page
// Converted from JavaScript to TypeScript with modern React patterns

const LegadoAfricano: React.FC = () => {
  useEffect(() => {
    document.title = "Legado Afro-brasileiro e Indígena - Historin";

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (metaDescription) {
      metaDescription.setAttribute(
        'content', 
        'Descubra a história do legado afro-brasileiro e indígena em Gramado e como esses povos contribuíram para a cultura e formação da cidade.'
      );
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      metaDescription.content = 'Descubra a história do legado afro-brasileiro e indígena em Gramado e como esses povos contribuíram para a cultura e formação da cidade.';
      document.head.appendChild(metaDescription);
    }
  }, []);

  // IDs of manually selected stories
  const selectedStoryIds: number[] = [49, 50, 51]; // Replace with actual IDs

  // Filter stories based on selected IDs
  const historiasLegadoAfricano: Historia[] = window.historias 
    ? window.historias.filter(historia => selectedStoryIds.includes(Number(historia.id))) 
    : [];

  return (
    <div className="p-4 w-full lg:w-4/5">
      <header className="flex justify-between items-center mb-4">
        <div className="text-2xl cursor-pointer">
          <Link to="/">
            <i className="fas fa-arrow-left" />
          </Link>
        </div>
        <h1 className="text-lg font-bold">Legado Afro-brasileiro e Indígena</h1>
        <div className="w-10 h-10" />
      </header>

      {/* Introduction Section */}
      <section className="mb-6">
        <h2 className="text-center text-xl font-bold mb-4">
          A Importância da Inclusão Histórica
        </h2>
        <p className="text-justify">
          Gramado, como muitas cidades do sul do Brasil, é amplamente reconhecida por sua herança europeia, 
          principalmente alemã, italiana e portuguesa. Essas histórias são constantemente celebradas e lembradas, 
          porém, a história dos negros afro-brasileiros na região muitas vezes permanece invisibilizada. 
          Essa página é dedicada a dar voz àqueles que foram fundamentais na construção da cidade, 
          mas cujas histórias foram apagadas ou esquecidas ao longo do tempo. O projeto Historin busca 
          corrigir essa lacuna, destacando a importância de refletirmos sobre a diversidade de etnias 
          que ajudaram a moldar nossa cidade, indo além das narrativas tradicionais.
        </p>

        {/* Image Section */}
        <div className="my-4 text-center">
          <img
            src="https://www.correiodopovo.com.br/image/contentid/policy:1.381579:1674812867/consciencia.jpg?a=2%3A1&w=680&$p$a$w=7f2aaba"
            alt="Imagem ilustrativa sobre o legado afro-brasileiro"
            className="rounded-lg shadow-lg object-cover w-full"
          />
          <p className="text-sm text-gray-600 mt-2">
            Imagem demonstra o trabalho de Afro-brasileiros na infraestrutura do RS
          </p>
        </div>
      </section>

      {/* Indigenous Peoples Section */}
      <section className="mb-6">
        <h3 className="text-lg font-bold mb-2">
          🌿 Povos Indígenas no Rio Grande do Sul e Gramado
        </h3>
        <div className="border border-gray-300 rounded-lg p-4 bg-white">
          <p className="text-justify mb-2">
            <strong>Kaingang:</strong> Os Kaingang são um dos principais grupos indígenas do Rio Grande do Sul. 
            Tradicionalmente, habitavam as regiões de mata com araucária, incluindo áreas próximas ao que hoje 
            é Gramado. Eles eram conhecidos por sua organização social dualista e por práticas de caça, 
            coleta e agricultura.
          </p>
          <p className="text-justify mb-2">
            <strong>Guarani:</strong> Os Guarani também estiveram presentes na região, especialmente nas áreas 
            de mata atlântica. Eles tinham uma cultura rica em tradições orais, rituais religiosos e 
            conhecimentos sobre plantas medicinais.
          </p>
          <p className="text-justify">
            <strong>Impacto da Colonização:</strong> Com a chegada dos colonizadores europeus no século XIX, 
            os povos indígenas da região enfrentaram deslocamentos forçados, perda de território e 
            transformações culturais profundas. Muitas de suas contribuições para a formação da região 
            foram invisibilizadas na narrativa histórica oficial.
          </p>
        </div>
      </section>

      {/* Afro-Brazilian Section */}
      <section className="mb-6">
        <h3 className="text-lg font-bold mb-2">
          🏛️ Afro-brasileiros em Gramado
        </h3>
        <div className="border border-gray-300 rounded-lg p-4 bg-white">
          <p className="text-justify mb-2">
            <strong>Trabalho nas Fazendas:</strong> Muitos afro-brasileiros trabalharam nas fazendas da região, 
            especialmente na Linha Caboclo, contribuindo significativamente para o desenvolvimento agrícola local.
          </p>
          <p className="text-justify mb-2">
            <strong>Construção e Infraestrutura:</strong> Participaram ativamente na construção de casas, 
            estradas e outras infraestruturas que moldaram a cidade de Gramado.
          </p>
          <p className="text-justify">
            Gramado reconhece a necessidade de divulgar as histórias e as contribuições culturais e históricas 
            dos afro-brasileiros na formação da cidade, desde o trabalho nas fazendas da Linha Caboclo até 
            as construções e serviços domésticos que moldaram parte significativa da infraestrutura local.
          </p>
        </div>
      </section>

      {/* Article Explanation */}
      <div className="text-justify mb-4">
        <p>
          O artigo "A Invisibilidade dos Negros na História de Gramado" de Alex Juarez Müller e 
          Raimundo Nonato Wanderley de Souza Cavalcante, publicado na revista "Em Tempo de Histórias", 
          faz um levantamento preliminar sobre a participação dos afro-brasileiros na história de Gramado. 
          Ele destaca a invisibilização histórica dessa população e a ausência de estudos acadêmicos que 
          abordem o tema, buscando recuperar essas memórias essenciais para uma compreensão mais ampla 
          da história local.
        </p>
      </div>

      {/* Complete Article Button */}
      <div className="text-center mb-6">
        <a
          href="https://periodicos.unb.br/index.php/emtempos/article/view/31760/26500"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
        >
          Leia o Artigo Completo
        </a>
      </div>

      {/* Selected Stories Section */}
      <section className="mb-6">
        <h3 className="text-lg font-bold mb-4">📚 Histórias Selecionadas</h3>
        <div className="space-y-4">
          {historiasLegadoAfricano.map(historia => (
            <div
              key={historia.id}
              className="bg-white p-4 rounded-lg shadow mb-2 block hover:shadow-lg transition-shadow duration-300 w-full"
            >
              <div className="flex flex-col md:flex-row">
                <img
                  src={historia.fotos[0] || 'https://placehold.co/150x150'}
                  alt={historia.titulo}
                  className="rounded-lg mb-4 md:mb-0 md:mr-4 w-full md:w-1/3 object-cover"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg mb-2">{historia.titulo}</h3>
                  <p className="text-sm text-gray-600 mb-2">{historia.descricao}</p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <span className="mr-4">Ano: {historia.ano}</span>
                    <Link
                      to={`/rua/${historia.rua_id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Ver na rua
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LegadoAfricano;
