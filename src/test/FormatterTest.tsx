import React from 'react';
import { formatText } from '@/utils/textFormatter';

/**
 * Quick test component to verify text formatting
 */
const FormatterTest: React.FC = () => {
  const testText = `

**Texto negrito** _Texto italico_ DESTAQUE.

Na época que o Lago Joaquina Rita Bier foi feito, Gramado ainda não estava emancipada como cidade, sendo ainda 5º distrito de Taquara, porém, desde as primeiras ocupações de tropeiros era conhecida como bom ponto de parada e descanso. Já apresentava potencial ao turismo.
A sociedade "Herdeiros Joaquina Rita Bier" não conseguia administrar tamanha quantidade de terras da Vila Planalto (aproximadamente 196 hectares de área) e manter seus negócios em colônias e cidades já ocupadas por imigrantes a mais tempo, como São Leopoldo e Porto Alegre. 
Em 1937, chega Leopoldo Rosenfeld da Alemanha, a convite da sociedade dos Herdeiros para administrar o projeto da Vila Planalto . Leopoldo trabalha para a sociedade, administra a construção do Parque Hotel, com o objetivo, claro, de receber os veranistas que já procuravam a região, mas também para prover alguma infraestrutura a Vila e conseguir vender os terrenos.

Em 1939 compra o Parque Hotel, com lago e tudo, mas segue trabalhando para os "Herdeiros Joaquina Rita Bier".
Em 1947, compra o restante do imenso loteamento dos herdeiros e aluga o Parque Hotel Para Guilherme Nienaber Sobrinho.  

Leopoldo falece em 1961.

Estes nomes sempre são lembrados, porém, não podemos esquecer que ninguém faz nada sozinho, a maior parte das pessoas que também construíram esta paisagem podem não ter seus nomes registrados ou conhecidos, mas devem ser lembrados.`;

  // Debug function to show how text is being split
  const debugSplit = (text: string) => {
    console.log('Original text:', JSON.stringify(text));
    
    // Clean text (same as formatter)
    const cleaned = text
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/[""]/g, '"')
      .replace(/['']/g, "'")
      .replace(/[ \t]+/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    
    console.log('Cleaned text:', JSON.stringify(cleaned));
    
    // Split by double line breaks
    const paragraphs = cleaned.split(/\n\s*\n/);
    console.log('Paragraphs:', paragraphs.map((p, i) => `${i}: "${p}"`));
    
    return paragraphs;
  };

  React.useEffect(() => {
    debugSplit(testText);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">Formatter Test</h1>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Raw Text (in textarea):</h2>
        <textarea 
          value={testText} 
          readOnly 
          className="w-full h-32 p-2 border border-gray-300 rounded text-xs font-mono"
        />
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Formatted Output:</h2>
        <div className="border border-gray-300 rounded p-4 bg-gray-50">
          {formatText(testText)}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Expected Paragraphs:</h2>
        <ol className="list-decimal list-inside text-sm space-y-1">
          <li><strong>Texto negrito</strong> <em>Texto italico</em> <strong>DESTAQUE</strong>.</li>
          <li>Na época que o Lago Joaquina Rita Bier foi feito... (long paragraph)</li>
          <li>Em 1939 compra o Parque Hotel... Em 1947, compra o restante...</li>
          <li>Leopoldo falece em 1961.</li>
          <li>Estes nomes sempre são lembrados...</li>
        </ol>
      </div>
    </div>
  );
};

export default FormatterTest;
