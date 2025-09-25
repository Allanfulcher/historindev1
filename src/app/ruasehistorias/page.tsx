import { Metadata } from 'next';
import RuasEHistorias from '@/components/RuasEHistorias';

export const metadata: Metadata = {
  title: 'Ruas e Histórias de Gramado e Canela',
  description:
    'Explore o mapa interativo com ruas e histórias de Gramado e Canela. Descubra fotos antigas, curiosidades e o patrimônio cultural da região.',
  alternates: { canonical: '/ruasehistorias' },
};

export default function RuasEHistoriasPage() {
  return <RuasEHistorias />;
}