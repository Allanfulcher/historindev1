// Global type declarations for window object extensions

declare global {
  interface Window {
    // Main App component
    App: React.ComponentType<any>;
    
    // React Router DOM
    ReactRouterDOM: {
      Link: React.ComponentType<any>;
      useHistory: () => any;
      useLocation: () => any;
      useParams: () => any;
      BrowserRouter: React.ComponentType<any>;
      Route: React.ComponentType<any>;
      Switch: React.ComponentType<any>;
    };
    
    // Data objects
    historias: any[];
    ruas: any[];
    cidades: any[];
    orgs: any[];
    negocios: any[];
    autores: any[];
    obras: any[];
    sites: any[];
    
    // Component functions
    OnboardingPopup: React.ComponentType<any>;
    PopupCarrossel: React.ComponentType<any>;
    QuizModal: React.ComponentType<any>;
    DonationPopup: React.ComponentType<any>;
    FeedbackPopup: React.ComponentType<any>;
    Menu: React.ComponentType<any>;
    Header: React.ComponentType<any>;
    MapView: React.ComponentType<any>;
    Preview: React.ComponentType<any>;
    RuaHistoria: React.ComponentType<any>;
    NotFound: React.ComponentType<any>;
    Sobre: React.ComponentType<any>;
    Referencias: React.ComponentType<any>;
    AdicionarHistoria: React.ComponentType<any>;
    RuasEHistorias: React.ComponentType<any>;
    LegadoAfricano: React.ComponentType<any>;
    LegadoAfricanoCard: React.ComponentType<any>;
    CityCarousel: React.ComponentType<any>;
    RuaCarousel: React.ComponentType<any>;
    HistoriaContent: React.ComponentType<any>;
    Home: React.ComponentType<any>;
  }
}

export {};
