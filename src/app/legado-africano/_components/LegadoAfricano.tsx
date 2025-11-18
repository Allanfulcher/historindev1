'use client';

import React from 'react';
import { useLegacyData } from '@/hooks/useLegacyData';
import HistoryCard from '@/components/cards/HistoryCard';
import PrimaryBtn from '@/components/buttons/PrimaryBtn';

interface LegadoAfricanoProps {
  setShowDonation: (show: boolean) => void;
}

const LegadoAfricano: React.FC<LegadoAfricanoProps> = ({ setShowDonation }) => {
  const { data } = useLegacyData();
  const { historias } = data;

  // Filter stories related to African legacy (you can adjust this filter based on your data)
  const relatedStories = historias.filter(historia => 
    historia.titulo.toLowerCase().includes('africa') ||
    historia.descricao.toLowerCase().includes('africa') ||
    historia.titulo.toLowerCase().includes('escravo') ||
    historia.descricao.toLowerCase().includes('escravo')
  ).slice(0, 6);

  const handleReadFullArticle = () => {
    // You can implement navigation to full article or open in modal
    window.open('https://periodicos.unb.br/index.php/emtempos/article/view/31760/26500', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Main Article Container - Paper Style */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-[#FEFCF8] rounded-lg shadow-lg p-8 mb-12 border border-[#F5F1EB]">
          
          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#4A3F35] mb-4 leading-tight">
              Legado Afro-brasileiro e Indígena
            </h1>
          </header>

          {/* First Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#4A3F35] mb-4">
              A Importância da Inclusão Histórica
            </h2>
            <p className="text-[#6B5B4F] leading-relaxed mb-6 text-lg">
              Gramado, como muitas cidades do sul do Brasil, é amplamente reconhecida por sua herança europeia, principalmente alemã, italiana e portuguesa. Essas histórias são constantemente celebradas e lembradas, porém, a história dos negros afro-brasileiros na região muitas vezes permanece invisibilizada. Essa página é dedicada a dar voz àqueles que foram fundamentais na construção da cidade, mas cujas histórias foram apagadas ou esquecidas ao longo do tempo. O projeto Historin busca corrigir essa lacuna, destacando a importância de refletirmos sobre a diversidade de etnias que ajudaram a moldar nossa cidade, indo além das narrativas tradicionais.
            </p>
          </section>

          {/* Article Image */}
          <figure className="mb-8">
            <img
              src="https://www.correiodopovo.com.br/image/contentid/policy:1.381579:1674812867/consciencia.jpg?a=2%3A1&w=680&$p$a$w=7f2aaba"
              alt="Manifestação cultural afro-brasileira"
              className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://www.correiodopovo.com.br/image/contentid/policy:1.381579:1674812867/consciencia.jpg?a=2%3A1&w=680&$p$a$w=7f2aaba';
              }}
            />
            <figcaption className="text-sm text-[#A0958A] mt-2 text-center italic">
              Imagem demonstra o trabalho de Afro-brasileiros na infraestrutura do RS
            </figcaption>
          </figure>

          {/* Second Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#4A3F35] mb-4">
              🌿 Povos Indígenas no Rio Grande do Sul e Gramado
            </h2>
            <p className="text-[#6B5B4F] leading-relaxed mb-6 text-lg">
              Os povos indígenas, como os Kaingang e Guarani, foram os primeiros habitantes da região onde hoje se encontra o Rio Grande do Sul. Eles ocupavam a serra gaúcha muito antes da chegada dos colonizadores europeus.
            </p>
            <p className="text-[#6B5B4F] leading-relaxed mb-6 text-lg">
            Em Gramado, sua presença é sentida através de toponímias como Caí, Taquara, Quilombo, pampa entre outros práticas agrícolas e na profunda conexão com a natureza local. Vivendo em áreas ao redor de rios e florestas, esses povos praticavam caça, coleta e agricultura de subsistência, com destaque para o cultivo de milho e mandioca.
            </p>
            <p className="text-[#6B5B4F] leading-relaxed mb-6 text-lg">
            Com a chegada dos colonizadores, conflitos surgiram, resultando na expulsão ou exterminação de muitos indígenas. Embora suas histórias tenham sido silenciadas ao longo do tempo, elas continuam presentes na cultura local e merecem ser lembradas.
            </p>
          </section>

          {/* Third Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#4A3F35] mb-4">
            🖤 Afro-brasileiros e sua Contribuição em Gramado
            </h2>
            <p className="text-[#6B5B4F] leading-relaxed mb-6 text-lg">
            A história dos afro-brasileiros em Gramado, embora menos conhecida, é de extrema importância. Durante os períodos colonial e imperial, negros escravizados foram trazidos para a região para trabalhar em plantações, construção de estradas, e outros serviços essenciais. A contribuição desses homens e mulheres foi fundamental para o desenvolvimento das infraestruturas iniciais da cidade.
            </p>
            <p className="text-[#6B5B4F] leading-relaxed mb-6 text-lg">
            O trabalho dos negros escravizados foi decisivo na construção de estradas, edificações e no desenvolvimento agrícola da região. Apesar disso, suas histórias foram sendo sistematicamente apagadas ou esquecidas. O Historin visa recuperar e dar visibilidade a essas contribuições, incluindo a presença e o legado afro-brasileiro na memória histórica de Gramado.
            </p>
            <p className="text-[#6B5B4F] leading-relaxed mb-6 text-lg">
            Gramado reconhece a necessidade de divulgar as histórias e as contribuições culturais e históricas dos afro-brasileiros na formação da cidade, desde o trabalho nas fazendas da Linha Caboclo até as construções e serviços domésticos que moldaram parte significativa da infraestrutura local.
            </p>
          </section>

          {/* Article Summary and Author Info */}
          <div className="bg-[#F5F1EB] rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-[#4A3F35] mb-3">Artigo "A Invisibilidade dos Negros na História de Gramado"</h3>
            <p className="text-[#6B5B4F] mb-4">
              Publicado na revista <strong>"Em Tempo de Histórias"</strong>, faz um levantamento preliminar sobre a participação dos afro-brasileiros na história de Gramado. Ele destaca a invisibilização histórica dessa população e a ausência de estudos acadêmicos que abordem o tema, buscando recuperar essas memórias essenciais para uma compreensão mais ampla da história local.
            </p>
            
            <div className="border-t border-[#E6D3B4] pt-4">
              <h4 className="font-semibold text-[#4A3F35] mb-2">Autores</h4>
              <p className="text-sm text-[#6B5B4F]">
                <strong>Alex Juarez Müller e Raimundo Nonato Wanderley de Souza Cavalcante</strong>
              </p>
            </div>
          </div>

          {/* Read Full Article Button */}
          <div className="text-center">
            <PrimaryBtn onClick={handleReadFullArticle}>
              <i className="fas fa-book-open mr-2" />
              Ler Artigo Completo
            </PrimaryBtn>
          </div>
        </article>

        {/* Related Stories Section */}
        {relatedStories.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#4A3F35] mb-6">
              Histórias Relacionadas ao Tema
            </h2>
            <p className="text-[#6B5B4F] mb-6">
              Explore outras histórias que abordam a influência africana na cultura local:
            </p>
            <HistoryCard 
              historias={relatedStories} 
              className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            />
          </section>
        )}

        {/* Support Section */}
        {/*<section className="bg-[#FEFCF8] rounded-lg p-6 border border-[#F5F1EB] text-center">
          <h3 className="text-xl font-semibold text-[#4A3F35] mb-3">
            Apoie a Preservação da História
          </h3>
          <p className="text-[#6B5B4F] mb-4">
            Ajude-nos a continuar documentando e preservando as histórias culturais da nossa região.
          </p>
          <PrimaryBtn onClick={() => setShowDonation(true)}>
            <i className="fas fa-heart mr-2" />
            Fazer Doação
          </PrimaryBtn>
        </section>*/}
      </div>
    </div>
  );
};

export default LegadoAfricano;