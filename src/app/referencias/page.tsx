import { Metadata } from "next";
import { Suspense } from "react";

import Referencias from "../../components/referencias/Referencias";

export const metadata: Metadata = {
    title: 'Referências - Historin',
    description: 'Explore uma ampla variedade de referências históricas, incluindo organizações, autores e obras selecionadas no Historin.',
};

export default function ReferenciasPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#f4ede0] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CD853F] mx-auto mb-4"></div>
                    <p className="text-[#6B5B4F] text-lg">Carregando referências...</p>
                </div>
            </div>
        }>
            <Referencias />
        </Suspense>
    );
}