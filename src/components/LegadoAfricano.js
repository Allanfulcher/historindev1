// LegadoAfricano Component - African Legacy Page
const LegadoAfricano = () => {
    const { useEffect } = React;

    useEffect(() => {
        document.title = "Legado Afro-brasileiro e Indígena - Historin";

        // Atualizar a meta descrição
        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Descubra a história do legado afro-brasileiro e indígena em Gramado e como esses povos contribuíram para a cultura e formação da cidade.');
        } else {
            metaDescription = document.createElement('meta');
            metaDescription.name = "description";
            metaDescription.content = 'Descubra a história do legado afro-brasileiro e indígena em Gramado e como esses povos contribuíram para a cultura e formação da cidade.';
            document.head.appendChild(metaDescription);
        }
    }, []);

    // IDs das histórias selecionadas manualmente
    const selectedStoryIds = [49, 50, 51]; // Substitua pelos IDs reais

    // Filtrar as histórias com base nos IDs selecionados
    const historiasLegadoAfricano = window.historias ? window.historias.filter(historia => selectedStoryIds.includes(historia.id)) : [];

    return React.createElement('div', { className: "p-4 w-full lg:w-4/5" },
        React.createElement('header', { className: "flex justify-between items-center mb-4" },
            React.createElement('div', { className: "text-2xl cursor-pointer" },
                React.createElement(ReactRouterDOM.Link, { to: "/" },
                    React.createElement('i', { className: "fas fa-arrow-left" })
                )
            ),
            React.createElement('h1', { className: "text-lg font-bold" }, 'Legado Afro-brasileiro e Indígena'),
            React.createElement('div', { className: "w-10 h-10" })
        ),

        // Seção de Introdução
        React.createElement('section', { className: "mb-6" },
            React.createElement('h2', { className: "text-center text-xl font-bold mb-4" }, 'A Importância da Inclusão Histórica'),
            React.createElement('p', { className: "text-justify" },
                'Gramado, como muitas cidades do sul do Brasil, é amplamente reconhecida por sua herança europeia, principalmente alemã, italiana e portuguesa. Essas histórias são constantemente celebradas e lembradas, porém, a história dos negros afro-brasileiros na região muitas vezes permanece invisibilizada. Essa página é dedicada a dar voz àqueles que foram fundamentais na construção da cidade, mas cujas histórias foram apagadas ou esquecidas ao longo do tempo. O projeto Historin busca corrigir essa lacuna, destacando a importância de refletirmos sobre a diversidade de etnias que ajudaram a moldar nossa cidade, indo além das narrativas tradicionais.'
            ),

            // Espaço para Imagem
            React.createElement('div', { className: "my-4 text-center" },
                React.createElement('img', {
                    src: "https://www.correiodopovo.com.br/image/contentid/policy:1.381579:1674812867/consciencia.jpg?a=2%3A1&w=680&$p$a$w=7f2aaba",
                    alt: "Imagem ilustrativa sobre o legado afro-brasileiro",
                    className: "rounded-lg shadow-lg object-cover w-full"
                }),
                React.createElement('p', { className: "text-sm text-gray-600 mt-2" }, 'Imagem demonstra o trabalho de Afro-brasileiros na infraestrutura do RS')
            )
        ),

        // Seção sobre os Índios
        React.createElement('section', { className: "mb-6" },
            React.createElement('h3', { className: "text-lg font-bold mb-2" }, '🌿 Povos Indígenas no Rio Grande do Sul e Gramado'),
            React.createElement('div', { className: "border border-gray-300 rounded-lg p-4 bg-white" },
                React.createElement('p', { className: "text-justify mb-2" },
                    'Os povos indígenas, como os ', React.createElement('strong', null, 'Kaingang'), ' e ', React.createElement('strong', null, 'Guarani'), ', foram os primeiros habitantes da região onde hoje se encontra o Rio Grande do Sul. Eles ocupavam a serra gaúcha muito antes da chegada dos colonizadores europeus.'
                ),
                React.createElement('p', { className: "text-justify mb-2" },
                    'Em Gramado, sua presença é sentida através de toponímias como Caí, Taquara, Quilombo, pampa entre outros práticas agrícolas e na profunda conexão com a natureza local. Vivendo em áreas ao redor de rios e florestas, esses povos praticavam caça, coleta e agricultura de subsistência, com destaque para o cultivo de milho e mandioca.'
                ),
                React.createElement('p', { className: "text-justify" },
                    'Com a chegada dos colonizadores, conflitos surgiram, resultando na expulsão ou exterminação de muitos indígenas. Embora suas histórias tenham sido silenciadas ao longo do tempo, elas continuam presentes na cultura local e merecem ser lembradas.'
                )
            )
        ),

        // Seção sobre a População Negra
        React.createElement('section', { className: "mb-6" },
            React.createElement('h3', { className: "text-lg font-bold mb-2" }, '🖤 Afro-brasileiros e sua Contribuição em Gramado'),
            React.createElement('div', { className: "border border-gray-300 rounded-lg p-4 bg-white" },
                React.createElement('p', { className: "text-justify mb-2" },
                    'A história dos afro-brasileiros em Gramado, embora menos conhecida, é de extrema importância. Durante os períodos colonial e imperial, negros escravizados foram trazidos para a região para trabalhar em plantações, construção de estradas, e outros serviços essenciais. A contribuição desses homens e mulheres foi fundamental para o desenvolvimento das infraestruturas iniciais da cidade.'
                ),
                React.createElement('p', { className: "text-justify mb-2" },
                    'O trabalho dos negros escravizados foi decisivo na construção de estradas, edificações e no desenvolvimento agrícola da região. Apesar disso, suas histórias foram sendo sistematicamente apagadas ou esquecidas. O Historin visa recuperar e dar visibilidade a essas contribuições, incluindo a presença e o legado afro-brasileiro na memória histórica de Gramado.'
                ),
                React.createElement('p', { className: "text-justify" },
                    'Gramado reconhece a necessidade de divulgar as histórias e as contribuições culturais e históricas dos afro-brasileiros na formação da cidade, desde o trabalho nas fazendas da Linha Caboclo até as construções e serviços domésticos que moldaram parte significativa da infraestrutura local.'
                )
            )
        ),

        // Explicação sobre o Artigo Completo
        React.createElement('div', { className: "text-justify mb-4" },
            React.createElement('p', null,
                'O artigo "A Invisibilidade dos Negros na História de Gramado" de Alex Juarez Müller e Raimundo Nonato Wanderley de Souza Cavalcante, publicado na revista "Em Tempo de Histórias", faz um levantamento preliminar sobre a participação dos afro-brasileiros na história de Gramado. Ele destaca a invisibilização histórica dessa população e a ausência de estudos acadêmicos que abordem o tema, buscando recuperar essas memórias essenciais para uma compreensão mais ampla da história local.'
            )
        ),

        // Botão para o Artigo Completo
        React.createElement('div', { className: "text-center mb-6" },
            React.createElement('a', {
                href: "https://periodicos.unb.br/index.php/emtempos/article/view/31760/26500",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
            }, 'Leia o Artigo Completo')
        ),

        // Seção de Histórias Selecionadas
        React.createElement('section', { className: "mb-6" },
            React.createElement('h3', { className: "text-lg font-bold mb-4" }, '📚 Histórias Selecionadas'),
            React.createElement('div', { className: "space-y-4" },
                historiasLegadoAfricano.map(historia =>
                    React.createElement('div', {
                        key: historia.id,
                        className: "bg-white p-4 rounded-lg shadow mb-2 block hover:shadow-lg transition-shadow duration-300 w-full"
                    },
                        React.createElement('div', { className: "flex flex-col md:flex-row" },
                            React.createElement('img', {
                                src: historia.fotos[0] || 'https://placehold.co/150x150',
                                alt: historia.titulo,
                                className: "rounded-lg mb-4 md:mb-0 md:mr-4 w-full md:w-1/3 object-cover"
                            }),
                            React.createElement('div', { className: "flex-grow" },
                                React.createElement('h3', { className: "font-semibold text-lg mb-2" }, historia.titulo),
                                React.createElement('p', { className: "text-sm text-gray-600 mb-2" }, historia.descricao),
                                React.createElement('p', { className: "text-sm text-gray-600 flex items-center" },
                                    React.createElement('span', { className: "mr-4" }, `Ano: ${historia.ano}`),
                                    React.createElement(ReactRouterDOM.Link, {
                                        to: `/rua/${historia.rua_id}`,
                                        className: "text-blue-500 hover:underline"
                                    }, 'Ver na rua')
                                )
                            )
                        )
                    )
                )
            )
        )
    );
};

// Export to window object for global access
window.LegadoAfricano = LegadoAfricano;
