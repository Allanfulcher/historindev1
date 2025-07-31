import { Metadata } from 'next';
import RuasEHistorias from '../../components/RuasEHistorias';

export const metadata: Metadata = {
  title: 'Ruas e Histórias de Gramado - Explore o Historin',
  description: 'Descubra as histórias fascinantes por trás das ruas de Gramado. Explore o Historin e conheça mais sobre o legado histórico da cidade.',
};

// Sample data - in a real app, this would come from a database or API
const sampleRuas = [
  { id: '1', nome: 'Rua Coberta', fotos: 'https://placehold.co/300x200' },
  { id: '2', nome: 'Rua das Hortênsias', fotos: 'https://placehold.co/300x200' },
  { id: '3', nome: 'Avenida Borges de Medeiros', fotos: 'https://placehold.co/300x200' },
];

const sampleHistorias = [
  {
    id: '1',
    rua_id: '1',
    titulo: 'A construção da Rua Coberta',
    descricao: 'História sobre a construção e importância da famosa Rua Coberta de Gramado.',
    fotos: ['https://placehold.co/100x100']
  },
  {
    id: '2',
    rua_id: '2',
    titulo: 'As hortênsias de Gramado',
    descricao: 'Como as hortênsias se tornaram símbolo da cidade e da Rua das Hortênsias.',
    fotos: ['https://placehold.co/100x100']
  },
  {
    id: '3',
    rua_id: '3',
    titulo: 'Borges de Medeiros e sua influência',
    descricao: 'A história por trás do nome da principal avenida de Gramado.',
    fotos: ['https://placehold.co/100x100']
  },
];

export default function RuasEHistoriasPage() {
  return <RuasEHistorias ruas={sampleRuas} historias={sampleHistorias} />;
}
