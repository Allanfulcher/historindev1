# Historin Design System

## Overview
This document defines the visual design system and component guidelines for the Historin project. It ensures consistency across all components and provides clear guidelines for developers working on the platform.

## Color Palette

### Design Philosophy
The Historin color palette is inspired by historical architecture and aged materials, creating a warm, inviting atmosphere that reflects the heritage of old cities. The colors are intentionally muted and earthy to provide a calming reading experience while maintaining excellent readability.

### Color Reference Guide
For quick implementation, here are the main colors with their hex values:

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Header Background | `#e6d3b4` | Main header, navigation |
| Page Background | `#f4ede0` | Body background |
| Card Background | `#FEFCF8` | Content cards, modals |
| Primary Brown | `#8B4513` | Buttons, links, primary actions |
| Primary Text | `#6B5B4F` | Main content text |
| Secondary Text | `#A0958A` | Captions, metadata |
| Header Text | `#4A3F35` | Titles, important text |
| Accent Gold | `#CD853F` | Highlights, special elements |
| Light Border | `#F5F1EB` | Subtle borders, dividers |

### Primary Colors
- **Header Background**: `#e6d3b4` (warm beige)
- **Primary Brown**: `#8B4513` (saddle brown) - Used for primary buttons and links
- **Primary Brown Hover**: `#A0522D` (sienna)
- **Accent Gold**: `#CD853F` (peru) - Used for accent elements and highlights
- **Accent Gold Hover**: `#DEB887` (burlywood)

### Neutral Colors
- **Background**: `#FAF7F2` (warm off-white) - Main page background, card backgrounds
- **Card Background**: `#FEFCF8` (slightly warmer white) - Modal backgrounds, content cards
- **Warm Gray Scale**:
  - Light Warm Gray: `#F5F1EB` (warm gray-50) - Background elements, subtle borders
  - Medium Warm Gray: `#A0958A` (warm gray-400) - Secondary text, placeholders
  - Dark Warm Gray: `#6B5B4F` (warm gray-600) - Primary text
  - Darker Warm Gray: `#4A3F35` (warm gray-700) - Headers, important text
  - Deep Brown: `#2D1B0E` (dark brown) - High contrast text when needed

### Status Colors
- **Success**: `#6B8E23` (olive drab) - Earthy green for success states
- **Warning**: `#CD853F` (peru) - Warm brown-gold for warnings
- **Error**: `#A0522D` (sienna) - Muted reddish-brown for errors
- **Info**: `#8B7355` (shadow) - Warm taupe for information

### Semantic Colors
- **Star Rating**: `#DAA520` (goldenrod) - Warm gold for ratings
- **Link Hover**: `#8B4513` with 20% opacity (saddle brown with transparency)
- **Historical Accent**: `#D2B48C` (tan) - For historical elements and highlights

## Typography

### Font Families
- **Primary**: System font stack (default Tailwind)
- **Icons**: Font Awesome 5 (`fas` classes)

### Font Sizes
- **Extra Small**: `text-xs` (12px)
- **Small**: `text-sm` (14px)
- **Base**: `text-base` (16px) - Default body text
- **Large**: `text-lg` (18px)
- **Extra Large**: `text-xl` (20px) - Modal titles
- **2XL**: `text-2xl` (24px) - Page headers
- **3XL**: `text-3xl` (30px) - Star ratings

### Font Weights
- **Normal**: `font-normal` (400)
- **Medium**: `font-medium` (500) - Card titles
- **Bold**: `font-bold` (700) - Form labels, important text

## Spacing & Layout

### Padding Standards
- **Extra Small**: `p-1` (4px) - Icon buttons
- **Small**: `p-2` (8px)
- **Medium**: `p-4` (16px) - Standard card padding, header padding
- **Large**: `p-6` (24px) - Modal padding
- **Extra Large**: `p-8` (32px)

### Margin Standards
- **Small**: `m-1`, `m-2` (4px, 8px)
- **Medium**: `m-4` (16px)
- **Large**: `m-6` (24px)

### Gap Standards
- **Small**: `gap-2` (8px)
- **Medium**: `gap-4` (16px) - Standard grid gap
- **Large**: `gap-6` (24px)

### Border Radius
- **Small**: `rounded` (4px) - Buttons, inputs
- **Medium**: `rounded-lg` (8px) - Cards, images
- **Large**: `rounded-xl` (12px) - Large cards
- **Full**: `rounded-full` - Icon buttons

## Component Library

### Buttons

#### PrimaryBtn
```tsx
// Usage: Main action buttons
className="bg-[#8B4513] hover:bg-[#A0522D] text-white py-2 px-4 rounded whitespace-nowrap flex-shrink-0 text-sm sm:text-base transition-colors duration-200"
```

#### TransparentBtn
```tsx
// Usage: Icon buttons, secondary actions
className="bg-transparent hover:bg-[#F5F1EB] text-[#6B5B4F] p-1 rounded-full flex items-center justify-center text-2xl transition-colors duration-200"
```

### Cards

#### HistoryCard
```tsx
// Usage: Display history items in lists
className="group relative flex items-start gap-4 rounded-xl bg-[#FEFCF8] p-4 shadow-sm ring-1 ring-[#A0958A]/20 transition-all hover:shadow-md hover:ring-1 hover:ring-[#8B4513]/20"
```

#### StreetCard
```tsx
// Usage: Display street information
// Similar styling to HistoryCard with appropriate content structure
```

### Layout Components

#### Header
```tsx
// Usage: Main navigation header
className="flex justify-between items-center p-4 bg-[#E6D3B4]"
```

#### Modal/Popup Base
```tsx
// Usage: All popup components
// Backdrop: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-high"
// Content: "bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
```

### Form Elements

#### Input Fields
```tsx
className="shadow appearance-none border border-[#F5F1EB] rounded w-full py-2 px-3 text-[#6B5B4F] bg-[#FEFCF8] leading-tight focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513]"
```

#### Textarea
```tsx
className="shadow appearance-none border border-[#F5F1EB] rounded w-full py-2 px-3 text-[#6B5B4F] bg-[#FEFCF8] leading-tight focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513]"
```

#### Labels
```tsx
className="block text-[#4A3F35] text-sm font-bold mb-2"
```

## Interactive States

### Hover Effects
- **Cards**: `hover:shadow-md hover:ring-1 hover:ring-[#8B4513]/20`
- **Buttons**: Color transitions with `transition-colors duration-200`
- **Images**: `hover:scale-105` with `transition-transform duration-300`
- **Links**: `hover:text-[#A0522D]` for text links

### Focus States
- **Form Elements**: `focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513]`
- **Buttons**: `focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50`

### Active States
- **Selected Items**: Brown ring or warm background highlight using `ring-[#8B4513]` or `bg-[#F5F1EB]`
- **Star Ratings**: `text-[#DAA520]` for filled, `text-[#A0958A]` for empty

## Responsive Design

### Breakpoints
- **Mobile First**: Default styles for mobile
- **Small**: `sm:` (640px+) - Tablet adjustments
- **Medium**: `md:` (768px+) - Desktop adjustments
- **Large**: `lg:` (1024px+) - Large desktop

### Responsive Patterns
- **Text Sizes**: `text-sm sm:text-base` - Smaller on mobile
- **Grid Layouts**: `grid gap-4` with responsive columns
- **Flex Layouts**: `flex items-center space-x-4` for horizontal layouts

## Shadows & Elevation

### Shadow Levels
- **Subtle**: `shadow-sm` - Cards at rest
- **Medium**: `shadow-md` - Cards on hover
- **Large**: `shadow-lg` - Modals and important elements

### Ring Effects
- **Subtle**: `ring-1 ring-[#A0958A]/20` - Card borders
- **Interactive**: `ring-1 ring-[#8B4513]/20` - Hover states
- **Focus**: `ring-2 ring-[#8B4513]/30` - Focus states

## Animation & Transitions

### Standard Transitions
- **Colors**: `transition-colors duration-200`
- **Transforms**: `transition-transform duration-300`
- **All Properties**: `transition-all` - For complex hover effects

### Transform Effects
- **Scale**: `hover:scale-105` - Image hover effects
- **Translate**: For slide animations

## Z-Index Layers

### Layer Hierarchy
- **Base**: `z-0` - Default content
- **Elevated**: `z-10` - Dropdowns, tooltips
- **Modal**: `z-high` - Popups and modals (custom value)
- **Toast**: `z-50` - Notifications

## Accessibility Guidelines

### Color Contrast
- Ensure all text meets WCAG AA standards
- Use sufficient contrast ratios for all interactive elements

### Focus Management
- All interactive elements must have visible focus states
- Proper tab order for keyboard navigation

### ARIA Labels
- Use `aria-label` for icon-only buttons
- Proper form labeling with `htmlFor` attributes

## Icon Usage

### Font Awesome Classes
- **Menu**: `fas fa-bars`
- **Close**: `fas fa-times`
- **Share**: `fas fa-share-alt`
- **Feedback**: `fas fa-comment-dots`
- **Quiz**: `fas fa-question-circle`
- **Arrow**: `fas fa-chevron-right`

### Icon Sizing
- **Small**: `text-sm` (14px)
- **Medium**: `text-xl` (20px) - Close buttons
- **Large**: `text-2xl` (24px) - Icon buttons
- **Extra Large**: `text-3xl` (30px) - Star ratings

## Best Practices

### Component Structure
1. Always use TypeScript interfaces for props
2. Include `'use client'` directive for client-side components
3. Export components as default exports
4. Maintain legacy compatibility with window object exports when needed

### Styling Guidelines
1. Use Tailwind CSS classes consistently
2. Prefer utility classes over custom CSS
3. Use responsive prefixes for mobile-first design
4. Group related classes logically (layout, colors, typography, effects)

### Performance Considerations
1. Use `transition-*` classes for smooth animations
2. Implement proper image loading with Next.js Image component
3. Use conditional rendering for modals and popups
4. Implement proper error boundaries and fallbacks

## File Organization

### Component Structure
```
src/components/
├── buttons/          # Reusable button components
├── cards/           # Card-style components
├── popups/          # Modal and popup components
├── extra/           # Utility components
├── ruas/            # Street-specific components
├── sobre/           # About page components
├── referencias/     # References components
└── [ComponentName].tsx  # Main components
```

### Naming Conventions
- **Components**: PascalCase (e.g., `HistoryCard.tsx`)
- **Props Interfaces**: `[ComponentName]Props`
- **CSS Classes**: Follow Tailwind conventions
- **File Names**: Match component names exactly

## Migration Notes

### Legacy Compatibility
- Components export to `window` object for backward compatibility
- React.createElement syntax supported alongside JSX
- Gradual migration from JavaScript to TypeScript

### Next.js Integration
- Use `'use client'` for interactive components
- Prefer Next.js `Link` over React Router
- Use Next.js `Image` component for optimized images
- Implement proper SEO with meta tag management

This design system should be referenced for all new components and used to maintain consistency across the Historin platform.
