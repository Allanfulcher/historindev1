import React from 'react';
import { Link } from 'react-router-dom';

// NotFound Component - 404 Error Page
// Converted from React.createElement syntax to modern TypeScript with JSX

const NotFound: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold text-center">
                404 - Página Não Encontrada
            </h1>
            <p className="text-center">
                Desculpe, a página que você está procurando não existe.
            </p>
            <div className="flex justify-center mt-4">
                <Link 
                    to="/" 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    Voltar para Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
