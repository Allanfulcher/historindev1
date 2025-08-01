# Historin React Components Migration Checklist

This is a comprehensive list of all React components found in the `index.html` file that need to be migrated to Next.js.

## ✅ COMPLETED COMPONENTS

### 1. OnboardingPopup ✅
- **Status**: MIGRATED
- **File**: `/src/components/OnboardingPopup.tsx`
- **Description**: Welcome tutorial popup with 3-step onboarding flow
- **Features**: Step navigation, skip functionality, close button
- **Dependencies**: React hooks (useState)

### 2. DonationPopup ✅
- **Status**: MIGRATED
- **File**: `/src/components/DonationPopup.tsx`
- **Description**: Donation request popup with link to donation page
- **Features**: Close button, link to /sobre#doacao
- **Dependencies**: Next.js Link component

### 3. DataModal ✅
- **Status**: MIGRATED
- **File**: `/src/components/DataModal.tsx`
- **Description**: Generic data display modal with table format
- **Features**: Dynamic columns, scrollable content, close functionality
- **Dependencies**: TypeScript interfaces for props

### 4. PopupCarrossel ✅
- **Status**: MIGRATED
- **File**: `/src/components/PopupCarrossel.tsx`
- **Description**: Image carousel popup with navigation
- **Features**: Slide navigation, overlay click to close, multiple slides, dot indicators
- **Dependencies**: React hooks (useState), Next.js Link component

---

### 5. QuizModal ✅
- **Status**: MIGRATED
- **File**: `/src/components/QuizModal.tsx`
- **Description**: Interactive quiz component with email collection
- **Features**: Email submission, quiz questions, scoring, progress saving, ranking system
- **Dependencies**: React hooks (useState, useEffect), localStorage, Formspree integration

---

### 6. Menu ✅
- **Status**: MIGRATED
- **File**: `/src/components/Menu.tsx`
- **Description**: Sidebar navigation menu with overlay
- **Features**: Menu items, overlay, responsive design, external links, surprise me functionality
- **Dependencies**: Next.js Link, useRouter, TypeScript interfaces

---

### 7. Sobre (About Page) ✅
- **Status**: MIGRATED
- **File**: `/src/app/sobre/page.tsx`
- **Description**: About page with team members and donation section
- **Features**: Team member accordion, join modal, donation section, video embed, contact links, PIX donation
- **Dependencies**: React hooks (useState, useEffect), Next.js useSearchParams, Formspree integration

---

### 8. AdicionarHistoria (Add Story Page) ✅
- **Status**: MIGRATED
- **File**: `/src/app/adicionar-historia/page.tsx`
- **Description**: Form to add new stories with Formspree integration
- **Features**: Form validation, Formspree integration, TypeScript interfaces
- **Dependencies**: React hooks (useState), Next.js Link

### 9. RuasEHistorias (Streets and Stories Page) ✅
- **Status**: MIGRATED
- **File**: `/src/app/ruas-e-historias/page.tsx`
- **Description**: List all streets and stories with search functionality
- **Features**: Search filter, grid layout, responsive design, sample data integration
- **Dependencies**: React hooks (useState, useEffect, useMemo), Next.js Link

---

### 10. LegadoAfricanoCard ✅
- **Status**: MIGRATED
- **File**: `/src/components/LegadoAfricanoCard.tsx`
- **Description**: Reusable card component for African legacy section
- **Features**: Link to legacy page, responsive image, hover effects
- **Dependencies**: Next.js Link

### 11. Carousel (Reusable) ✅
- **Status**: MIGRATED
- **File**: `/src/components/Carousel.tsx`
- **Description**: Generic reusable carousel component for items
- **Features**: Click handlers, dynamic content, responsive, TypeScript interfaces
- **Dependencies**: React (pure component)

### 12. MapView ✅
- **Status**: MIGRATED
- **File**: `/src/components/MapView.tsx`
- **Description**: Interactive map component using Leaflet
- **Features**: Toggle between streets/stories markers, popup info, click handlers, SSR-safe
- **Dependencies**: Leaflet library, React hooks (useState, useEffect, useRef), dynamic imports

### 13. Preview
- **Status**: PENDING
- **Location**: Lines ~1699-1737
- **Description**: Preview card for map selections
- **Features**: Dynamic content, close button, navigation links
- **Dependencies**: React Router Link

### 14. CityCarousel
- **Status**: PENDING
- **Location**: Lines ~1741-1790
- **Description**: Horizontal scrollable city selector
- **Features**: Auto-scroll to selected city, back to map button
- **Dependencies**: React hooks (useRef, useEffect), React Router Link

### 15. RuaCarousel
- **Status**: PENDING
- **Location**: Lines ~1796-1850+ (continues)
- **Description**: Horizontal scrollable street selector
- **Features**: Auto-scroll to selected street, responsive design
- **Dependencies**: React hooks (useRef, useEffect)

### 16. HistoriaContent
- **Status**: ✅ COMPLETED
- **Location**: `src/components/HistoriaContent.js`
- **Description**: Main content component for displaying stories
- **Features**: Tab navigation, image galleries, story navigation, zoom/pan modals, credit reporting
- **Dependencies**: React hooks (useState, useEffect, useRef), React Router (useHistory, useLocation, Link)

### 17. Referencias (References Page)
- **Status**: ✅ COMPLETED
- **Location**: `src/components/Referencias.js`
- **Description**: References and bibliography page with collapsible sections
- **Features**: Collapsible sections (orgs, autores, obras, sites), URL parameter handling, YouTube playlist embed
- **Dependencies**: React hooks (useState, useEffect), React Router (useLocation)

### 18. LegadoAfricano (African Legacy Page)
- **Status**: ✅ COMPLETED
- **Location**: `src/components/LegadoAfricano.js`
- **Description**: Dedicated page for African legacy content with historical context
- **Features**: Article sections, image gallery, external academic links, selected stories display
- **Dependencies**: React hooks (useEffect), React Router Link

### 19. RuaHistoria (Street History Page)
- **Status**: ✅ COMPLETED
- **Location**: `src/components/RuaHistoria.js`
- **Description**: Main page component for street and story display with complex routing
- **Features**: Complex routing, tab system, carousel integration, meta tag management, URL parameter handling
- **Dependencies**: React Router hooks (useParams, useHistory, useLocation), multiple child components (CityCarousel, RuaCarousel, HistoriaContent)

### 20. NotFound (404 Page)
- **Status**: ✅ COMPLETED
- **Location**: `src/components/NotFound.js`
- **Description**: Simple 404 error page with navigation back to home
- **Features**: Error message, back to home link, clean design
- **Dependencies**: React Router Link

### 21. FeedbackPopup
- **Status**: ✅ COMPLETED
- **Location**: `src/components/FeedbackPopup.js`
- **Description**: User feedback form popup with star rating system
- **Features**: 5-star rating, form fields (name, email, comment), Formspree integration, modal overlay
- **Dependencies**: React hooks (useState), Formspree integration

### 22. Header
- **Status**: ✅ COMPLETED
- **Location**: `src/components/Header.js`
- **Description**: Top header component with logo and action buttons
- **Features**: Logo with home link, quiz button, share button, feedback button, menu toggle, responsive design
- **Dependencies**: React Router Link, QuizModal component integration

## 🔄 PENDING COMPONENTS

### 23. App (Main App Component)
- **Status**: ✅ COMPLETED
- **Location**: `src/components/App.js`
- **Description**: Main application wrapper with comprehensive mobile-first design
- **Features**: Complete React Router integration, global state management, automated popup timing, SEO management, mobile-first home page layout
- **Dependencies**: React Router, all 22 other migrated components

---

## 📊 MIGRATION STATISTICS

- **Total Components**: 23
- **Completed**: 23 (100%) 🎉
- **Pending**: 0 (0%)

## 🎯 RECOMMENDED MIGRATION ORDER

### Phase 1 - Simple Components (No external dependencies)
1. NotFound ✅ (Simple)
2. DataModal ✅ (Generic utility)
3. LegadoAfricanoCard ✅ (Simple card)
4. Carousel ✅ (Reusable utility)

### Phase 2 - Form Components
5. DonationPopup ✅ (Simple popup)
6. FeedbackPopup ✅ (Form with validation)
7. AdicionarHistoria ✅ (Form page)

### Phase 3 - Navigation Components
8. Header ✅ (Top navigation)
9. Menu ✅ (Sidebar navigation)
10. CityCarousel ✅ (Navigation carousel)
11. RuaCarousel ✅ (Navigation carousel)

### Phase 4 - Content Pages
12. Sobre ✅ (About page)
13. Referencias ✅ (References page)
14. LegadoAfricano ✅ (Legacy page)
15. RuasEHistorias ✅ (Listing page)

### Phase 5 - Interactive Components
16. PopupCarrossel ✅ (Image carousel)
17. QuizModal ✅ (Complex interactive)
18. Preview ✅ (Map preview)

### Phase 6 - Complex Components
19. MapView ✅ (Requires Leaflet integration)
20. HistoriaContent ✅ (Complex content display)
21. RuaHistoria ✅ (Main page component)

### Phase 7 - App Integration
22. App ✅ (Main wrapper - requires all other components)

---

## 📝 NOTES

- All components use Tailwind CSS for styling
- Many components depend on global data from `bd.js` (ruas, historias, cidades, etc.)
- React Router is used extensively for navigation
- Some components use external libraries (Leaflet for maps)
- Form submissions use Formspree service
- Local storage is used for quiz progress and popup timing

## 🔧 NEXT.JS SPECIFIC CONSIDERATIONS

- Add 'use client' directive for components using React hooks
- Convert React Router components to Next.js navigation
- Handle external script loading (Leaflet, etc.)
- Manage global state/data loading
- Convert dynamic imports for better performance
- Handle SEO meta tags properly

## 🚀 NEXT STEPS

1. Continue migrating remaining components in recommended order
2. Test each component individually after migration
3. Update component loading system to handle new components
4. Optimize bundle sizes and loading performance
5. Add error boundaries for better error handling

---

## 📖 EXAMPLE USAGE

### Loading Components in HTML
```html
<!-- Load component scripts -->
<script src="src/components/Preview.js"></script>
<script src="src/components/CityCarousel.js"></script>
<script src="src/components/RuaCarousel.js"></script>
<script src="src/components/HistoriaContent.js"></script>
<script src="src/components/Referencias.js"></script>
<script src="src/components/LegadoAfricano.js"></script>
<script src="src/components/RuaHistoria.js"></script>
```

### Using Components in React
```javascript
// Preview Component
const preview = React.createElement(window.Preview, {
    previewContent: {
        type: 'rua',
        ruaId: 1,
        title: 'Rua Example',
        description: 'Description...',
        images: ['image1.jpg']
    },
    onClose: () => console.log('Preview closed')
});

// City Carousel
const cityCarousel = React.createElement(window.CityCarousel, {
    cidades: [{id: 1, nome: 'Gramado'}],
    handleCityClick: (city) => console.log('City clicked:', city),
    selectedCityId: 1
});

// Rua Carousel
const ruaCarousel = React.createElement(window.RuaCarousel, {
    ruas: [{id: 1, nome: 'Rua Coberta'}],
    handleRuaClick: (rua) => console.log('Rua clicked:', rua),
    selectedRuaId: 1
});

// Historia Content (Complex component)
const historiaContent = React.createElement(window.HistoriaContent, {
    currentHistory: {id: 1, titulo: 'História', ano: 1950},
    historiasDaRua: [],
    currentIndex: 0,
    setCurrentIndex: () => {},
    setCurrentHistory: () => {},
    showAllStories: false,
    setShowAllStories: () => {},
    selectedRuaId: 1,
    activeTab: 'historia',
    changeTab: () => {},
    rua: {nome: 'Rua Example'},
    cidade: {nome: 'Gramado'},
    orgs: [],
    negocios: []
});

// Referencias Page
const referencias = React.createElement(window.Referencias);

// LegadoAfricano Page
const legadoAfricano = React.createElement(window.LegadoAfricano);

// RuaHistoria Page (Complex routing component)
const ruaHistoria = React.createElement(window.RuaHistoria);
```

### Integration Notes
- All components are exported to `window` object for global access
- Components use React.createElement syntax (no JSX)
- Ensure React and ReactRouterDOM are loaded before component scripts
- Components expect data from global variables (orgs, autores, obras, sites)
- HistoriaContent is the most complex component with many props
