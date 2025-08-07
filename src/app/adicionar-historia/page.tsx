import { Metadata } from 'next';
import AdicionarHistoria from '../../components/adicionar-historia/AdicionarHistoria';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

export const metadata: Metadata = {
  title: 'Compartilhe seu acervo - Historin',
  description: 'Compartilhe suas histórias e fotos conosco. Ajude a preservar a memória de Gramado.',
};

export default function AdicionarHistoriaPage() {
  return (
    <>
      <AdicionarHistoria />
    </>
  );
}
