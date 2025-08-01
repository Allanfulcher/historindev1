// App Component - Main application wrapper with routing and global state management
// Mobile-first design orchestrating all migrated components
// Extracted from monolithic HTML and converted to React.createElement syntax

const App = () => {
    // Global state management
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [showMap, setShowMap] = React.useState(true);
    const [previewContent, setPreviewContent] = React.useState(null);
    const [selectedRuaId, setSelectedRuaId] = React.useState(null);
    const [showSteps, setShowSteps] = React.useState(false);
    
    // Popup states
    const [showOnboarding, setShowOnboarding] = React.useState(false);
    const [showDonation, setShowDonation] = React.useState(false);
    const [showFeedback, setShowFeedback] = React.useState(false);
    const [showPopup, setShowPopup] = React.useState(false);
    
    // React Router hooks
    const location = window.ReactRouterDOM.useLocation();
    const prevLocation = React.useRef(location);
    
    // Popup tracking reference
    const popupsRef = React.useRef({
        showOnboarding: false,
        showPopup: false,
        showFeedback: false,
        showDonation: false,
    });

    // Update popup reference when states change
    React.useEffect(() => {
        popupsRef.current = {
            showOnboarding,
            showPopup,
            showFeedback,
            showDonation,
        };
    }, [showOnboarding, showPopup, showFeedback, showDonation]);

    // Sample data for home page (would come from global variables in real app)
    const sampleRuas = [
        { id: '1', nome: 'Rua Coberta', fotos: 'https://placehold.co/300x200' },
        { id: '2', nome: 'Rua das Hortênsias', fotos: 'https://placehold.co/300x200' },
        { id: '3', nome: 'Avenida Borges de Medeiros', fotos: 'https://placehold.co/300x200' },
        { id: '4', nome: 'Praça Major Nicoletti', fotos: 'https://placehold.co/300x200' }
    ];

    const sampleHistorias = [
        { 
            id: '1', 
            rua_id: '1', 
            titulo: 'A História da Rua Coberta', 
            descricao: 'Descubra como surgiu a famosa rua coberta de Gramado e sua importância para o turismo local.',
            fotos: ['https://placehold.co/100x100']
        },
        { 
            id: '2', 
            rua_id: '2', 
            titulo: 'Memórias das Hortênsias', 
            descricao: 'As flores que deram nome à rua e as histórias dos primeiros moradores da região.',
            fotos: ['https://placehold.co/100x100']
        },
        { 
            id: '3', 
            rua_id: '3', 
            titulo: 'Borges de Medeiros e Gramado', 
            descricao: 'A conexão histórica entre o político gaúcho e o desenvolvimento da cidade.',
            fotos: ['https://placehold.co/100x100']
        }
    ];

    // Helper function to determine if popup should show
    const shouldShowPopup = () => {
        return Math.random() > 0.7; // 30% chance for demo purposes
    };

    // Preview close handler
    const handlePreviewClose = () => {
        setPreviewContent(null);
    };

    // Onboarding popup timer (first visit)
    React.useEffect(() => {
        const hasVisited = localStorage.getItem('hasVisited');
        if (!hasVisited) {
            const onboardingTimer = setTimeout(() => {
                setShowOnboarding(true);
                localStorage.setItem('hasVisited', 'true');
            }, 2000); // 2 seconds after loading

            return () => clearTimeout(onboardingTimer);
        }
    }, []);

    // Donation popup timer (3 minutes)
    React.useEffect(() => {
        const donationTimer = setTimeout(() => {
            if (
                !popupsRef.current.showOnboarding &&
                !popupsRef.current.showPopup &&
                !popupsRef.current.showFeedback
            ) {
                setShowDonation(true);
            }
        }, 180000); // 3 minutes

        return () => clearTimeout(donationTimer);
    }, []);

    // Carousel popup timer (1 minute)
    React.useEffect(() => {
        if (shouldShowPopup()) {
            const popupTimer = setTimeout(() => {
                setShowPopup(true);
            }, 60000); // 60 seconds

            return () => clearTimeout(popupTimer);
        }
    }, []);

    // Feedback popup timer (5 minutes)
    React.useEffect(() => {
        const feedbackTimer = setTimeout(() => {
            if (
                !popupsRef.current.showOnboarding &&
                !popupsRef.current.showPopup &&
                !popupsRef.current.showDonation
            ) {
                setShowFeedback(true);
            }
        }, 300000); // 5 minutes

        return () => clearTimeout(feedbackTimer);
    }, []);

    // SEO and meta tags management
    React.useEffect(() => {
        if (location.pathname === "/" || location.pathname === "/#") {
            document.title = "Historin História da cidades - Início";
            let metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', 'Descubra as histórias de Gramado através do Historin. Explore ruas, conheça eventos marcantes e contribua com suas próprias histórias.');
            } else {
                metaDescription = document.createElement('meta');
                metaDescription.name = "description";
                metaDescription.content = 'Descubra as histórias de Gramado através do Historin. Explore ruas, conheça eventos marcantes e contribua com suas próprias histórias.';
                document.head.appendChild(metaDescription);
            }
        }
    }, [location.pathname]);

    // Google Analytics page view tracking
    React.useEffect(() => {
        if (location.pathname !== prevLocation.current.pathname || location.search !== prevLocation.current.search) {
            prevLocation.current = location;
            const pagePath = location.pathname + location.search;

            // Avoid sending 'page_view' for '/#'
            if (pagePath === '/#') return;

            // Send page view event to GA4
            if (window.gtag) {
                window.gtag('event', 'page_view', {
                    page_title: document.title,
                    page_path: pagePath,
                });
            }
        }
    }, [location]);

    return React.createElement('div', { 
        className: 'font-roboto bg-[#F4ECE1] text-[#3E3A33] min-h-screen flex flex-col' 
    },
        // Menu component
        window.Menu ? React.createElement(window.Menu, {
            menuOpen: menuOpen,
            setMenuOpen: setMenuOpen,
            setShowMap: setShowMap,
            historias: sampleHistorias
        }) : null,

        // Header component
        window.Header ? React.createElement(window.Header, {
            setMenuOpen: setMenuOpen,
            setShowFeedback: setShowFeedback
        }) : null,

        // Conditional popups
        showPopup && window.PopupCarrossel ? React.createElement(window.PopupCarrossel, {
            onClose: () => setShowPopup(false)
        }) : null,

        showOnboarding && window.OnboardingPopup ? React.createElement(window.OnboardingPopup, {
            onClose: () => setShowOnboarding(false)
        }) : null,

        showDonation && window.DonationPopup ? React.createElement(window.DonationPopup, {
            onClose: () => setShowDonation(false)
        }) : null,

        showFeedback && window.FeedbackPopup ? React.createElement(window.FeedbackPopup, {
            isOpen: showFeedback,
            onClose: () => setShowFeedback(false)
        }) : null,

        // Main routing with React Router Switch
        window.ReactRouterDOM.Switch ? React.createElement(window.ReactRouterDOM.Switch, {},
            // About page route
            React.createElement(window.ReactRouterDOM.Route, {
                path: '/sobre',
                component: window.Sobre
            }),

            // References page route
            React.createElement(window.ReactRouterDOM.Route, {
                path: '/referencias',
                component: window.Referencias
            }),

            // Add story page route
            React.createElement(window.ReactRouterDOM.Route, {
                path: '/adicionar-historia',
                component: window.AdicionarHistoria
            }),

            // Streets and stories listing route
            React.createElement(window.ReactRouterDOM.Route, {
                path: '/ruas-e-historias',
                component: window.RuasEHistorias
            }),

            // African legacy page route
            React.createElement(window.ReactRouterDOM.Route, {
                path: '/legado-africano',
                component: window.LegadoAfricano
            }),

            // Street with specific story route
            React.createElement(window.ReactRouterDOM.Route, {
                path: '/rua/:id/historia/:historiaId',
                component: window.RuaHistoria
            }),

            // Street route
            React.createElement(window.ReactRouterDOM.Route, {
                path: '/rua/:id',
                component: window.RuaHistoria
            }),

            // Home page route
            React.createElement(window.ReactRouterDOM.Route, {
                exact: true,
                path: '/'
            },
                showMap ? React.createElement('div', { className: 'w-full lg:w-4/5 relative' },
                    // Map view
                    window.MapView ? React.createElement(window.MapView, {
                        setSelectedRuaId: setSelectedRuaId,
                        setPreviewContent: setPreviewContent,
                        ruas: sampleRuas,
                        historias: sampleHistorias
                    }) : React.createElement('div', { 
                        className: 'h-64 bg-gray-200 flex items-center justify-center' 
                    }, 'Map View Component'),

                    // Preview overlay
                    previewContent && window.Preview ? React.createElement(window.Preview, {
                        previewContent: previewContent,
                        onClose: handlePreviewClose
                    }) : null,

                    // Welcome introduction section
                    React.createElement('div', { className: 'introduction p-4' },
                        React.createElement('h2', { className: 'text-xl font-bold mb-2' }, 'Bem-vindo ao Historin!'),
                        React.createElement('button', {
                            onClick: () => setShowSteps(!showSteps),
                            className: 'flex items-center justify-between mt-2 ml-auto text-blue-600 hover:text-blue-800'
                        },
                            React.createElement('span', {}, 'Ver mais'),
                            React.createElement('svg', {
                                className: `w-6 h-6 transform transition-transform ${showSteps ? 'rotate-180' : 'rotate-0'}`,
                                fill: 'none',
                                stroke: 'currentColor',
                                viewBox: '0 0 24 24'
                            },
                                React.createElement('path', {
                                    strokeLinecap: 'round',
                                    strokeLinejoin: 'round',
                                    strokeWidth: '2',
                                    d: 'M19 9l-7 7-7-7'
                                })
                            )
                        ),

                        // Expandable steps section
                        showSteps ? React.createElement('div', { className: 'steps mt-4 space-y-3' },
                            React.createElement('div', { className: 'step flex items-start' },
                                React.createElement('span', { 
                                    className: 'step-number bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0' 
                                }, '1'),
                                React.createElement('p', { className: 'text-gray-700' }, 
                                    'Explore histórias pela geografia e descubra a história por trás dos lugares!')
                            ),
                            React.createElement('div', { className: 'step flex items-start' },
                                React.createElement('span', { 
                                    className: 'step-number bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0' 
                                }, '2'),
                                React.createElement('p', { className: 'text-gray-700' }, 
                                    'Navegue pela linha do tempo para reviver os eventos que moldaram nossa cidade!')
                            ),
                            React.createElement('div', { className: 'step flex items-start' },
                                React.createElement('span', { 
                                    className: 'step-number bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0' 
                                }, '3'),
                                React.createElement('p', { className: 'text-gray-700' }, 
                                    'Contribua com suas histórias e experiências e aproveite a jornada!')
                            )
                        ) : null
                    ),

                    // Recommended streets section
                    React.createElement('div', { className: 'px-4 mt-6' },
                        React.createElement('div', { className: 'flex justify-between items-center mb-4' },
                            React.createElement('h2', { className: 'text-lg font-semibold' }, 'Ruas Recomendadas'),
                            React.createElement(window.ReactRouterDOM.Link, {
                                to: '/ruas-e-historias',
                                className: 'text-sm text-[#8A5A44] hover:underline'
                            }, 'Ver tudo')
                        ),

                        React.createElement('div', { className: 'grid grid-cols-1 sm:grid-cols-2 gap-4' },
                            sampleRuas.slice(0, 4).map(rua =>
                                React.createElement(window.ReactRouterDOM.Link, {
                                    key: rua.id,
                                    to: `/rua/${rua.id}`,
                                    className: 'bg-white p-3 rounded-lg shadow cursor-pointer block hover:shadow-lg transition-shadow duration-300'
                                },
                                    React.createElement('img', {
                                        src: rua.fotos || 'https://placehold.co/300x200',
                                        alt: rua.nome,
                                        className: 'rounded-lg mb-2 w-full h-40 object-cover'
                                    }),
                                    React.createElement('h3', { className: 'font-semibold text-gray-800' }, rua.nome)
                                )
                            )
                        )
                    ),

                    // Most viewed stories section
                    React.createElement('div', { className: 'px-4 mt-6' },
                        React.createElement('div', { className: 'flex justify-between items-center mb-4' },
                            React.createElement('h2', { className: 'text-lg font-semibold' }, 'Histórias Mais Vistas'),
                            React.createElement(window.ReactRouterDOM.Link, {
                                to: '/ruas-e-historias',
                                className: 'text-sm text-[#8A5A44] hover:underline'
                            }, 'Ver tudo')
                        ),

                        React.createElement('div', { className: 'space-y-3' },
                            sampleHistorias.map(historia =>
                                React.createElement(window.ReactRouterDOM.Link, {
                                    key: historia.id,
                                    to: `/rua/${historia.rua_id}/historia/${historia.id}`,
                                    className: 'bg-white p-3 rounded-lg shadow flex items-center cursor-pointer block hover:shadow-lg transition-shadow duration-300'
                                },
                                    React.createElement('img', {
                                        src: historia.fotos[0] || 'https://placehold.co/100x100',
                                        alt: historia.titulo,
                                        className: 'rounded-lg mr-3 w-20 h-20 object-cover flex-shrink-0'
                                    }),
                                    React.createElement('div', { className: 'flex-1' },
                                        React.createElement('h3', { className: 'font-semibold text-gray-800 mb-1' }, historia.titulo),
                                        React.createElement('p', { className: 'text-sm text-gray-600 line-clamp-2' }, 
                                            historia.descricao.slice(0, 80) + '...')
                                    )
                                )
                            )
                        ),

                        // African legacy card
                        window.LegadoAfricanoCard ? React.createElement(window.LegadoAfricanoCard, {
                            className: 'mt-4'
                        }) : null,

                        // Platform information section
                        React.createElement('div', { className: 'mt-8' },
                            React.createElement('div', { className: 'bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center' },
                                React.createElement('img', {
                                    loading: 'lazy',
                                    src: 'https://i.imgur.com/nav9mZa.jpeg',
                                    alt: 'Informações sobre a plataforma',
                                    className: 'w-full md:w-1/3 rounded-lg mb-4 md:mb-0 md:mr-6 object-cover'
                                }),
                                React.createElement('div', { className: 'flex-1' },
                                    React.createElement('h2', { className: 'text-xl font-bold mb-2' }, 'Estamos só começando!'),
                                    React.createElement('p', { className: 'text-gray-700 mb-4' },
                                        'O Historin é mais do que uma plataforma de histórias. Nossa jornada está apenas começando, e em breve, traremos uma experiência imersiva com ',
                                        React.createElement('strong', {}, 'Realidade Aumentada'),
                                        '. QR codes serão espalhados pelas ruas de Gramado, permitindo a todos explorar a história de maneira interativa, conectando o passado e o presente de forma inovadora. Fique atento às novidades!'
                                    ),
                                    React.createElement(window.ReactRouterDOM.Link, {
                                        to: '/sobre',
                                        className: 'bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition inline-block'
                                    }, 'Saiba mais sobre o Historin')
                                )
                            )
                        )
                    )
                ) : (
                    // Alternative view when map is hidden
                    window.RuaHistoria ? React.createElement(window.RuaHistoria) : 
                    React.createElement('div', { className: 'p-4' }, 'RuaHistoria Component')
                )
            ),

            // 404 Not Found route (catch-all)
            React.createElement(window.ReactRouterDOM.Route, {
                component: window.NotFound
            })
        ) : React.createElement('div', { className: 'p-4' }, 'React Router not available'),

        // Fixed footer for desktop
        React.createElement('footer', { className: 'fixed-footer bg-gray-800 text-white text-center py-2 text-sm' },
            React.createElement('p', {}, 'Essa aplicação funciona melhor em dispositivos móveis')
        )
    );
};

// Export to global window object for legacy compatibility
if (typeof window !== 'undefined') {
    window.App = App;
}

// Also support ES6 module export for modern usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}
