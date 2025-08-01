// NotFound Component - 404 Error Page
// Extracted from monolithic HTML and converted to React.createElement syntax

const NotFound = () => {
    return React.createElement('div', { className: 'p-4' },
        React.createElement('h1', { 
            className: 'text-3xl font-bold text-center' 
        }, '404 - Página Não Encontrada'),
        React.createElement('p', { 
            className: 'text-center' 
        }, 'Desculpe, a página que você está procurando não existe.'),
        React.createElement('div', { 
            className: 'flex justify-center mt-4' 
        },
            React.createElement(window.ReactRouterDOM.Link, {
                to: '/',
                className: 'bg-blue-500 text-white px-4 py-2 rounded-md'
            }, 'Voltar para Home')
        )
    );
};

// Export to global window object for legacy compatibility
if (typeof window !== 'undefined') {
    window.NotFound = NotFound;
}

// Also support ES6 module export for modern usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NotFound;
}
