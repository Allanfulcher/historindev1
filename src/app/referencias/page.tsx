import { Metadata } from "next";

import Referencias from "../../components/referencias/Referencias";

export const metadata: Metadata = {
    title: 'Referências - Historin',
    description: 'Explore uma ampla variedade de referências históricas, incluindo organizações, autores e obras selecionadas no Historin.',
};

export default function ReferenciasPage() {
    return <Referencias />;
}