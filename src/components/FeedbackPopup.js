// FeedbackPopup Component - User feedback form with star rating
// Extracted from monolithic HTML and converted to React.createElement syntax

const FeedbackPopup = ({ isOpen, onClose }) => {
    const [formData, setFormData] = React.useState({
        nome: '',
        email: '',
        comentario: '',
        estrelas: 0
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleStarClick = (starValue) => {
        setFormData({ ...formData, estrelas: starValue });
    };

    return React.createElement('div', {
        className: 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-high',
        onClick: onClose
    },
        React.createElement('div', {
            className: 'bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative',
            onClick: (e) => e.stopPropagation()
        },
            // Close button
            React.createElement('button', {
                className: 'absolute top-2 right-2 text-gray-600 hover:text-gray-800',
                onClick: onClose,
                'aria-label': 'Fechar formulário de feedback'
            },
                React.createElement('i', { className: 'fas fa-times text-xl' })
            ),
            
            // Title
            React.createElement('h3', { 
                className: 'text-xl font-bold mb-4 text-center' 
            }, 'Envie seu Feedback'),
            
            // Description
            React.createElement('p', { 
                className: 'text-gray-600 text-center mb-4' 
            }, 'Estamos em fase inicial da nossa plataforma e sua opinião é muito importante para nós! Por favor, avalie-nos ajude a melhorar.'),
            
            // Form
            React.createElement('form', {
                action: 'https://formspree.io/f/manywvne',
                method: 'POST'
            },
                // Star rating section
                React.createElement('div', { className: 'mb-4 text-center' },
                    React.createElement('label', { 
                        className: 'block text-gray-700 text-sm font-bold mb-2' 
                    }, 'Avaliação:'),
                    React.createElement('div', { className: 'flex justify-center mb-2' },
                        [1, 2, 3, 4, 5].map((star) =>
                            React.createElement('button', {
                                key: star,
                                type: 'button',
                                onClick: () => handleStarClick(star),
                                className: `text-3xl ${formData.estrelas >= star ? 'text-yellow-400' : 'text-gray-300'}`
                            }, '★')
                        )
                    ),
                    React.createElement('p', { 
                        className: 'text-gray-500 text-sm' 
                    }, `Sua avaliação: ${formData.estrelas} estrela(s)`),
                    React.createElement('input', {
                        type: 'hidden',
                        name: 'estrelas',
                        value: formData.estrelas
                    })
                ),
                
                // Name field
                React.createElement('div', { className: 'mb-4' },
                    React.createElement('label', {
                        className: 'block text-gray-700 text-sm font-bold mb-2',
                        htmlFor: 'nome'
                    }, 'Nome (opcional):'),
                    React.createElement('input', {
                        className: 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
                        id: 'nome',
                        type: 'text',
                        name: 'nome',
                        placeholder: 'Seu nome',
                        value: formData.nome,
                        onChange: handleChange
                    })
                ),
                
                // Email field
                React.createElement('div', { className: 'mb-4' },
                    React.createElement('label', {
                        className: 'block text-gray-700 text-sm font-bold mb-2',
                        htmlFor: 'email'
                    }, 'E-mail (opcional):'),
                    React.createElement('input', {
                        className: 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
                        id: 'email',
                        type: 'email',
                        name: 'email',
                        placeholder: 'Seu e-mail',
                        value: formData.email,
                        onChange: handleChange
                    })
                ),
                
                // Comment field
                React.createElement('div', { className: 'mb-4' },
                    React.createElement('label', {
                        className: 'block text-gray-700 text-sm font-bold mb-2',
                        htmlFor: 'comentario'
                    }, 'Comentário:'),
                    React.createElement('textarea', {
                        className: 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
                        id: 'comentario',
                        name: 'comentario',
                        rows: '4',
                        placeholder: 'Escreva seu feedback sobre a plataforma',
                        value: formData.comentario,
                        onChange: handleChange,
                        required: true
                    })
                ),
                
                // Submit button
                React.createElement('div', { className: 'flex items-center justify-center' },
                    React.createElement('button', {
                        type: 'submit',
                        className: 'bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    }, 'Enviar Feedback')
                )
            )
        )
    );
};

// Export to global window object for legacy compatibility
if (typeof window !== 'undefined') {
    window.FeedbackPopup = FeedbackPopup;
}

// Also support ES6 module export for modern usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FeedbackPopup;
}
