import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-amber-50">
            <h1 className="text-4xl font-bold text-amber-900 mb-4 text-center">
                404 - Página Não Encontrada
            </h1>
            <p className="text-lg text-amber-800 mb-8 text-center">
                Desculpe, a página que você está procurando não existe ou foi movida.
            </p>
            <Link 
                href="/" 
                className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-md transition-colors duration-200 text-lg"
            >
                Voltar para a Página Inicial
            </Link>
        </div>
    );
}