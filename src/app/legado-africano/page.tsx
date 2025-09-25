import type { Metadata } from 'next';
import LegadoAfricanoClient from './LegadoAfricanoClient';

export const metadata: Metadata = {
  title: 'Legado Africano em Gramado e Canela',
  description:
    'Conheça o legado africano na história de Gramado e Canela: referências, artigos e histórias que valorizam a memória afro-brasileira na região.',
  alternates: { canonical: '/legado-africano' },
};

export default function LegadoAfricanoPage() {
  return <LegadoAfricanoClient />;
}