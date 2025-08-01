// RuaHistoria Component - Street History Page
const RuaHistoria = () => {
    const { useState, useEffect } = React;
    const { id, historiaId } = ReactRouterDOM.useParams();
    const history = ReactRouterDOM.useHistory();
    const location = ReactRouterDOM.useLocation();
    const [currentHistory, setCurrentHistory] = useState(null);
    const [historiasDaRua, setHistoriasDaRua] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAllStories, setShowAllStories] = useState(false);
    const [selectedCityId, setSelectedCityId] = useState(null);
    const [filteredRuas, setFilteredRuas] = useState([]);
    const [activeTab, setActiveTab] = useState('historia');

    // Supondo que 'cidades', 'ruas' e 'historias' estão disponíveis globalmente via 'bd.js'
    const rua = window.ruas ? window.ruas.find(r => r.id === parseInt(id)) || {} : {};
    const cidade = window.cidades ? window.cidades.find(c => c.id === rua.cidade_id) || {} : {};

    // Função para atualizar as meta tags
    const updateMetaTags = (description, imageUrl) => {
        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        } else {
            metaDescription = document.createElement('meta');
            metaDescription.name = "description";
            metaDescription.content = description;
            document.head.appendChild(metaDescription);
        }

        // Atualizar imagem meta
        let metaImage = document.querySelector('meta[property="og:image"]');
        if (metaImage) {
            metaImage.setAttribute('content', imageUrl);
        } else {
            metaImage = document.createElement('meta');
            metaImage.setAttribute('property', 'og:image');
            metaImage.setAttribute('content', imageUrl);
            document.head.appendChild(metaImage);
        }
    };

    // Atualiza o título e as meta tags conforme a aba ativa
    useEffect(() => {
        if (activeTab === 'historia' && currentHistory) {
            const cidadeNome = cidade.nome || "Cidade Desconhecida";
            document.title = `${currentHistory.titulo} - ${cidadeNome}`;
            updateMetaTags(currentHistory.descricao, currentHistory.fotos?.[0] || 'default-image-url');
        } else if (activeTab === 'rua') {
            document.title = `A história da ${rua.nome || "Rua Desconhecida"} - ${cidade.nome || "Cidade Desconhecida"}`;
            updateMetaTags(rua.descricao, rua.fotos?.[0] || 'default-image-url');
        } else if (activeTab === 'cidade') {
            document.title = `A história da cidade de ${cidade.nome || "Cidade Desconhecida"}`;
            updateMetaTags(cidade.descricao, cidade.foto || 'default-image-url');
        }
    }, [currentHistory, cidade, rua, selectedCityId, activeTab]);

    // Lê a aba ativa a partir dos parâmetros de query na URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tab = params.get('tab') || 'historia';
        setActiveTab(tab);
    }, [location.search]);

    // Atualiza os dados da história com base no ID da rua e da história
    useEffect(() => {
        if (rua && window.historias) {
            const historiasList = window.historias.filter(h => h.rua_id === rua.id).sort((a, b) => a.ano - b.ano || a.id - b.id);
            setHistoriasDaRua(historiasList);

            if (historiaId) {
                const historia = historiasList.find(h => h.id === parseInt(historiaId));
                if (historia) {
                    setCurrentHistory(historia);
                    const index = historiasList.findIndex(h => h.id === historia.id);
                    setCurrentIndex(index);
                }
            } else if (historiasList.length > 0) {
                const primeiraHistoria = historiasList[0];
                setCurrentHistory(primeiraHistoria);
                setCurrentIndex(0);
                history.replace(`/rua/${id}/historia/${primeiraHistoria.id}`);
            }
            setSelectedCityId(rua.cidade_id);
        }
    }, [id, historiaId, history, rua]);

    // Filtra ruas com base na cidade selecionada
    useEffect(() => {
        if (window.ruas) {
            const filtered = selectedCityId ? window.ruas.filter(r => r.cidade_id === selectedCityId) : window.ruas;
            setFilteredRuas(filtered);
        }
    }, [selectedCityId]);

    // Verifica se a rua selecionada está nas ruas filtradas
    useEffect(() => {
        const selectedRuaInFiltered = filteredRuas.find(r => r.id === parseInt(id));
        if (!selectedRuaInFiltered && filteredRuas.length > 0) {
            history.push(`/rua/${filteredRuas[0].id}`);
        }
    }, [filteredRuas, id, history]);

    const handleRuaClick = (rua) => {
        history.push(`/rua/${rua.id}`);
    };

    const handleCityClick = (cidade) => {
        setSelectedCityId(cidade.id);
    };

    // Função para alterar a aba ativa e atualizar a URL
    const changeTab = (tab) => {
        setActiveTab(tab);
        const params = new URLSearchParams(location.search);
        if (tab === 'historia') {
            params.delete('tab');
        } else {
            params.set('tab', tab);
        }
        history.push({
            pathname: location.pathname,
            search: params.toString(),
        });
    };

    return React.createElement('main', { className: "w-full lg:w-4/5 flex flex-col items-center flex-grow overflow-y-auto p-2" },
        React.createElement(window.CityCarousel, { 
            cidades: window.cidades || [], 
            handleCityClick: handleCityClick, 
            selectedCityId: selectedCityId 
        }),
        React.createElement(window.RuaCarousel, { 
            ruas: filteredRuas, 
            handleRuaClick: handleRuaClick, 
            selectedRuaId: parseInt(id) 
        }),
        React.createElement(window.HistoriaContent, {
            currentHistory: currentHistory,
            historiasDaRua: historiasDaRua,
            currentIndex: currentIndex,
            setCurrentIndex: setCurrentIndex,
            setCurrentHistory: setCurrentHistory,
            showAllStories: showAllStories,
            setShowAllStories: setShowAllStories,
            selectedRuaId: parseInt(id),
            activeTab: activeTab,
            changeTab: changeTab,
            rua: rua,
            cidade: cidade,
            orgs: window.orgs || [], // Passando 'orgs' como prop
            negocios: window.negocios || [] // Passando 'negocios' como prop
        })
    );
};

// Export to window object for global access
window.RuaHistoria = RuaHistoria;
