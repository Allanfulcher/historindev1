// RuaCarousel Component
const RuaCarousel = ({ ruas, handleRuaClick, selectedRuaId }) => {
    const carouselRef = React.useRef(null);

    React.useEffect(() => {
        if (carouselRef.current && selectedRuaId) {
            const selectedElement = carouselRef.current.querySelector(`[data-id='${selectedRuaId}']`);
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
    }, [selectedRuaId]);

    return React.createElement('div', { className: "w-full" },
        React.createElement('div', { 
            ref: carouselRef, 
            className: "overflow-x-auto whitespace-nowrap py-2" 
        },
            React.createElement('div', { className: "flex space-x-2 inline-flex" },
                ruas.map(rua =>
                    React.createElement('span', {
                        key: rua.id,
                        'data-id': rua.id,
                        className: `px-4 py-2 rounded-full cursor-pointer whitespace-nowrap ${rua.id === selectedRuaId ? 'bg-[#8A5A44] text-white' : 'bg-gray-200'}`,
                        onClick: () => handleRuaClick(rua)
                    }, rua.nome)
                )
            )
        )
    );
};

// Export to window object for global access
window.RuaCarousel = RuaCarousel;
