import React from 'react';
import { formatText, formatTextPreview, formatTextFull, useExpandableText } from '@/utils/textFormatter';

/**
 * Text Formatting Examples and Test Cases
 * 
 * This component demonstrates the various text formatting capabilities
 * and provides test cases for different types of content.
 */

const TextFormattingExamples: React.FC = () => {
  // Example texts from the legacy data
  const shortText = "Inauguração do Lago Joaquina Rita Bier com grande participação da comunidade, marcando a abertura do Parque Hotel.";
  
  const mediumText = "Os colonos, vindos das áreas rurais, chegavam na sede do então Quinto Distrito de Taquara, com suas carretas puxadas por bois, cavalos ou mulas cheias de produtos. Traziam itens agropecuários ou de extrativismo vegetal, para embarcá-los no trem, que estacionava na Estação Gramado, área central do distrito.";
  
  const longText = `A primeira foto foi tirada na subida da rua hoje conhecida como Rua Torta. A sombra ao chão é da antiga casa do major Nicoletti, hoje museu. O ângulo é o mesmo da foto anterior, de 1925.

Ao fundo está a Rua Emílio Sorgetz, que leva o nome do proprietário de uma das casas à esquerda. O prédio branco de dois andares em alvenaria ainda existe. Em 1957, era um comércio de ferragens também pertencente à família Sorgetz.

Na frente dessas duas construções há uma placa fixada ao chão, mesmo local da atual Praça das Etnias. A segunda foto, com uma araucária à esquerda, é da casa de um membro de outra tradicional família gramadense, os Lorenzoni.`;

  const textWithFormatting = `**VILA AFRICANA** foi um projeto importante na história de Gramado. 

A *Vila Planalto* foi um projeto de urbanização voltado para grupos abastados no início do século XX. Em suas imediações, existiu a **VILA AFRICANA**, que reunia trabalhadores que prestavam serviços para as famílias da área central.

Nas fotografias visualizamos duas mulheres, *negras*, que prestavam serviços diversos nas casas das famílias Lied e Castilhos.`;

  // Example using the hook
  const ExampleWithHook: React.FC<{ text: string; title: string }> = ({ text, title }) => {
    const { formattedText, isExpanded, needsExpansion, toggleExpanded } = useExpandableText(text, 100);
    
    return (
      <div className="border border-gray-200 rounded-lg p-4 mb-4">
        <h4 className="font-semibold mb-2 text-[#4A3F35]">{title}</h4>
        <div className="text-sm text-[#4A3F35]">
          {formattedText}
          {needsExpansion && (
            <button
              onClick={toggleExpanded}
              className="text-[#CD853F] font-medium hover:text-[#B8763A] transition-colors ml-2"
            >
              {isExpanded ? 'mostrar menos' : 'mostrar mais'}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-[#4A3F35] mb-8">Text Formatting Examples</h1>
      
      {/* Basic Examples */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#4A3F35] mb-4">Basic Text Formatting</h2>
        
        <div className="grid gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-[#4A3F35]">Short Text (No Formatting Needed)</h3>
            <div className="text-sm">
              {formatText(shortText)}
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-[#4A3F35]">Medium Text (Automatic Paragraph Breaks)</h3>
            <div className="text-sm">
              {formatText(mediumText)}
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-[#4A3F35]">Long Text (Multiple Paragraphs)</h3>
            <div className="text-sm">
              {formatText(longText)}
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-[#4A3F35]">Text with Markdown Formatting</h3>
            <div className="text-sm">
              {formatText(textWithFormatting)}
            </div>
          </div>
        </div>
      </section>

      {/* Preview vs Full Examples */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#4A3F35] mb-4">Preview vs Full Text</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-[#4A3F35]">Preview (Truncated)</h3>
            <div className="text-sm">
              {formatTextPreview(longText, 100)}
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-[#4A3F35]">Full Text</h3>
            <div className="text-sm">
              {formatTextFull(longText)}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Examples with Hook */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#4A3F35] mb-4">Interactive Expandable Text (Using Hook)</h2>
        
        <ExampleWithHook 
          text={mediumText} 
          title="Medium Text Example" 
        />
        
        <ExampleWithHook 
          text={longText} 
          title="Long Text Example" 
        />
        
        <ExampleWithHook 
          text={textWithFormatting} 
          title="Formatted Text Example" 
        />
      </section>

      {/* Custom Options Examples */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#4A3F35] mb-4">Custom Formatting Options</h2>
        
        <div className="grid gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-[#4A3F35]">Without Line Breaks</h3>
            <div className="text-sm">
              {formatText(longText, { preserveLineBreaks: false })}
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-[#4A3F35]">Without Markdown</h3>
            <div className="text-sm">
              {formatText(textWithFormatting, { enableMarkdown: false })}
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-[#4A3F35]">Custom Styling</h3>
            <div className="text-sm">
              {formatText(textWithFormatting, { 
                paragraphClassName: 'mb-4 p-2 bg-gray-50 rounded',
                emphasisClassName: 'font-bold text-blue-600'
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Real Data Examples */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#4A3F35] mb-4">Real Historical Data Examples</h2>
        
        <div className="space-y-4">
          {/* Example from the legacy data */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-[#4A3F35]">História ID 6 - Carreteiros</h3>
            <div className="text-sm">
              {formatText(`Os colonos, vindos das áreas rurais, chegavam na sede do então Quinto Distrito de Taquara, com suas carretas puxadas por bois, cavalos ou mulas cheias de produtos. Traziam itens agropecuários ou de extrativismo vegetal, para embarcá-los no trem, que estacionava na Estação Gramado, área central do distrito. 

Nessa época, havia em Gramado e arredores, pelo menos desde o início do século XX, muitas serrarias produtoras de madeira proveniente da derrubada das extensas matas nativas de pinheiro araucária existentes na região. 

Na foto, tábuas de madeira trazidas das serrarias estão sendo descarregadas à beira dos trilhos, aguardando encaminhamento até algum vagão do trem de carga. Num período em que não existia asfalto e caminhões, os carreteiros levavam cargas por longas distâncias no relevo montanhoso e sob o clima instável da Serra Gaúcha, enfrentando estradas estreitas e ruins, repletas de subidas, descidas, pedras e atoleiros.`)}
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-[#4A3F35]">História ID 21 - Rua Coberta</h3>
            <div className="text-sm">
              {formatText(`Na década de 1990, Gramado já possuía uma economia turística consolidada. Muitos dos eventos eram a céu aberto e a instabilidade do clima serrano com chuvas, nevoeiros e quedas de temperatura repentinas, tornava necessária a existência de um espaço externo e coberto para a sua realização.

Foi, então, projetada a cobertura de parte da Rua Madre Verônica, no trecho defronte ao Palácio dos Festivais, até pouco antes dos prédios do Banco do Brasil e do Banrisul. **Assim surgiu a Rua Coberta.**

A construção, que começou nos últimos meses de 1996, aparece nas três primeiras fotos. O ato de inauguração, que ocorreu a 31 de dezembro do mesmo ano, no final do mandato de Pedro Henrique Bertolucci, foi ao som da Banda Novos Talentos, regida pelo maestro Ivo Egídio Michaelsen.

Apesar de não ser a primeira rua do gênero no Brasil, é, certamente, a mais conhecida e seu sucesso fez dela modelo para outras ruas semelhantes em várias cidades de nosso país.`)}
            </div>
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#4A3F35] mb-4">Usage Guidelines</h2>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold mb-3">When to Use Each Function:</h3>
          <ul className="space-y-2 text-sm">
            <li><strong>formatText():</strong> General purpose formatting with full control over options</li>
            <li><strong>formatTextPreview():</strong> For card previews, lists, or truncated content</li>
            <li><strong>formatTextFull():</strong> For full article views or detailed content</li>
            <li><strong>useExpandableText():</strong> For interactive components that need expand/collapse functionality</li>
          </ul>
          
          <h3 className="font-semibold mb-3 mt-6">Formatting Features:</h3>
          <ul className="space-y-2 text-sm">
            <li><strong>Automatic paragraphs:</strong> Detects and creates paragraph breaks</li>
            <li><strong>Markdown support:</strong> **bold**, *italic*, _emphasis_</li>
            <li><strong>ALL CAPS detection:</strong> Automatically styles important terms</li>
            <li><strong>Clean text:</strong> Removes excessive whitespace and fixes encoding</li>
            <li><strong>Responsive design:</strong> Works well on mobile and desktop</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default TextFormattingExamples;
