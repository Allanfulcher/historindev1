// HistoriaContent Component - Main story display page with tabs, galleries, and navigation
const HistoriaContent = ({
    currentHistory,
    historiasDaRua,
    currentIndex,
    setCurrentIndex,
    setCurrentHistory,
    showAllStories,
    setShowAllStories,
    selectedRuaId,
    activeTab,
    changeTab,
    rua,
    cidade,
    orgs,
    negocios,
}) => {
    const { useState, useEffect, useRef } = React;
    const history = ReactRouterDOM.useHistory();
    const location = ReactRouterDOM.useLocation();

    // Estados para modais e zoom
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentZoom, setCurrentZoom] = useState(1);
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);
    const [showLocaisRecomendados, setShowLocaisRecomendados] = useState(false);
    const [showCreditModal, setShowCreditModal] = useState(false);
    const [currentPhoto, setCurrentPhoto] = useState(null);

    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const startYRef = useRef(0);
    const initialTranslateXRef = useRef(0);
    const initialTranslateYRef = useRef(0);
    const modalImageRef = useRef(null);

    // Navigation functions
    const handlePrev = () => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            const newHistory = historiasDaRua[newIndex];
            history.replace(`/rua/${selectedRuaId}/historia/${newHistory.id}`);
            setCurrentHistory(newHistory);
            setCurrentIndex(newIndex);
            changeTab('historia');
        }
    };

    const handleNext = () => {
        if (currentIndex < historiasDaRua.length - 1) {
            const newIndex = currentIndex + 1;
            const newHistory = historiasDaRua[newIndex];
            history.replace(`/rua/${selectedRuaId}/historia/${newHistory.id}`);
            setCurrentHistory(newHistory);
            setCurrentIndex(newIndex);
            changeTab('historia');
        }
    };

    const handleRangeChange = (event) => {
        const newIndex = parseInt(event.target.value);
        if (newIndex >= 0 && newIndex < historiasDaRua.length) {
            const newHistory = historiasDaRua[newIndex];
            history.replace(`/rua/${selectedRuaId}/historia/${newHistory.id}`);
            setCurrentHistory(newHistory);
            setCurrentIndex(newIndex);
            changeTab('historia');
        }
    };

    // Modal functions
    const openModal = (foto) => {
        setSelectedImage(foto);
        setIsModalOpen(true);
        setCurrentZoom(1);
        setTranslateX(0);
        setTranslateY(0);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
        setCurrentZoom(1);
        setTranslateX(0);
        setTranslateY(0);
    };

    // Keyboard event handler
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Mouse drag handlers
    const handleMouseDown = (e) => {
        if (currentZoom <= 1) return;
        isDraggingRef.current = true;
        startXRef.current = e.clientX;
        startYRef.current = e.clientY;
        initialTranslateXRef.current = translateX;
        initialTranslateYRef.current = translateY;
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
        if (!isDraggingRef.current) return;
        const deltaX = e.clientX - startXRef.current;
        const deltaY = e.clientY - startYRef.current;
        setTranslateX(initialTranslateXRef.current + deltaX);
        setTranslateY(initialTranslateYRef.current + deltaY);
    };

    const handleMouseUp = () => {
        isDraggingRef.current = false;
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };

    // Touch handlers
    const handleTouchStartPan = (e) => {
        if (currentZoom <= 1 || e.touches.length !== 1) return;
        isDraggingRef.current = true;
        startXRef.current = e.touches[0].clientX;
        startYRef.current = e.touches[0].clientY;
        initialTranslateXRef.current = translateX;
        initialTranslateYRef.current = translateY;
        window.addEventListener('touchmove', handleTouchMovePan);
        window.addEventListener('touchend', handleTouchEndPan);
    };

    const handleTouchMovePan = (e) => {
        if (!isDraggingRef.current || e.touches.length !== 1) return;
        const deltaX = e.touches[0].clientX - startXRef.current;
        const deltaY = e.touches[0].clientY - startYRef.current;
        setTranslateX(initialTranslateXRef.current + deltaX);
        setTranslateY(initialTranslateYRef.current + deltaY);
    };

    const handleTouchEndPan = () => {
        isDraggingRef.current = false;
        window.removeEventListener('touchmove', handleTouchMovePan);
        window.removeEventListener('touchend', handleTouchEndPan);
    };

    // Get organization data
    const org = currentHistory && currentHistory.orgId ? orgs.find((o) => o.id === currentHistory.orgId) : null;

    // Early return if no history
    if (!currentHistory && activeTab === 'historia') {
        return React.createElement('div', { className: "w-full py-4" },
            React.createElement('h2', { className: "text-xl font-bold" }, 'Nenhuma história disponível para esta rua.')
        );
    }

    // Main component render - this is a complex component, continuing in next part...
    return React.createElement('div', { className: "main-content w-full flex flex-col items-center flex-grow overflow-y-auto" },
        // Tab navigation
        React.createElement('div', { className: "w-full lg:py-4 flex justify-between items-center border-b border-gray-300" },
            React.createElement('div', { className: "flex items-center space-x-4" },
                React.createElement('button', {
                    className: `px-4 py-2 font-semibold text-sm ${activeTab === 'historia' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600 hover:text-blue-500'}`,
                    onClick: () => changeTab('historia')
                }, 'História'),
                React.createElement('button', {
                    className: `px-4 py-2 font-semibold text-sm ${activeTab === 'rua' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600 hover:text-blue-500'}`,
                    onClick: () => changeTab('rua')
                }, 'Rua'),
                React.createElement('button', {
                    className: `px-4 py-2 font-semibold text-sm ${activeTab === 'cidade' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600 hover:text-blue-500'}`,
                    onClick: () => changeTab('cidade')
                }, 'Cidade')
            )
        ),
        // Content will be rendered based on active tab - component continues...
        React.createElement('div', { id: 'historia-content-placeholder' }, 'Component content will be completed in next update...')
    );
};

// Export to window object for global access
window.HistoriaContent = HistoriaContent;
