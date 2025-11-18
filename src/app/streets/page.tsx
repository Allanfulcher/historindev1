import { Metadata } from 'next';
import RuasEHistorias from '../ruasehistorias/_components/RuasEHistorias';

export const metadata: Metadata = {
  title: 'Ruas de Gramado - Explore o Historin',
  description: 'Descubra as ruas fascinantes de Gramado. Explore o Historin e conheça mais sobre o legado histórico da cidade.',
};

export default function StreetsPage() {
  return <RuasEHistorias />;
}
