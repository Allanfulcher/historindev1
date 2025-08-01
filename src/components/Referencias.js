// Referencias Component - References and bibliography page
const Referencias = () => {
    const { useState, useEffect } = React;
    const [activeSection, setActiveSection] = useState(null);
    const location = ReactRouterDOM.useLocation();

    useEffect(() => {
        // Atualizar título e meta descrição dinamicamente
        document.title = "Referências - Historin";
        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute(
                'content',
                'Explore uma ampla variedade de referências históricas, incluindo organizações, autores e obras selecionadas no Historin.'
            );
        } else {
            metaDescription = document.createElement('meta');
            metaDescription.name = "description";
            metaDescription.content =
                'Explore uma ampla variedade de referências históricas, incluindo organizações, autores e obras selecionadas no Historin.';
            document.head.appendChild(metaDescription);
        }
    }, []);

    useEffect(() => {
        // Extrair o parâmetro 'section' da URL
        const params = new URLSearchParams(location.search);
        const section = params.get('section');
        if (section === 'orgs' || section === 'autores' || section === 'obras') {
            setActiveSection(section);
        }
    }, [location]);

    const toggleSection = (sectionName) => {
        setActiveSection(prevSection => (prevSection === sectionName ? null : sectionName));
    };

    return React.createElement('div', { className: "referencias px-4 md:px-8 lg:px-16 py-8" },
        // Título Principal
        React.createElement('h1', { className: "text-3xl font-bold text-center" }, 'Referências'),
        React.createElement('h3', { className: "font-bold text-center mb-6" }, '+ Conteúdo'),

        // Parágrafo Descritivo
        React.createElement('p', { className: "text-center text-gray-700 mb-8 max-w-2xl mx-auto" },
            'Nesta página, você encontrará uma ampla variedade de referências para aprofundar seu conhecimento histórico. Nosso objetivo é incentivar o interesse das pessoas e disseminar conteúdo histórico relevante, fornecendo fontes confiáveis e diversas para a exploração da rica história que a nossa plataforma oferece.'
        ),

        // Seção Organizações
        React.createElement('section', { className: "orgs mb-8" },
            React.createElement('button', {
                className: "flex items-center justify-between w-full px-4 py-2 text-2xl font-semibold text-left bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none transition-colors duration-200",
                onClick: () => toggleSection('orgs')
            },
                React.createElement('span', null, 'Organizações'),
                React.createElement('svg', {
                    className: `w-6 h-6 transform transition-transform duration-200 ${activeSection === 'orgs' ? 'rotate-180' : 'rotate-0'}`,
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    xmlns: "http://www.w3.org/2000/svg"
                },
                    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" })
                )
            ),
            activeSection === 'orgs' && React.createElement('div', { className: "mt-4" },
                window.orgs && window.orgs.map(org =>
                    React.createElement('div', { key: org.id, className: "org bg-white shadow-md p-4 rounded-lg mb-4" },
                        React.createElement('img', {
                            src: org.logo,
                            alt: `${org.fantasia} logo`,
                            className: "h-32 mx-auto mb-4 object-contain"
                        }),
                        React.createElement('h3', { className: "text-xl font-bold text-center" }, org.fantasia),
                        React.createElement('p', { className: "text-gray-700 mt-2" }, org.sobre),
                        React.createElement('a', { 
                            href: org.link, 
                            className: "text-blue-500 hover:underline mt-2 block text-center" 
                        }, 'Visitar site')
                    )
                )
            )
        ),

        // Seção Autores
        React.createElement('section', { className: "autores mb-8" },
            React.createElement('button', {
                className: "flex items-center justify-between w-full px-4 py-2 text-2xl font-semibold text-left bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none transition-colors duration-200",
                onClick: () => toggleSection('autores')
            },
                React.createElement('span', null, 'Autores'),
                React.createElement('svg', {
                    className: `w-6 h-6 transform transition-transform duration-200 ${activeSection === 'autores' ? 'rotate-180' : 'rotate-0'}`,
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    xmlns: "http://www.w3.org/2000/svg"
                },
                    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" })
                )
            ),
            activeSection === 'autores' && React.createElement('div', { className: "mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" },
                window.autores && window.autores.map(autor =>
                    React.createElement('div', { key: autor.id, className: "autor bg-white shadow-md p-4 rounded-lg flex flex-col items-center" },
                        React.createElement('img', { 
                            src: autor.foto, 
                            alt: autor.nome, 
                            className: "w-24 h-24 mb-4 rounded-full object-cover" 
                        }),
                        React.createElement('h3', { className: "text-xl font-bold text-center" }, autor.nome),
                        React.createElement('p', { className: "text-gray-700 text-center mt-2" }, autor.bio)
                    )
                )
            )
        ),

        // Seção Obras
        React.createElement('section', { className: "obras mb-8" },
            React.createElement('button', {
                className: "flex items-center justify-between w-full px-4 py-2 text-2xl font-semibold text-left bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none transition-colors duration-200",
                onClick: () => toggleSection('obras')
            },
                React.createElement('span', null, 'Obras'),
                React.createElement('svg', {
                    className: `w-6 h-6 transform transition-transform duration-200 ${activeSection === 'obras' ? 'rotate-180' : 'rotate-0'}`,
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    xmlns: "http://www.w3.org/2000/svg"
                },
                    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" })
                )
            ),
            activeSection === 'obras' && React.createElement('div', { className: "mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" },
                window.obras && window.obras.map(obra =>
                    React.createElement('div', { key: obra.id, className: "obra bg-white shadow-md p-4 rounded-lg" },
                        React.createElement('img', { 
                            src: obra.capa, 
                            alt: obra.titulo, 
                            className: "w-full h-40 object-cover mb-4 rounded-lg" 
                        }),
                        React.createElement('h3', { className: "text-xl font-bold" }, obra.titulo),
                        React.createElement('p', { className: "text-gray-700 mt-2" }, obra.descricao),
                        React.createElement('a', { 
                            href: obra.link, 
                            className: "text-blue-500 hover:underline mt-2 block" 
                        }, obra.pago ? "Adquirir" : "Ler gratuitamente")
                    )
                )
            )
        ),

        // Seção Sites
        React.createElement('section', { className: "sites mb-8" },
            React.createElement('button', {
                className: "flex items-center justify-between w-full px-4 py-2 text-2xl font-semibold text-left bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none transition-colors duration-200",
                onClick: () => toggleSection("sites")
            },
                React.createElement('span', null, 'Sites'),
                React.createElement('svg', {
                    className: `w-6 h-6 transform transition-transform duration-200 ${activeSection === "sites" ? "rotate-180" : "rotate-0"}`,
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    xmlns: "http://www.w3.org/2000/svg"
                },
                    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" })
                )
            ),
            activeSection === "sites" && React.createElement('div', { className: "mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" },
                window.sites && window.sites.map((site) =>
                    React.createElement('div', { key: site.id, className: "site bg-white shadow-md p-4 rounded-lg flex flex-col items-center" },
                        React.createElement('img', {
                            src: site.logo,
                            alt: `${site.nome} logo`,
                            className: "w-24 h-24 mb-4 rounded-lg object-contain"
                        }),
                        React.createElement('h3', { className: "text-xl font-bold text-center" }, site.nome),
                        React.createElement('a', {
                            href: site.link,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "text-blue-500 hover:underline mt-2 block text-center"
                        }, 'Visitar site')
                    )
                )
            )
        ),

        // Seção de Vídeos
        React.createElement('section', { className: "videos mb-8" },
            React.createElement('h2', { className: "pl-4 text-2xl font-semibold mb-4" }, 'Vídeos'),
            React.createElement('div', { className: "video-container" },
                React.createElement('iframe', {
                    width: "100%",
                    height: "500",
                    src: "https://www.youtube.com/embed/videoseries?list=PL7HcHb8oOEF8p3w7QAc5LPFVVaBP1SNoP",
                    title: "YouTube playlist",
                    frameBorder: "0",
                    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                    allowFullScreen: true,
                    className: "rounded-lg shadow-md"
                })
            )
        )
    );
};

// Export to window object for global access
window.Referencias = Referencias;
