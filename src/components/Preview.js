// Preview Component
const Preview = ({ previewContent, onClose }) => {
    let linkTo = '/';
    if (previewContent.type === 'rua') {
        linkTo = `/rua/${previewContent.ruaId}`;
    } else if (previewContent.type === 'historia') {
        linkTo = `/rua/${previewContent.ruaId}/historia/${previewContent.historiaId}`;
    }

    // Função para obter a URL da imagem
    const getFirstImageUrl = (images) => {
        if (!images || images.length === 0) {
            return 'https://placehold.co/400x200'; // Imagem padrão
        }
        const firstImage = images[0];
        return typeof firstImage === 'string' ? firstImage : firstImage.url; // Verifica se é string ou objeto
    };

    return React.createElement('div', { className: "preview-card" },
        React.createElement(ReactRouterDOM.Link, { 
            to: linkTo, 
            className: "block", 
            onClick: onClose 
        },
            React.createElement('img', {
                src: getFirstImageUrl(previewContent.images),
                alt: previewContent.title,
                className: "w-full h-40 object-cover rounded-lg"
            }),
            React.createElement('div', { className: "preview-content mt-2" },
                React.createElement('h3', { className: "font-semibold" }, previewContent.title),
                React.createElement('p', { className: "text-sm" }, previewContent.description.slice(0, 100) + '...')
            )
        ),
        React.createElement('button', {
            onClick: onClose,
            className: "absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700 focus:outline-none"
        }, 'Fechar')
    );
};

// Export to window object for global access
window.Preview = Preview;
