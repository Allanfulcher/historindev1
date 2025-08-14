import { Metadata } from 'next';
import Sobre from '../../components/sobre/Sobre';

export const metadata: Metadata = {
  title: 'Sobre Nós - Historin',
  description: 'Saiba mais sobre o Historin, nossa visão, equipe e como você pode contribuir.',
};

export default function SobrePage() {
  return <Sobre />;
}
