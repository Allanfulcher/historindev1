// CityCarousel Component
const CityCarousel = ({ cidades, handleCityClick, selectedCityId }) => {
    const carouselRef = React.useRef(null);

    React.useEffect(() => {
        if (carouselRef.current && selectedCityId) {
            const selectedElement = carouselRef.current.querySelector(`[data-id='${selectedCityId}']`);
            if (selectedElement) {
                const carouselWidth = carouselRef.current.offsetWidth;
                const selectedElementOffset = selectedElement.offsetLeft;
                const selectedElementWidth = selectedElement.offsetWidth;

                const scrollPosition = selectedElementOffset - (carouselWidth / 2) + (selectedElementWidth / 2);
                window.requestAnimationFrame(() => {
                    carouselRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
                });
            }
        }
    }, [selectedCityId]);

    return React.createElement('div', { className: "w-full flex items-center" },
        // Botão de Voltar ao Mapa
        React.createElement(ReactRouterDOM.Link, {
            to: "/",
            className: "flex items-center px-4 py-2 mr-4 bg-gray-300 hover:bg-gray-400 rounded-full cursor-pointer transition-colors",
            'aria-label': "Voltar ao Mapa"
        },
            React.createElement('i', { className: "fas fa-arrow-left mr-2" }),
            React.createElement('span', null, 'Voltar ao Mapa')
        ),

        // Carrossel de Cidades
        React.createElement('div', { 
            ref: carouselRef, 
            className: "overflow-x-auto whitespace-nowrap flex-grow" 
        },
            React.createElement('div', { className: "flex space-x-2 inline-flex" },
                cidades.map(cidade =>
                    React.createElement('span', {
                        key: cidade.id,
                        'data-id': cidade.id,
                        className: `px-4 py-2 rounded-full cursor-pointer whitespace-nowrap ${cidade.id === selectedCityId ? 'bg-[#8A5A44] text-white' : 'bg-gray-200'}`,
                        onClick: () => handleCityClick(cidade)
                    }, cidade.nome)
                )
            )
        )
    );
};

// Export to window object for global access
window.CityCarousel = CityCarousel;
