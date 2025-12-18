import Link from 'next/link';
import Header from '@/components/Header';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#f4ede0]">
            <div className="flex flex-col items-center justify-center min-h-[80vh] p-6">
                <div className="bg-[#FEFCF8] rounded-xl shadow-sm p-8 max-w-md w-full text-center ring-1 ring-[#A0958A]/20">
                    <div className="w-24 h-24 rounded-full bg-[#F5F1EB] flex items-center justify-center mx-auto mb-6">
                        <i className="fas fa-map-signs text-4xl text-[#A0958A]"></i>
                    </div>
                    
                    <h1 className="text-3xl font-bold text-[#4A3F35] mb-3">
                        Página Não Encontrada
                    </h1>
                    
                    <p className="text-[#6B5B4F] mb-6 leading-relaxed">
                        Parece que você se perdeu nas ruas de Gramado! A página que você procura não existe ou foi movida.
                    </p>
                    
                    <div className="space-y-3">
                        <Link 
                            href="/" 
                            className="inline-flex items-center justify-center gap-2 w-full bg-[#8B4513] hover:bg-[#A0522D] text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            <i className="fas fa-home"></i>
                            Voltar ao Início
                        </Link>
                        
                        <Link 
                            href="/ruasehistorias" 
                            className="inline-flex items-center justify-center gap-2 w-full bg-transparent text-[#8B4513] font-medium py-2.5 px-5 rounded-lg border-2 border-[#8B4513] hover:bg-[#8B4513] hover:text-white transition-all duration-200"
                        >
                            <i className="fas fa-search"></i>
                            Explorar Ruas e Histórias
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}