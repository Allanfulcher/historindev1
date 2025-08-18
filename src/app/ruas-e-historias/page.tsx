import { Metadata } from 'next';
import RuasEHistorias from '../../components/RuasEHistorias';

export const metadata: Metadata = {
  title: 'Ruas e Histórias de Gramado - Explore o Historin',
  description: 'Descubra as histórias fascinantes por trás das ruas de Gramado. Explore o Historin e conheça mais sobre o legado histórico da cidade.',
};

export default function RuasEHistoriasPage() {
  return <RuasEHistorias />;
}
