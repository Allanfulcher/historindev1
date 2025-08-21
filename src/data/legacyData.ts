/**
 * Legacy Data Import Example
 * This file shows how to import and use your legacy JavaScript database
 */

import { legacyDb } from '../utils/legacyDb';

// Your legacy data (copy your existing JS objects here)
const historias = [{
	/*'orgId': 1,*/
	'id': 1,
	'rua_id': 3,
	'criador': 'Mateus Canova',
	fotos: [{
			url: 'https://i.imgur.com/CNOZBeg.png',
			credito: 'Cesar Augusto'
		},
		{
			url: 'https://i.imgur.com/s7ufpth.png',
			credito: 'Cesar Augusto'
		},
		{
			url: 'https://i.imgur.com/KbhDD97.png',
			credito: 'Cesar Augusto'
		}
	],
	'titulo': 'Inauguração Lago Joaquina Rita Bier',
	'descricao': 'Inauguração do Lago Joaquina Rita Bier com grande participação da comunidade, marcando a abertura do Parque Hotel.',
	'ano': 1938,
	'coordenadas': [-29.386628049677785, -50.87512615633946]
}, {
	'id': 2,
	'rua_id': 3,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/oHuhMIw.png', 'https://i.imgur.com/DpKKIjO.png'],
	'titulo': 'Vista Parque Hotel modificado',
	'descricao': 'Parque Hotel passa por modificações e o lago ganha uma ilha, tornando o ambiente ainda mais bonito.',
	'ano': 1960,
	'coordenadas': [-29.386628049677785, -50.87512615633947]
}, {
	'id': 3,
	'rua_id': 3,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/s69bC1w.png', 'https://i.imgur.com/PnoGWlp.png'],
	'titulo': 'Parque Hotel na década de 70',
	'descricao': 'Parque Hotel torna-se um dos mais procurados da cidade, encantando visitantes com sua beleza única.',
	'ano': 1970,
	'coordenadas': [-29.386628049677785, -50.87512615633948]
}, {
	'id': 4,
	'rua_id': 3,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/7mYOSMZ.png', 'https://i.imgur.com/uHCJ7Xc.png', ],
	'titulo': 'Nova fachada do Parque Hotel',
	'descricao': 'O Parque Hotel renova sua fachada, introduzindo inovações arquitetônicas para a época.',
	'ano': 1990,
	'coordenadas': [-29.386628049677785, -50.87512615633949]
}, {
	'id': 5,
	'rua_id': 3,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/3M1eGKf.png', 'https://i.imgur.com/5fc24yY.png', 'https://i.imgur.com/sh7ee1w.png', 'https://i.imgur.com/FB6lydh.png', ],
	'titulo': 'Prefeitura adquire a área do Parque Hotel',
	'descricao': 'A prefeitura assume o espaço e revitaliza, transformando-o em um local de lazer público, abrigando o Centro de Cultura de Gramado.',
	'ano': 2010,
	'coordenadas': [-29.386628049677785, -50.87512615633951]
}, {
	'id': 6,
	'rua_id': 2,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/pTCVPEj.png', ],
	'titulo': 'Carreteiros descarregando madeira próximo à Estação Férrea Gramado',
	'descricao': 'Os colonos, vindos das áreas rurais, chegavam na sede do então Quinto Distrito de Taquara, com suas carretas puxadas por bois, cavalos ou mulas cheias de produtos. Traziam itens agropecuários ou de extrativismo vegetal, para embarcá-los no trem, que estacionava na Estação Gramado, área central do distrito. Nessa época, havia em Gramado e arredores, pelo menos desde o início do século XX, muitas serrarias produtoras de madeira proveniente da derrubada das extensas matas nativas de pinheiro araucária existentes na região. Na foto, tábuas de madeira trazidas das serrarias estão sendo descarregadas à beira dos trilhos, aguardando encaminhamento até algum vagão do trem de carga. Num período em que não existia asfalto e caminhões, os carreteiros levavam cargas por longas distâncias no relevo montanhoso e sob o clima instável da Serra Gaúcha, enfrentando estradas estreitas e ruins, repletas de subidas, descidas, pedras e atoleiros.',
	'ano': 1925,
	'coordenadas': [-29.382853213252286, -50.871694803261995]
}, {
	'id': 7,
	'rua_id': 2,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/53ca1hf.png', 'https://i.imgur.com/K3756Ab.png', ],
	'titulo': 'Prédio comercial se destaca entre residências do jovem município',
	'descricao': 'A primeira foto foi tirada na subida da rua hoje conhecida como Rua Torta. A sombra ao chão é da antiga casa do major Nicoletti, hoje museu. O ângulo é o mesmo da foto anterior, de 1925. Ao fundo está a Rua Emílio Sorgetz, que leva o nome do proprietário de uma das casas à esquerda. O prédio branco de dois andares em alvenaria ainda existe. Em 1957, era um comércio de ferragens também pertencente à família Sorgetz; depois de 1976 foi sede do primeiro chocolate caseiro do Brasil, de Jayme Prawer, e, desde 1986, abriga o restaurante Chateau de La Fondue. À direita dele, há uma casa de madeira, cujo dono era engenheiro, mesmo terreno em que está a pizzaria temática Cara de Mau, atualmente. Na frente dessas duas construções há uma placa fixada ao chão, mesmo local da atual Praça das Etnias. A segunda foto, com uma araucária à esquerda, é da casa de um membro de outra tradicional família gramadense, os Lorenzoni. Temos aqui duas amostras do jovem município de Gramado, recém-emancipado de Taquara. Na época, o centro da cidade possuía ainda muitas residências de madeira com andar único e, pouco a pouco, surgiam prédios comerciais de alvenaria com mais andares. Convidamos você a subir até a metade da Rua Torta, mirar seu celular e tirar uma fotografia no mesmo ângulo. Comparando as fotos de 1925 e de 1957 com a que você tirou, que elementos novos há na paisagem?',
	'ano': 1957,
	'coordenadas': [-29.382853213252286, -50.871694803261995]
}, {
	'id': 8,
	'rua_id': 2,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/Nza5JWW.png', ],
	'titulo': 'O artesanato em vime ganha força na cidade',
	'descricao': 'Oficialmente, o início da produção de móveis e artefatos em vime, em Gramado, data da década de 1920, quando aqui chegaram o casal Antônio e Ana Accorsi, conhecedores do cultivo e do manuseio da planta. Antônio é conhecido como o “Pai do Artesanato Gramadense”. Sem matéria-prima, nos primeiros anos, foi até às áreas rurais introduzir o cultivo da planta entre os colonos e também tornou muitos deles seus aprendizes no ofício. Durante muitas décadas, sua fábrica ficava na então Rua Borges de Medeiros, hoje Avenida. Produzia móveis, cestas e brinquedos, mas sua fama se deveu principalmente à fabricação de bengalas, que, juntamente com chapéus de palha, eram utilizadas pelos veranistas em seus passeios nas belas paisagens de Gramado. Na foto, temos a nova sede de sua fábrica. Nesse mesmo período da foto, ao longo das décadas de 1970 e 1980, ocorreu o auge da produção industrial em Gramado. O ramo moveleiro era o segundo ramo industrial mais rentável na cidade, enquanto que o artesanato em vime era o sexto. Por esses anos, faleceu Antônio que, mesmo idoso, ainda trançava seus vimes. A empresa passou, então, a ser administrada pelos filhos, chamando-se “Vimes Accorsi”. Posteriormente, com o encerramento das atividades, foi construído um edifício, no mesmo terreno, intitulado “Condomínio Antônio Accorsi”, homenageando o artesão falecido.',
	'ano': 1970,
	'coordenadas': [-29.382853213252286, -50.871694803261995]
}, {
	'id': 9,
	'rua_id': 2,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/UOkcbb6.png', 'https://i.imgur.com/2qpofoJ.png', 'https://i.imgur.com/aZIPdFg.png'],
	'titulo': 'Etapas de construção da nova Estação Rodoviária Gramado',
	'descricao': 'A nova Estação Rodoviária foi construída no terreno onde se localizava a antiga Estação Férrea Gramado, que funcionou por mais de quarenta anos, de 1921 a 1963. A antiga estação foi um dos quatro pontos de parada do transporte ferroviário no território do então Quinto Distrito de Taquara. Com a desativação da ferrovia Taquara-Canela, na década de 1960, o mesmo prédio abrigou, posteriormente, a sede da Brigada Militar, até ser demolido. No mesmo terreno, atualmente existe um complexo, do qual fazem parte, além da Estação Rodoviária, a nova sede da Brigada Militar, a Praça das Etnias, o edifício Dom Fernando entre outras construções. Anteriormente, também serviu como Estação Rodoviária, na década de 1950, a Praça Major Nicoletti e, depois, um prédio na atual Avenida das Hortênsias, onde hoje está o restaurante Madero Burguer. Na primeira das fotos abaixo, ao fundo à esquerda, vê-se a loja Vimes Accorsi, que hoje não existe mais. A residência por detrás do caminhão estacionado, passadas quatro décadas, ainda resiste à crescente verticalização da cidade nos últimos anos.',
	'ano': 1984,
	'coordenadas': [-29.38371759705751, -50.871942005169366]
}, {
	'id': 10,
	'rua_id': 2,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/FEwM0zt.png', 'https://i.imgur.com/45Q417o.png', ],
	'titulo': 'Rodoviária durante e após a inauguração',
	'descricao': 'A atual Estação Rodoviária teve sua construção iniciada em 1984 e finalizada em 1986. No mesmo período, foram construídos ou repaginados vários prédios públicos municipais, como a Prefeitura, a Câmara de Vereadores e o Palácio dos Festivais. O estilo arquitetônico adotado foi inspirado em residências de personalidades alemãs ilustres das primeiras décadas da história de Gramado. Por exemplo, o formato da cobertura da Estação Rodoviária é muito semelhante ao telhado da casa do médico naturalista Richard Sturmhoeffel, a mesma que aparece em fotografias da então Rua Borges de Medeiros, na década de 1920. Desde sua inauguração, a 8 de março de 1986, o prédio é basicamente o mesmo até os dias atuais. Passou por uma reforma nos anos 2000, visando melhor atender o crescente número de turistas que participavam dos muitos eventos que ocorriam na antiga Praça das Comunicações, hoje Praça das Etnias, como a Festa da Colônia, a Feira do Artesanato, a Feira de Natal e a Feira do Livro, atualmente realizados em outros espaços da cidade. Ademais, também beneficiava aqueles que diariamente vinham realizar compras na Casa do Colono e nos Fornos de Gramado, construídos ao lado da Rodoviária, no início do século XXI.',
	'ano': 1986,
	'coordenadas': [-29.38371759705751, -50.871942005169366]
}, {
	'id': 11,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/Ooy4z5S.png', ],
	'titulo': 'Trecho da Rua Borges de Medeiros próximo à rodoviária',
	'descricao': 'A Rua Borges de Medeiros começa a ser revitalizada próximo à rodoviária, ganhando uma nova estética.',
	'ano': 1990,
	'coordenadas': [-29.382994961584245, -50.87202334257208]
}, {
	'id': 12,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/kkvMMP4.png.'],
	'titulo': 'Uma nova cara em tempos modernos',
	'descricao': '20 anos depois, a mesma área mostra avanços modernos, destacando a beleza da cidade.',
	'ano': 2010,
	'coordenadas': [-29.382994961584245, -50.87202334257209]
}, {
	'id': 13,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/Fk1U2rV.png', ],
	'titulo': 'Melhoria no sistema viário da cidade',
	'descricao': 'A cidade cresce e seu sistema viário é aprimorado para suportar a expansão urbana.',
	'ano': 1984,
	'coordenadas': [-29.382994961584245, -50.8720233425721]
}, {
	'id': 14,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/VyBZTvh.png', ],
	'titulo': 'Avanço no comércio e prédios',
	'descricao': 'O comércio e os prédios da cidade se multiplicam, marcando um grande avanço urbano.',
	'ano': 2006,
	'coordenadas': [-29.382994961584245, -50.87202334257211]
}, {
	'id': 15,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/ftrUx6U.png'],
	'titulo': 'Início do centro da cidade',
	'descricao': 'A Rua Borges de Medeiros começa a tomar forma, estabelecendo-se como a principal via da cidade.',
	'ano': 1930,
	'coordenadas': [-29.381649734178673, -50.87165493198574]
}, {
	'id': 16,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/nV7O55e.png', ],
	'titulo': 'Casas de figuras importantes',
	'descricao': 'Casas de pessoas importantes da cidade ocupam posições privilegiadas ao longo da Rua Borges de Medeiros.',
	'ano': 1940,
	'coordenadas': [-29.381649734178673, -50.87165493198575]
}, {
	'id': 17,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/vQslbM3.png', ],
	'titulo': 'Estudos para asfaltamento da Borges de Medeiros',
	'descricao': 'As autoridades começam a estudar o asfaltamento da Rua Borges de Medeiros.',
	'ano': 1952,
	'coordenadas': [-29.381649734178673, -50.87165493198576]
}, {
	'id': 18,
	'rua_id': 4,
	'criador': 'Eduardo da Silva Weber',
	'fotos': ['https://i.imgur.com/1EfUUX6.png'],
	'titulo': 'Desfile das candidatas à rainha da XI Festa das Hortênsias',
	'descricao': 'Gramado possui uma longa tradição de desfiles de rua durante eventos, que vêm desde a década de 1920, quando ainda era o Quinto Distrito de Taquara. Os primeiros desfiles documentados são os de carnaval. Desfilar pelas ruas era uma prática cultural da alta sociedade gramadense ligada à Sociedade Recreio Gramadense e que contava também com a participação dos turistas que visitavam a localidade para veranear. Após a emancipação política, o primeiro grande evento turístico organizado pela Prefeitura Municipal, a Festa das Hortênsias, também teve vários tipos de desfiles de rua como atração. Na foto, desfilam sobre os carros as candidatas à Rainha da XI Festa das Hortênsias, realizada de 15/12/1984 a 13/01/1985. Para as leis de trânsito atuais, pode parecer perigoso, mas, na época, era comum que candidatas e soberanas de eventos da região desfilassem no capô dos veículos. Esta foi a penúltima edição do evento que era realizado desde 1958, de dois em dois anos, sempre durante o verão. A festa estava em decadência e não ocorria desde 1977. A edição marca uma retomada nostálgica, mas apenas para a realização de mais duas edições. Dentro delas, surgiram dois novos eventos secundários: a Festa da Colônia e o Natal Luz, que depois substituíram a Festa das Hortênsias e assumiram protagonismo desde então, juntamente com o Festival de Cinema, que já existia. No centro da foto, ao fundo, vemos o Hospital Arcanjo São Miguel.',
	'ano': 1984,
	'coordenadas': [-29.378759917508436, -50.873559432172605]
}, {
	'id': 19,
	'rua_id': 4,
	'criador': 'Eduardo da Silva Weber',
	'fotos': ['https://i.imgur.com/Fv15SWb.png'],
	'titulo': 'Vista panorâmica da Rua Madre Verônica',
	'descricao': 'A foto, de 1947, foi tirada do alto do morro do Hospital Arcanjo São Miguel, anteriormente conhecido como “Morro dos Nelz”. Temos uma vista panorâmica de toda a extensão da Rua Madre Verônica, no interior da qual surgiria também, posteriormente, a Rua Coberta. A rua está praticamente vazia de construções. Em meio a gramados e árvores é possível distinguir a sede da Sociedade Recreio Gramadense, ao fundo, na esquina direita da via. Quem descesse o morro caminhando e chegasse ao final da rua, ficaria frente a frente com a residência de Oscar Fisch, onde ficava o primeiro Correio de Gramado. Hoje, quem faz o mesmo trajeto, de repente se depara com a imponência do Palácio dos Festivais. Ao lado esquerdo, vemos também a torre da nova Igreja Matriz São Pedro, concluída há menos de uma década, quando foi fotografada a rua. Quantas mudanças em quase 80 anos. Convidamos você a subir a ladeira do Hospital, mirar seu celular e tirar uma foto no mesmo ângulo. Que elementos novos há do início ao fim da rua?',
	'ano': 1947,
	'coordenadas': [-29.377146909828273, -50.87062970088388]
}, {
	'id': 20,
	'rua_id': 4,
	'criador': 'Eduardo da Silva Weber',
	'fotos': ['https://i.imgur.com/WDguy0P.png', 'https://i.imgur.com/I0HC767.png'],
	'titulo': 'Grupo Escolar Santos Dumont',
	'descricao': 'No início do século XX, havia em Gramado, sede do antigo Quinto Distrito de Taquara, quatro professores atuantes: Bruno Boelter, Amélia Bossle, Emma Bastos e Boaventura Ramos Pacheco, cada qual com sua escola e seus alunos. A situação mudou em 1930, quando o professor Boaventura realizou uma viagem e reivindicou junto a Getúlio Vargas, então Presidente (Governador) do estado, a unificação das quatro escolas isoladas. Unidos, os quatro recolheram 150 assinaturas, legitimando, assim, a fusão das classes individuais e a criação do Grupo Escolar Gramado, em maio do mesmo ano. Posteriormente, foram também integrados os professores Sylvio Hoffmann, Alba Bandeira dos Santos e Antônia Chaulet. Os grupos escolares foram o modelo de ensino primário organizado e padronizado que vigorou no Brasil do início da República até 1971. Tinham como foco a disciplina, o patriotismo e o esporte. Em Gramado, o nome oficial “Grupo Escolar Santos Dumont” veio apenas em 1940. Antes disso, o educandário teve duas sedes provisórias, até que foi construída, em 1941, a sede definitiva, a mesma que aparece nas fotos, localizada na esquina da Rua Coberta com a Rua Garibaldi, exatamente onde está o prédio do Banrisul, atualmente. Dos professores citados, Boaventura e Amélia foram diretores e, posteriormente, Hugo Daros, antigo aluno da docente.',
	'ano': 1943,
	'coordenadas': [-29.37810303798205, -50.87263417204498]
}, {
	'id': 21,
	'rua_id': 4,
	'criador': 'Eduardo da Silva Weber',
	'fotos': ['https://i.imgur.com/qvtPRtf.png', 'https://i.imgur.com/eJrCoLH.png', 'https://i.imgur.com/AhESztV.png', 'https://i.imgur.com/SLxY8fk.png'],
	'titulo': 'Construção e inauguração da Rua Coberta ',
	'descricao': 'Na década de 1990, Gramado já possuía uma economia turística consolidada. Muitos dos eventos eram a céu aberto e a instabilidade do clima serrano com chuvas, nevoeiros e quedas de temperatura repentinas, tornava necessária a existência de um espaço externo e coberto para a sua realização. Foi, então, projetada a cobertura de parte da Rua Madre Verônica, no trecho defronte ao Palácio dos Festivais, até pouco antes dos prédios do Banco do Brasil e do Banrisul. Assim surgiu a Rua Coberta. A construção, que começou nos últimos meses de 1996, aparece nas três primeiras fotos. O ato de inauguração, que ocorreu a 31 de dezembro do mesmo ano, no final do mandato de Pedro Henrique Bertolucci, foi ao som da Banda Novos Talentos, regida pelo maestro Ivo Egídio Michaelsen, como se vê na última foto. Apesar de não ser a primeira rua do gênero no Brasil, é, certamente, a mais conhecida e seu sucesso fez dela modelo para outras ruas semelhantes em várias cidades de nosso país. Em seus quase 30 anos de existência, a Rua Coberta abrigou eventos como a Árvore Cantante do Natal Luz, as tendas de produtos coloniais da Festa da Colônia e dos livreiros da Feira do Livro, o tapete vermelho do Festival de Cinema, os blocos de carnaval do Gramado Fantasia, além de exposições e shows diversos.',
	'ano': 1996,
	'coordenadas': [-29.378176614045163, -50.87252538201938]
}, {
	'id': 22,
	'rua_id': 5,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/V2uDSE1.png'],
	'titulo': 'Primeira rua de Gramado',
	'descricao': 'Primeira rua de Gramado, abrigando negócios importantes, como a Pensão Huff, que se tornou o Hotel Bertolucci.',
	'ano': 1917,
	'coordenadas': [-29.3796737178125, -50.87137017241578]
}, {
	'id': 23,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/Cc4vY4l.png'],
	'titulo': 'Hotel Fisch',
	'descricao': 'Hotel Fisch era popular entre veranistas que buscavam conforto e o clima europeu em Gramado.',
	'ano': 1930,
	'coordenadas': [-29.37951628971553, -50.87293628251527]
}, {
	'id': 24,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/D389r2U.png'],
	'titulo': 'Centro de Informações Turísticas',
	'descricao': 'O antigo espaço do Hotel Fisch se transforma no Centro de Informações Turísticas e banheiros públicos.',
	'ano': 2012,
	'coordenadas': [-29.37951628971553, -50.87293628251528]
}, {
	'id': 25,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/zzrWKtv.png'],
	'titulo': 'Praça Central',
	'descricao': 'A Praça Central, com muitas casas ao redor, dá lugar à atual Praça Major Nicoletti.',
	'ano': 1940,
	'coordenadas': [-29.379380389965544, -50.87297821278224]
}, {
	'id': 26,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/wRMixRn.png'],
	'titulo': 'Evolução da Praça Central',
	'descricao': 'A praça evolui nas décadas seguintes, ganhando destaque com a instalação da Telefônica.',
	'ano': 1970,
	'coordenadas': [-29.379380389965544, -50.87297821278225]
}, {
	'id': 27,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/dU13jLy.png'],
	'titulo': 'Nova Praça Major Nicoletti',
	'descricao': 'Anos depois, o espaço se transforma na Praça Major Nicoletti, com prédios e estabelecimentos modernos.',
	'ano': 2009,
	'coordenadas': [-29.379380389965544, -50.87297821278226]
}, {
	'id': 28,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/oLwnqe8.png'],
	'titulo': 'Surge o cinema na cidade',
	'descricao': 'O Cine 3 de Outubro é inaugurado em 1929 e posteriormente renomeado para Cine Splendid.',
	'ano': 1936,
	'coordenadas': [-29.37886102023408, -50.873681725586366]
}, {
	'id': 29,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/Bfsnb6e.png'],
	'titulo': 'Grande salto com Cine Embaixador',
	'descricao': 'Inaugurado em 1967, o Cine Embaixador é inovador e recebe o primeiro Festival de Cinema em 1972.',
	'ano': 1967,
	'coordenadas': [-29.37886102023408, -50.873681725586366]
}, {
	'id': 30,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/J5ADXUN.png'],
	'titulo': 'Crescimento do Festival de Cinema',
	'descricao': 'O Cine Embaixador recebe a 18ª edição do Festival de Cinema, consolidando-se como um dos principais eventos culturais da cidade.',
	'ano': 1990,
	'coordenadas': [-29.37886102023408, -50.873681725586366]
}, {
	'id': 31,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/0TVuVde.png'],
	'titulo': 'Festival de Cinema consolidado',
	'descricao': 'A 38ª edição do Festival de Cinema ocorre, reforçando sua relevância no mundo cinematográfico.',
	'ano': 2010,
	'coordenadas': [-29.37886102023408, -50.873681725586366]
}, {
	'id': 32,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/7mt0V8N.png'],
	'titulo': 'Crescimento da Borges de Medeiros',
	'descricao': 'A Rua Borges de Medeiros continua seu crescimento, tornando-se a principal via da cidade.',
	'ano': 1940,
	'coordenadas': [-29.37943832259964, -50.873487265433624]
}, {
	'id': 33,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/i2BkOGf.png'],
	'titulo': 'Evolução notória',
	'descricao': 'A evolução urbana é evidente, com Gramado se destacando como referência em beleza e turismo no Brasil.',
	'ano': 2010,
	'coordenadas': [-29.37943832259964, -50.873487265433624]
}, {
	'id': 34,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/O99Yg1e.png'],
	'titulo': 'Hora de mudar',
	'descricao': 'Começa a revitalização da Rua Borges de Medeiros, um projeto inovador para a cidade.',
	'ano': 2006,
	'coordenadas': [-29.381746598309256, -50.87171536786748]
}, {
	'id': 35,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/Zv5JKJP.png', 'https://i.imgur.com/CRp3788.png'],
	'titulo': 'O trem passava por aqui',
	'descricao': 'A presença dos trilhos de trem marcou a paisagem da cidade em 1943, mas a área hoje é completamente diferente.',
	'ano': 1943,
	'coordenadas': [-29.381746598309256, -50.87171536786749]
}, {
	'id': 36,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/4B5kGde.png'],
	'titulo': 'Gramado já era linda antes',
	'descricao': 'Em 1971, Gramado já impressionava com sua arquitetura inovadora.',
	'ano': 1971,
	'coordenadas': [-29.381746598309256, -50.8717153678675]
}, {
	'id': 37,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/eR0JWJm.png'],
	'titulo': 'Avanço da revitalização',
	'descricao': 'O processo de revitalização da cidade segue a todo vapor, transformando o centro de Gramado.',
	'ano': 2008,
	'coordenadas': [-29.381746598309256, -50.87171536786751]
}, {
	'id': 38,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/iKkHrZE.png'],
	'titulo': 'A beleza se destaca',
	'descricao': 'A revitalização é concluída, revelando um novo e belo visual para Gramado.',
	'ano': 2011,
	'coordenadas': [-29.381746598309256, -50.87171536786752]
}, {
	'id': 39,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/crqC5XH.png'],
	'titulo': 'Primeira bomba de combustível',
	'descricao': 'A primeira bomba de combustível da cidade, da marca Esso, é instalada em Gramado.',
	'ano': 1930,
	'coordenadas': [-29.3799719287979, -50.87293303662093]
}, {
	'id': 40,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/jm55SKc.png'],
	'titulo': 'O lugar mudou',
	'descricao': 'O local onde ficava a primeira bomba de combustível hoje abriga um prédio com salas comerciais.',
	'ano': 2011,
	'coordenadas': [-29.3799719287979, -50.87293303662094]
}, {
	'id': 41,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/Zz97Rmi.png'],
	'titulo': 'Início da Praça Central',
	'descricao': 'Dinamitação de pedras marca o início da construção da futura Praça Central.',
	'ano': 1920,
	'coordenadas': [-29.379391020071807, -50.87305504272411]
}, {
	'id': 42,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/T2LhKgf.png'],
	'titulo': 'Praça Major Nicoletti ganha espaço',
	'descricao': 'A Praça Major Nicoletti é um local de destaque e muito visitado pela comunidade e turistas.',
	'ano': 2010,
	'coordenadas': [-29.379391020071807, -50.87305504272412]
}, {
	'id': 43,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/ltOa7Yo.png'],
	'titulo': 'Praça Major Nicoletti',
	'descricao': 'A Praça Major Nicoletti, minimalista, é um ícone de Gramado.',
	'ano': 1934,
	'coordenadas': [-29.379386155989636, -50.87294180830378]
}, {
	'id': 44,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/cqU5hLO.png'],
	'titulo': 'Crescimento da Praça Major Nicoletti',
	'descricao': 'O espaço da praça cresce e atrai ainda mais visitantes com o passar dos anos.',
	'ano': 1986,
	'coordenadas': [-29.379386155989636, -50.87294180830379]
}, {
	'id': 45,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/AtRU7xi.png'],
	'titulo': 'Primeiro vendedor na praça',
	'descricao': 'O primeiro vendedor de cachorro-quente começa suas atividades na Praça Major Nicoletti.',
	'ano': 1970,
	'coordenadas': [-29.379386155989636, -50.8729418083038]
}, {
	'id': 46,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/JarTS0r.png'],
	'titulo': 'Desfile cívico',
	'descricao': 'Desfile do time de vôlei e ciclismo da cidade, no local que mais tarde se tornaria a Rua Coberta.',
	'ano': 1960,
	'coordenadas': [-29.378716995025886, -50.87352472635132]
}, {
	'id': 47,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/B5OyLbh.png', 'https://i.imgur.com/aSDlvxM.png'],
	'titulo': 'Antigo fórum',
	'descricao': 'O antigo fórum da cidade dá lugar a uma loja famosa no mesmo local.',
	'ano': 1983,
	'coordenadas': [-29.376531979695983, -50.875438942301145]
}, {
	'id': 48,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/2z8UnCN.png', 'https://i.imgur.com/PFWT2mk.png'],
	'titulo': 'Primeiro açougue',
	'descricao': 'O primeiro açougue da cidade, substituído anos depois por uma conhecida loja de decorações.',
	'ano': 1980,
	'coordenadas': [-29.376339495427477, -50.87512954120642]
}, {
	'id': 49,
	'rua_id': 6,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/4YMKGe6.png', 'https://i.imgur.com/oT6FBCC.png'],
	'titulo': 'Vila de trabalhadores',
	'descricao': 'A vila de trabalhadores na estrada de ferro que ligava as cidades de Gramado, Canela e taquara, composto por homens e mulheres que contribuiram de maneira ardua e em más condições de trabalho para a infraestrutura da região',
	'ano': 1910,
	'coordenadas': [-29.420431962411854, -50.864095653716525]
}, {
	'id': 50,
	'rua_id': 3,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/4kf5gYd.png'],
	'titulo': 'Vila africana',
	'descricao': 'A “Vila Planalto” foi um projeto de urbanização voltado para grupos abastados\nno início do século XX. Em suas imediações, existiu a VILA  AFRICANA, que\nreunia trabalhadores que prestavam serviços para as famílias da área central.',
	'ano': 1910,
	'coordenadas': [-29.386628049677785, -50.87512615633946]
}, {
	'id': 51,
	'rua_id': 3,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/Bb2hv4T.png', 'https://i.imgur.com/Nk6xeaa.png'],
	'titulo': 'A importancia Afro na construção de nossa cidade',
	'descricao': 'Nas  fotografias  visualizamos  duas  mulheres,  negras,  que  prestavam  serviços diversos nas casas das famílias Lied e Castilhos. As duas fotografias tem data muito próxima entre elas (1916 e 1919) e também da abolição da escravidão (1888). No verso das fotografias estão registradas algumas informações que nos fazem pensar um pouco sobre a provável condição das duas mulheres. Na foto de Maria está escrito que ela era “mucama”, “filha de escravo” e “ajudava quando estava pra nascer as filhas da família”. Na foto de Jacinta está escrito “filha de escravos”, “parteira” e que foi “tendo criada por eles como filha adotiva”. As imagens e as suas descrições no verso revelam vestígios do escravismo e das relações de trabalho que se estabeleceram após a abolição. As fotografias são fontes importantes para conhecer a história do negro, uma vez que após a República (1889) a cor do sujeito desaparece dos registros (MOREIRA & MUGGE, 2019, p.35), tornando muito difícil de identificar sua presença nas fontes documentais tradicionais. Moreira & Mugge (2019) também revelam as relações de imigrantes alemães e descendentes com a posse de escravos na região do Vale dos Sinos, o que identifica que as regiões de imigração não ficaram isentas ao escravismo e muito menos ao contato com a população de descendência africana. Na  mesma  época,  provavelmente  1918,  outra  história  encontrada  no  livro  de Mário Pizzeta (1973, p.27-29) nos chamou a atenção. Ele descreve um homem de nome José Tristão que realizava práticas curativas, fazia remédio de erva, pílulas de raízes e folhas (Pílulas Tristão) e receitava lavagens por via anal a qual injetava com taquaras. Segundo Pizzeta (p.29, 1973), o homem sofreu represálias do padre Camino, tanto pelas práticas curativas quanto por “colocar cartazes nas portas das casas, opinando sobre o clero e a Igreja”. O desfecho, sem muitas explicações, é que o homem sofreu um processo e teve que “abandonar o lugar”. Esse relato demonstra um pouco do universo das práticas curativas do mundo caboclo e também revela as implicações da frente pioneira que resultou num universo de diversidades de crenças e ao mesmo tempo de combate a essas práticas. Os conflitos na região sul envolvendo o curandeirismo e a colonização foram comuns, como no caso dos  Muckers  [GEVEHR;  MEYRER;  NEUMANN,  2020],  Monges  do  Pinheirinho [FILATOW, 2020] e dos Monges Barbudos [KUJAWA, 2020]. Os construtores da ferrovia Em 1º de junho de 2019 fez 100 anos da chegada do trem na localidade de Várzea Grande  (atualmente  um  bairro  de  Gramado),  uma  construção  difícil  decorrente  do desnível entre a planície e o planalto. A Estação Sander (atual município de Três Coroas) ficava numa  altitude média de 56  metros, a  Estação Várzea Grande numa altitude média de 610 metros e a Estação Gramado com altitude média de 820 metros. A subida de Sander a Várzea Grande, e depois até Gramado, enfrentou muitas dificuldades  financeiras,  de  engenharia  e  principalmente  de  mão-de-obra.  O memorialista  Erni  Engelmann  (2007,  p.105)  descreveu  que  “o  único  grupo  de trabalhadores de que João Corrêa podia dispor era o de homens de todas as categorias morais, alguns bons elementos, porém, dentre a maioria, havia ladrões e criminosos dos piores quilates”. No  mesmo  relato,  Engelmann  (2007)  descreve  que  o  Coronel  João  Corrêa3“matinha seus empregados sob regime severo” e ele mesmo sugeria aos colonos que se armassem e, se preciso, ameaçassem os trabalhadores. Ele ainda relata que havia furtos de animais dos colonos e brigas entre os trabalhadores que terminavam em mortes. A construção de um trecho ferroviária difícil de ser executado pelo desnível do relevo e os problemas financeiros podem ter levado Coronel João Corrêa buscar mão-de-obra que fosse menos onerosa possível. O que identificamos até o momento são os relatos acima citados e fotografias que revelam um pouco tanto do trabalhador quanto das condições de trabalho. 3 O Coronel João Corrêa Ferreira da Silva liderou a construção da ferrovia de Novo Hamburgo a Taquara (1903) e depois de Taquara a Canela (1924). João Corrêa foi também intendente de São Leopoldo em 1924. \nNa frente de expansão, na segunda metade do século XIX, o tropeirismo luso-brasileiro (os tropeiros de Gramado se fixaram na terra) tomou posse das terras e assim permaneceu  até  meados  dos  anos  1870-80,  quando  se  consolidou  a  formalização  da propriedade.  Em  seguida,  ocorre  a  frente  pioneira  com  a  colonização  das  terras (fracionamento em propriedades menores) com excedentes dos descendentes de alemães e italianos provenientes das colônias lindeiras (Caxias, Nova Petrópolis, São Sebastião do Caí e Taquara). Nessas duas frentes de ocupação estavam os negros, que num primeiro momento servem  à  frente  de  expansão  como  cativos  ou  agregados;  e  num  segundo  momento servem  à  frente  pioneira  como  trabalhadores  domésticos  (lavadeiras,  cozinheiras, parteiras, babás, etc) ou braçais (jardineiros, carpinteiros, construtores etc). \nO levantamento preliminar da história do negro em Gramado nos revelou que é possível identificar os lugares de memória dessa população; entretanto, por outro lado é complexo ter o reconhecimento desse grupo na participação da formação histórica do município,  uma  vez  que  os  órgãos  públicos  não  os  reconhecem,  situação  que  pode dificultar, inclusive, até as políticas públicas sobre o tema nas escolas. As fontes disponíveis nos revelaram o quão desafiador é dar sentido às memórias que se apresentam como uma “colcha de retalhos”, já que oficialmente nada existe sobre essas populações na história local. Uma pesquisa mais profunda em arquivos regionais e  estaduais  pode  revelar  informações  que  a  nível  municipal  tem  se  mostrado extremamente difícil.  É fato que a história do negro em Gramado está na invisibilidade, mas também é fato que esse é um tema historiográfico que nas últimas décadas vem sendo discutido nas escolas por força da lei 10.639/2003, e também se promoveu no município duas edições do Curso de Aperfeiçoamento UNIAFRO – Política de Promoção da Igualdade Racial na Escola. O curso de Licenciatura em História das Faculdades Integradas de Taquara vem desempenhando  na  última  década  um  importante  papel  através  de  pesquisas acadêmicas, mas ainda há muito o que fazer, principalmente no que se refere à história do negro, tanto no espaço gramadense quanto em todo o território que fazia parte do município de Taquara (Taquara, Parobé, Igrejinha, Três Coroas, Gramado e Canela).  Referências BOURDIEU, Pierre. O Poder Simbólico. Rio de Janeiro: Bertrand Brasil, 1989.  BRASIL. Lei nº 10.639, de 09 janeiro de 2003.Altera a Lei no 9.394, de 20 de dezembro de  1996, que  estabelece  as  diretrizes  e  bases da  educação  nacional,  para  incluir no \n',
	'ano': 1916,
	'coordenadas': [-29.386628049677785, -50.87512615633947]
}, {
	'id': 52,
	'rua_id': 7,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/ux5lDfh.png'],
	'titulo': 'Colegio santa terezinha',
	'descricao': 'Colégio Santa Terezinha, à direira Rua São Pedro antes da abertura da rua',
	'ano': 1930,
	'coordenadas': [-29.3791166889611, -50.87454163224786]
}, {
	'id': 53,
	'rua_id': 7,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/OLREE3j.jpeg'],
	'titulo': 'Igreja são pedro',
	'descricao': 'Construção da Igreja São Pedro – fundos',
	'ano': 1930,
	'coordenadas': [-29.3791166889611, -50.87454163224787]
}, {
	'id': 54,
	'rua_id': 7,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/klYwxEO.png'],
	'titulo': 'Um pouco diferente do que conhecemos hoje',
	'descricao': 'Igreja Matriz São Pedro vista por trás com o antigo pavilhão de festas de madeira e os muros originais. A casa de Pedro benetti em 1º plano (doador da área da igreja) e o aterro da rua São Pedro feito na época. Ao fundo, a direita, o novo Hospital São Miguel',
	'ano': 1940,
	'coordenadas': [-29.3791166889611, -50.87454163224788]
}, {
	'id': 55,
	'rua_id': 7,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/lTHAuzQ.png', 'https://i.imgur.com/EzsN749.png'],
	'titulo': 'A construção foi evoluindo',
	'descricao': 'Esquina avenida das Hortênsias com a rua São Pedro, poucos comercios existiam ali até aquele momento',
	'ano': 1989,
	'coordenadas': [-29.3791166889611, -50.87454163224789]
}, {
	'id': 56,
	'rua_id': 4,
	'criador': 'Eduardo da Silva Weber',
	'fotos': ['https://i.imgur.com/l3ubmWb.png'],
	'titulo': 'Agência do Banrisul com ipê amarelo histórico ao lado',
	'descricao': 'A agência do Banco do Estado do Rio Grande do Sul, no centro de Gramado, começou a ser construída no ano de 1981 e foi inaugurada em 01/11/1982. O terreno é o mesmo do antigo Grupo Escolar Santos Dumont. Da época do educandário, restou um ipê amarelo histórico. Foi plantado por professores e alunos em 21/09/1942, Dia da Árvore, quando Hugo Daros era o diretor. A espécie é reconhecida internacionalmente como árvore símbolo do Brasil, desde 1961. Até poucos anos atrás, estava ameaçada de extinção. Durante a construção da agência, o antigo diretor protestou contra a derrubada do ipê. Os apelos foram ouvidos e a árvore foi tombada como Patrimônio Histórico Municipal em 09/03/1998, na gestão do prefeito Nelson Dinnebier. Convidamos você a tirar uma selfie. O cenário pode ser o prédio do Banrisul de Gramado, único no estado com arquitetura inspirada no estilo bávaro alemão, ou o ipê amarelo octogenário, que é patrimônio histórico de nossa cidade, ou ainda os dois. Talvez você tenha a sorte de admirar entre o final de julho e setembro, quando a árvore estiver repleta de suas flores amarelas vibrantes, que lhe são características.',
	'ano': 2012,
	'coordenadas': [-29.37787939416001, -50.8728018828596]
}, {
	'id': 57,
	'rua_id': 5,
	'criador': 'Eduardo da Silva Weber',
	'fotos': ['https://i.imgur.com/xqkd9wI.png'],
	'titulo': 'Primeira sede da Sociedade Recreio Gramadense',
	'descricao': 'A Sociedade Recreio Gramadense foi fundada em 15/04/1915. A iniciativa veio do escrivão distrital João Leopoldo Lied, de sua esposa Osvaldina, do comerciante Augusto Zatti, do subintendente (subprefeito) capitão José Nicoletti, do comerciante Pedro Benetti, do professor Bruno Boelter, juntamente com outros moradores. Temos aqui uma foto da primeira sede, que ficava na esquina da então Rua Borges de Medeiros com a atual Rua Madre Verônica, exatamente onde hoje inicia a Rua Coberta. O prédio era alugado, pertencia a Antônio Bechara e, posteriormente, abrigou também uma loteria esportiva. Foi utilizado até 1928, quando encerrou-se a construção da sede definitiva, na esquina entre as atuais Rua Garibaldi e Rua Madre Verônica. Ao longo desses primeiros anos, foram sendo aceitos inúmeros sócios, que realizaram doações financeiras e de materiais de construção e promoveram bailes, quermesses, torneios e rifas, com o objetivo de arrecadar fundos para a compra do terreno e edificação do novo “salão”. Data dessa época da sede ainda provisória da Sociedade Recreio Gramadense o 1º Carnaval de Gramado, em 1922. As atrações incluíram um desfile de carretas enfeitadas puxadas por cavalos, levando a rainha do carnaval fantasiada e sentada no trono, além de um baile de máscaras à noite.',
	'ano': 1915,
	'coordenadas': [-29.378194109472847, -50.872120310317705]
}, {
	'id': 58,
	'rua_id': 5,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/8chZgDJ.png'],
	'titulo': 'Recreio gramadese primeira sede',
	'descricao': 'A sociedade recreio gramadense ganha sua primeira sede',
	'ano': 1928,
	'coordenadas': [-29.378194109472847, -50.872120310317705]
}, {
	'id': 59,
	'rua_id': 5,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/Bx2zwuV.png'],
	'titulo': 'A sociedade e um lugar renomado',
	'descricao': 'Alguns anos se passaram e a sociedade recreio gramadense se torna um local renomado para festas e eventos',
	'ano': 1980,
	'coordenadas': [-29.378194109472847, -50.872120310317705]
}, {
	'id': 60,
	'rua_id': 5,
	'criador': 'Allan',
	'fotos': ['/images/historias/1917-vila.jpg'],
	'titulo': 'O Crescimento da Vila de Gramado',
	'descricao': 'Esta imagem capturada em 1917 oferece uma vista parcial da pequena vila de Gramado, que começava a se expandir. A fotografia foi tirada do Morro do Tristão, atualmente conhecido como Morro Nelz. Destacam-se, à esquerda, a capela e a casa canônica, além do prédio escuro de Pedro Benetti. À direita, a casa do Dr. Stürmhoeffel, com seus característicos dois ciprestes na frente e um telhado único, diferente da tradicional arquitetura italiana predominante na época. Tudo era construído em madeira, refletindo a simplicidade e os recursos disponíveis no início do desenvolvimento da vila. Ao fundo, pode-se ver a área que pertencia à família Lorenzoni, onde hoje se encontra o Hotel Serrano. Esta imagem marca um momento crucial da história de Gramado, quando a cidade começava a crescer e tomar forma.',
	'ano': 1917,
	'coordenadas': [-29.37540564786676, -50.87318208771154]
}, {
	'id': 61,
	'rua_id': 1,
	'criador': 'Allan',
	'fotos': ['/images/historias/1918-borges.jpg'],
	'titulo': 'A Simplicidade da Avenida Borges de Medeiros',
	'descricao': 'Em 1918, a cidade de Gramado ainda exalava a simplicidade de uma vila em crescimento. Esta imagem histórica, capturada na Avenida Borges de Medeiros, retrata as ruas de terra e as modestas construções de madeira que abrigavam os estabelecimentos locais. À direita, destaca-se a "Casa Prinz", uma das lojas tradicionais da época, já movimentada com cavalos amarrados em frente, revelando o cotidiano dos moradores e comerciantes. Ao longo da avenida, o crescimento e a urbanização eram visíveis, mas o ambiente tranquilo da pequena cidade interiorana ainda prevalecia. Essa cena encapsula um momento crucial na formação da identidade de Gramado, com suas ruas ainda em desenvolvimento e o comércio local em expansão.',
	'ano': 1918,
	'coordenadas': [-29.380643379872694, -50.87225981497985]
}, {
	'id': 62,
	'rua_id': 1,
	'criador': 'Allan',
	'fotos': ['/images/historias/1917-igreja.jpg', '/images/historias/1917-igreja2.jpg'],
	'titulo': 'O Encontro Dominical em Frente à Igreja de Gramado',
	'descricao': 'Em 1917, a cidade de Gramado era palco de encontros comunitários aos domingos pela manhã. Nesta foto histórica, uma multidão de moradores se reúne em frente à antiga igreja da cidade, no centro de Gramado. A simplicidade da arquitetura, toda em madeira, reflete a humildade e o caráter acolhedor da comunidade local. Ao lado da igreja, pode-se ver o prédio que abrigava o "Tiro de Guerra", uma instituição importante para a formação dos jovens da época. Esses encontros dominicais reforçavam os laços sociais e religiosos em uma vila que ainda estava em seus primeiros estágios de desenvolvimento. A foto captura o espírito comunitário e religioso que moldou Gramado nos primórdios de sua história.',
	'ano': 1917,
	'coordenadas': [-29.379273826997135, -50.87385145235514]
}, {
	'id': 63,
	'rua_id': 5,
	'criador': 'Allan',
	'fotos': ['/images/historias/tiro-guerra.jpg', '/images/historias/tiro-guerra-gramado.jpg'],
	'titulo': 'A Primeira Turma do Tiro de Guerra de Gramado',
	'descricao': 'Em 1918, a cidade de Gramado formava a sua primeira turma do Tiro de Guerra, uma instituição militar que treinava jovens para o serviço de defesa local. A fotografia histórica, tirada em frente à casa do Tiro de Guerra, mostra o Major Nicoletti, subintendente da época, cercado pelos recrutas e membros da comunidade. Este edifício, localizado na esquina das ruas Garibaldi e Madre Verônica, foi um marco na formação dos jovens gramadenses, contribuindo para o fortalecimento do civismo e da ordem na região. A imagem também revela o orgulho da população local, com suas roupas formais, chapéus e expressões de seriedade, refletindo a importância dessa ocasião para a vila.',
	'ano': 1918,
	'coordenadas': [-29.377922445614313, -50.8723608490952]
}, {
	'id': 64,
	'rua_id': 1,
	'criador': 'Allan',
	'fotos': ['/images/historias/comissio.jpg'],
	'titulo': 'O Comício do Partido Libertador em Gramado',
	'descricao': 'Esta fotografia, datada entre 1920 e 1925, registra um comício do extinto Partido Libertador, realizado na Avenida Borges de Medeiros, em Gramado. Na imagem, é possível ver uma grande cavalgada de participantes e apoiadores, todos com lenços vermelhos no pescoço, um símbolo característico do partido na época. As ruas de terra e as construções de madeira refletem o início do desenvolvimento urbano de Gramado. Este evento político mostra como as pequenas cidades do interior também estavam conectadas aos movimentos políticos nacionais, e como a população participava ativamente, demonstrando o seu engajamento cívico. Essa fotografia não apenas captura um momento específico da história política de Gramado, mas também a atmosfera comunitária que cercava os acontecimentos públicos.',
	'ano': 1920,
	'coordenadas': [-29.3794100079194, -50.87330572423264]
}, {
	'id': 65,
	'rua_id': 1,
	'criador': 'Allan',
	'fotos': ['/images/historias/desfile-1920.jpg'],
	'titulo': 'Parada Cívica de 7 de Setembro em Gramado',
	'descricao': 'Esta fotografia, tirada no dia 7 de setembro de 1920, registra a concentração de crianças e soldados do Tiro de Guerra em frente à Igreja São Pedro, em Gramado, após uma parada cívica em comemoração ao Dia da Independência. À direita, em terno escuro, estão Oscar Fisch e Rodolfo Schlieper, personalidades influentes da época. A icônica Igreja São Pedro, em madeira, domina a cena, com a casa do padre ("canônica") ao lado direito e, à esquerda, a pensão dos Manéias, tradicional estabelecimento local. O evento cívico, uma demonstração de patriotismo e união, envolvia toda a comunidade, simbolizando o espírito de coesão e respeito às tradições nacionais que marcou a história de Gramado nos anos iniciais de seu desenvolvimento.',
	'ano': 1920,
	'coordenadas': [-29.379418493973965, -50.87390644132891]
}, {
	'id': 66,
	'rua_id': 7,
	'criador': 'Allan',
	'fotos': ['/images/historias/primeiro-carro-gramado.jpg', '/images/historias/oferecimento-carro-major.jpg'],
	'titulo': 'O primeiro carro de Gramado foi uma doação da comunidade',
	'descricao': 'Em 1925, a comunidade de Gramado se reuniu em uma grande celebração para presentear o Major Nicoletti com um carro, um símbolo de gratidão por sua dedicação à cidade. A fotografia captura o momento em que o Major, ao lado de sua família, recebe o presente de todos os gramadenses. O evento foi repleto de emoção, com a multidão celebrando ao redor do carro e acenando com chapéus, mostrando o respeito e a admiração da população local. Este carro, fruto da colaboração de toda a comunidade, se tornou um marco na história da cidade, representando o espírito de união e reconhecimento ao Major Nicoletti, uma figura influente no desenvolvimento de Gramado.',
	'ano': 1925,
	'coordenadas': [-29.379249463490375, -50.87495816939103]
}, {
	'id': 67,
	'rua_id': 1,
	'criador': 'Allan',
	'fotos': ['/images/historias/borges-gramado-1924.jpg'],
	'titulo': 'A Avenida Borges de Medeiros com um Ar de Faroest',
	'descricao': 'Esta foto, tirada em 1924 na Avenida Borges de Medeiros, em Gramado, destaca o aspecto de uma vila em desenvolvimento, com suas ruas de terra e edificações de madeira, que conferem um ar de faroeste à cena. Na época, Gramado ainda era uma pequena vila, com uma população muito reduzida. Até os anos 1920, a cidade tinha poucas centenas de habitantes, majoritariamente descendentes de colonos alemães e italianos. O crescimento demográfico começou a se intensificar apenas nas décadas seguintes, especialmente com o desenvolvimento do turismo na região\u200b',
	'ano': 1924,
	'coordenadas': [-29.380932749842138, -50.872205640351865]
}, {
	'id': 68,
	'rua_id': 1,
	'criador': 'Allan',
	'fotos': ['/images/historias/casa-comercio.jpg', '/images/historias/arraialantigamente.jpg'],
	'titulo': 'A Casa do Dr. Ricardo Stürmhoeffel: De Residência a Ponto Comercia',
	'descricao': 'Estas fotografias, tirada em 1928, mostra a casa do Dr. Ricardo Stürmhoeffel, localizada na esquina da Avenida Borges de Medeiros com a Rua Augusto Zatti. A construção, em madeira, é um reflexo da arquitetura simples e funcional da época. Inicialmente uma residência familiar, a casa passou por transformações ao longo dos anos. Posteriormente, foi ocupada pela loja de Iracy de Fries dos Santos, e atualmente é conhecida como Arraial, um ponto comercial tradicional na cidade. Esse imóvel é uma testemunha da evolução urbana de Gramado, desde os tempos em que as ruas de terra e as poucas construções caracterizavam a paisagem da cidade.',
	'ano': 1928,
	'coordenadas': [-29.377774796838796, -50.87458707927284]
}, {
	'id': 71,
	'rua_id': 7,
	'criador': 'Allan',
	'fotos': ['/images/historias/vista-morro-serrano.jpg'],
	'titulo': 'O Crescimento de Gramado e Seus Primeiros Hotéis',
	'descricao': 'Esta fotografia, tirada no final da década de 1920, mostra a evolução de Gramado com os primeiros hotéis da cidade já em funcionamento: os hotéis Fisch, Candiago e Bertolucci. A imagem foi capturada a partir do Morro dos Lorenzoni, onde atualmente se localiza o Hotel Serrano, com vista para a Avenida Borges de Medeiros. Ao fundo, pode-se observar o "mato dos Nelz", ainda pertencente à família de Tristão de Oliveira naquela época. Em primeiro plano, destaca-se o prédio da empresa de Eugênio Bertolucci. A cidade, ainda em seus primeiros passos de urbanização, já começava a se consolidar como um destino acolhedor e promissor para turistas, com seus estabelecimentos hoteleiros se tornando marcos importantes.',
	'ano': 1929,
	'coordenadas': [-29.381567062646067, -50.873338255262695]
}, {
	'id': 73,
	'rua_id': 1,
	'criador': 'Allan',
	'fotos': ['/images/historias/estacao-gramado.jpg', '/images/historias/estacao-trem-borges.jpg'],
	'titulo': 'A Estação de Trem de Gramado nos Anos 1920',
	'descricao': 'Esta fotografia, tirada nos anos 1920, retrata a Estação de Trem de Gramado, um marco importante na história da cidade. A chegada do trem em 1921 marcou o início de uma nova era de desenvolvimento para Gramado, conectando a cidade a outras regiões e impulsionando a economia local. Na imagem, é possível ver os trilhos e os vagões de carga estacionados, além das construções de madeira que cercavam a estação. Este ponto foi fundamental para o crescimento da cidade, facilitando o transporte de mercadorias e pessoas, e simboliza a transformação de Gramado em um importante destino turístico e comercial.',
	'ano': 1922,
	'coordenadas': [-29.38181888751849, -50.87160897339214]
}, {
	'id': 78,
	'rua_id': 8,
	'criador': 'Allan',
	'fotos': ['/images/historias/vista-centro-gramado.jpg'],
	'titulo': 'O Centro de Gramado e Seus Primeiros Marcos',
	'descricao': 'Nesta imagem do centro de Gramado, podemos observar dois marcos importantes da cidade: a antiga Igreja São Pedro, à esquerda, e a Escola Santa Terezinha ao fundo. A Igreja São Pedro, construída originalmente em madeira, foi o ponto de encontro da comunidade religiosa, desempenhando um papel crucial na vida dos moradores da época. Já a Escola Santa Terezinha, dirigida pelas freiras, foi responsável por formar gerações de estudantes, consolidando-se como um centro de ensino de referência. Ao redor desses ícones, podemos ver as primeiras casas de madeira que compunham o pequeno e crescente vilarejo, caracterizando a simplicidade e o ritmo de vida da época.',
	'ano': 1934,
	'coordenadas': [-29.381142501679527, -50.874494544089615]
}, {
	'id': 79,
	'rua_id': 1,
	'criador': 'Allan',
	'fotos': ['/images/historias/igreja-sao-pedro-madeira.jpg'],
	'titulo': 'A Antiga Igreja São Pedro e a Festa de Santa Terezinha',
	'descricao': 'Em 1932, a antiga Igreja São Pedro, toda construída em madeira, foi ricamente ornamentada para celebrar a festa de Santa Terezinha, um evento organizado pela Escola das Irmãs do Imaculado Coração de Maria. A imagem da igreja decorada foi registrada por Zefiro Minghelli, que também a utilizou como um cartão postal enviado à irmã Irma Lied no aniversário dela, em 1935. A Igreja São Pedro, fundada como uma capela de madeira em 1917, era o centro das atividades religiosas da cidade, e a Festa de Santa Terezinha era um marco importante para os moradores de Gramado. Essa tradição não só envolvia os fiéis, mas também a comunidade escolar, unindo educação e religião em uma celebração que marcou época. O evento demonstrava a profunda devoção da comunidade e a importância do ensino religioso oferecido pela Escola Santa Terezinha.',
	'ano': 1932,
	'coordenadas': [-29.379457592939637, -50.87399090969397]
}, {
	'id': 80,
	'rua_id': 9,
	'criador': 'Allan',
	'fotos': ['/images/historias/cascata-caracol-antigamente.jpg'],
	'titulo': 'A Beleza Intocada da Cascata do Caracol em 1932',
	'descricao': 'Esta foto da icônica Cascata do Caracol, localizada em Canela, foi tirada por Zephiro Minghelli em 1932. A cascata, com uma queda de aproximadamente 130 metros, é uma das mais famosas atrações naturais da Serra Gaúcha. Na época em que a imagem foi capturada, o local ainda estava rodeado por uma vasta vegetação intocada, e as visitas ao Caracol não tinham a infraestrutura turística que conhecemos hoje. A beleza selvagem da região atraía fotógrafos e visitantes que desejavam contemplar suas águas caudalosas e a serenidade das matas ao redor. A Cascata do Caracol continua sendo um dos principais pontos turísticos da região, conectando passado e presente através de sua grandiosidade natural.',
	'ano': 1932,
	'coordenadas': [-29.311084728512334, -50.8542584521802]
}, {
	'id': 82,
	'rua_id': 4,
	'criador': 'Eduardo da Silva Weber',
	'fotos': ['https://i.imgur.com/qNAi68X.png'],
	'titulo': 'Hospital Arcanjo São Miguel',
	'descricao': 'Em 01/05/1937, reuniu-se pela primeira vez em assembleia geral a Sociedade Beneficente Hospitalar. O objetivo era construir em Gramado, Quinto Distrito de Taquara, um moderno hospital, que atendesse o crescente número de moradores e turistas que buscavam atendimento médico e necessitavam de estrutura hospitalar. Os principais incentivadores foram o Dr. Carlos Nelz e o Dr. Nilo Dias. Até então, os doentes eram atendidos a domicílio ou em residências particulares alugadas para esta finalidade. Após a reunião, iniciou-se a arrecadação de fundos para a compra do terreno, que ocorreu em 1938. Na etapa seguinte, foi feito o nivelamento do terreno a pás e picaretas pela Legião do Trabalho, que reunia moradores que voluntariamente construíam estradas e outras obras públicas. A pedra fundamental foi colocada em 09/04/1939. Para continuar a construção, além de coletas, foram realizados sorteios, quermesses e um chá dançante beneficente na Sociedade Recreio Gramadense, visando angariar fundos. Durante as obras, o terreno foi doado para a Congregação das Irmãs do Imaculado Coração de Maria, que também administrava o Colégio Santa Terezinha. De lá, a Madre Verônica de Jesus, a mesma que foi depois homenageada com o nome da rua, supervisionava a construção com um binóculo. A inauguração ocorreu em 26/10/1947 e o nome escolhido foi Hospital Arcanjo São Miguel. Quem assumiu como médico chefe foi o alemão Dr. Carlos Nelz, que antes presidiu a sociedade pró-construção. Uma curiosidade é que, para acolher os primeiros doentes, camas e cobertores foram doados pelos hotéis.',
	'ano': 1947,
	'coordenadas': [-29.377043304850982, -50.87040426666953]
}, {
	'id': 83,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/ANEHpuW.png'],
	'titulo': 'Igreja são pedro finalizada',
	'descricao': 'A igreja São Pedro foi finalizada, uma construção invadora e um ponto importante para todos os gramadenses',
	'ano': 1940,
	'coordenadas': [-29.37933603041661, -50.873906561987724]
}, {
	'id': 85,
	'rua_id': 8,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/J4SA3HV.png'],
	'titulo': 'Vista parcial da cidade',
	'descricao': 'foto tirada com vista parcial da cidade, podendo ver a igreja são pedro ao fundo e parte da av borges de medeiros',
	'ano': 1940,
	'coordenadas': [-29.380977420916413, -50.87467830263671]
}, {
	'id': 89,
	'rua_id': 7,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/jwkbTcu.jpeg'],
	'titulo': 'Vinícola Emílio Kunz - Petrônio',
	'descricao': 'Eugênio Balzaretti e funcionários da vinícola que localizava-se onde hoje é a Câmara de Vereadores.',
	'ano': 1940,
	'coordenadas': [-29.378693415796626, -50.87551318320132]
}, {
	'id': 91,
	'rua_id': 10,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/GCUWETU.jpeg', 'https://i.imgur.com/SFKx2hL.png'],
	'titulo': 'Inicio do Lago Negro',
	'descricao': 'A foto mostra o inicio do lago negro, com as arvores recém plantadas e o ambiente começava a ganhar forma, já em 1942 o local foi destruido por um incendio ',
	'ano': 1940,
	'coordenadas': [-29.39467160296106, -50.875977568005865]
}, {
	'id': 93,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/j6bo6n5.png'],
	'titulo': 'Igreja são pedro',
	'descricao': 'A igreja são pedro ganha muros pequenos a sua volta, tendo calçamento em seu entorno',
	'ano': 1950,
	'coordenadas': [-29.379233331160094, -50.87365389600194]
}, {
	'id': 95,
	'rua_id': 10,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/CLZCL2E.png'],
	'titulo': 'Lago negro de cara nova',
	'descricao': 'Após sua reconstrução e reflorestamento em 1953, alguns anos se passaram o lago já era muito apreciado por moradores e visitantes, trazendo semelhança aos lagos da europa',
	'ano': 1960,
	'coordenadas': [-29.394804233810873, -50.87590169045685]
}, {
	'id': 96,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/nvvP7ha.jpeg'],
	'titulo': 'A beleza do centro da cidade',
	'descricao': 'A igreja com seu jardim, ao lado cine embaixador, aos fundos a parça major nicoletti, assim a cidade era viva com construções deslumbrantes.',
	'ano': 1970,
	'coordenadas': [-29.379092476592202, -50.873336379638715]
}, {
	'id': 97,
	'rua_id': 1,
	'criador': 'Mateus Canova',
	'fotos': ['https://i.imgur.com/d01M5Sj.jpeg'],
	'titulo': 'Praça major nicoletti',
	'descricao': 'A praça major nicoletti em sua forma mais nova, com muita vegetação, frequentada por todos na cidade e os orelhões que eram um charme a parte',
	'ano': 1970,
	'coordenadas': [-29.379381786993385, -50.872968049830696]
}, {
	'id': 99,
	'rua_id': 11,
	'criador': 'Allan Fulcher',
	'fotos': ['/images/historias/famastil.png'],
	'titulo': 'Famastil 35 anos',
	'descricao': 'A história da Famastil Feramentas Ltda. é marcada por uma trajetória de sucesso, perseverança e inovação. Fundada em 17 de agosto de 1953 pelos irmãos Tissot, a empresa iniciou suas atividades de forma humilde, como uma pequena oficina na década de 50, produzindo ferraduras e consertando armas. No entanto, foi ao longo dos anos que a Famastil se consolidou como uma das mais respeitadas fabricantes de ferramentas no Brasil.\n\nEm 1988, celebrando 35 anos de atuação, a Famastil já havia alcançado patamares impressionantes. Produzindo 20 mil peças diariamente, a empresa atendia aos mercados de jardinagem, agricultura e construção civil, com presença internacional em 42 países nos cinco continentes, além de abastecer todo o mercado nacional. Esse crescimento notável foi impulsionado pela visão estratégica da família Tissot, que apostou em investimentos em tecnologia, na capacitação dos recursos humanos e na inovação de processos, como o pioneiro sistema de microempresa, que se mostrou um diferencial no mercado.\n\nA Famastil chegou a ser a vice-líder nacional em seu setor, conquistando reconhecimento e respeito em todo o país. Seus 35 anos foram celebrados como um marco de trabalho árduo, dedicação familiar e uma capacidade única de adaptação às mudanças do mercado. Embora a fábrica tenha fechado suas portas posteriormente, a história da Famastil permanece como um exemplo de sucesso e empreendedorismo para Gramado e além.',
	'ano': 1988,
	'coordenadas': [-29.41080088197733, -50.871841016585584]
}, {
	'id': 100,
	'rua_id': 12,
	'criador': 'Allan Fulcher',
	'fotos': ['/images/historias/lucirene-malhas.png'],
	'titulo': 'Malharia Lucirene 15 anos',
	'descricao': 'A Malharia Lucirene nasceu de forma simples e familiar em 1973, graças às economias de Dona Irene Libardi Preto e ao incentivo de seu genro, Gentil Bonato. Inicialmente, as primeiras malhas feitas por Dona Irene em casa, com uma máquina Lanofix, visavam pagar a Previdência Social. Com a qualidade de suas peças ganhando destaque, Gentil propôs a abertura de uma malharia.\n\nO empreendimento começou ocupando um dos quartos da casa de Irene, mas o sucesso logo levou à abertura de um ponto de venda na Rua Senador Salgado Filho. Em 1975, a empresa adquiriu novas máquinas e construiu uma fábrica de 70 metros quadrados, que logo foi ampliada para 200 metros, chegando aos 2 mil metros quadrados anos depois.\n\nA Lucirene, ao longo dos anos, tornou-se uma das cinco maiores malharias do Estado, chegando a abrir um escritório na 5ª Avenida, em Nova York, para entrar no competitivo mercado norte-americano. A empresa também investiu em projetos culturais, como a Torre Café Colonial, um espaço para exposições e lançamentos de livros.\n\nA imagem histórica que marca os 15 anos da Lucirene retrata a equipe em frente à fábrica, localizada onde hoje está a Unopar, um símbolo do sucesso e do legado da empresa.',
	'ano': 1988,
	'coordenadas': [-29.38134090803302, -50.878931456226425]
}, {
	'id': 102,
	'rua_id': 13,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/Igreja-pedra-1932.png'],
	'titulo': 'Fachada Igreja de pedra',
	'descricao': 'Fachada original da igreja matriz, com inicio da construção em setembro de 1926 e finalizada em 1932.',
	'ano': 1932,
	'coordenadas': [-29.363857475974275, -50.80930041252479]
}, {
	'id': 103,
	'rua_id': 13,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/praça-igreja-matriz-1950.png'],
	'titulo': 'Praça da Igreja matriz',
	'descricao': 'Praça da igreja antiga, juntamente com o colégio aauxiliadora e seu salão de festas de madeira ao fundo',
	'ano': 1950,
	'coordenadas': [-29.363455406670916, -50.8099602359294]
}, {
	'id': 104,
	'rua_id': 13,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/nevada-igreja-1994.png'],
	'titulo': 'Neve na cidade',
	'descricao': 'Neve vista da praça em frente da igreja matriz na grande nevasca de 1994',
	'ano': 1994,
	'coordenadas': [-29.36369851853247, -50.80995755372044]
}, {
	'id': 105,
	'rua_id': 14,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/vista-area-felisberto-1961.png'],
	'titulo': 'Vista aerea ',
	'descricao': 'Vista aerea da rua felisberto soares, ponto de vista da torre na igreja de pedra',
	'ano': 1961,
	'coordenadas': [-29.363801373376088, -50.81004338440721]
}, {
	'id': 106,
	'rua_id': 14,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/circulo-operario-1960.png'],
	'titulo': 'Círculo operário de Canela',
	'descricao': 'Círculo operário de Canela criado em 1944, ficava na esquina da rua dona carlinda, atualmente se localiza a caxa economica federal',
	'ano': 1960,
	'coordenadas': [-29.36383167357179, -50.811361158316934]
}, {
	'id': 107,
	'rua_id': 14,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/madeireira-agricola-1962.png'],
	'titulo': 'Madeireira Agrícola',
	'descricao': 'Na foto vemos a madeireira agrícola, com caminhões carregados prontoss para a saída, atualmente este predio com diversos estabelicimentos',
	'ano': 1962,
	'coordenadas': [-29.36382970788541, -50.811446865793165]
}, {
	'id': 108,
	'rua_id': 14,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/sorveteria-prater-1935.png'],
	'titulo': 'Sorveteria prater',
	'descricao': 'a sorveteria prater era muito conhecida por todos, localizada bem no centro da igreja, atualmete no mesmo local se encontra uma lancheria tambem bastante conhecida na cidade',
	'ano': 1935,
	'coordenadas': [-29.36380611964579, -50.8131339498315]
}, {
	'id': 109,
	'rua_id': 14,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/aerea-praca-1980.png'],
	'titulo': 'Vista aérea praça João Corrêa',
	'descricao': 'Vista aérea da praça João Corrêa, a direita o Cine Marabá, aos fundos a estação ferroviária e seu antigo trajeto',
	'ano': 1980,
	'coordenadas': [-29.363701027127796, -50.813197728397995]
}, {
	'id': 110,
	'rua_id': 15,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/rodoviaria-antiga-1961.png'],
	'titulo': 'Antiga Estação rodoviária',
	'descricao': 'Antiga Estação Rodoviária de canela em frente a praça João corrêa',
	'ano': 1961,
	'coordenadas': [-29.362917858390286, -50.8136374875039]
}, {
	'id': 111,
	'rua_id': 16,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/estaçao-ferroviaria-1934.png'],
	'titulo': 'Estação Ferroviária ',
	'descricao': 'Construida em 1922, era um dos grandes icones da cidade, com a chegada do trem vieram novas perspectivas de progresso a cidade, atulamente ainda há pontos revitaalizados deste importante marco a cidade.',
	'ano': 1934,
	'coordenadas': [-29.36400351808766, -50.814283664585]
}, {
	'id': 112,
	'rua_id': 15,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/cine-maraba-1960.png'],
	'titulo': 'Cine Marabá',
	'descricao': 'Em frente a praça João Corrêa ficava o Cine Marabá, com capaciade para 1.100 pessoas, era muito visitado por todas na cidade',
	'ano': 1960,
	'coordenadas': [-29.363039842036176, -50.81426984970423]
}, {
	'id': 113,
	'rua_id': 17,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/desfile-civico-1958.png'],
	'titulo': 'Desfile 7 de setembro',
	'descricao': 'O desfile de 7 de setembro de 1958 na Av. Osvaldo Aranha, reunia centenas de pessoas para acompanhar o desfile civico da cidade',
	'ano': 1958,
	'coordenadas': [-29.3636473930459, -50.81415051732195]
}, {
	'id': 114,
	'rua_id': 17,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/oficina-caminhao-1940.png'],
	'titulo': 'Oficina Mecânica de caminhões ',
	'descricao': 'Primeiro predio da oficina mecânica de caminhões na av osvaldo aranha, atualmente no mesmo local contem uma sucessão de salas de comerciais',
	'ano': 1940,
	'coordenadas': [-29.363558490408433, -50.81516591601752]
}, {
	'id': 115,
	'rua_id': 17,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/osvaldo-aranha-1970.png'],
	'titulo': 'Avenida Osvaldo Aranha',
	'descricao': 'Vista da cidade em sentido a igrejaa matriz, com bastante comercios pela avenida central da cidade',
	'ano': 1970,
	'coordenadas': [-29.363437600299285, -50.81563279621888]
}, {
	'id': 116,
	'rua_id': 17,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/revenda-ford-1950.png'],
	'titulo': 'Antiga revenda da Ford',
	'descricao': 'Antiga revenda da Ford e posto de gasolina da esso, atualmente se localiza o posto da rede SIM, e aos fundos Star Video locadora',
	'ano': 1950,
	'coordenadas': [-29.363401234953066, -50.815442209855185]
}, {
	'id': 117,
	'rua_id': 17,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/hote-bella-vista-1958.png'],
	'titulo': 'Hotel Bella Vista',
	'descricao': 'O antigo Hotel Bella Vista, muito frequentado na época por visitantes e veranistas',
	'ano': 1958,
	'coordenadas': [-29.36330491586734, -50.81588991865056]
}, {
	'id': 118,
	'rua_id': 18,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/grande-hotel-canela-1930.png'],
	'titulo': 'Grande Hotel Canela',
	'descricao': 'Infraestrutura do Hotel, com o salão principal um dos primeiros predios construidos no local, existente até hoje',
	'ano': 1930,
	'coordenadas': [-29.360771338970594, -50.81965468771271]
}, {
	'id': 119,
	'rua_id': 20,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/banco-nacional-1961.png'],
	'titulo': 'Banco Nacional do Comércio',
	'descricao': 'Na Avenida Julio de Castilhos, esquina com Rua Augusto Pestana, localizava-se o icônico edifício do Banco Nacional do Comércio, na foto tambem vemos o primeiro ônibus urbano de Canela',
	'ano': 1961,
	'coordenadas': [-29.361857387310437, -50.812940838532555]
}, {
	'id': 120,
	'rua_id': 21,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/desfile-7-setembro-1960.png'],
	'titulo': 'Desfile 7 de Setembro',
	'descricao': 'Desfile civico ocorrido em 1960 na Rua Augusto Pestana',
	'ano': 1960,
	'coordenadas': [-29.361868507126644, -50.812494280255166]
}, {
	'id': 121,
	'rua_id': 21,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/7-setembro-1972.png'],
	'titulo': 'Desfile Civico',
	'descricao': 'Desfile de 7 de setembro de 1972 na Rua Dona Carlinda, atualmente nesta rua se localiza a prefeitura de Canela e o Forúm da cidade',
	'ano': 1972,
	'coordenadas': [-29.362201576917958, -50.81130767722403]
}, {
	'id': 122,
	'rua_id': 19,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/revenda-dodge-1950.png'],
	'titulo': 'Revanda Dodge',
	'descricao': 'Revenda Dodge de Canela em frente a bomba de gasolina',
	'ano': 1950,
	'coordenadas': [-29.359118628518956, -50.812806956868876]
}, {
	'id': 123,
	'rua_id': 22,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/vista-martinho-1936.png'],
	'titulo': 'Vista aerea Rua Martinho Lutero',
	'descricao': 'Vista aerea de Canela em 1936, Ponto de vista da Igreja Evangélica São João, com a antiga igreja matriz ao fundo',
	'ano': 1936,
	'coordenadas': [-29.359037452938637, -50.81305826425927]
}, {
	'id': 124,
	'rua_id': 22,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/igreja-luterana-1945.png'],
	'titulo': 'Igreja Evangélica da Confissão Luterana',
	'descricao': 'Igreja Evangélica da Confissão Luterana na época de sua inauguração em 1945, podemos ver na foto muitos fieis indo visita-lá',
	'ano': 1945,
	'coordenadas': [-29.35892165306556, -50.813390145926675]
}, {
	'id': 125,
	'rua_id': 22,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/clube-serrano-1940.png'],
	'titulo': 'Clube Serrano',
	'descricao': 'Fachado do clube serrano em 1940, o local foi fundado em 1926 e atualmente se encontra no mesmo local com sua fachada ampliada',
	'ano': 1940,
	'coordenadas': [-29.358932779585626, -50.81458450824834]
}, {
	'id': 126,
	'rua_id': 23,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/posto-texaco-1957.png'],
	'titulo': 'Posto Texaco',
	'descricao': 'Posto Texaco contruido em 1957 na Rua João Pessoa',
	'ano': 1957,
	'coordenadas': [-29.35776342488764, -50.81026934468572]
}, {
	'id': 127,
	'rua_id': 23,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/acougue-bohrer-1980.png'],
	'titulo': 'Açougue Bohrer',
	'descricao': 'Antigo Açougue Bohrer, muito conhecida na cidade, a casa da direita ssem encontra até hoje no local',
	'ano': 1980,
	'coordenadas': [-29.357493206499615, -50.80997133283031]
}, {
	'id': 128,
	'rua_id': 23,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/casa-raymundo-1986.png'],
	'titulo': 'Casa Raymundo',
	'descricao': 'Antiga Casa Raymundo, armazém e loja de variedade, em torno ficava as casas da família, atualmente se localiza o Super Mercado Rissul',
	'ano': 1986,
	'coordenadas': [-29.356978891627186, -50.8082122121541]
}, {
	'id': 129,
	'rua_id': 23,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/carretas-atoladas-1933.png'],
	'titulo': 'Carretas Atoladas',
	'descricao': 'Carretas atoladas na Rua João pessoa, indo em direção ao bairro Canelinha, a casa do meio viria a ser o antigo açougue fachin',
	'ano': 1933,
	'coordenadas': [-29.356895997673995, -50.807718071215646]
}, {
	'id': 130,
	'rua_id': 24,
	'criador': 'Mateus Canova',
	'fotos': [{url:'/images/historias/hospital-canela-1961.png'}],
	'titulo': 'Hospital de Canela',
	'descricao': 'Antigo prédio do Hospital de Canela, atualmente tem preservado boa parte da sua caracterísca, ampliando somente em infraestrutura',
	'ano': 1961,
	'coordenadas': [-29.361006883253978, -50.808509995102916]
}, {
	'id': 131,
	'rua_id': 25,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/praça-lago-1992.png'],
	'titulo': 'Praça do Lago',
	'descricao': 'Obras iniciais de contençaõ do lago, após a finalização o espaço busca trazer lazer a população',
	'ano': 1992,
	'coordenadas': [-29.36381035494277, -50.80244921686608]
}, {
	'id': 132,
	'rua_id': 26,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/caravagio-1963.png'],
	'titulo': 'Festa no Santúario Caravaggio',
	'descricao': 'Local onde se encontra o Santúario Caravaggio no bairro Saiqui, apreciado por muitos católicos e sua tradicional festa em 26 de maio de 1963',
	'ano': 1963,
	'coordenadas': [-29.321806808179453, -50.77359948701709]
}, {
	'id': 133,
	'rua_id': 26,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/casa-wortmann-1940.png'],
	'titulo': 'Casarão Wortmann',
	'descricao': 'Antiga casado Professor Carlos Wortmann, primeira sede da atual escola Neusa Mari Pacheco, sendo referência no estado do Rio Grande do Sul',
	'ano': 1940,
	'coordenadas': [-29.350197477993717, -50.79890840831919]
}, {
	'id': 134,
	'rua_id': 9,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/castelinho-caracol-1940.png'],
	'titulo': 'Castelinho do Caracol',
	'descricao': 'Castelinho do Caracol, casa construída sem uso de pregos, sua estrutura foi mantida intacta até hoje e abriga o Café Castelinho do Caracol, muito conhecido pelo seu applefell strudel tradicional torta alemã de maça',
	'ano': 1940,
	'coordenadas': [-29.335508186778107, -50.8501067288223]
}, {
	'id': 135,
	'rua_id': 9,
	'criador': 'Mateus Canova',
	'fotos': ['/images/historias/cascata-caracol-1961.png'],
	'titulo': 'Cascata do Caracol',
	'descricao': 'A famosa Cascata do Caracol, muito visitada por todos, um dos principais pontos turisticos da cidade, conta com um ambiente preservado, e uma quedaa de 130m conforme medições atuais.',
	'ano': 1961,
	'coordenadas': [-29.31295260355406, -50.85195529552594]
},     {
    id: 136,
    rua_id: 13,
    criador: 'Canela Fotos',
    fotos: [
      '/images/historias/igreja-canela-74.jpg'
    ],
    titulo: 'Construção nova igreja de Canela',
    descricao: 'Em 1964 foram concluídas as paredes ao redor da antiga Igreja e então se deu a demolição da mesma.',
    ano: 1964,
    coordenadas: [-29.363275343461503, -50.81002083772186]
  },
  {
    id: 137,
    rua_id: 2,
    criador: 'Henrique Canova',
    fotos: [
      '/images/historias/nova-rodoviaria83-2.jpg',
      '/images/historias/nova-rodoviaria83.jpg'
    ],
    titulo: 'A Nova Porta de Entrada: A Inauguração da Rodoviária de Gramado',
    descricao: 'Em 1979, a charmosa cidade de Gramado estava prestes a dar mais um passo em sua jornada de desenvolvimento turístico. A antiga estação ferroviária, localizada na Avenida Borges de Medeiros, cederia lugar a uma moderna rodoviária, simbolizando a transição dos trilhos para as estradas. A aquisição do terreno, com 9.240 metros quadrados, pela Prefeitura Municipal, representava a realização de um antigo sonho da comunidade. O então prefeito, Nelson Dinnebier, assinou a escritura definitiva, expressando o desejo de iniciar as obras ainda em seu mandato. A nova rodoviária prometia ser uma das mais modernas do Estado, com capacidade para 14 ônibus simultaneamente, além de oferecer restaurante, lanchonete e até mesmo um hotel. Essa iniciativa não apenas modernizaria a infraestrutura da cidade, mas também reforçaria Gramado como um destino turístico de destaque, acolhendo visitantes com ainda mais conforto e eficiência.',
    ano: 1979,
    coordenadas: [-29.383504986378256, -50.87198568723769]
  },
  {
    id: 138,
    rua_id: 3,
    criador: 'Henrique Canova',
    fotos: [
      '/images/historias/festa-hortensias.jpg'
    ],
    titulo: 'A Festa das Hortênsias: O Florescer de uma Tradição em Gramado',
    descricao: 'Em dezembro de 1958, Gramado, a encantadora cidade da Serra Gaúcha, preparava-se para um evento que marcaria para sempre sua história: a primeira Festa das Hortênsias. Idealizada por visionários como Oscar Knorr e Walter Bertolucci, a celebração ocorreu nos dias 7 e 8 de dezembro, encantando moradores e visitantes com suas cores e aromas. \nSAFERRARI.BLOGSPOT.COM\n\nA festa não apenas exaltava a beleza das hortênsias que adornavam a cidade, mas também simbolizava o florescer de Gramado como um destino turístico de destaque. A programação incluiu apresentações de balé, danças gaúchas e a coroação da primeira Rainha das Hortênsias, Iraci Casagrande, acompanhada das princesas Rosalina Petersen e Irani Stürmer. \nILTONMULLER.COM.BR\n\nO sucesso do evento foi tão grande que ultrapassou as fronteiras do Rio Grande do Sul, projetando Gramado no cenário turístico nacional e plantando as sementes para futuras celebrações que se tornariam tradição na cidade. A Festa das Hortênsias floresceu por 12 edições, sendo a última realizada em 1986, ano que também marcou o nascimento do Natal Luz, outro evento icônico de Gramado. \nSAFERRARI.BLOGSPOT.COM\n\nAssim, a Festa das Hortênsias não apenas celebrou a flora local, mas também cultivou o espírito comunitário e a vocação turística de Gramado, deixando um legado que continua a inspirar eventos e festividades na cidade até os dias de hoje.',
    ano: 1958,
    coordenadas: [-29.38645605666849, -50.87496676214851]
  },
  {
    id: 139,
    rua_id: 10,
    criador: 'Henrique Canova',
    fotos: [
      '/images/historias/cavalo-lago-negro.jpg'
    ],
    titulo: 'Cavalos e Hortênsias: A Harmonia do Lago Negro',
    descricao: 'Na década de 1970, o pitoresco Lago Negro de Gramado não era apenas um refúgio para amantes da natureza, mas também um ponto de encontro para entusiastas da equitação. Cavaleiros elegantemente trajados desfilavam ao redor do lago, compartilhando trilhas com pedestres que admiravam as deslumbrantes hortênsias em flor. Para garantir a convivência harmoniosa entre todos, a comunidade local propôs medidas como a disciplina do tráfego, a definição de limites de velocidade e a criação de áreas específicas para passeios a pé e a cavalo. Essas iniciativas visavam preservar a tranquilidade e a segurança do Lago Negro, assegurando que tanto cavaleiros quanto pedestres pudessem desfrutar plenamente da serenidade e beleza deste icônico ponto turístico de Gramado.',
    ano: 1958,
    coordenadas: [-29.393598021923268, -50.87678033335178]
  },
  {
    id: 140,
    rua_id: 8,
    criador: 'Henrique Canova',
    fotos: [
      '/images/historias/1-radio-gramado.jpg'
    ],
    titulo: 'A Voz de Gramado: A Inauguração da Primeira Rádio da Cidade',
    descricao: 'Em 13 de outubro de 1978, Gramado celebrou um marco em sua história com a inauguração da Rádio Excelsior AM 1440. A cerimônia ocorreu no Cine Embaixador, onde artistas renomados, como o Conjunto Impacto de Porto Alegre, encantaram o público com apresentações vibrantes. No dia seguinte, 14 de outubro, a sede da emissora, situada na Avenida Costa e Silva, 78, foi oficialmente inaugurada, contando com a presença de autoridades locais e convidados ilustres. A Rádio Excelsior trouxe uma nova dinâmica à comunicação na cidade, oferecendo uma programação diversificada que incluía músicas típicas alemãs, programas interativos com ouvintes e noticiários regionais. Com um transmissor de 250 watts na frequência de 1510 kHz, a emissora rapidamente se tornou uma parte essencial da vida dos gramadenses, conectando a comunidade e dando voz aos moradores locais.',
    ano: 1978,
    coordenadas: [-29.378404488019275, -50.8654799049953]
  },
  {
    id: 141,
    rua_id: 8,
    criador: 'Henrique Canova',
    fotos: [
      '/images/historias/laje-de-pedra-1.jpg',
      '/images/historias/laje-de-pedra-2.jpg',
      '/images/historias/laje-de-pedra-3.jpg'
    ],
    titulo: 'A Inauguração do Hotel Laje de Pedra e o Crescimento do Turismo em Canela',
    descricao: 'No dia 3 de dezembro de 1978, a Serra Gaúcha testemunhou um marco histórico com a inauguração do Hotel Laje de Pedra, em Canela. O evento, presidido pelo governador Sinval Guazzelli, contou com a presença de autoridades como o futuro governador Amaral de Souza e o presidente da Embratur, Said Farhat. Com uma estrutura moderna e localização privilegiada, o empreendimento fortaleceu a vocação turística da região, consolidando Canela como destino para grandes convenções e eventos, impulsionando o desenvolvimento econômico local.',
    ano: 1978,
    coordenadas: null
  },
  {
    id: 142,
    rua_id: 7,
    criador: 'Henrique Canova',
    fotos: [
      '/images/historias/artesanto-gramado-historia.jpg'
    ],
    titulo: 'A História do Artesanato de Gramado: Tradição e Criatividade na Serra Gaúcha',
    descricao: 'Localizada na Serra Gaúcha, no estado do Rio Grande do Sul, a cidade de Gramado se destaca não apenas por seu turismo, mas também por sua rica tradição artesanal. O artesanato local tem suas raízes no início do século XX, com pioneiros como Aldno Asem, mestre na produção de móveis e objetos de vime, e Elisabeth Rosenfeld, responsável por impulsionar o design e a comercialização de móveis da região. Com o tempo, a cidade se tornou um polo de referência, exportando sua produção para diversos países e consolidando eventos como a Feira Nacional do Artesanato. Hoje, Gramado mantém viva sua identidade artesanal, unindo tradição e inovação no cenário cultural e econômico da Serra Gaúcha. A história do artesanato de Gramado teve diferentes locais de desenvolvimento ao longo dos anos. Um dos marcos foi a fábrica de Elisabeth Rosenfeld, localizada na Rua São Pedro, que ajudou a impulsionar a produção e exportação de móveis artesanais. Além disso, a tradicional Feira Nacional do Artesanato ocorre em espaços como o Centro de Eventos ExpoGramado, situado na Avenida Borges de Medeiros, uma das principais vias da cidade.',
    ano: 1930,
    coordenadas: [-29.37503258612303, -50.877708362149086]
  },
  {
    id: 143,
    rua_id: 1,
    criador: 'Henrique Canova',
    fotos: [
      '/images/historias/praça-major-nicoleti.jpg'
    ],
    titulo: 'Praça Major Nicoletti: Um Símbolo Histórico no Coração de Gramado',
    descricao: 'A Praça Major Nicoletti, inaugurada em 1936, é um dos marcos históricos de Gramado, situada no coração da cidade, em frente à Igreja Matriz São Pedro e ao Palácio dos Festivais. Nomeada em homenagem ao Major José Nicoletti Filho, primeiro subintendente local e figura central na fundação de Gramado, a praça tornou-se um ponto de encontro para moradores e visitantes ao longo das décadas. Após uma significativa reforma em 2003, o espaço foi revitalizado, mantendo seu charme original e reforçando sua importância como um dos cenários mais característicos da cidade. Atualmente, a Praça Major Nicoletti oferece aos visitantes uma vista privilegiada de outros pontos turísticos emblemáticos, como a Rua Coberta e a Avenida Borges de Medeiros. Além disso, abriga um coreto que serve como ponto de venda de produtos da grife oficial "Gramado Inesquecível", proporcionando uma experiência cultural e comercial única.',
    ano: 1979,
    coordenadas: [-29.379159395213012, -50.8730453993464]
  },
  {
    id: 144,
    rua_id: 1,
    criador: 'Henrique Canova',
    fotos: [
      '/images/historias/centro-medico1.jpg',
      '/images/historias/centro-medico2.jpg',
      '/images/historias/centro-medico3.jpg',
      '/images/historias/centro-medico4.jpg'
    ],
    titulo: 'Inauguração do Centro Médico e Odontológico de Gramado',
    descricao: 'A cidade de Gramado deu um importante passo na área da saúde com a inauguração do Centro Médico e Odontológico, localizado na Avenida Augusto Zatti. O novo complexo foi criado para atender à crescente demanda por serviços médicos especializados, tanto para os moradores locais quanto para os turistas. Com uma equipe multidisciplinar composta por clínicos gerais, ortopedistas, cardiologistas, psiquiatras, dentistas e outros especialistas, o centro trouxe mais comodidade para a população, reduzindo a necessidade de deslocamento para Porto Alegre ou Caxias do Sul.\n\nAlém do atendimento médico 24 horas, o espaço conta com pronto-socorro de urgência, serviço de fisioterapia, ambulância para remoções, centro cirúrgico e um laboratório de análises clínicas moderno. Anexo ao centro, foi inaugurada a Farmácia Real, oferecendo plantão 24 horas para garantir assistência contínua. O Centro Médico e Odontológico de Gramado representa um avanço significativo para a infraestrutura de saúde do município, consolidando-se como um serviço essencial para a comunidade.',
    ano: 1980,
    coordenadas: [-29.377366356358426, -50.873724397730875]
  },
  {
    id: 145,
    rua_id: 1,
    criador: 'Henrique Canova',
    fotos: [
      '/images/historias/igreja-sao-pedro1.jpg',
      '/images/historias/igreja-sao-pedro2.jpg'
    ],
    titulo: 'Igreja Matriz São Pedro: O Símbolo Religioso e Arquitetônico de Gramado',
    descricao: 'Localizada no coração de Gramado, a Igreja Matriz São Pedro é um dos monumentos mais icônicos da cidade e um dos cartões-postais da Serra Gaúcha. Sua construção teve início em 1917, inicialmente como uma capela de madeira, e em 1942 foi concluída a atual estrutura em pedra basáltica, inspirada no estilo arquitetônico romano. A imponência da igreja é complementada por sua torre de 46 metros de altura e seus belíssimos vitrais importados da Bélgica, que retratam passagens da vida do apóstolo São Pedro.\n\nA igreja está situada na Avenida Borges de Medeiros, em frente à Praça Major Nicoletti, e faz parte do cenário central de Gramado, ao lado do Palácio dos Festivais. Além de seu valor histórico e religioso, o local se tornou um importante ponto turístico, recebendo visitantes de todo o Brasil e do exterior. À sua frente, as estátuas dos 12 apóstolos formam um conjunto simbólico que reforça a identidade cristã da construção.\n\nA Igreja São Pedro não é apenas um local de fé e devoção, mas também um marco cultural e arquitetônico da cidade, sendo palco de celebrações tradicionais como o Natal Luz e a Páscoa em Gramado. Seu charme e imponência fazem dela um dos principais atrativos da região, destacando-se como um patrimônio que une história, arte e religiosidade.',
    ano: 1979,
    coordenadas: [-29.379283238464232, -50.87379472447617]
  },
  {
    id: 146,
    rua_id: 1,
    criador: 'Henrique Canova',
    fotos: [
      '/images/historias/parque-knorr11.jpg',
      '/images/historias/parque-knorr22.jpg'
    ],
    titulo: 'Parque Knorr: Um Refúgio Natural e Histórico em Gramado',
    descricao: 'O Parque Knorr é um dos mais encantadores refúgios naturais de Gramado, combinando história, beleza paisagística e cultura local. Criado pelo imigrante alemão Oscar João Knorr, o parque surgiu da visão de um homem apaixonado pela natureza, que transformou uma área privilegiada da cidade em um verdadeiro jardim alpino. Com sua localização privilegiada, próxima ao Centro de Gramado, o parque oferece uma vista deslumbrante do Vale do Quilombo, um dos mais belos cartões-postais da Serra Gaúcha.\n\nO espaço abriga uma rica vegetação composta por árvores nativas, coníferas e flores, sendo um ambiente ideal para contemplação e passeios tranquilos. Durante sua administração pela companhia aérea VARIG, o parque passou a ser um patrimônio público, tornando-se um dos principais pontos turísticos da cidade. Atualmente, o Parque Knorr também é conhecido por abrigar a Aldeia do Papai Noel, uma das atrações mais visitadas durante o Natal Luz.\n\nCom sua atmosfera nostálgica e romântica, o Parque Knorr se mantém como um símbolo da preservação ambiental e do amor à natureza. Ele não apenas representa a beleza natural de Gramado, mas também reforça o vínculo da cidade com suas tradições e com o legado de seus pioneiros.',
    ano: 1979,
    coordenadas: [-29.38151715920746, -50.8710748400639]
  },
  {
    id: 147,
    rua_id: 1,
    criador: 'Henrique Canova',
    fotos: [
      '/images/historias/av-borges-neve.jpg'
    ],
    titulo: 'Neve em Gramado: O Inverno Histórico de 1920',
    descricao: 'No rigoroso inverno de 1920, a cidade de Gramado – RS viveu um dos momentos mais marcantes de sua história climática: uma intensa nevasca cobriu suas ruas, transformando a paisagem em um cenário digno das regiões mais frias do mundo. A Avenida Borges de Medeiros, uma das principais vias da cidade, ficou totalmente coberta de neve, proporcionando um espetáculo natural raro e inesquecível para os moradores da época.\n\nA cena, registrada em fotografias históricas, mostra a altura da neve na região onde hoje se encontra a loja Iraci, evidenciando a magnitude do fenômeno. Esse episódio reforça o clima europeu característico da Serra Gaúcha, que, desde então, se consolidou como um dos grandes atrativos turísticos da cidade, despertando o encanto de visitantes que sonham em vivenciar a neve no Brasil.\n\nEste acontecimento integra o acervo cultural do Museu Histórico de Gramado, que preserva memórias da cidade e relembra momentos emblemáticos que ajudaram a moldar a identidade local. A neve de 1920 permanece como um dos grandes marcos climáticos de Gramado, tornando-se uma referência nostálgica e simbólica para a cidade e seus habitantes.',
    ano: 1920,
    coordenadas: [-29.38543515802406, -50.87365046214866]
  },
  {
    id: 148,
    rua_id: 5,
    criador: 'Henrique Canova',
    fotos: [
      '/images/historias/rua-garibaldi.jpg'
    ],
    titulo: 'Expansão Urbana: Continuidade da Rua Garibaldi',
    descricao: 'A cidade de Gramado – RS passou por um importante processo de planejamento urbano com a implementação da Lei 457/75, parte do Plano Diretor Urbano do município. Dentro desse contexto, uma das mudanças significativas foi a continuidade da Rua Garibaldi até a Rua 7 de Setembro, promovendo uma melhor organização do crescimento territorial da cidade.\n\nEssa expansão visa não apenas a melhoria na mobilidade urbana, mas também o ordenamento do espaço público, garantindo que o desenvolvimento ocorra de forma planejada e sustentável. O Plano Diretor de Gramado tem como objetivo principal a preservação da identidade da cidade, conciliando o crescimento com a manutenção das características arquitetônicas e culturais que fazem da região um dos destinos turísticos mais procurados do país.\n\nA ampliação da Rua Garibaldi reflete a necessidade de adaptação da cidade ao seu crescimento populacional e turístico, proporcionando uma infraestrutura adequada para moradores e visitantes. Com diretrizes bem estabelecidas, a expansão busca harmonizar o progresso com a preservação do charme característico da Serra Gaúcha.',
    ano: 1975,
    coordenadas: [-29.378228245940026, -50.872177733312746]
  },
  {
    id: 149,
    rua_id: 5,
    criador: 'Henrique Canova',
    fotos: [
      '/images/historias/banco-do-brasil-74.jpg'
    ],
    titulo: 'A Chegada do Primeiro Banco do Brasil em Gramado',
    descricao: 'A instalação do primeiro Banco do Brasil em Gramado – RS marcou um importante passo no desenvolvimento econômico e financeiro da cidade. Inaugurado em 15 de dezembro de 1981, o edifício foi construído em um estilo bávaro, harmonizando-se perfeitamente com a arquitetura característica da cidade Jardim das Hortênsias.\n\nLocalizado em uma esquina estratégica, o banco tornou-se uma referência visual e um símbolo do progresso local. Além de facilitar o acesso a serviços bancários para os moradores e empresários, sua presença impulsionou o setor comercial e turístico da região, fortalecendo a economia da cidade.\n\nO prédio, com seu design singular, é um dos poucos exemplos de arquitetura bávara aplicados a uma instituição financeira no Brasil. Essa particularidade reforça a identidade única de Gramado, uma cidade que sempre valorizou sua herança cultural e estética. A chegada do Banco do Brasil consolidou a cidade como um centro financeiro emergente na Serra Gaúcha, acompanhando o crescimento do turismo e o aumento das atividades empresariais na região.',
    ano: 1981,
    coordenadas: [-29.37828433987652, -50.87219916582528]
  },
  {
    id: 150,
    rua_id: 13,
    criador: 'Henrique Canova',
    fotos: [
      '/images/historias/igreja-canela-74.jpg'
    ],
    titulo: 'A Igreja Matriz de Canela em 1974: Um Ícone da Serra Gaúcha',
    descricao: 'Em 1974, a Igreja Matriz de Canela, também conhecida como Catedral de Pedra, já se destacava como um dos principais cartões-postais da Serra Gaúcha. Localizada no coração de Canela, sua imponente estrutura em estilo gótico inglês e sua torre de 65 metros de altura tornavam-se símbolos de fé e beleza arquitetônica.\n\nConstruída com pedra basáltica, a catedral começou a ser erguida em 1953 e teve sua obra concluída nos anos seguintes, tornando-se um ponto turístico e religioso de grande relevância. Na década de 1970, a igreja já atraía visitantes e fiéis, consolidando-se como um dos monumentos mais importantes do Rio Grande do Sul.\n\nA Igreja Matriz de Canela não é apenas um local de culto, mas também um patrimônio cultural e histórico. Em 1974, sua presença já embelezava a cidade, e seu charme gótico seguia encantando moradores e turistas, reforçando sua importância para a identidade local e o desenvolvimento do turismo na região.',
    ano: 1974,
    coordenadas: [-29.363651963083704, -50.80943982633361]
  },
  {
    id: 151,
    rua_id: 17,
    criador: 'Henrique Canova',
    fotos: [
      '/images/historias/1-cinema-de-canela.jpg'
    ],
    titulo: 'O Primeiro Cinema de Canela-RS: História e Reforma',
    descricao: 'O primeiro cinema de Canela, conhecido como Cine Ideal, foi inaugurado em 1930, situado na Rua Osvaldo Aranha, tornando-se um marco cultural e social para a comunidade. Inicialmente, o cinema enfrentou desafios operacionais devido à limitação dos equipamentos disponíveis na época. A exibição de filmes exigia constantes interrupções para a troca de rolos, uma vez que a projeção era feita com uma única máquina, o que gerava longos intervalos e insatisfação do público.\n\nEm 1934, Hugo Schmitt, vindo de Campo Bom, assumiu a administração do cinema e implementou uma transformação significativa, introduzindo o Cinema Sonoro, conhecido como "falado". O primeiro filme exibido com essa tecnologia foi "O Congresso Dança", uma opereta que gerou grande expectativa entre os moradores. Apesar das inovações e da publicidade bem elaborada, o cinema continuou a enfrentar desafios técnicos, como a falta de latas para armazenar os filmes emendados, o que levou a um incidente perigoso: um princípio de incêndio durante a exibição de "A Guerra das Valsas", causado pela combustão de uma fita pendurada na parede.\n\nCom o passar dos anos, a necessidade de modernização levou Pedro Oscar Selbach a realizar uma grande reforma no cinema. Foram instalados novos equipamentos de projeção KLANG-FILM, um assoalho inclinado para melhor visibilidade e melhorias estruturais que tornaram a experiência dos espectadores mais confortável. Durante a década de 1940, o cinema viveu seu auge, exibindo grandes clássicos e musicais que marcaram época.\n\nNo entanto, com o tempo, a popularização da televisão e novas formas de entretenimento impactaram a frequência ao cinema, levando à sua decadência. Eventualmente, o prédio foi demolido, restando apenas a lembrança do Cine Ideal como o primeiro espaço dedicado à sétima arte em Canela e um ponto de encontro essencial para a comunidade local. Seu anexo, o Café Ideal, também teve grande importância social, servindo como local de reuniões e debates entre amigos, esportistas, políticos e visitantes da cidade.\n\nA demolição do Cine Ideal marcou o fim de uma era para Canela, mas sua história continua viva na memória dos moradores e na evolução cultural da cidade.',
    ano: 1974,
    coordenadas: [-29.362273917852086, -50.819350835166894]
  },
  {
    id: 152,
    rua_id: 5,
    criador: 'Henrique Canova',
    fotos: [
      '/images/historias/serra-azul-74.jpg'
    ],
    titulo: 'Hotel Serra Azul: Um Ícone da Hospitalidade em Gramado',
    descricao: 'O Hotel Serra Azul, inaugurado em 1916, é um marco na história da hotelaria em Gramado, refletindo o crescimento do turismo na região. Com uma estrutura confortável e sofisticada para a época, tornou-se rapidamente um dos destinos preferidos para visitantes e veranistas.\n\nAdministrado atualmente pela Perini S.A. Hotéis, o hotel recebeu diversos prêmios e reconhecimentos, incluindo a Medalha de Melhor Hotel de Turismo do Interior e o Diploma de Honra ao Mérito por sua contribuição ao desenvolvimento turístico do estado. A visão empreendedora de seus administradores garantiu que, ao longo dos anos, o Serra Azul se mantivesse como referência em qualidade e atendimento.\n\nA tradição do Hotel Serra Azul segue viva, sendo um ponto de encontro para turistas e personalidades, preservando sua história e adaptando-se às novas demandas da hotelaria moderna. Com sua arquitetura charmosa e hospitalidade impecável, continua a encantar gerações de visitantes.',
    ano: 1974,
    coordenadas: [-29.379600397803703, -50.8718169333127]
  },
  {
    id: 153,
    rua_id: 1,
    criador: 'Henrique Canova',
    fotos: [
      '/images/historias/25-anos-gramado.jpg',
      '/images/historias/25-anos-gramado-2.jpg'
    ],
    titulo: '25 Anos de Gramado: Uma Trajetória de Crescimento',
    descricao: 'No dia 15 de dezembro de 1979, Gramado comemorou seus 25 anos de emancipação, marcando um importante momento na história da cidade. Diversos eventos e celebrações foram realizados para destacar essa conquista, refletindo o desenvolvimento e a transformação da pequena vila em um dos destinos turísticos mais reconhecidos do Brasil.\n\nA evolução de Gramado pode ser claramente observada ao compararmos imagens do passado. A cidade que antes possuía ruas simples, como a Avenida Borges de Medeiros ainda sem asfalto, tornou-se um modelo de planejamento urbano e referência em turismo. As mudanças ao longo dos anos revelam um crescimento sustentável e planejado, que impulsionou o município para o reconhecimento nacional e internacional.\n\nO jubileu de prata de Gramado não apenas celebrou a história e as conquistas da cidade, mas também reforçou seu papel como destino turístico de excelência, cuja tradição e inovação continuam a encantar visitantes de todas as partes.',
    ano: 1979,
    coordenadas: [-29.385472551811265, -50.87369337749338]
  },
  {
    id: 154,
    rua_id: 13,
    criador: 'Henrique Canova',
    fotos: [
      '/images/historias/papa-canela1.jpg',
      '/images/historias/papa-canela2.jpg'
    ],
    titulo: 'A Visita do Papa João Paulo II a Canela – 1980',
    descricao: 'No dia 5 de julho de 1980, Canela recebeu um dos momentos mais marcantes de sua história com a visita do Papa João Paulo II. A cidade se preparou intensamente para esse grande evento, e desde as primeiras horas da tarde, milhares de fiéis lotaram as ruas e os arredores da Catedral de Pedra, aguardando ansiosamente a chegada do Sumo Pontífice.\n\nPor volta das 15h, a movimentação já era intensa, com policiais organizando o público, repórteres e fotógrafos posicionando-se estrategicamente e bandeiras tremulando em meio a cânticos e saudações. Quando o anúncio foi feito pelos alto-falantes de que o avião papal havia pousado no Aeroporto Salgado Filho, em Porto Alegre, a emoção tomou conta da multidão. Minutos depois, João Paulo II surgiu diante da Catedral, sendo aclamado com entusiasmo e devoção pelo povo gaúcho.\n\nO Papa dirigiu palavras de fé, esperança e união à multidão, carregando uma cruz prateada que simbolizava a presença de Cristo para todos os povos. Sua mensagem enfatizou a necessidade de solidariedade, justiça e amor entre os homens, ecoando valores universais e espirituais. O evento foi um marco não apenas para a comunidade católica de Canela, mas para toda a região, reforçando a importância da paz e da fraternidade em tempos de desafios globais.\n\nA visita de João Paulo II permanece viva na memória dos moradores e na história de Canela, simbolizando um momento de grande espiritualidade e conexão entre a fé e a comunidade.',
    ano: 1980,
    coordenadas: [-29.363708120431028, -50.80946126214977]
  },
  {
    id: 155,
    rua_id: 8,
    criador: 'Henrique Canova',
    fotos: [
      '/images/historias/neve-gramado-79.jpg'
    ],
    titulo: 'A Forte Nevasca de 1979 em Gramado',
    descricao: 'O inverno de 1979 ficou marcado na história de Gramado como um dos mais rigorosos já registrados na região. No dia 10 de agosto daquele ano, uma intensa nevasca cobriu a cidade, transformando suas paisagens em um verdadeiro cenário europeu. Com temperaturas abaixo de zero e uma espessa camada de neve cobrindo ruas, praças e telhados, o evento atraiu a atenção de moradores e visitantes, sendo lembrado até hoje como um fenômeno raro e memorável.\n\nA nevasca impactou significativamente a rotina da cidade, causando interrupções no tráfego e obrigando os habitantes a se adaptarem às condições extremas. Comerciantes e hoteleiros, no entanto, aproveitaram a ocasião para impulsionar o turismo, pois a beleza das paisagens cobertas de neve encantou turistas que lotaram hotéis e pousadas em busca da experiência única proporcionada pelo inverno rigoroso.\n\nAlém do impacto econômico e social, o evento também reforçou a fama de Gramado como um dos destinos mais charmosos do Brasil durante o inverno. As imagens da cidade coberta de neve foram amplamente divulgadas e contribuíram para consolidar ainda mais seu prestígio como um dos principais pontos turísticos da Serra Gaúcha. A forte nevasca de 1979 permanece como uma lembrança especial para aqueles que tiveram a oportunidade de presenciar esse espetáculo da natureza.',
    ano: 1979,
    coordenadas: [-29.37830164792847, -50.86612363516614]
  },
  {
    id: 156,
    rua_id: 10,
    criador: 'Henrique Canova',
    fotos: [
      '/images/historias/lago-negro-79.jpg'
    ],
    titulo: 'O Lago Negro em Gramado – 1979',
    descricao: 'Em 1979, o Lago Negro já era um dos principais cartões-postais de Gramado, encantando moradores e turistas com sua beleza singular. Criado artificialmente após um incêndio que devastou a vegetação local, o lago recebeu esse nome devido às árvores importadas da Floresta Negra, na Alemanha, que margeiam suas águas escuras e profundas.\n\nDurante esse ano, o Lago Negro continuou sendo um ponto de encontro para visitantes em busca de lazer e tranquilidade. Os tradicionais pedalinhos em formato de cisne eram uma atração à parte, permitindo que os turistas desfrutassem de um passeio sereno sobre suas águas. Além disso, o local servia como cenário para eventos culturais e atividades recreativas, fortalecendo ainda mais sua importância no turismo da cidade.\n\nA atmosfera romântica e o charme europeu do Lago Negro fizeram com que ele se consolidasse como um dos destinos mais procurados de Gramado. Sua vegetação densa, trilhas arborizadas e bancos estrategicamente posicionados tornavam o ambiente perfeito para caminhadas e momentos de contemplação. Até hoje, a história e a beleza desse icônico lago permanecem vivas na memória daqueles que o visitaram em 1979.',
    ano: 1979,
    coordenadas: [-29.393948560019467, -50.876597943139835]
  },
  {
    id: 157,
    rua_id: 17,
    criador: 'Henrique Canova',
    fotos: [
      '/images/historias/desfile-militar1-79.jpg',
      '/images/historias/desfile-militar2-79.jpg'
    ],
    titulo: 'Desfile Militar em Canela – 1979',
    descricao: 'O desfile cívico-militar de Canela em 1979 foi um evento marcante na Semana da Pátria, reunindo autoridades, instituições e a população em uma grande celebração do patriotismo. O Prefeito Municipal, Günther Siegfried Schlieper, acompanhado do Presidente dos Festejos da Semana da Pátria, Cel. Daniel Cruz da Costa, e do Presidente da Comissão do Desfile, Ten. Edy Saul Pütten, deu início à cerimônia após inspecionar as 57 entidades participantes.\n\nA abertura ficou por conta da Banda Militar da Base Aérea de Canoas, que encantou o público com sua apresentação musical. Em seguida, desfilaram escolas municipais, estaduais e rurais, além do Grupo de Escoteiros Abaetê e do Distrito de Bandeirantes Araucária. A segunda parte do evento foi marcada pela participação dos cavalarianos da Invernada Campeira do CTG Querência, trazendo a tradição gaúcha para o desfile.\n\nNa última etapa, o desfile motorizado destacou o moderno caminhão de bombeiros recentemente adquirido pela Prefeitura Municipal, além da participação de sindicatos, associações de bairros e um animado grupo de motoqueiros. O evento reforçou o espírito cívico da comunidade e consolidou-se como uma das principais manifestações de patriotismo da cidade, unindo diferentes setores da sociedade em homenagem à Pátria.',
    ano: 1979,
    coordenadas: [-29.36217106146571, -50.8192220891327]
  },
  {
    id: 158,
    rua_id: 8,
    criador: 'Henrique Canova',
    fotos: [
      '/images/historias/neve-gramado-79.jpg'
    ],
    titulo: 'Gramado em 1979: Um Ano de Transformações',
    descricao: 'O ano de 1979 foi um período marcante para Gramado, consolidando-se cada vez mais como um dos principais destinos turísticos do Brasil. A cidade, conhecida por sua arquitetura europeia, clima frio e hospitalidade, passou por diversas transformações que contribuíram para seu crescimento econômico e cultural.\n\nNeste ano, Gramado recebeu um grande número de visitantes, impulsionado pelos festivais e eventos que começaram a ganhar notoriedade nacional. O turismo de inverno se fortaleceu ainda mais, com a ocorrência de uma das nevascas mais intensas da história da cidade, o que atraiu turistas em busca de uma experiência única no país.\n\nAlém do turismo, o desenvolvimento urbano e a infraestrutura da cidade também foram destaques. Melhorias nas vias públicas, ampliação da rede hoteleira e incentivo ao comércio local ajudaram a moldar a identidade que Gramado carrega até os dias de hoje.\n\nA foto de Elias Nery produz uma imagem muito curiosa e ainda inédita da área central de Gramado, como se ela fosse uma outra cidade, com inegáveis toques europeus e uma atmosfera quase de inverno. Foi capturada em uma manhã de domingo, quando a temperatura caiu para 10 graus centígrados, contrastando com o calor intenso do dia anterior, que chegou a assustar os gramadenses.\n\nGramado em 1979 não foi apenas um ano de crescimento, mas também de afirmação como um dos destinos turísticos mais encantadores da Serra Gaúcha. A combinação de tradição, cultura e modernização fez com que a cidade se tornasse referência em turismo e qualidade de vida, um legado que permanece forte até hoje.',
    ano: 1979,
    coordenadas: [-29.37832034613453, -50.86605926214906]
  },
  {
    id: 159,
    rua_id: 7,
    criador: 'Henrique Canova',
    fotos: [
      '/images/historias/asfaltamento-sao-pedro.jpg'
    ],
    titulo: 'Asfaltamento da Rua São Pedro – 1983',
    descricao: 'O asfaltamento da Rua São Pedro, realizado em 1983, representou um importante avanço na infraestrutura urbana de Gramado. A obra foi parte de um projeto de modernização liderado pela Prefeitura, que, até o final do primeiro semestre daquele ano, já havia entregue cerca de 4 quilômetros de vias asfaltadas. Segundo o Secretário de Obras e Viação, engenheiro Alemir Coletto, a pavimentação da Rua São Pedro conectou de forma mais eficiente a via à Borges de Medeiros, beneficiando moradores, comerciantes e turistas. Além dessa melhoria, diversas outras ruas, como Ernesto Volk, Tia Rita e Augusto Daros, também foram contempladas, consolidando um período de grande progresso na mobilidade urbana da cidade.',
    ano: 1983,
    coordenadas: [-29.375051284929665, -50.877708362149114]
  },
  {
    id: 160,
    rua_id: 1,
    criador: 'Henrique Canova',
    fotos: [
      '/images/historias/nova-rodoviaria83.jpg',
      '/images/historias/nova-rodoviaria83-2.jpg'
    ],
    titulo: 'Reforma da Rodoviária de Gramado – 1983',
    descricao: 'Em fevereiro de 1983, Gramado ganhou uma nova rodoviária, modernizada e construída dentro do estilo arquitetônico típico da cidade. Essa reforma atendeu a uma antiga aspiração da população, proporcionando instalações mais amplas e confortáveis para moradores e turistas. Além de melhorar a estrutura de atendimento aos passageiros, a nova rodoviária reforçou a identidade turística de Gramado, tornando-se um importante ponto de chegada para aqueles que visitam a cidade. Desde então, a edificação permanece como um marco na recepção dos viajantes, acompanhando o crescimento e a valorização do turismo local.',
    ano: 1983,
    coordenadas: [-29.383521700155843, -50.87206146214882]
  },
  {
    id: 161,
    rua_id: 10,
    criador: 'Henrique Canova',
    fotos: [
      '/images/historias/lago-negro-57.jpg'
    ],
    titulo: 'A Construção do Lago Negro',
    descricao: 'Em 1957, Gramado ganhou um de seus mais icônicos pontos turísticos: o Lago Negro. Construído por Leopoldo Rosenfeld, o lago nasceu da necessidade de revitalizar a área após um grande incêndio que devastou a vegetação local. Com um projeto ambicioso, Rosenfeld investiu recursos significativos para transformar o espaço em um refúgio natural. As margens foram decoradas com xaxins e receberam mudas importadas da Floresta Negra, na Alemanha, o que inspirou o nome do lago.\n\nDesde sua inauguração, o Lago Negro se tornou um dos cartões-postais mais visitados da cidade, oferecendo um ambiente encantador para passeios de pedalinho, caminhadas e momentos de contemplação. Sua beleza única e sua história de resiliência fazem dele um símbolo do crescimento e do cuidado ambiental em Gramado.',
    ano: 1957,
    coordenadas: [-29.39363541271001, -50.87665158731756]
  },
  {
  id: 162,
  orgId: 4,
  rua_id: 8,
  criador: 'Família Urbani',
  fotos: [
    {
      url: '/images/historias/mundo-a-vapor-inauguracao.jpg', // precisamos do caminho completo
      credito: 'Família Urbani'
    }
  ],
  titulo: 'A fundação do Mundo a Vapor',
  descricao: `No dia 21 de dezembro de 1991, nascia o parque temático Mundo a Vapor.
Era a realização de um sonho antigo de Benito Urbani: dividir com o mundo a paixão que cultivava desde menino, ao lado dos irmãos Omar e Hermes. Juntos, transformaram a fascinação pelas máquinas a vapor em legado.
Essa paixão começou ainda na infância, quando acompanhavam o pai, Ernesto Urbani, nos consertos das antigas locomóveis e serrarias que, em tempos de trilhos e fumaça, ajudaram a construir Canela, Gramado e toda a região.
O parque abriga um acervo singular de máquinas produzidas artesanalmente pelos irmãos. Cada peça revive a era do vapor e revela como a tecnologia moldou o mundo, engrenagem por engrenagem. Desde o primeiro dia, o passeio de trem é um convite à nostalgia.
O Mundo a Vapor se firmou como símbolo de Canela. Ganhou ainda mais força em 1999, quando foi inaugurada a icônica fachada do "trem caído", inspirada no lendário acidente ferroviário de Paris, em 1895.
E o cenário segue crescendo: em 2024, ao lado desse cartão-postal, nasce a Roda Canela, adicionando uma nova volta ao tempo e ao encantamento.`,
  ano: 1991,
  coordenadas: [-29.360819802065606, -50.835461990159054]
},
{
  id: 163,
  orgId: null,
  rua_id: 8,
  criador: 'Eduardo da Silva Weber',
  fotos: [
    {
      url: '/images/historias/Prefeituramunicipaldecada1970.jpg',
      credito: null,
    }
  ],
  titulo: 'Prédio original da Prefeitura Municipal e sua arquitetura modernista',
  descricao: `A foto é da Prefeitura Municipal na década de 1970, antes da reforma que a deixou com a fisionomia atual. O prédio foi construído em algum momento entre as décadas de 1930 e 1960, quando a arquitetura modernista estava em alta no Brasil e no mundo. Algumas características que definem o modernismo arquitetônico são o uso de materiais de construção modernos, ao mesmo tempo leves e resistentes, como o concreto, o aço e o vidro, a ordem e simetria das linhas retas e das formas geométricas, o minimalismo das fachadas pouco ornamentadas, além do apreço pela praticidade e eficiência dos espaços internos. Alguns desses elementos podem ser percebidos apenas por meio dessa foto histórica, enquanto outros podem ser notados ainda hoje, se examinarmos o interior da construção. A fachada tem o formato de um polígono de cinco lados, que lembra uma bandeira de festa junina invertida. A resistência do concreto aparece lado a lado com a leveza e simplicidade das grandes e pequenas janelas de vidro quadradas, algumas de correr e outras sem abertura, protegidas por grades de aço. A função delas era permitir o aproveitamento da luz natural do exterior para iluminar o interior. Assim, apesar das mudanças exteriores da década posterior à foto, a Prefeitura, que é um dos mais importantes prédios públicos municipais, possui até hoje um interior amplo e aberto. Este traço é um legado de sua arquitetura modernista original, que visava facilitar a grande circulação de pessoas, algo típico das cidades modernas, para as quais o estilo foi concebido. Ademais, a título de curiosidade, para os amantes de carros antigos, vemos, à frente da Prefeitura, estacionados dois Volkswagen Fusca e um DKW-Vemag Fissore. Quer ver outros modelos de carros antigos? Visite em nossa cidade o Hollywood Dream Cars - Museu do Automóvel.`,
  ano: 1970,
  coordenadas: [-29.386547220117478, -50.88277439057749]
},
{
  id: 164,
  orgId: null,
  rua_id: 8,
  criador: 'Eduardo da Silva Weber',
  fotos: [
    {
      url: '/images/historias/1985prefeituramunicipal.jpg',
      credito: null,
    }
  ],
  titulo: 'A Prefeitura em reforma: rumo a uma nova identidade para a cidade',
  descricao: `O estilo modernista anteriormente presente na Prefeitura Municipal representava o otimismo com o futuro, típico dos Anos Dourados (1945-1973), durante os quais Gramado se tornou município. A reforma no prédio em meados da década de 1980 é um indicador local de uma mudança na mentalidade a nível nacional e mundial após o encerramento do período áureo do Capitalismo nas três décadas do pós-guerra. Com a crise mundial do petróleo, em 1973, e a crise nacional da década de 1980, no final do Regime Civil-Militar, o passado começou a ser mais valorizado. Tudo, porque, com os problemas econômicos do presente, ficou cada vez mais difícil projetar o futuro. Nesse momento crítico, também declinava da indústria calçadista gramadense, por muitos anos detentora de grande parte das receitas municipais. A política econômica e cultural da cidade foi então marcada pela reforma dos prédios públicos, com o objetivo de evidenciar uma identidade urbana, que promovesse cada vez mais o turismo incipiente. A inspiração para as reformas foi encontrada no passado local. O modelo escolhido foi a mansão do imigrante alemão Oscar Knorr, construída no início da década de 1940 com vista para o Vale do Quilombo. A arquitetura de sua residência lembra o estilo bávaro, encontrado nos chalés alpinos da região da Baviera, no sul da Alemanha. `,
  ano: 1985,
  coordenadas: [-29.3788358104186, -50.87104964127779]
},
{
  id: 165,
  orgId: null,
  rua_id: 7,
  criador: 'Eduardo da Silva Weber',
  fotos: [
    {
      url: '/images/historias/esquinapedrobenetti.jpg',
      credito: 'Carlos Gilberto Drecksler',
    }
  ],
  titulo: 'Tradição e reformas na esquina entre as ruas Pedro Benetti e São Pedro',
  descricao: `Nesse ângulo, temos a esquina da Rua Pedro Benetti com a Rua São Pedro, vista da rua que leva o nome do nosso santo padroeiro. Estávamos em novembro, durante o Natal Luz. Como sabemos? Basta observar o arco decorativo natalino que enfeita a entrada da Rua Pedro Benetti. Vê-se uma das laterais e a traseira da Igreja Matriz. Na parte traseira, em direção à esquina, está a Padaria, Confeitaria e Café São Pedro. Ela funciona no mesmo lugar desde 1998, durante a década em que a economia turística gramadense deu os primeiros frutos. Atualmente, seu nome comercial sofreu algumas modificações, mas a ligação com o padroeiro se manteve. Ademais, o estabelecimento continua sendo uma boa opção para os moradores e os turistas que buscam um lugar aconchegante para um café da manhã ou da tarde. Na época da foto, o pároco da Paróquia São Pedro era o padre Luiz Pedro Wagner (1950-), que promoveu a construção da nova casa paroquial e dos novos jardins que hoje circundam a Igreja Matriz. Os investimentos vieram fortalecer a infraestrutura religiosa local, acolhendo mais sacerdotes, cuja presença viria melhorar o atendimento do crescente número de moradores e turistas, numa Gramado que se desenvolveu muito nas últimas décadas. `,
  ano: 2011,
  coordenadas: [-29.379870689958356, -50.87443065117556]
},
{
    id: 166,
    rua_id: 9,
    criador: 'Brocker Turismo',
    fotos: [
      {
        url: '/images/historias/primeira-sede-brocker-1995.jpg',
        credito: 'Brocker Turismo'
      }
    ],
    titulo: 'Surge a Brocker Turismo',
    ano: 1995,
    descricao: `Em 1995, a Brocker Turismo abriu sua primeira sede na Rua Fernando Ferrari, região conhecida como Lageana. O local passou a abrigar a agência de viagens fundada pelas proprietárias Adriane e Luiza. O contato com a natureza era uma marca registrada da empresa, que se destacou no turismo estudantil, levando grupos de jovens para todo o Brasil e até mesmo para a Argentina. Com as viagens estudantis, começava a se consolidar o setor emissivo da Brocker.`,
    coordenadas: [-29.351110824777617, -50.81762877483056],
    orgId: 5
  },
  {
    id: 167,
    rua_id: 13,
    criador: 'Brocker Turismo',
    fotos: [
      {
        url: '/images/historias/segunda-sede-brocker-1998.jpg',
        credito: 'Brocker Turismo'
      }
    ],
    titulo: 'Agência de Turismo Brocker em Destaque',
    ano: 1998,
    descricao: `Com o aumento da demanda e a necessidade de crescimento, a Brocker mudou-se, em 1998, para a Avenida Borges de Medeiros, próximo à Catedral de Pedra. Nesse novo endereço, uma grande equipe foi se formando e, junto a ela, surgiu a frota própria da empresa. Os carros com a logomarca da Brocker passaram a fazer parte da paisagem da cidade. Em meio a esse crescimento, os colaboradores descobriam a paixão por trabalhar com turismo.`,
    coordenadas: [-29.36330281151832, -50.80909275619882],
    orgId: 5,
  },
  {
    id: 168,
    rua_id: 13,
    criador: 'Brocker Turismo',
    fotos: [
      {
        url: '/images/historias/metedodo-disney-2000.jpg',
        credito: 'Brocker Turismo'
      }
    ],
    titulo: 'A profissionalização da Brocker com o Método Disney',
    ano: 2000,
    descricao: `Em 2000, Adriane concluiu a faculdade de Turismo e partiu para um estágio de dois meses na Disney World. Lá, vivenciou um valioso aprendizado: estudou na Universidade da Disney e trabalhou no parque Disney's Animal Kingdom. Essa imersão no "jeito Disney" de encantar motivou Adriane a trazer uma fatia daquele universo mágico para a Serra Gaúcha. Com belezas naturais e infraestrutura turística em expansão, aplicar esse encantamento seria fundamental para fortalecer a experiência dos visitantes.`,
    coordenadas: [-29.36330281151832, -50.80909275619882],
    orgId: 5
  },
  {
    id: 169,
    rua_id: 19,
    criador: 'Família Urbani',
    fotos: [
      {
        url: '/images/historias/oficina-mechanica-urbani.jpg',
        credito: 'Família Urbani'
      }
    ],
    titulo: 'A oficina de máquinas a vapor de Ernesto Urbani',
    ano: 1927,
    descricao: `Em 1927, Ernesto Urbani fundou uma oficina mecânica em Canela — ou melhor, uma *Officina Mechanica*, como se escrevia na época. Era um tempo em que as grandes serrarias moviam a economia de Canela e Gramado, e as locomóveis — motores a vapor montados sobre rodas — eram o coração que fazia tudo pulsar. Versáteis e indispensáveis, essas máquinas podiam ser usadas como geradores, motores industriais ou bombas d’água.

Na oficina, Ernesto fazia de tudo: de consertos simples à fabricação completa de peças, moldando ferro com engenho e suas próprias mãos. Nesse ambiente de fuligem, graxa e invenção, cresceram seus filhos Omar, Hermes e Benito. Absorvendo desde cedo a lógica das engrenagens e o fascínio pelo vapor, eles cultivaram uma paixão que, anos mais tarde, daria forma ao parque Mundo a Vapor.`,
    coordenadas: [-29.36212824675232, -50.812526172756584],
    orgId: 4
  },
  {
    id: 170,
    rua_id: 8,
    criador: 'Família Urbani',
    fotos: [
      {
        url: '/images/historias/inauguracao-mundo-vapor.png',
        credito: 'Família Urbani'
      }
    ],
    titulo: 'A inauguração de um cartão-postal de Canela',
    ano: 1990,
    descricao: `Foi através de um pôster enviado por um amigo que Benito Urbani descobriu a história do célebre acidente ferroviário de 1895, em Paris, quando um trem descarrilou e atravessou o segundo andar da estação Montparnasse, despencando para a rua. A imagem icônica inspirou Benito a recriar a cena na fachada do Parque Mundo a Vapor.

Com a compra de uma locomotiva sucateada em São Paulo, iniciou-se o processo de restauração. Em dezembro de 1999, chegou o grande momento: erguer as 38 toneladas de ferro. Dois guindastes, uma multidão de espectadores e um sonho suspenso no ar marcaram o nascimento de um dos cartões-postais mais emblemáticos de Canela.`,
    coordenadas: [-29.361410732232496, -50.8346716150922],
    orgId: 4
  },
  {
    id: 171,
    rua_id: 4,
    criador: 'Eduardo da Silva Weber',
    fotos: [
      {
        url: '/images/historias/banco-brasil.jpg',
        credito: 'Eduardo da Silva Weber'
      }
    ],
    titulo: 'Tradição e Modernidade no Banco do Brasil',
    ano: 1989,
    descricao: `Vemos a agência do Banco do Brasil na esquina da Rua Garibaldi com a Rua Madre Verônica, inaugurada em 1972. A fisionomia atual ainda é muito semelhante à da foto. Esse foi um dos primeiros prédios públicos levantados ou repaginados com traços da arquitetura bávara alemã da mansão de Oscar Knorr, construída em Gramado no início da década de 1940. Era o mesmo estilo que foi sendo adotado em construções públicas e privadas, principalmente a partir da década de 1970 e que desde então começou a representar a identidade arquitetônica local. As suas principais características são a alternância entre concreto e detalhes em madeira, visível nas sacadas e, sobretudo, na parte superior do prédio, onde os lambrequins adornam o telhado coberto por telhas de barro. Ademais, merecem destaque as janelas arredondadas rodeadas de tijolos maciços. No exterior, tanto a calçada, embelezada por canteiros com árvores e flores quanto as plantas ornamentais dos jardins refletem a tradição local de paisagismo iniciada antes mesmo de Gramado se tornar município. Uma luminária, do tipo “colonial”, presente em uma das fachadas, conferia sofisticação e um toque retrô ao lugar. Já na outra fachada, defronte à Rua Madre Verônica, no mesmo lado em que depois se construiu a Rua Coberta, o nome da agência escrito em caracteres góticos Old English reforçava o efeito nostálgico. Assim, percebe-se que o prédio como um todo visava trazer uma ideia de modernidade ancorada na tradição, algo típico da arquitetura pós-modernista. Ao lado da agência existia uma residência de madeira com cobertura de telhas de barro, evidenciando que nas últimas décadas do século XX uma quantidade considerável de moradias populares originais ainda coexistia com prédios públicos e privados no centro da cidade. Por fim, também se observa que a porta de uma das fachadas não existe mais. Assim, fica o convite para visitar o local e fotografá-lo no mesmo ângulo, a fim de perceber todas as mudanças e permanências.`,
    coordenadas: [-29.378281328671793, -50.87249074437022],
    orgId: 4
  },
  {
    id: 172,
    rua_id: 1,
    criador: 'Eduardo da Silva Weber',
    fotos: [
      {
        url: '/images/historias/segundaigrejametodista.jpg',
        credito: 'Eduardo da Silva Weber'
      }
    ],
    titulo: 'Segunda Igreja Metodista de Gramado: uma arquitetura compartilhada',
    ano: 1987,
    descricao: `A foto é da segunda Igreja Metodista da história de Gramado, cuja construção data de 1932. Ali estava anteriormente a primeira igreja, que fora desmontada e trazida da Linha Nova para esse terreno em 1913, no momento da transferência da sede do então 5° Distrito de Taquara daquela localidade para “o Gramado”. A que vemos na foto era de madeira e estava erigida sobre uma base de pedra-ferro (basalto), abundante na região. Seu telhado possuía duas águas pouco inclinadas e cobertas com telhas de zinco, material bastante utilizado na cobertura das construções a partir da década de 1920. No período, o templo religioso estava cercado por um muro baixo também de pedra basáltica, que não existia inicialmente. Havia dois portões de ferro retangulares que davam acesso ao terreno, sendo que o menor ficava defronte à porta principal e o maior dava para o estacionamento. Acima da porta de entrada existia uma pequena janela redonda, que lembra as rosáceas das catedrais medievais. Muitas igrejas católicas e não católicas foram edificadas nesse estilo arquitetônico, seja em Gramado, seja em outros lugares, igualmente colonizados por imigrantes alemães e italianos. Esta, por exemplo, se parece muito com o templo religioso católico dedicado a Nossa Senhora de Caravaggio, presente na localidade de Moleque, ao sul do município. As semelhanças ocorriam porque, muitas vezes, os construtores existentes eram poucos e as mesmas pessoas acabavam construindo tanto igrejas católicas quanto não católicas.
`,
    coordenadas: [-29.37732952416751, -50.87475496964195],
    orgId: 4
  },
  {
    id: 173,
    rua_id: 8,
    criador: 'Eduardo da Silva Weber',
    fotos: [
      {
        url: '/images/historias/avenidadashortencias1957.jpg',
        credito: 'Eduardo da Silva Weber'
      }
    ],
    titulo: 'O asfalto substituindo os trilhos',
    ano: 1957,
    descricao: `A foto é de 1957. Vemos parte da atual Avenida das Hortênsias, que era chamada Avenida Coronel Diniz. O nome homenageava o intendente de Taquara, cargo equivalente ao de prefeito, e foi dado quando Gramado ainda era distrito desse município. Após a II Guerra Mundial (1939-1945) e, principalmente, com a desativação da ferrovia Porto Alegre–Canela no início da década de 1960, essa via urbana passou a integrar o principal trajeto rodoviário entre a capital e Gramado. Esse trajeto seguia em parte pela rodovia hoje conhecida como BR-116, depois passava por Nova Petrópolis, pela atual RS-235, cruzava o centro de Gramado e então continuava em direção a Canela. Na época do registro, a avenida havia sido recém-asfaltada. Nesse momento, o Brasil estava sob o governo de Juscelino Kubitschek (1956-1961), que intensificou os investimentos em rodovias já iniciados na Era Vargas (1930-1945), a exemplo da atual BR-116. No primeiro plano da imagem, à direita, vê-se a subida até o local onde foi construída a Igreja do Relógio, inaugurada em 1961. À esquerda, ainda não existia a rua que desce em direção ao bairro Piratini. Ao fundo, também à esquerda, aparece o prédio de dois andares que funcionou como estação rodoviária até meados dos anos 1980. No centro da cena, uma criança despreocupada anda de bicicleta no meio da rua praticamente deserta. Essa imagem simboliza uma Gramado que não existe mais, quando o centro era repleto de moradias populares, poucas construções elevadas e ainda possuía um tráfego tranquilo.`,
    coordenadas: [-29.3808321560008, -50.87480818320929],
    orgId: 4
  },
  {
    id: 174,
    rua_id: 4,
    criador: 'Eduardo da Silva Weber',
    fotos: [
      {
        url: '/images/historias/madreveronica1990.jpg',
        credito: 'Eduardo da Silva Weber'
      }
    ],
    titulo: 'Quando a Rua Coberta e os prédios não existiam',
    ano: 1990,
    descricao: `A foto é do início da década de 1990. Estávamos no período logo após a repaginação das fachadas e telhados dos prédios públicos para o estilo arquitetônico inspirado no bávaro alemão. No centro, ao fundo, vemos o Palácio dos Festivais já com arquitetura diferente daquela que possuía quando teve sua construção finalizada, no início da década de 1970. À sua frente, ainda não existia a Rua Coberta, cuja inauguração ocorreu em 31/12/1996. Também ao fundo, observa-se a torre da Igreja Matriz São Pedro, que havia sido inaugurada cerca de meio século antes. O prédio da Sociedade Recreio Gramadense, à esquerda da rua fotografada, ainda possuía dois andares e as fachadas retangulares anteriores à última reforma, além de seu telhado coberto de telhas de barro. Ao seu lado, na mesma quadra, estavam as canchas de bocha e bolão, que eram utilizadas pelos sócios desde sua inauguração em 1981, mas hoje não existem mais. Posteriormente, praticamente todo o lado esquerdo da rua foi sendo preenchido por prédios de quatro e cinco andares. Todos foram construídos no século XXI, quando se intensificou o processo de verticalização. O mesmo ocorreu no local onde estavam as canchas e também nas outras duas esquinas com a Rua Ricardo Sturmhofel, tanto naquela onde estavam os caminhões quanto na outra em frente a ela, onde estava estacionado o carro vermelho.`,
    coordenadas: [-29.377487143024826, -50.87129127166002],
    orgId: 4
  },
  {
    id: 175,
    rua_id: 4,
    criador: 'Eduardo da Silva Weber',
    fotos: [
      {
        url: '/images/historias/invernomadreveronica.jpg',
        credito: 'Eduardo da Silva Weber'
      }
    ],
    titulo: 'Fragmentos de final de inverno',
    ano: 1985,
    descricao: `A foto foi tirada em frente à agência do Banco do Brasil, cerca de dez anos antes da inauguração da Rua Coberta, que atualmente recobre por completo uma das três quadras da Rua Madre Verônica. A Sociedade Recreio Gramadense e suas canchas de bocha e bolão podem ser vistas ao fundo, na quadra seguinte. O prédio do banco foi outro dos edifícios públicos de Gramado que receberam, em meados da década de 1980, uma nova estética inspirada na mansão do alemão Oscar Knorr. Usada como modelo para a arquitetura gramadense desde então, essa residência possui raízes no estilo bávaro alemão e está preservada até hoje, na Avenida das Hortênsias, em direção à Canela. Na época do registro, a sede da tradicional sociedade tinha dois andares e seguia a arquitetura modernista. Até o início da década de 1980, estilo semelhante também podia ser visto na Prefeitura e no Cine Embaixador (atual Palácio dos Festivais). Esse prédio de alvenaria substituiu o anterior, de madeira, inaugurado em 1928. Os traços modernistas mantiveram-se até a última reforma, no final da década de 1990, que introduziu modificações em diversas partes da edificação. No andar superior, abaixo do letreiro, estava uma placa em comemoração aos 70 anos de fundação, detalhe que indica que o trecho da rua foi fotografado por volta de 1985. Ademais, estávamos em agosto ou setembro. Como sabemos? Há dois indícios: o céu nublado de final de inverno e as azaleias floridas, que aparecem no canto inferior esquerdo da cena, em frente à agência bancária.`,
    coordenadas: [-29.37825187313228, -50.8725898292598],
    orgId: 4
  },
  {
    id: 176,
    rua_id: 10,
    criador: 'Eduardo da Silva Weber',
    fotos: [
      {
        url: '/images/historias/incendio.jpg',
        credito: 'Eduardo da Silva Weber'
      }
    ],
    titulo: 'O Incêndio que Mudou o Vale do Bom Retiro',
    ano: 1941,
    descricao: `Quando foi registrado esse incêndio, a área que atualmente dá lugar ao Lago Negro e ao Parque Carriere era parte das terras pertencentes aos herdeiros dos irmãos Henrique e Luiz Bier. Elas foram adquiridas sobretudo ao longo da década de 1870 e registradas no início da década de 1880. Até então, eram possessões do capitão Francisco Alves dos Santos na região. Após a morte dos irmãos Bier, as terras foram sendo loteadas e vendidas, inicialmente, a imigrantes italianos, na década de 1910, e, depois, a partir do final da década de 1930, a veranistas de origem alemã, residentes principalmente em Porto Alegre. Mas, além do setor imobiliário, toda essa extensão geográfica também foi aproveitada no setor turístico, tanto pelos seus atrativos naturais, que incluíam vales, arroios, nascentes d’água, cascatas e vistas panorâmicas, quanto pela construção de atrativos artificiais, como parques, hotéis, lagos e praças. Nesse sentido, a parte das terras em que ocorreu o incêndio possuía um vale repleto de arroios e mata nativa, também atrativa. Era uma área mais afastada, e por isso recebeu o nome de Vale do Bom Retiro. Para aquele lado costumavam se “retirar” muitos dos visitantes que vinham a Gramado nas primeiras décadas do século XX para passear em meio à natureza. Tamanho conjunto geográfico e turístico era administrado por Leopoldo Rosenfeldt, também projetista de muitas dessas atrações turísticas. Ele depois adquiriu toda a área e, pouco antes de falecer, a doou à Prefeitura Municipal. Ainda durante o seu período de gestão, o Vale do Bom Retiro foi consumido pelas chamas ao longo de oito dias. Um incêndio florestal dessas proporções se explica pelo longo período de atividade do fenômeno El Niño entre os anos de 1939 e 1942, que impactou diversas regiões do Brasil com eventos climáticos extremos, que incluíram também secas, enchentes e nevascas. A solução encontrada pelo administrador foi escavar uma grande vala ao redor das chamas, de modo a impedir que se alastrassem ainda mais, e então atear fogo no interior dela. Surpreendentemente, o incêndio foi controlado. Essa técnica é hoje denominada pela Polícia Ambiental de “fogo contra fogo”. Na época, porém, a atitude quase ocasionou a prisão de Leopoldo Rosenfeldt pelo delegado local.`,
    coordenadas: [-29.394375183090617, -50.87809554111067],
    orgId: 4
  },
  {
    id: 177,
    rua_id: 4,
    criador: 'Eduardo da Silva Weber',
    fotos: [
      {
        url: '/images/historias/historia280725.jpg',
        credito: 'Eduardo da Silva Weber'
      }
    ],
    titulo: 'A transformação da Sociedade Recreio Gramadense',
    ano: 2011,
    descricao: `A foto mostra uma das esquinas formadas pela Rua Garibaldi e a Rua Madre Verônica. A sede da Sociedade Recreio Gramadense toma a cena. A sua arquitetura foi inteiramente transformada na reforma iniciada em 1995 e finalizada em 1999. Foram significativas as mudanças em relação à estética anterior, presente desde a inauguração do prédio em meados da década de 1950. Após a reforma, o lugar ganhou um terceiro andar, nova identidade visual e acréscimos estruturais. O antigo telhado de quatro águas com telhas francesas de barro e platibandas retas deu lugar a uma cobertura mais complexa, com telhas escuras contemporâneas, duas águas e três grandes mansardas embutidas, que integram a nova fachada. Esta passou a ter três telhados de duas águas com frontões decorados em madeira diagonal e janelas como nos chalés alpinos, formando um terceiro andar habitável. A inclinação é regular em dois volumes e irregular no que fica na extremidade, criando uma fachada híbrida, que mistura referenciais do passado e da contemporaneidade. A estética germânica alpina e a francesa das mansardas são históricas; já a inclinação incomum do telhado da extremidade remete à estética contemporânea, ligada à cultura de massas e ao universo de Hollywood. As janelas basculantes foram substituídas por grandes janelas de vidro. O pórtico de entrada com quatro colunas foi preservado, mas sua cor foi igualada à do restante da construção. A antiga sacada foi suprimida, dando lugar a paredes que ampliaram a extensão lateral do edifício, deixando-o com formato que lembra o bloco T do Jogo Tetris. As canchas de bocha e bolão foram demolidas, e um restaurante ocupava uma das laterais, evidenciando os novos usos urbanos da sede.`,
    coordenadas: [-29.378147282209046, -50.87232882133208],
    orgId: 4
  }

];

// Example ruas data (add your actual data here)
const ruas = [{
	'id': 1,
	'nome': 'Av Borges de Medeiros',
	'descricao': 'A Avenida Borges de Medeiros é uma das principais e mais históricas vias de Gramado. Inicialmente, foi uma trilha usada pelos tropeiros que, ao longo do tempo, evoluiu para um caminho e depois para uma estrada. A rua recebeu o nome de Borges de Medeiros, uma homenagem a Antônio Augusto Borges de Medeiros, que foi um influente político gaúcho e governou o estado do Rio Grande do Sul por quase 25 anos, entre o final do século XIX e o início do século XX. Sua administração foi marcada pelo fortalecimento da economia e da política estadual.\n\nApós a emancipação de Gramado, em 1955, a via foi transformada em avenida, consolidando-se como a primeira e mais importante rua da cidade. Ao longo dos anos, a Avenida Borges de Medeiros passou por diversas revitalizações, incluindo a pavimentação e a instalação de cabos subterrâneos, preservando o charme de suas construções de estilo alemão e tornando-a um cartão-postal da cidade.\n\nAlém de sua importância histórica, a avenida é o coração do comércio e do turismo em Gramado. Ela abriga vários pontos turísticos, como o Palácio dos Festivais, e é palco de eventos importantes como o Natal Luz e o Festival de Cinema de Gramado',
	'fotos': ['https://www.correiodopovo.com.br/image/contentid/policy:1.977592:1679269879/borges_CPM01.jpg.jpg?a=3%3A2&$p$a=25b65e6 , https://www.palaciopiratini.rs.gov.br/upload/recortes/202105/14002739_7115_GDO.jpg'],
	'relevancia': 5,
	'coordenadas': [-29.379848451898166, -50.8729358497256],
	'cidade_id': 1
}, {
	'id': 2,
	'nome': 'Rua Coronel João Corrêa',
	'descricao': 'A Rua Coronel João Corrêa, localizada no centro de Gramado, é uma via importante tanto historicamente quanto culturalmente. Ela homenageia o Coronel João Corrêa Ferreira da Silva, uma figura pioneira na região. João Corrêa foi fundamental na construção da estrada de ferro que ligava Canela a Taquara, um projeto que teve início em 1913 e foi concluído em 1924. Esse empreendimento impulsionou o desenvolvimento econômico e a conectividade da região da Serra Gaúcha.\n\nAtualmente, a Rua Coronel João Corrêa é um ponto movimentado da cidade, conectando diversos locais e pontos turísticos importantes, como a Praça das Etnias e a famosa Rua Torta. A rua também abriga lojas, restaurantes e serviços, sendo um centro de convivência e comércio em Gramado\u200b',
	'fotos': ['https://www.rbsdirect.com.br/imagesrc/25220871.jpg?w=300'],
	'relevancia': 4,
	'coordenadas': [-29.383856906907273, -50.87174287776105],
	'cidade_id': 1
}, {
	'id': 3,
	'nome': 'Rua Leopoldo Rosenfeld',
	'descricao': 'A Rua Leopoldo Rosenfeld, em Gramado, homenageia uma figura importante no desenvolvimento urbano e turístico da cidade. Leopoldo Rosenfeld foi vice-prefeito de Gramado em 1955 e teve um papel essencial na revitalização e construção de áreas marcantes, como o Lago Negro. Originalmente conhecido como Vale do Bom Retiro, o local foi devastado por um incêndio em 1942, mas sob a liderança de Rosenfeld, a área foi transformada em um dos principais pontos turísticos da cidade. O Lago Negro ganhou esse nome devido às árvores trazidas da Floresta Negra, na Alemanha, que foram plantadas ao redor do lago.\n\nAlém de seu trabalho na infraestrutura de Gramado, Rosenfeld também doou terras para a prefeitura, o que permitiu o desenvolvimento de outras áreas da cidade, como o Parque Hotel. Sua influência ajudou a moldar Gramado como um destino turístico importante na Serra Gaúcha\u200b',
	'fotos': ['https://www.sociedaderecreiogramadense.com.br/storage/posts/April2020/Leopoldo%20Rosenfeldt%201948%20-%201949.jpg','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu86SuqEqP_lmB2jLVyF46MC7jR28JxV35Eg&s'],
	'relevancia': 4,
	'coordenadas': [-29.386247769329948, -50.87529834358748],
	'cidade_id': 1
}, {
	'id': 4,
	'nome': 'Rua Coberta/Mde Verônica',
	'descricao': 'A Rua Coberta de Gramado, originalmente chamada de Rua Madre Verônica, é uma das atrações mais famosas da cidade. Inaugurada em 31 de dezembro de 1996, ela foi criada como parte de um projeto para revitalizar o centro, tornando-se um ponto de encontro ideal para eventos e lazer, protegido por uma cobertura de vidro que permite passeios a pé mesmo em dias de chuva ou frio.\n\nCom 100 metros de extensão, a Rua Coberta liga as Avenidas Borges de Medeiros e Garibaldi, sendo repleta de restaurantes, lojas e cafés. O local é palco de importantes eventos como o Festival de Cinema de Gramado, o Natal Luz, e várias exposições e desfiles ao longo do ano. Sua atmosfera acolhedora e charmosa faz com que seja um ponto obrigatório para turistas que visitam Gramado\u200b',
	'fotos': [],
	'relevancia': 5,
	'coordenadas': [-29.378627509221655, -50.87357140132573],
	'cidade_id': 1
}, {
	'id': 5,
	'nome': 'Rua Garibaldi',
	'descricao': 'A Rua Garibaldi, localizada no centro de Gramado, carrega uma rica história e é uma das vias mais tradicionais da cidade. Seu nome homenageia Giuseppe Garibaldi, o famoso herói revolucionário italiano, cuja influência foi marcante na cultura e história do Rio Grande do Sul. Originalmente, a Rua Garibaldi era uma rota modesta, frequentada pelos primeiros moradores e comerciantes da cidade, evoluindo gradualmente para uma importante via comercial e cultural.\n\nAo longo das décadas, a rua se transformou em um ponto central da cidade, conhecida por abrigar lojas, cafés, e restaurantes que preservam a arquitetura típica da região. Além disso, é nesta rua que se encontra o famoso Palácio dos Festivais, onde ocorre o renomado Festival de Cinema de Gramado. Hoje, a Rua Garibaldi é um local de grande movimento turístico, integrando o charme do centro histórico com o dinamismo do comércio local, sendo parte essencial do cotidiano de moradores e visitantes.',
	'fotos': ['https://jornaldelaguna.com.br/wp-content/uploads/2021/04/Giuseppe-Garibaldi.png','https://s2.glbimg.com/2SmQBBqw2ATeK-Azz8UKpZp3vY4=/e.glbimg.com/og/ed/f/original/2019/08/23/garibaldi.jpg'],
	'relevancia': 5,
	'coordenadas': [-29.380217043402297, -50.87106993264731],
	'cidade_id': 1
}, {
	'id': 6,
	'nome': 'Av. dos Trabalhadores',
	'descricao': 'A Rua dos Trabalhadores, localizada no bairro Várzea Grande em Gramado, carrega um importante legado ferroviário. Durante as primeiras décadas do século XX, essa via era atravessada pelos trilhos de uma ferrovia que ligava a região da Serra Gaúcha a outros municípios do estado. O trem desempenhou um papel vital no desenvolvimento econômico e social de Gramado, permitindo o transporte de mercadorias e pessoas.\n\nHoje, a história ferroviária da região é preservada no Museu do Trem, que está situado onde passavam os antigos trilhos. O museu, localizado na Rua Oscar Wille, foi restaurado e reaberto para o público em 2024, após uma grande revitalização. Ele celebra a memória dos tempos em que o trem era o principal meio de transporte local, com exposições que incluem painéis explicativos, objetos históricos, fotografias e cenários interativos que recriam ambientes da época, como a plataforma da estação e o escritório do agente ferroviário. Além disso, o museu promove projetos educacionais e culturais, como o “Memórias da Comunidade” e o “Escola + Museus”, reforçando o vínculo entre a história ferroviária e a população local',
	'fotos': [],
	'relevancia': 5,
	'coordenadas': [-29.420128560456657, -50.8643942888559],
	'cidade_id': 1
}, {
	'id': 7,
	'nome': 'R. São Pedro',
	'descricao': 'A Rua São Pedro, uma das vias mais tradicionais de Gramado, leva o nome em homenagem ao padroeiro da cidade, São Pedro Apóstolo. A origem desse nome está intimamente ligada à fundação da Igreja Matriz de São Pedro, um dos marcos religiosos e turísticos mais importantes do município. A igreja começou como uma pequena capela de madeira em 1917, sendo posteriormente reconstruída em pedra basáltica, com inspiração na arquitetura europeia, em 1943. Esse templo tornou-se um símbolo da fé e da história dos habitantes de Gramado.\n\nA rua, localizada no centro da cidade, cresceu ao redor desse ponto de referência religioso e foi essencial no desenvolvimento do comércio e da vida social de Gramado. Ao longo dos anos, a Rua São Pedro se consolidou como uma área de grande importância cultural e turística, contribuindo para a atmosfera acolhedora que caracteriza o município. Hoje, além de abrigar comércios e restaurantes, a rua conecta importantes pontos turísticos e culturais, destacando-se pelo charme de suas construções que preservam o estilo germânico que marca a cidade.',
	'fotos': ['https://cruzterrasanta.com.br/_global/_ssf/ssf.aspx?d=/_upload/significados_de_santos/&arquivo=sig-sao-pedrojpg807112013190646.jpg','https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Pope-peter_pprubens.jpg/640px-Pope-peter_pprubens.jpg'],
	'relevancia': 5,
	'coordenadas': [-29.379559879413158, -50.87469891951431],
	'cidade_id': 1
}, {
	'id': 8,
	'nome': 'Av. das Hortensias',
	'descricao': 'A Avenida das Hortênsias é uma das vias mais icônicas de Gramado e desempenha um papel central na ligação entre Gramado e Canela, duas das cidades mais visitadas na Serra Gaúcha. Seu nome homenageia a flor que se tornou um dos símbolos mais reconhecidos da região, as hortênsias, que adornam a avenida durante os meses de primavera e verão, proporcionando uma paisagem exuberante que atrai turistas de todo o Brasil.\n\nA avenida é o principal eixo turístico e comercial de Gramado, onde se concentram diversos hotéis, restaurantes, lojas e atrações turísticas, como o famoso Mini Mundo e o Museu de Cera. Sua importância transcende o aspecto econômico, pois a Avenida das Hortênsias também carrega o charme arquitetônico característico da cidade, com influências alemãs e italianas, preservadas em seus prédios e estabelecimentos.\n\nAlém disso, a Avenida das Hortênsias conecta importantes pontos turísticos das cidades de Gramado e Canela, sendo um verdadeiro cartão-postal para quem chega à região. A avenida é conhecida por oferecer experiências gastronômicas únicas, com renomados restaurantes que refletem a rica culinária local e internacional, consolidando-se como uma parada obrigatória para os visitantes que buscam aproveitar o melhor da Serra Gaúcha.',
	'fotos': ['fotos/ruas/av-hortensias-antigamente.jpg','fotos/ruas/av-hortensias-anosatras.jpg'],
	'relevancia': 5,
	'coordenadas': [-29.36172554595249, -50.85596874625489],
	'cidade_id': 1
}, {
	'id': 9,
	'nome': 'Rod. Guilherme Wasem',
	'descricao': 'A Rodovia Guilherme Wasem, oficialmente conhecida como ERS-466, é um importante trecho que conecta o Parque Estadual do Caracol à ERS-235, em Canela, na Serra Gaúcha. A rodovia foi renomeada para homenagear Guilherme Wasem, um dos primeiros moradores da região. Wasem, um imigrante prussiano, se estabeleceu com sua esposa, Bárbara, nas proximidades do Caracol em meados do século XIX. A cascata local chegou a ser conhecida como "Cascata Wasem" em sua homenagem, dado o seu papel pioneiro na colonização dessa área.\n\nA iniciativa para renomear a estrada surgiu como um esforço de valorização da história local, reconhecendo Wasem como um dos fundadores da comunidade que cresceu ao redor do Parque do Caracol. A mudança de nome foi aprovada pela Assembleia Legislativa do Estado e sancionada em 2022',
	'fotos': ['https://www.pousadadocecanela.com.br/wp-content/uploads/2023/07/Parque-do-Caracol-Guilherme-Wasem-Filho-e-sua-esposa-Guiomar-Schmitt-Wasem-Creditos-Almanaque-Onde-Tudo-Comecou-A-historia-do-Turismo-de-Canela-1--1024x685.jpg , https://www.bangalosdaserra.com.br/wp-content/uploads/2020/04/famwasem2-Copiar-933x1024.jpg'],
	'relevancia': 5,
	'coordenadas': [-29.339906935378053, -50.84685327984003],
	'cidade_id': 2
}, {
	'id': 10,
	'nome': 'Lago negro',
	'descricao': 'O Lago Negro é uma das mais emblemáticas atrações de Gramado, cercado por uma rica vegetação e conhecido pela serenidade de suas águas, que refletem o céu e as hortênsias que o circundam. O lago tem uma origem peculiar: foi criado artificialmente após um incêndio florestal em 1942 devastar a área original, conhecida como Vale do Bom Retiro. Para restaurar o local, Leopoldo Rosenfeldt, um dos líderes da comunidade, decidiu criar um lago artificial. Ele trouxe mudas de árvores da Floresta Negra, na Alemanha, o que deu origem ao nome Lago Negro.\n\nA área foi projetada para ser um espaço de contemplação e lazer, com trilhas, passeios de pedalinho e uma paisagem que encanta os visitantes em todas as estações do ano. Durante a primavera e o verão, as margens do lago são cobertas por hortênsias; no outono e inverno, as azaleias predominam, oferecendo um espetáculo visual singular.\n\nO Lago Negro também se consolidou como um local de grande importância histórica e cultural para Gramado, não apenas por sua beleza, mas também por sua contribuição ao desenvolvimento do turismo na cidade. Ele se tornou um ponto de encontro para moradores e turistas, sendo um símbolo da cidade e um dos locais mais fotografados da Serra Gaúcha.\n\nHoje, o Lago Negro é um destino imperdível, oferecendo tranquilidade e uma conexão íntima com a natureza, além de representar a capacidade da comunidade de Gramado em transformar tragédias em belezas naturais que celebram a vida e o meio ambiente .',
	'fotos': ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkhchQfjBLNLpSWMQGPjO95f3OvMBo7JrQVA&s , https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg3R9NtbVCoDHS1QvzME86MZqJt4q5nqWRmNyFXdq0QL5tDd5OLyRYKkswtLBbCNztpDtIm3WwHret99XT8qZhV0U7L6nqBEoV8xxKprbPyTpqXvkOTGmJw-3sFprLHcOCGf4v2y1NYNg0/s1600/Lago-negro-gramado.JPG'],
	'relevancia': 5,
	'coordenadas': [-29.39439335153573, -50.877203360002554],
	'cidade_id': 1
}, {
	'id': 11,
	'nome': 'ERS-115',
	'descricao': 'A ERS-115 é uma rodovia estratégica que liga os municípios de Taquara e Gramado, sendo um dos principais acessos à região da Serra Gaúcha. A rodovia é essencial tanto para o turismo quanto para o transporte local, conectando Gramado a outras cidades vizinhas como Canela e Três Coroas. Ao longo dos anos, a ERS-115 passou por várias reformas para melhorar sua infraestrutura e segurança, especialmente após eventos climáticos severos que causaram deslizamentos e danos em alguns trechos.\n\nRecentemente, a rodovia enfrentou desafios com deslizamentos causados por fortes chuvas, resultando em obras de estabilização em trechos críticos. Um exemplo foi a intervenção no quilômetro 38, onde houve a necessidade de reforçar o solo com muros de gabião para evitar deslizamentos futuros e garantir a segurança dos motoristas. Esses projetos fazem parte de um esforço contínuo da Empresa Gaúcha de Rodovias (EGR) para melhorar a resiliência da estrada contra eventos climáticos adversos',
	'fotos': [],
	'relevancia': 5,
	'coordenadas': [-29.420364235030718, -50.867046031376574],
	'cidade_id': 1
}, {
	'id': 12,
	'nome': 'Nelson Dinebier',
	'descricao': 'Nelson Dinnebier foi uma figura política proeminente em Gramado, Rio Grande do Sul, exercendo o cargo de prefeito em três mandatos: 1977-1982, 1989-1992 e 1997-2000. Sua liderança teve um impacto significativo no desenvolvimento da cidade. Em 12 de setembro de 2000, durante seu terceiro mandato, Dinnebier faleceu aos 66 anos devido a um infarto agudo do miocárdio, poucos dias antes das eleições municipais daquele ano. A influência de Dinnebier na política local foi marcante, alternando no poder com Pedro Bertolucci por mais de três décadas. Essa alternância entre os dois líderes perdurou até o falecimento de Dinnebier, encerrando um ciclo de 32 anos de revezamento na administração municipal. ',
	'fotos': ['https://static.wixstatic.com/media/8cf2c5_af7fc70eb4674baeb760045394600d3d~mv2.jpg/v1/fill/w_618%2Ch_529%2Cal_c%2Clg_1%2Cq_80/8cf2c5_af7fc70eb4674baeb760045394600d3d~mv2.jpg','https://static.wixstatic.com/media/2a8dcd_c79f9b05647b480eab586f9fca2ae163~mv2.jpg/v1/fill/w_400,h_420,al_c,q_80,enc_auto/2a8dcd_c79f9b05647b480eab586f9fca2ae163~mv2.jpg'],
	'relevancia': 5,
	'coordenadas': [-29.380083022894524, -50.88573885641506],
	'cidade_id': 1
}, {
	'id': 13,
	'nome': 'Rua borges de medeiros',
	'descricao': 'A Rua Borges de Medeiros em Canela é um dos principais eixos da cidade, situada no centro e cercada por atrações icônicas. A rua conecta diversos pontos de interesse, como a famosa Catedral de Pedra, um dos maiores símbolos de Canela. A área é marcada por sua importância comercial e turística, com diversos restaurantes, lojas de vinhos e estabelecimentos de gastronomia que fazem parte da vida cultural local.\n\nHistoricamente, a Rua Borges de Medeiros desempenha um papel central no desenvolvimento urbano de Canela, acompanhando a expansão turística da cidade. A localização estratégica próxima à Catedral de Pedra, um ponto turístico de destaque, faz com que a rua receba grande fluxo de visitantes e moradores que transitam por ali para explorar a cidade. Além disso, a rua é cercada por opções de lazer e entretenimento, como o Cine Magnólia, restaurantes, cafés e lojinhas, tornando-se um ponto de encontro tanto para turistas quanto para locais',
	'fotos': ['https://www.correiodopovo.com.br/image/contentid/policy:1.977592:1679269879/borges_CPM01.jpg.jpg?a=3%3A2&$p$a=25b65e6 , https://www.palaciopiratini.rs.gov.br/upload/recortes/202105/14002739_7115_GDO.jpg'],
	'relevancia': 5,
	'coordenadas': [-29.364569970260916, -50.810012851458374],
	'cidade_id': 2
}, {
	'id': 14,
	'nome': 'Felisberto Soares',
	'descricao': 'A Rua Felisberto Soares, em Canela, é uma das principais vias do centro da cidade, desempenhando um papel central tanto na vida cultural quanto na comercial. Ela é conhecida por ser um "tapete vermelho" que leva à famosa Catedral de Pedra, um dos pontos turísticos mais icônicos da região. A rua tem sido revitalizada ao longo dos anos para melhorar a experiência dos visitantes e moradores, com calçadas alargadas, áreas de convivência, paisagismo e espaços para apresentações artísticas, o que demonstra sua relevância social e econômica para a cidade.\n\nA rua também é um importante ponto comercial e de serviços, com uma variedade de estabelecimentos, como lojas, restaurantes, cafés e escritórios, o que a torna um local movimentado e atrativo para turistas e residentes. Esse ambiente vibrante e diversificado reflete a importância da Rua Felisberto Soares no cotidiano da cidade',
	'fotos': [],
	'relevancia': 5,
	'coordenadas': [-29.363752857480947, -50.812191240895984],
	'cidade_id': 2
}, {
	'id': 15,
	'nome': 'Prefeito João Alfredo',
	'descricao': 'João Alfredo foi um prefeito de Canela com uma administração que contribuiu significativamente para o desenvolvimento da cidade. Durante seu mandato, ele esteve envolvido em projetos de revitalização e melhorias urbanas, especialmente no centro da cidade. A administração municipal sob sua liderança focou em iniciativas de infraestrutura e valorização turística, uma marca importante para uma cidade como Canela, que depende muito do turismo.\n\nA cidade de Canela é marcada por uma história de desenvolvimento impulsionada por figuras locais, desde sua emancipação de Taquara em 1945, com o primeiro prefeito Nelson Schneider, até os administradores subsequentes, como João Alfredo, que desempenhou um papel importante na modernização urbana, incluindo melhorias nas vias centrais e na integração dos pontos turísticos com o centro',
	'fotos': [],
	'relevancia': 5,
	'coordenadas': [-29.362987850116202, -50.81412069198603],
	'cidade_id': 2
}, {
	'id': 16,
	'nome': 'Melvin Jones',
	'descricao': 'Melvin Jones foi o fundador da organização Lions Clubs International, uma das maiores entidades de serviços voluntários do mundo. Em Canela, a Rua Melvin Jones homenageia este importante líder filantrópico. Sua contribuição para a sociedade se destacou pela criação de uma rede de clubes de serviço comprometidos com ações de caridade e apoio a comunidades locais em várias partes do mundo.\n\nEm Canela, a Rua Melvin Jones é uma das principais vias comerciais, situada no centro da cidade, com uma grande concentração de imóveis, serviços e lojas. Esse nome foi escolhido para refletir o espírito de solidariedade e serviço comunitário que Jones promoveu globalmente, o que se alinha bem com a importância do turismo e hospitalidade na cidade',
	'fotos': ['https://eastonlions.org/wp-content/uploads/2022/06/Melvin-Jones-Award.png , https://lionsdla5.org/wp-content/uploads/2020/09/MELVIN-JONES-FOTO-MESA.jpg'],
	'relevancia': 5,
	'coordenadas': [-29.36522019351816, -50.81519827795695],
	'cidade_id': 2
}, {
	'id': 17,
	'nome': 'Oswaldo Aranha',
	'descricao': 'A Avenida Osvaldo Aranha, em Canela, é uma das principais vias centrais da cidade. Localizada na região central, essa avenida é uma artéria que conecta diversos pontos turísticos e comerciais, como a famosa Catedral de Pedra, a Estação Campos de Canela e a Rua Coberta. Ela é uma área de grande movimento e oferece uma ampla gama de lojas, opções gastronômicas e de hospedagem, sendo um dos principais pontos de encontro para turistas e moradores.\n\nA avenida é batizada em homenagem a Oswaldo Aranha, uma figura histórica do Rio Grande do Sul e um diplomata brasileiro de renome. Ele é amplamente conhecido por sua atuação política e diplomática, incluindo a presidência da Assembleia Geral da ONU em 1947, quando foi um dos responsáveis pela resolução que criou o Estado de Israel.\n\nA localização e a importância dessa avenida fazem dela o coração de Canela, proporcionando uma experiência completa para os visitantes, que podem explorar a cidade a partir dessa via central\u200b',
	'fotos': ['https://www.boletimdaliberdade.com.br/wp-content/uploads/2019/01/oswaldo-aranha.jpg , https://veja.abril.com.br/wp-content/uploads/2017/07/oswaldo-aranha-getulio-vargas.jpg?quality=70&strip=info'],
	'relevancia': 5,
	'coordenadas': [-29.362423004431506, -50.81928353411065],
	'cidade_id': 2
}, {
	'id': 18,
	'nome': 'R. Ten. Manoel Corrêa',
	'descricao': 'A Rua Tenente Manoel Corrêa, em Canela, é uma via situada na área central da cidade, caracterizada por seu movimento e pela presença de serviços, estabelecimentos comerciais e opções de hospedagem. Ela é conectada a várias outras ruas importantes, como a Avenida Osvaldo Aranha e a Rua João Manuel Corrêa, e serve como ponto de acesso para diversos locais turísticos e comerciais.\n\nA rua é próxima a pontos de interesse como o Grande Hotel Canela e o Museu do Automóvel, reforçando sua importância na infraestrutura turística de Canela. Além disso, ela abriga diversas pousadas e hotéis, tornando-a um local estratégico para visitantes que desejam explorar a cidade a pé e conhecer seus pontos turísticos',
	'fotos': ['fotos/ruas/correas-canela.png'],
	'relevancia': 5,
	'coordenadas': [-29.359008848472353, -50.82095182756806],
	'cidade_id': 2
}, {
	'id': 19,
	'nome': 'Av Júlio de Castilhos',
	'descricao': 'A Avenida Júlio de Castilhos é uma das principais vias de Canela, localizada na região central da cidade. A avenida é conhecida por ser um ponto comercial ativo e uma das rotas mais movimentadas, oferecendo uma ampla variedade de estabelecimentos, como lojas, farmácias, escolas, bancos e restaurantes. Sua posição estratégica conecta diferentes áreas do centro da cidade, sendo também uma via de acesso a diversos pontos turísticos, como a famosa Catedral de Pedra.',
	'fotos': ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0GPVo34ZYTw94R0MqQWJ0CEbHhoMFqqH3Cw&s , https://neamp.pucsp.br/images/fotos/julio-prates-de-castilhos.jpg'],
	'relevancia': 5,
	'coordenadas': [-29.36334982941896, -50.81289602222382],
	'cidade_id': 2
}, {
	'id': 20,
	'nome': 'R. Augusto Pestana',
	'descricao': 'A Rua Augusto Pestana, localizada no centro de Canela, homenageia Augusto Pestana, uma figura importante da história do Rio Grande do Sul. Augusto Pestana (1868-1934) foi um engenheiro e político brasileiro, conhecido por sua atuação como líder republicano e especialista em transportes ferroviários. Ele desempenhou um papel crucial na expansão ferroviária do estado, sendo fundamental para o desenvolvimento de várias cidades gaúchas, como Ijuí.\n\nEm Canela, a rua que leva seu nome é uma via central e bastante movimentada, onde se concentram diversos estabelecimentos comerciais e serviços públicos, como a Defensoria Pública, além de igrejas, salões de beleza e lojas. Sua localização estratégica a torna um ponto importante para o comércio e serviços da cidade\u200b\n',
	'fotos': ['https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/APHD.jpg/225px-APHD.jpg , https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/AP1917.jpg/150px-AP1917.jpg'],
	'relevancia': 5,
	'coordenadas': [-29.361843961074307, -50.80794313774343],
	'cidade_id': 2
}, {
	'id': 21,
	'nome': 'R Dona Carlinda',
	'descricao': 'A Rua Dona Carlinda, localizada no centro de Canela, é uma das vias mais importantes e movimentadas da cidade. Ela é reconhecida não apenas pela sua localização estratégica, mas também por abrigar diversos serviços públicos, comerciais e turísticos. A Prefeitura Municipal de Canela está situada nesta rua, o que a torna um ponto central de administração e referência para moradores e visitantes.\n\nO nome da rua é uma homenagem a Dona Carlinda, uma figura de destaque na história local, embora detalhes específicos sobre sua vida não sejam amplamente documentados. A rua é conhecida por sua proximidade com a Catedral de Pedra e por abrigar diversas lojas, restaurantes e espaços de serviço, que refletem o caráter turístico e vibrante do centro da cidade.\n\nCom imóveis valorizados, a Rua Dona Carlinda é uma das áreas mais procuradas para negócios e residências, e desempenha um papel significativo na economia e na vida cultural de Canela\u200b',
	'fotos': [],
	'relevancia': 5,
	'coordenadas': [-29.362729612038386, -50.81141284615731],
	'cidade_id': 2
}, {
	'id': 22,
	'nome': 'R. Martinho Lutero',
	'descricao': 'A Rua Martinho Lutero, em Canela, é um local que reflete a diversidade cultural e religiosa da cidade. O nome é uma homenagem a Martinho Lutero, o reformador protestante que deu origem ao movimento luterano. Em Canela, essa rua é conhecida por abrigar várias instituições de destaque, como o Esporte Clube Serrano, que tem grande relevância na comunidade local.\n\nO Esporte Clube Serrano, situado na Rua Martinho Lutero, é um centro esportivo e social que oferece diversas atividades e eventos para a comunidade, incluindo futebol, boliche, hidroginástica e outras modalidades recreativas. Além disso, a rua é próxima de igrejas luteranas, ressaltando a influência cultural e religiosa na região.\n\nEsta rua também abriga comércios locais e espaços de serviços, tornando-se um ponto importante para a vida cotidiana dos moradores de Canela',
	'fotos': ['https://www.portalc3.net/wp-content/uploads/2023/11/Martinho-Lutero.jpg , https://promessistas.org/wp-content/uploads/2017/10/martin-lutero-1076x570-1.jpg'],
	'relevancia': 5,
	'coordenadas': [-29.35903326572186, -50.81403621447966],
	'cidade_id': 2
}, {
	'id': 23,
	'nome': 'R. João Pessoa',
	'descricao': 'A Rua João Pessoa, em Canela, possui uma história que remonta aos primeiros anos de desenvolvimento urbano da cidade. Na década de 1920, essa rua era um ponto de passagem de tropas de gado, um reflexo da economia local que estava em transformação naquela época. Com o tempo, a rua se consolidou como um importante eixo residencial e comercial, reunindo diversos estabelecimentos e moradias que mesclam arquitetura tradicional e moderna.\n\nO nome da rua é uma homenagem a João Pessoa Cavalcanti de Albuquerque, um político e advogado brasileiro que foi governador da Paraíba e vice-presidente na chapa de Getúlio Vargas em 1930. Ele se destacou por sua postura firme contra as oligarquias dominantes e sua defesa da educação e dos direitos civis, o que o tornou uma figura de relevância nacional. Sua morte, em 1930, desencadeou uma série de eventos que culminaram na Revolução de 1930, um marco na história política brasileira.\n\nA Rua João Pessoa, em Canela, carrega consigo essa herança histórica, ao mesmo tempo em que representa um eixo de crescimento e modernização da cidade\u200b\n',
	'fotos': ['https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Jo%C3%A3o_Pessoa_Cavalcanti_de_Albuquerque.jpg/200px-Jo%C3%A3o_Pessoa_Cavalcanti_de_Albuquerque.jpg , https://memorialdademocracia.com.br/publico/thumb/9403/640'],
	'relevancia': 5,
	'coordenadas': [-29.356851452987012, -50.807376258618255],
	'cidade_id': 2
}, {
	'id': 24,
	'nome': 'R. Visc. de Mauá',
	'descricao': 'A Rua Visconde de Mauá, localizada no centro de Canela, é uma via importante que conecta diversos pontos relevantes da cidade. O nome da rua faz referência ao Visconde de Mauá, Irineu Evangelista de Sousa, um influente empresário e político brasileiro do século XIX, conhecido por seu papel no desenvolvimento industrial e na construção de infraestruturas, como ferrovias e serviços financeiros.',
	'fotos': ['https://bafafa.com.br/images/artigos/visconde_de_maua_empreendedor_2_20052021_054546.jpg , https://static.jornalpelicano.com.br/capa.jpg'],
	'relevancia': 5,
	'coordenadas': [-29.365090802064056, -50.80881492493066],
	'cidade_id': 2
}, {
	'id': 25,
	'nome': 'R. Ignácio Saturnino de Moraes',
	'descricao': 'A Rua Ignácio Saturnino de Moraes, localizada em Canela, é uma via central e de grande importância para a cidade. Ela está situada no bairro Palace Hotel, que abriga uma variedade de serviços e comércios. A rua leva o nome de Ignácio Saturnino de Moraes, uma figura que provavelmente teve relevância local, embora não haja registros detalhados de sua história pessoal amplamente disponíveis nas fontes consultadas.\n\n',
	'fotos': [],
	'relevancia': 5,
	'coordenadas': [-29.36384714861242, -50.80305825859665],
	'cidade_id': 2
}, {
	'id': 26,
	'nome': 'Av. Cônego João Marchesi',
	'descricao': 'A Avenida Cônego João Marchesi, localizada em Canela, é uma importante via que passa por diversos bairros da cidade, como Jardim das Fontes e Saiqui. Essa avenida está associada a áreas residenciais e comerciais, abrigando desde supermercados até oficinas mecânicas e igrejas. O nome da avenida homenageia o Cônego João Marchesi, uma figura religiosa de destaque na comunidade, que desempenhou um papel importante no desenvolvimento e fortalecimento da vida espiritual e social da região.\n\nAlém disso, a avenida se conecta a outras vias importantes, como a ERS-235, que liga Canela a cidades próximas, facilitando o acesso a diversos serviços e locais de interesse, como escolas, igrejas e mercados',
	'fotos': [],
	'relevancia': 5,
	'coordenadas': [-29.337929051216406, -50.78737254982735],
	'cidade_id': 2
}];

// Example cidades data (add your actual data here)
const cidades = [{
  'id': 1,
  'nome': 'Gramado',
  'descricao': 'Cidade turística da Serra Gaúcha conhecida por sua arquitetura europeia.',
  'fotos': 'https://i.imgur.com/gramado.png',
  'coordenadas': [-29.3788, -50.8755] as [number, number]
}];

// Negocios data
const negocios = [{
  id: 1,
  titulo: 'Museu do trem',
  segmento: 'Museu',
  foto: 'https://static.wixstatic.com/media/4f54af_970a18bb978348bf9060d6486e4580b7~mv2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/4f54af_970a18bb978348bf9060d6486e4580b7~mv2.jpg',
  link: 'https://maps.app.goo.gl/dPoE7c1UxxQtVYaQA'
},
{
  id: 2,
  titulo: 'Museu Hugo Daros',
  segmento: 'Museu',
  foto: 'https://static.wixstatic.com/media/4f54af_ee23c1a94de844448b9934fe54bfe18d~mv2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/4f54af_ee23c1a94de844448b9934fe54bfe18d~mv2.jpg',
  link: 'https://maps.app.goo.gl/HPF9eFBTHpMu7Zj9A'
},
{
  id: 3,
  titulo: 'Cyro Martins Gramado',
  segmento: 'Biblioteca',
  foto: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjdkOZMgdU950_YayulK_PXUfkq5CrNYIGh9ugWfV-Xn075HKsSGwbofb9JxdcLRnDf6oaKbXQITroeE3p65inGx0M6PgGUZSFGK5CkBFHNTxWw3yumIWiOax-MGRt3ipYqs_pvl1e-4Pz8/s1600/20190502_104307.jpg',
  link: 'https://maps.app.goo.gl/vQdYLhaYBgrsVoio9'
},
{
  id: 4,
  titulo: 'Rua Torta',
  segmento: 'Atração grátis',
  foto: 'https://portalgramado.s3.sa-east-1.amazonaws.com/images/6pYOd5id101MAcxZnURsMWP6P14CtQQH5SmJvvAc.png',
  link: 'https://maps.app.goo.gl/WS1CaAiZ6Uu4NZmy8'
},
{
  id: 5,
  titulo: 'Praça das Rosas',
  segmento: 'Praça',
  foto: 'https://storage.gramadoinesquecivel.tur.br/2989/1595-014.jpg',
  link: 'https://maps.app.goo.gl/wJsjprWuho2PW3EDA'
},
{
  id: 6,
  titulo: 'Lago Negro',
  segmento: 'Atração',
  foto: 'https://passagemcomprada.com.br/wp-content/uploads/2021/08/Novo-Lago-Negro-5.jpg-1024x641.jpeg',
  link: 'https://maps.app.goo.gl/p6Uj3XiYPDYnLBWw8'
},
{
  id: 7,
  titulo: 'Museu Major Nicoletti',
  segmento: 'Museu',
  foto: 'https://www.melhordosul.com.br/wp-content/uploads/2022/10/Casa-do-Major-760x490.jpg',
  link: 'https://maps.app.goo.gl/mGC1T3dRS53uEU8w7'
},
{
  id: 7,
  titulo: 'Joaquina Rita Bier',
  segmento: 'Atração',
  foto: 'https://portalgramado.s3.sa-east-1.amazonaws.com/images/yljIt4L2yZHyr0ia089RwloOOcgbWuQZhCUBYEmP.png',
  link: 'https://maps.app.goo.gl/wsaeWvbxcY8FoGoh9'
},
{
  id: 8,
  titulo: 'Mundo a vapor',
  segmento: 'Atração',
  foto: 'https://portais-s3.s3.sa-east-1.amazonaws.com/images/eL7yc2VHyP3gDgMsjSOstlphZtzYFoh4uag4sFby.png',
  link: 'https://g.co/kgs/jpuJWWN'
},
];

// Questions data
const questions = [{
  question: "Em que ano foi inaugurado o Lago Joaquina Rita Bier em Gramado?",
  answers: ["1938", "1960", "1970", "1990"],
  correct: 0,
},
{
  question: "Qual era o antigo nome da Praça das Etnias em Gramado?",
  answers: [
    "Praça das Comunicações",
    "Praça Major Nicoletti",
    "Praça Central",
    "Praça das Flores",
  ],
  correct: 0,
},
{
  question: "Em que ano foi inaugurada a nova rodoviária de Gramado?",
  answers: ["1984", "1985", "1986", "1987"],
  correct: 2,
},
{
  question: "O que existia no lugar onde hoje é o Banrisul em Gramado?",
  answers: [
    "Grupo Escolar Santos Dumont",
    "Primeira Igreja",
    "Antiga Prefeitura",
    "Parque Hotel",
  ],
  correct: 0,
},
{
  question: "Qual foi o primeiro cinema inaugurado em Gramado em 1929?",
  answers: [
    "Cine Splendid",
    "Cine 3 de Outubro",
    "Cine Embaixador",
    "Palácio dos Festivais",
  ],
  correct: 1,
},
{
  question: "Em que ano foi inaugurado o Cine Embaixador?",
  answers: ["1967", "1972", "1984", "1990"],
  correct: 0,
},
{
  question: "Qual evento antecedeu o Natal Luz em Gramado?",
  answers: [
    "Festival de Cinema",
    "Festa das Hortênsias",
    "Festival de Gastronomia",
    "Festa da Colônia",
  ],
  correct: 1,
},
{
  question: "Onde ficava o Grupo Escolar Santos Dumont em Gramado?",
  answers: [
    "Rua Coberta",
    "Praça Major Nicoletti",
    "Lago Negro",
    "Parque Knorr",
  ],
  correct: 0,
},
{
  question: "Em que ano ocorreu a construção da Rua Coberta em Gramado?",
  answers: ["1984", "1990", "1996", "2000"],
  correct: 2,
},
{
  question: "Quem inaugurou o Lago Negro em Gramado?",
  answers: [
    "Pedro Bertolucci",
    "Leopoldo Rosenfeld",
    "Mateus Canova",
    "Allan Fulcher",
  ],
  correct: 1,
},
{
  question: "Qual era o nome original do Lago Negro antes do incêndio de 1942?",
  answers: ["Lago do Bom Jesus", "Lago Joaquina Rita Bier", "Vale do Bom Retiro", "Lago do Meio"],
  correct: 2,
},
{
  question: "Qual nome da praça central da cidade de Gramado?",
  answers: [
    "Praça Major Nicoletti",
    "Praça das Etnias",
    "Praça Central",
    "Praça das Flores",
  ],
  correct: 0,
},
{
  question: "Qual hospital estava em construção em 1940, sendo muito esperado pela comunidade de Gramado?",
  answers: [
    "Hospital São Miguel",
    "Hospital de Gramado",
    "Hospital Arcanjo São Miguel",
    "Hospital Santa Terezinha",
  ],
  correct: 2,
},
{
  question: "Em que ano a Igreja São Pedro de Gramado foi finalizada?",
  answers: ["1920", "1930", "1942", "1950"],
  correct: 2,
},
{
  question: "Qual é o nome do famoso ponto turístico de Canela com uma queda d'água de 130 metros?",
  answers: [
    "Cascata do Caracol",
    "Lago Negro",
    "Parque do Caracol",
    "Cascata Véu de Noiva",
  ],
  correct: 0,
},
{
  question: "Qual local em Canela foi construído sem uso de pregos e é famoso por seu apfelstrudel?",
  answers: [
    "Castelinho do Caracol",
    "Casa do Colono",
    "Mundo a Vapor",
    "Parque da Ferradura",
  ],
  correct: 0,
},
{
  question: "Qual avenida de Gramado Teve os cabos enterrados para melhorar o seu visual?",
  answers: [
    "Av. das Hortênsias",
    "Av. Borges de Medeiros",
    "Rua Coberta",
    "Rua São Pedro",
  ],
  correct: 1,
},
{
  question: "Quem foi o fundador da Famastil Ferramentas Ltda. em Gramado?",
  answers: [
    "Família Tissot",
    "Pedro Bertolucci",
    "Leopoldo Rosenfeld",
    "Eugênio Bertolucci",
  ],
  correct: 0,
},
{
  question: "Em que ano a Malharia Lucirene celebrou seus 15 anos de fundação?",
  answers: ["1980", "1988", "1990", "1995"],
  correct: 1,
},
{
  question: "Qual rua de Gramado é conhecida por abrigar a Rua Coberta e o Palácio dos Festivais?",
  answers: [
    "Av. Borges de Medeiros",
    "Rua Coberta",
    "Rua Madre Verônica",
    "Rua São Pedro",
  ],
  correct: 0,
},
{
  question: "Em que ano ocorreu a neve vista da praça em frente à Igreja Matriz de Canela?",
  answers: ["1984", "1990", "1994", "2000"],
  correct: 2,
},
{
  question: "Qual clube foi fundado em 1926 e é um marco em Canela?",
  answers: [
    "Clube Serrano",
    "Recreio Gramadense",
    "Tênis Clube",
    "Clube dos Amigos",
  ],
  correct: 0,
},
{
  question: "Qual foi a primeira sede da Sociedade Recreio Gramadense fundada em 1915?",
  answers: [
    "Casa de Manuel Becharra",
    "Parque Hotel",
    "Hotel Serra Azul",
    "Casa do Colono",
  ],
  correct: 0,
},
{
  question: "Qual prédio em Gramado foi transformado em Banrisul, anteriormente sendo uma escola?",
  answers: [
    "Grupo Escolar Santos Dumont",
    "Escola Santa Terezinha",
    "Colégio Estadual",
    "Escola Municipal",
  ],
  correct: 0,
},
{
  question: "Qual hospital em Canela preserva sua característica original após ampliação?",
  answers: [
    "Hospital de Canela",
    "Hospital São Miguel",
    "Hospital Santa Terezinha",
    "Hospital Bom Jesus",
  ],
  correct: 0,
},
{
  question: "Em que ano foi Inaugurada a Estação Ferroviária de Canela?",
  answers: ["1922", "1934", "1940", "1950"],
  correct: 0,
},
{
  question: "Qual local em Canela é apreciado por católicos e tem sua festa tradicional em 26 de maio?",
  answers: [
    "Santuário Caravaggio",
    "Catedral de Pedra",
    "Igreja Luterana",
    "Capela Santa Terezinha",
  ],
  correct: 0,
},
{
  question: "Qual escola de Canela foi referência no estado e teve como primeira sede a casa de Carlos Wortmann?",
  answers: [
    "Escola Neusa Mari Pacheco",
    "Escola Santa Terezinha",
    "Colégio Estadual",
    "Escola Municipal",
  ],
  correct: 0,
},
{
  question: "Qual foi o primeiro açougue de Gramado, substituído por uma loja de decorações?",
  answers: [
    "Açougue Bohrer",
    "Açougue Fachin",
    "Casa Raymundo",
    "Açougue Gramadense",
  ],
  correct: 1,
},
{
  question: "Qual avenida de Gramado é considerada o coração do comércio e turismo?",
  answers: ["Av. Borges de Medeiros", "Av. das Hortênsias", "Rua São Pedro", "Rua Coberta"],
  correct: 0
},
{
  question: "Quem foi homenageado com o nome da Rua Coronel João Corrêa?",
  answers: ["Fundador de Gramado", "Engenheiro de Canela", "Construtor da estrada de ferro", "Artista local"],
  correct: 2
},
{
  question: "Qual é o nome do lago em Gramado criado após um incêndio?",
  answers: ["Lago Negro", "Lago das Hortênsias", "Lago Azul", "Lago Verde"],
  correct: 0
},
{
  question: "Que figura histórica foi homenageada na Rua Garibaldi?",
  answers: ["Giuseppe Garibaldi", "Leopoldo Rosenfeld", "Júlio de Castilhos", "Nelson Dinebier"],
  correct: 0
},
{
  question: "Quem é homenageado na Av. dos Trabalhadores em Gramado?",
  answers: ["Os pioneiros da cidade", "Antigos ferroviários", "Pequenos comerciantes", "Artistas locais"],
  correct: 1
},
{
  question: "Qual avenida de Gramado liga a cidade a Canela?",
  answers: ["Av. dos Trabalhadores", "Av. das Hortênsias", "Av. Borges de Medeiros", "Rua Madre Verônica"],
  correct: 1
},
{
  question: "Em qual ano foi inaugurada a Rua Coberta em Gramado?",
  answers: ["1986", "1996", "2006", "2016"],
  correct: 1
},
{
  question: "Quem foi homenageado com a Rua Leopoldo Rosenfeld?",
  answers: ["Artista local", "Líder comunitário", "Vice-prefeito e desenvolvedor turístico", "Empresário local"],
  correct: 2
},
{
  question: "Qual rua é famosa por abrigar o Festival de Cinema de Gramado?",
  answers: ["Madre Verônica", "Rua Coronel João Corrêa", "Rua São Pedro", "Rua Borges de Medeiros"],
  correct: 0
},
{
  question: "Quem foi homenageado com o nome da Av. Júlio de Castilhos em Canela?",
  answers: ["Um líder religioso", "Diplomata brasileiro", "Governador gaúcho", "Prefeito de Canela"],
  correct: 2
},
{
  question: "Qual a importância da ERS-115 para Gramado?",
  answers: ["Acesso principal à Serra Gaúcha", "Ligação entre Gramado e Canela", "Rota histórica de tropeiros", "Rota para o litoral"],
  correct: 0
},
{
  question: "A quem a Rua São Pedro homenageia?",
  answers: ["Padroeiro da cidade", "Pioneiro local", "Artista de Gramado", "Comerciante tradicional"],
  correct: 0
},
{
  question: "Qual é o principal propósito da plataforma Historin?",
  answers: ["Preservar histórias locais", "Oferecer roteiros turísticos", "Criar eventos culturais", "Proporcionar guias de compras"],
  correct: 0
},
{
  question: "Quem foi homenageado com a Rua Tenente Manoel Corrêa em Canela?",
  answers: ["Militar", "Líder comunitário", "Esportista famoso", "Diplomata"],
  correct: 0
},
{
  question: "Qual avenida em Canela homenageia um diplomata gaúcho famoso?",
  answers: ["Av. Júlio de Castilhos", "Av. Oswaldo Aranha", "Av. das Hortênsias", "Rua Coronel João Corrêa"],
  correct: 1
},
{
  question: "Qual é o nome do lago cercado por hortênsias em Gramado?",
  answers: ["Lago Negro", "Lago das Hortênsias", "Lago Verde", "Lago da Serra"],
  correct: 0
},
{
  question: "A Rua Melvin Jones em Canela homenageia o fundador de qual organização?",
  answers: ["Rotary Club", "Lions Clubs International", "Cruz Vermelha", "Escoteiros"],
  correct: 1
},
{
  question: "Qual rua em Gramado homenageia um herói italiano?",
  answers: ["Rua Garibaldi", "Rua Leopoldo Rosenfeld", "Rua São Pedro", "Av. das Hortênsias"],
  correct: 0
},
{
  question: "Qual o nome do fundador do Lago Negro?",
  answers: ["Leopoldo Rosenfeld", "Nelson Dinebier", "Júlio de Castilhos", "Antônio Borges"],
  correct: 0
},
{
  question: "Qual figura é homenageada na Rua Dona Carlinda em Canela?",
  answers: ["Fundadora de Canela", "Figura histórica local", "Governador gaúcho", "Artista regional"],
  correct: 1
},
{
  question: "Qual avenida de Canela conecta diversos pontos turísticos?",
  answers: ["Av. Júlio de Castilhos", "Av. Oswaldo Aranha", "Av. das Hortênsias", "Rua Felisberto Soares"],
  correct: 1
},
{
  question: "Quem fundou a sociedade recreio gramadense?",
  answers: ["Manuel Becharra", "Leopoldo Rosenfeld", "Giuseppe Garibaldi", "Mateus Canova"],
  correct: 0
},
{
  question: "Qual o nome da famosa igreja localizada em Canela?",
  answers: ["Igreja São Pedro", "Catedral de Pedra", "Igreja das Hortênsias", "Igreja de São Francisco"],
  correct: 1
},
{
  question: "Qual é o símbolo da diversidade cultural de Gramado?",
  answers: ["Rótula das Bandeiras", "Praça Major Nicoletti", "Rua Coberta", "Praça das Etnias"],
  correct: 3
},
{
  question: "Em que rua de Gramado foi inaugurado o primeiro cinema?",
  answers: ["Rua São Pedro", "Rua Coronel João Corrêa", "Rua Garibaldi", "Av. Borges de Medeiros"],
  correct: 3
},
{
  question: "Qual figura religiosa é homenageada na Av. Cônego João Marchesi?",
  answers: ["Bispo local", "Cônego João Marchesi", "Padre Antônio Vieira", "Papa Francisco"],
  correct: 1
},
{
  question: "Que festival ocorre no Palácio dos Festivais em Gramado?",
  answers: ["Festival de Cinema", "Festa da Colônia", "Natal Luz", "Festival de Música"],
  correct: 0
},
{
  question: "Qual rua homenageia uma figura religiosa em Gramado?",
  answers: ["Rua Madre Verônica", "Rua São Pedro", "Rua Dona Carlinda", "Rua Leopoldo Rosenfeld"],
  correct: 0
},
{
  question: "Quem é homenageado na Rua Augusto Pestana em Canela?",
  answers: ["Engenheiro ferroviário", "Artista local", "Político gaúcho", "Diplomata internacional"],
  correct: 0
},
{
  question: "Qual o nome da rua que homenageia o padroeiro de Gramado?",
  answers: ["Rua Garibaldi", "Rua São Pedro", "Rua Coronel João Corrêa", "Rua Leopoldo Rosenfeld"],
  correct: 1
},
{
  question: "Qual rua de Canela homenageia um engenheiro republicano?",
  answers: ["Rua Augusto Pestana", "Rua Garibaldi", "Rua Leopoldo Rosenfeld", "Av. Júlio de Castilhos"],
  correct: 0
},
{
  question: "Em que ano foi fundado o recreio gramadense?",
  answers: ["1910", "1915", "1920", "1925"],
  correct: 1
},
{
  question: "Que figura histórica foi homenageada na Av. Oswaldo Aranha?",
  answers: ["Governador gaúcho", "Diplomata brasileiro", "Político local", "Artista famoso"],
  correct: 1
},
{
  question: "Qual é a famosa rua de pedestres em Gramado?",
  answers: ["Rua Garibaldi", "Rua São Pedro", "Rua Coberta", "Av. Borges de Medeiros"],
  correct: 2
},
{
  question: "Que figura religiosa é homenageada na rua com acesso à Igreja São Pedro?",
  answers: ["São Pedro Apóstolo", "Madre Verônica", "Cônego João Marchesi", "Papa João Paulo II"],
  correct: 0
},
{
  question: "Qual rua de Canela é uma das mais importantes vias comerciais?",
  answers: ["Rua Melvin Jones", "Rua Martinho Lutero", "Rua Dona Carlinda", "Av. Júlio de Castilhos"],
  correct: 3
},
{
  question: "Quem foi homenageado na Rua Visconde de Mauá em Canela?",
  answers: ["Engenheiro ferroviário", "Político republicano", "Empresário brasileiro", "Governador do RS"],
  correct: 2
},
{
  question: "Qual é o símbolo do turismo em Canela?",
  answers: ["Catedral de Pedra", "Rua Coberta", "Rua Garibaldi", "Praça Major Nicoletti"],
  correct: 0
},
{
  question: "Quem foi homenageado na Rua Ignácio Saturnino de Moraes?",
  answers: ["Engenheiro local", "Prefeito de Gramado", "Líder comunitário", "Figura de Canela"],
  correct: 3
},
{
  question: "Qual é o principal símbolo da cultura alemã em Canela?",
  answers: ["Rua Torta", "Rua Felisberto Soares", "Rua Melvin Jones", "Catedral de Pedra"],
  correct: 3
},
{
  question: "Qual avenida de Canela conecta a cidade ao Parque Caracol?",
  answers: ["Rod. Guilherme Wasem", "Av. Júlio de Castilhos", "Rua Leopoldo Rosenfeld", "Av. Cônego João Marchesi"],
  correct: 0
},
];

// Organizacoes data (using your Orgs structure)
const organizacoes = [
	
  /*{
	id: 1,
	fantasia: "Memorial Canela",
	link: "https://historin.com",
	logo: "fotos/orgs/memorial.png",
	cor: "#4a4b4d",
	sobre: "Uma associação em canela com mais de 50 participantes que buscam através de palestras, encontros e ações resgatar a história da cidade",
	foto: "/images/historin-equipe.jpg"
},*/
  {
	id: 1,
	fantasia: "Câmara de vereadores de Gramado",
	link: "https://www.gramado.rs.leg.br/",
	logo: "https://www.gramado.rs.leg.br/logo.png",
	cor: "#eeefef",
	sobre: "A Câmara de Vereadores de Gramado é uma organização que sempre está presente na disseminação de notícias e conteúdo sobre a cidade.",
	foto: "/images/historin-equipe.jpg"
},
  {
	id: 2,
	fantasia: "Secretaria de Turismo de Gramado",
	link: "https://www.gramadoinesquecivel.tur.br/",
	logo: "https://www.gramadoinesquecivel.tur.br/img/logo.png",
	cor: "#7a0c33",
	sobre: "Gramado inesquecível é a marca que a secretaria traz para promover a cidade. Com um site repleto de informações e novidades.",
	foto: "/images/historin-equipe.jpg"
},
  {
	id: 3,
	fantasia: "Grupo 'Gramado Era Assim'",
	link: "https://www.facebook.com/groups/gramadoeraassim",
	logo: "fotos/orgs/gramado-era-assim-grupo.png",
	cor: "#7a0c33",
	sobre: "Um Grupo do Facebook voltado ao compartilhamento e comentários sobre a cidade e sua origem/desenvolvimento. Você é um convidado a entrar no grupo!",
	foto: "/images/historin-equipe.jpg"
},
  {
	id: 4,
	fantasia: "Mundo a Vapor",
	link: "https://www.mundoavapor.com.br/",
	logo: "fotos/orgs/logo-mundo-vapor.png",
	cor: "#7a0c33",
	sobre: "Um parque voltado a história do uso do vapor como energia. Com diversas atrações e um museu, o parque é um dos principais pontos turísticos de Canela.",
	foto: "/images/historin-equipe.jpg"
},
  {
	id: 5,
	fantasia: "Brocker Turismo",
	link: "https://brockerturismo.com.br/",
	logo: "https://brockerturismo.com.br/images/modulo/logo/brocker-turismo.svg",
	cor: "#80b93f",
	sobre: "Uma das maiores operadoras de turismo do Brasil, empresa com grande participação no resgate da história, a Brocker Turismo é uma referência em Gramado e Canela.",
	foto: "/images/historin-equipe.jpg"
},
];

// Autores data
const autores = [{
  id: 1,
  nome: "Iraci Casagrande",
  bio: "Gramadense, historiadora",
  obras: [1, 2],
  foto: "https://sociedaderecreiogramadense.com.br/storage/posts/July2019/perfil%20IRACI.jpg"
},
{
  id: 2,
  nome: "Gilberto Drescksler",
  bio: "Escritor, historiador e munícipe",
  obras: [1, 2],
  foto: "https://www.sociedaderecreiogramadense.com.br//storage/posts/May2019/Gilbeto%20Drecksler.JPG"
},
{
  id: 3,
  nome: "Ilton Muller",
  bio: "Jornalista graduado pela Unisinos, com 44 anos de atuação na área de Comunicação, dos quais 28 anos no Jornal de Gramado.",
  obras: [],
  foto: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUTEhIVFRUWFRYXFRcXFRUVFRcVFRYWFxUVFRUYHSggGBolHRcVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQFy0dHSUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAQUAwQMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQIDBAUGB//EADwQAAEDAQYDBgQFBAIBBQAAAAEAAhEDBAUSITFBUWFxBiKBkbHwEzKhwUJSYtHhIzNy8QcU0hUkgqKy/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAJhEBAQACAgICAgEFAQAAAAAAAAECEQMhEjEEQVFhMiJCcYGxE//aAAwDAQACEQMRAD8A9PQhJK5GhyVNQgHIlIiUA5CSUSgFQkQgFSpCUypWa3UgJGkKY+oAJKhqWkbfz5KuHzPNK1pjxZZeolFr1y6ePJT0qkqiaJjX3KlYcKNtL8fJeBSqs2uAFJTrtdofDfyRthcbPcSpU1KgiyhIiUAqEiEAqEJEBAhJKJVAqVNRKAclTQUqAVCREoB0olJKo3pbRSaTP8IAvS3imwwc5iAc1mWd51Jl3pPv6LFp1i9xeSdTh/dXqFYkxsot07eHh+62KEH+VdY1Z9mf4LQY5DpvXo/AmOYlxo+IkntG9irF0GRrsrTyqtUqavxmU1T7utrh3KpH6XceR4LVBXN13zrvkeCluq3FjhSe6Wn5CdR+md1WOW+nDzcHj3PTflCRCpzFQkSoASpEICslTZSqgVEpEIByJTUqAchNSpAlWoGgkmANSuPvq1GoTHywfIaDz9VudoqsMDeLs9shnHouftBERwwjxMkj0VydLwnaq2rnHRWaNSFmvMP13haVJswQsK9LG9NCnaI5dStOjaZ4nwKxqGWQHvqtGiDv6oWvfE5ID0xtM8vNIWlGjPe8qCopsCjqM5pWHFKoVVtLCRkYdq08CNCtB9PgR5fyqtZsBZek5zcbV024VabXb6OHBw1HvaFfXLXLVwVS3Z4no4b++K6dpXRLubeVnj43R0pQU1CEHISIQFZCRCsHISIQDpQkShAKhJKEgw+0NYY2N4Nces5BYFqtAAM8frC0e1L4rDhgBHUOJ+wXF3leMVAJ1JPn7C0/tXx+2yTJWjYCsei6T4e/utGlVACx09GNbE0EZqzTtAjIhc7hdUMieAUFtui3NzpgdJz+qR+Tr22yNQlbaRqvPKF916Jw2hrmnSSMvPRdRYbe2qJBlTtUraNolV61sDRLiAqtarhE8lzdrpvtDsMmOuSVvYyysbta/WAxrzlWKVsbVBjIhZtg7LUIkvLndftKW0WR1nOJplo1G8IvrtMt+0lqdhIIMEOy68F2F21w9gPvNcLe1eaeMcR65rp+y1bEzXRHHXFzzvbdQhItHOVCahBq8olNlLKoipQmylTBZSymoSB0pZTUSgOL7e1S17DsWR9TPqvMbVbP69OdjH/2ge+S9G/5AvWg9ppgk1KZOkQD+IRqdPovJqoL6gLT+Kem59Fc7jSY5Y2Wx6HZandHSCoq1sOMA5cc1NYqHdy8fus28aVVuYaXHYwfCZGay27rK6CzX5Tp/M5ow/MSYa3/ACPHkpqfbix1XfDZXe536KRw+Bg+crz+yWBs/wDug7Mk6w2TrOxOa6m5LJYqBxtAxcXOxEA8ANFXWk25b6XbZeDamJgc2szdpj4jfD/Sz+x39xzQThnuytWm5tV4LabCAciWgGeIOoVytRDKocBGmiy1u7axpXvQLacmPAyuKqVLQHFraT3mC4MaDB3Be7Qcgu/vUzTGXBZV60XOAIJGWWHLbdLWsjscvdvaO831RSqWVlNkiC6m4NDcyZJ1PktM36S4MexzZdgIzLcxk5hOonKFbs1ZwGFwdOxz80laxipk+TEEHTPl5Jcue/TLGePu7RW6nFB3IjyxCV1PZSnFOeMLn7ypxReD+U+i6HsdPwJP5iB0AA9ZRx1hzz7bqEiFq5hKEIQFVCalCoiolIhAORKQIQDkApEqA8R7Z2R9K1WgZ5vLweT+8PVYFAEHMd8NJHOIM9cl6/28ub4gFYDQYX5Z4dWu6Akz1HBea3hYTLNQARMcNCidV6E1ycf7blx2zIA6e4XWWZrXieGX+l55d78IgTll5dF093W4gBZ3qtMO43al0sfq0HkRMJaHZ1gOTQPAeiLHa5dmVtUrWAM0T9r8ELrvbTZIGaxahlw5FJf9/wA1G0KbgHOzcdcDBqeuwVc0WtjAZkZ5zmrnZ+OnTVQHUh09EyxQcjBUVkJdSz5qha6nwhjB7w2/MNxHGFOc12G1Vs7dlWcwDgmXfeDarA4FNr1Fll3D8Iz76dLHD3tkuvuizfDo02bhon/I5n6lc1Y7N8Sq1rtJk9G5n0+q68p8U+3D8m/RUiELVylSISICohIlVEVCSUqAVEpESgHISSllABE5HMHVeY9pLM2hWdRcCGO79J0Etwu1aTxBkdIXp0rC7YWPHRxhuIsM5a4D83oD4IbcOfjl/l5bTY5pOc4T4cVr2NuU8lnOqAucBoYPkrdlqd2Esp9uvC6tjes1YhOvG8hSpudOgVGx1FDarOar2tOgzPhos+7dN/LU2xXXa91J9ZziKzjI/TwasK7r+tFnqQ8lzZ0O3Qrv/gNwwY19Zg9dVk2+5adQzG/h5rb0xue7tq3d2uxAAESOBB+mynbU+NV+IeEAcBqcuOa5gWMUnNIBjMGMp6rprodhA18ei5srbTmdTUmmhUy+R2Y5HgtZ1aQs61OD8jrtG/D/AGpaeTVOTTHk3GxcJmt0aT6BdLK5rsw3+o48GepC6Ra8f8Xn893mVCREq2JUJJQgKaVMBSgqiOSpsoQDkJESgHIlIiUgdKitdoFNhcdhpxOwTy6Fm3hUx93YT5rXi4rnf0nPPxjxy8XuZb3vdP8AUlx4azkPA+a1aZEkArY7VXOCwVQM2HPL8J1XO0iR1H14e+Svmw1dN+Dk3Jf9OgsDBoVRv21vpuIY0kgSITbFbNCY8ORzlaVQhzsWwEDKfIrk7lde/JyFe/6zMjQqDLdp9YVcdrHk6OB4YfoV19rtpbpBA4fum0L7pGA6ix2xkZ+a0tx12vGa+3Psv2pUmWBpaZ+V0nLop7DeVsqODWUtfxHID6Zrf/8AU6U92kzWMhMq3ZrwD/laAOmizvjKrcZ4u+1MBe6o1zvygQBGo14Les57jeMfykMlsa5Z7qGjiMNEl3DrlHosai2R03ZWmYe+NSAPCZ9Qt1Vrvs3wqbWcNeZOZVlbyajgzy3laEJEqaSoSJUBnApwKjanhURyUJqEA6UoKalY0nROS3qDeiynAFTMs8ap5ELq4/j/AHkxy5fwrOprLq09VsvCzLS2M/ArswknphlWfUYDLSJDhB8V53elldRqFhzj6tOh97hehVnAFYnae7fjMxs/uNGX6hu0+8lHNx+WPXtpwcnjlq+q4/WMMkajYe8ltWS0SHTkCNo2yg/VczZ7eGOwPyEwQdWnQrWNQZEHxH3nIrzbJXoy2Ldps0mQe6REzI97KsLqJggBuhmSfJTMqu1EOEQBz5+MBTU7XmM9ufUjNRli2xyl9pKVyZROZz4ZFXbPdxYMuviq9K8id/Z9laTHucOR6+Z5LKyLusYlpkGC0kDfnO0e9Vu9n7vDJqOjEZgRoDv1WbcNWk/EWkOLDBI47+X2W58SF0cfx9zdcPN8jvUaaJVajWU7TKefFlGUzlOSpqJWSzpQmyhIM9qeExqcCqI5EoAJ0V6zWTcrXDjuacspENCyl2uQWlQs4GykYyMgphku3DjmE6c2WdphpBVq1BWnmM1HjLvlyHE/Ye/FaI2zrSQ0SYAVGs+dRAdlz5Ejbh5LbdRBHEzruqFqoeX8K5S05+1UIPos11QtOZyP0P7LctTcsJ4SOawrWyZCtLke2nZn4k1qI7+rgPxj/wAguLu683s7rs2zodl67Zan4SsHtP2FdWmtZ2jHq5ugf04O9Vx8/D94u743yJ/HNhWW8RsYlaFEFxkRmDmNc+C5WrZ3saZBaQYgiCCNRCvXXbi2MRheb59O68br7FYQ3vE7ab+9Vk9tb6NOgadMwXwwRkYOufTJWat6jDDdxr+y4S+bV8a0tbqGn66n7JcX9Wf6TyTxw29O/wCMIFFzd4G3CdD5Lt2N28lxv/HdnhhIOrST5kD0XYsK9Geo8/P3RTyMFXmCNzn4+qrVKc5qSy1ditIzXAw8UhUtNIRJWHLw+Xc9tMM9dVGhO+C7ghc3/nn+G3nj+WaCpKbS4wFHSYXGAtmy2cNEDxPFacXF5d30nPPRLNZoVxojIJwEBDTsBJ3Ow/dd0kkc1p4bA9UxtWflH/yOnhxUraQ/F3uZ+w2SuajadIXUBqe8eenkmYlZhROTNFTOqbVZJSA9+OIUlRUTJtljxSBkQZB97LAttn5GRqutrNgys68rJizGv0PIqpdFY4u00y0yAty57ZiEb+qqWmnMx4jcHgVm2eoab/qFektXtN2YZaWFzWtFTnkD/l+68wtljNMlhZhPScuIO45r0rtPf+CzYW/3KoLTqIYPmOXHTxPBcpZbZ8RvwrRED5HNE4DtqAQOWma8/wCT8bHLudV3fG+Tlj1l3P8Ajm6rvh0nO1IBPl7C5zs5YnVahOescySVv9uWupFtAEEOAdLdHSYEeI04rWuS4atCjTDW/wBWo/C06YS5ri556AZc4WXxuG9y9Oj5fLNSztsdnbG9tspspukUKbhWcBkXPMmn4ZeMrvGBZ1xXW2zU2sbmfxHdztyVqFua7M7LdT1HnY791YpFFWluE0jdWaJkZqYdNoVFNUOhUTqcKTVqpJ3/AGChVkJGS7414+i16Llh2TIdAr9jfiePyzB6xI9FeOMk1Bld1fLpMbb8+nJPFQNbyQagPddqNDyTMOUIKRaoVmuGRTuK5+pUNGoHAEgmDmt5rpz4pWaAYVFaKR1ClKSo+AgM4O7wVmqq9o+YFWokK6SKpmFC5shTNUbRBSNg3tYj87BP5hx59R75cxerYaXtl0Z5A/QcV6E5may7zsggu0H4oAMfqg5Rxnkdk/K61PZam+3nr2/9ljXgGW5OGjgDu0HcGeqhZZxZ3Yg0Oafx/iHJwOhXaOsbKbu6MiMztO3voh1jaZBAIOo/dPG96pX10817b1o/69pptaXUnkEOGJv5mYhuJB813VjrGqyy13swEuPxBOQxgta4ci4CP8lz9tuQVK4pD+y54kcMHe36FdzSswLcJALYAIicgMglnhMbf2ucnljJ+D2U8lYDUU2bKZjVgojW5JKZgqVoTarN04VWYxBNa1RUakKw6qNlRKkIU+SVIKE4ahblmwRJgE55Kam00qjDnD9QTMEHL6FQ3kIqMdsSAdVbvRksBGxlapaFpCbSfsmPqYmNdxCr4ylThl5/L0K1LvqYmNPJZFsfLT4K5cdT+mBwn1T10TVKq135wp6lSAqlMyZUwzbUNFPRMhR2kZIs5yVUoc4ZqN4UtRRlSZtTMSonCemhUwCYQlTUBY2tBaBlw1VG0WWNFtlqr1qc5JQOUpUC6s4HhUjYzgdB98Vv2Ki4MbiGcZqhQaRagDlId49wroQxa5Y7ymX60z3qa/aqGJ7Wp+FOAWOmpA1Dmp4CcWoCnhRghS1m7pJTIkoSIQGba7biph7wA6cjxz06zGS0xVD6YPELEqNxU6jZ0dI5HYqxddqmkBH8Hcea1qW7Zaf9PCqbm5wVmOtrqVZri44SYI2WzaxuNCgmdajA8Qr1yHukc1Rt/wAo6qzcbteqf0GlWKdZwkqhSU9FBm1tEyzp1UptJMJnaKOVKVCQpUISOCcEOUhG4KN7VKVGUBjWsRWpO/VhPjIHqttY9990B35XNd5FbLtMltL1GdRPCWEORTOSzznasb0dCcAhqUKFI6jclXKvEKtWp5oCvKFJ8NKmWmE13feOIVW56kVXN47HRS13Q8HmqNd2CsHc1tfaY0r3aCC0yCM4y+nHotG47T8WgJ1bkfsqd+UfiUsQ1iQRqOKzuzN4Np1BRdAFQQz/ACaJz65p/RNW8JyCs3I5Vb1d3h0UlzP06p2dCV0LwlBTZyTis1I6xCZSKRwRTR9BZBTHJwQ8KTNCEoQEjMcFDUEhTuUZCQZ1608dF3EAq1YKuOkx3Fo84z+qaRqOIUFxOimWTmx7mxyJxD1WmHpGS4fom0jr1UjgotD1TznQxTBPUIKkaslpAhwTMUJTP+/2Tk2WxhCEQeP0/lCrxLbk7xZBPVUryp4mBwW1fNLMkdfNZtncCC0q7+Uxbue0fEpYTtkVyV9sfTq0y0SWVAQeQMrZuqqaVUtOhVq/bNPeG4jxRiMlq31WvaDx0PUE/ZLcz9GzmsetWJswjUQPss6va3Mc17TBbC0veKZ7eoDROcqV12wVqTKg/EPI6EK64LFaB6Skc02q5MYUU1wHJPULU9ikylIUrkhSoISmFOTSkataBBBVWyuw2h42qMDx/k0wY8wr1obIVCo7C6m/8r8J6VO7/wDotPgrwvacly1WsNdhJhxEga5ben0KadRHuc1Ut1hL6rag2gHwmCPPkrlT/JLG525TKdfQsxmtXv7ODlJKruP7hSNdIlSaamQQnYlBSfqM9csjoc585UjeeS2+mf2dmhPyQp2ph1zipMJ/L6LGAgoQtPovtUt3zNcNVuUR8SmQdwhCj8H9Ofb/AGnjYE+qy7Q6WT19ShC1npH27zsqIs9MfpH1W8hCyvtapWGahlIhI1ykU8HNCEjSOTShCQNKbKEKDIfss22DuPH6SRyIzB8wkQqx9lfTQa/EAdJaHR1ASOEjghC2Zq52TqOhHA+uf3QhYtEBfBPQepU4fnCEK56T9pcSRCEB/9k="
},
{
  id: 4,
  nome: "Pedro Muller",
  bio: "",
  obras: [3],
  foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnVATpWYkddWPhKydlSr1R4a_sexL2hB4N0w&s"
},
{
  id: 5,
  nome: "Gildo Oppitz",
  bio: "Canelense nascido em 1931 muito trabalhador e apaixonado pela cidade trouxe suas historias no seu livro ",
  obras: [5],
  foto: "fotos/autores/gildo-oppitz.jpg"
},
{
  id: 6,
  nome: "Antônio Olmiro dos Reis",
  bio: "Canelense, um pesquisador e entusiasta da história da cidade muito ativo na comunidade. Conhecido por seu vasto acervo.",
  obras: [5],
  foto: ""
},
{
  id: 7,
  nome: "Marília Daros",
  bio: "Marília Daros é reconhecida por seu trabalho em resgatar e preservar a memória histórica de Gramado, contribuindo significativamente para a valorização da cultura local.",
  obras: [5],
  foto: "https://static.wixstatic.com/media/2a8dcd_468becfc5dba453e9d13022f0763b950~mv2.jpg/v1/fill/w_363,h_530,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/2a8dcd_468becfc5dba453e9d13022f0763b950~mv2.jpg"
},
];

// Obras data
const obras = [{
  id: 1,
  titulo: "Uma história de Canela",
  descricao: "Um livro do Grande Hotel Canela, em homenagem aos 70 anos de emancipação do municipio.",
  capa: "https://d1o6h00a1h5k7q.cloudfront.net/imagens/img_m/19857/9377442.jpg",
  pago: false,
  autorId: 1,
  link: "https://www.grandehotel.com.br/wp-content/uploads/2021/10/PDF-Livro-Uma-Historia-de-Canela-1.pdf"
},
{
  id: 2,
  titulo: "Canela Passado a Limpo",
  descricao: "Olmiro Trás um livro em 4 cores, com muitas imagens com narrativas nostalgicas sobre a cidade",
  capa: "fotos/obras/canela-passado-a-limpo.jpg",
  pago: true,
  autorId: 1,
  link: "https://wa.me/555484212882"
},
{
  id: 3,
  titulo: "Canela Ontem e Hoje",
  descricao: "Mostrando as diferenças da cidade ontem e hoje.",
  capa: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkeia6Y6UwMSQ8T0Zfy9RZIzvxJTYVpe0AOg&s",
  pago: true,
  autorId: 4,
  link: "https://www.facebook.com/canelaontemehoje"
},
{
  id: 4,
  titulo: "Memórias Canela com Pimenta",
  descricao: "Mostrando as diferenças da cidade ontem e hoje.",
  capa: "fotos/obras/memorias-canela-com-pimenta.jpg",
  pago: true,
  autorId: 5,
  link: ""
},
{
  id: 5,
  titulo: "Era Uma Vez...! Relatos de Gramado",
  descricao: "Por Iraci e Gilberto, Coletânea de histórias e memórias que retratam a evolução de Gramado",
  capa: "fotos/obras/era-uma-vez-gramado-iraci-gilberto.jpg",
  pago: true,
  autorId: 5,
  link: "",
},
{
  id: 6,
  titulo: "Raízes de Gramado: 40 Anos",
  descricao: "Por Marilia e Vera Lúcia A obra reúne contribuições de diferentes autores, proporcionando uma visão abrangente sobre as raízes e o desenvolvimento de Gramado ao longo de quatro décadas",
  capa: "fotos/obras/raizes-de-gramado-40-anos.jpg",
  pago: true,
  autorId: 5,
  link: "",
},
{
  id: 7,
  titulo: "Eterna Sociedade Recreio Gramadense",
  descricao: "por Iraci e Gilberto, a obra se debruça sobre a história da Sociedade Recreio Gramadense, uma das instituições sociais mais antigas e tradicionais de Gramado.",
  capa: "fotos/obras/eterna-recreio-gramado.jpg",
  pago: true,
  autorId: 5,
  link: "",
},
{
  id: 8,
  titulo: "Gramado Contrastes",
  descricao: "O livro apresenta uma coletânea de fotografias e relatos que contrastam diferentes períodos da cidade, destacando as transformações ocorridas ao longo do tempo.",
  capa: "fotos/obras/gramado-contrastes.jpg",
  pago: true,
  autorId: 5,
  link: "",
},
{
  id: 9,
  titulo: "Gramado: O Lago, as Hortênsias e o Turismo",
  descricao: "Explora a história do bairro Planalto, do Lago Joaquina Rita Bier e o desenvolvimento do turismo em Gramado. O livro detalha como o turismo começou na cidade e destaca a participação da comunidade local na época.",
  capa: "fotos/obras/gramado-lago-hortensias-turismo.jpg",
  pago: true,
  autorId: 5,
  link: "",
},
];

// Sites data
const sites = [
  {
      id: 1,
      nome: "Gramado Portal da cidade",
      link: "https://gramado.portaldacidade.com/",
      logo: "https://image.portaldacidade.com/unsafe/300x0/https://bucket.portaldacidade.com/umuarama.portaldacidade.com/img/portals/logo/portal-da-cidade-gramado-657ae91a370ae.png",
  },
  {
      id: 2,
      nome: "Ilton Muller",
      link: "https://www.iltonmuller.com.br/",
      logo: "https://www.iltonmuller.com.br/assets/images/logotipo-iltonmuller.png?v2",
  },
  {
      id: 3,
      nome: "Miron Neto",
      link: "https://www.mironneto.com/",
      logo: "https://irp.cdn-website.com/d469b486/dms3rep/multi/Logo-pb.svg",
  },
  {
      id: 5,
      nome: "Portal Gramado News",
      link: "https://www.portalgramadonews.com.br/",
      logo: "https://portalgramadonews.com.br/wp-content/uploads/2022/11/Logo-GNews-2019-5.png",
  },
  {
      id: 4,
      nome: "IBGE",
      link: "https://cidades.ibge.gov.br/brasil/rs/gramado/panorama",
      logo: "https://blog.1doc.com.br/wp-content/uploads/2024/11/ibge.jpg",
  },
];

// Load the legacy data into the database
legacyDb.loadData({
  historias,
  ruas,
  cidades,
  organizacoes,
  negocios,
  autores,
  obras,
  sites,
  questions
});

// Export the loaded data for use in components
export const appData = legacyDb.getAllData();

// Export individual data arrays for convenience
export { 
  historias as legacyHistorias, 
  ruas as legacyRuas, 
  cidades as legacyCidades, 
  organizacoes as legacyOrganizacoes,
  negocios as legacyNegocios,
  autores as legacyAutores,
  obras as legacyObras,
  sites as legacySites,
  questions as legacyQuestions
};

// Export the database instance for advanced queries
export { legacyDb };
