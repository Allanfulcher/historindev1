# Text Formatting System - Historin

## Overview

The Historin text formatting system provides comprehensive text processing capabilities to transform raw text descriptions into beautifully formatted, readable content. This system addresses common issues like lack of line breaks, poor paragraph separation, and dense text blocks.

## Features

### ✅ Automatic Text Processing
- **Paragraph Detection**: Automatically detects and creates paragraph breaks
- **Line Break Preservation**: Maintains intentional line breaks while cleaning excessive whitespace
- **Text Cleaning**: Removes HTML entities, normalizes quotes, and fixes encoding issues
- **Smart Truncation**: Intelligent text truncation that respects word boundaries

### ✅ Markdown-like Formatting
- **Bold Text**: `**text**` → **text**
- **Italic Text**: `*text*` or `_text_` → *text*
- **Emphasis**: ALL CAPS words automatically styled as important terms
- **Custom Styling**: Configurable CSS classes for all formatting elements

### ✅ Interactive Features
- **Expandable Text**: Built-in expand/collapse functionality
- **Show More/Less**: Smooth transitions with visual indicators
- **Responsive Design**: Optimized for mobile and desktop viewing

## Quick Start

### Basic Usage

```tsx
import { formatText } from '@/utils/textFormatter';

// Simple formatting
const FormattedDescription = () => (
  <div>
    {formatText("Your raw text here...")}
  </div>
);
```

### Interactive Expandable Text

```tsx
import { useExpandableText } from '@/utils/textFormatter';

const InteractiveText = ({ text }) => {
  const { formattedText, isExpanded, needsExpansion, toggleExpanded } = useExpandableText(text, 150);
  
  return (
    <div>
      {formattedText}
      {needsExpansion && (
        <button onClick={toggleExpanded}>
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
};
```

## API Reference

### Core Functions

#### `formatText(text: string, options?: FormatTextOptions): React.ReactElement`

Main formatting function with full customization options.

**Parameters:**
- `text`: Raw text to format
- `options`: Configuration object (optional)

**Options:**
```tsx
interface FormatTextOptions {
  preserveLineBreaks?: boolean;     // Default: true
  enableMarkdown?: boolean;         // Default: true
  maxLength?: number;              // Default: undefined
  showMore?: boolean;              // Default: false
  className?: string;              // Default: ''
  paragraphClassName?: string;     // Default: 'mb-3 last:mb-0'
  emphasisClassName?: string;      // Default: 'font-medium text-[#CD853F]'
}
```

#### `formatTextPreview(text: string, maxLength?: number): React.ReactElement`

Formats text for preview/card display with automatic truncation.

#### `formatTextFull(text: string): React.ReactElement`

Formats text for full display without truncation.

#### `useExpandableText(text: string, previewLength?: number)`

React hook for managing expandable text state.

**Returns:**
```tsx
{
  formattedText: React.ReactElement;
  isExpanded: boolean;
  needsExpansion: boolean;
  toggleExpanded: () => void;
}
```

### Utility Functions

#### `extractPlainText(text: string): string`

Extracts plain text from formatted content (useful for SEO, search indexing).

## Usage Examples

### 1. HistoriaCard Component (Current Implementation)

```tsx
import { useExpandableText } from '@/utils/textFormatter';

const HistoriaCard = ({ historia }) => {
  const { formattedText, isExpanded, needsExpansion, toggleExpanded } = 
    useExpandableText(historia.descricao, 150);

  return (
    <div className="card">
      {/* ... other content ... */}
      
      <div className="description">
        {formattedText}
        {needsExpansion && (
          <button onClick={toggleExpanded} className="show-more-btn">
            {isExpanded ? 'mostrar menos' : 'mostrar mais'}
            <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`} />
          </button>
        )}
      </div>
    </div>
  );
};
```

### 2. Simple Text Display

```tsx
import { formatText } from '@/utils/textFormatter';

const SimpleDescription = ({ text }) => (
  <div className="description">
    {formatText(text)}
  </div>
);
```

### 3. Custom Styling

```tsx
import { formatText } from '@/utils/textFormatter';

const CustomStyledText = ({ text }) => (
  <div>
    {formatText(text, {
      paragraphClassName: 'mb-4 p-2 bg-gray-50 rounded',
      emphasisClassName: 'font-bold text-blue-600',
      className: 'custom-text-container'
    })}
  </div>
);
```

### 4. Preview vs Full View

```tsx
import { formatTextPreview, formatTextFull } from '@/utils/textFormatter';

const TextDisplay = ({ text, isPreview }) => (
  <div>
    {isPreview 
      ? formatTextPreview(text, 100)
      : formatTextFull(text)
    }
  </div>
);
```

## Integration Guide

### For Existing Components

1. **Import the utilities:**
   ```tsx
   import { useExpandableText } from '@/utils/textFormatter';
   ```

2. **Replace manual text handling:**
   ```tsx
   // Before
   const [showFull, setShowFull] = useState(false);
   const previewText = text.length > 150 ? text.substring(0, 150) + '...' : text;
   
   // After
   const { formattedText, isExpanded, needsExpansion, toggleExpanded } = 
     useExpandableText(text, 150);
   ```

3. **Update JSX:**
   ```tsx
   // Before
   <p>{showFull ? text : previewText}</p>
   
   // After
   <div>{formattedText}</div>
   ```

### For New Components

Use the appropriate function based on your needs:
- **Cards/Previews**: `useExpandableText()` hook
- **Static displays**: `formatText()` function
- **Simple cases**: `formatTextPreview()` or `formatTextFull()`

## Formatting Rules

### Automatic Paragraph Detection

The system uses multiple strategies to detect paragraphs:

1. **Double line breaks** (`\n\n`) - Primary method
2. **Sentence + line break** - For structured text
3. **Smart sentence grouping** - For very long text (groups 2-3 sentences per paragraph)

### Markdown Support

| Input | Output | CSS Class |
|-------|--------|-----------|
| `**text**` | **Bold text** | `font-bold` |
| `*text*` | *Italic text* | `italic` |
| `_text_` | *Italic text* | `italic` |
| `ALL CAPS` | Emphasized | `font-medium text-[#CD853F]` |

### Text Cleaning

- Removes excessive whitespace
- Fixes HTML entities (`&nbsp;`, `&amp;`, etc.)
- Normalizes quotes and apostrophes
- Trims leading/trailing spaces

## Styling Guidelines

### Default Classes

The system uses Historin's design system colors and spacing:

```css
/* Paragraph spacing */
.mb-3.last:mb-0 { /* Default paragraph class */ }

/* Emphasis color */
.text-[#CD853F] { /* Historin brand color */ }

/* Text color */
.text-[#4A3F35] { /* Main text color */ }
```

### Custom Styling

Override default classes through options:

```tsx
formatText(text, {
  paragraphClassName: 'my-4 p-3 bg-blue-50 rounded-lg',
  emphasisClassName: 'font-bold text-red-600 underline',
  className: 'prose prose-lg max-w-none'
});
```

## Performance Considerations

### Memoization

The `useExpandableText` hook automatically memoizes formatted content:

```tsx
const formattedText = React.useMemo(() => {
  // Formatting logic
}, [text, isExpanded, needsExpansion, previewLength]);
```

### Large Text Handling

For very large texts (>1000 characters):
- Use `maxLength` option to limit processing
- Consider lazy loading for full content
- Implement virtual scrolling for lists

## Testing

### Test Cases Covered

1. **Short text** (< 150 chars) - No truncation needed
2. **Medium text** (150-400 chars) - Basic paragraph breaks
3. **Long text** (> 400 chars) - Multiple paragraphs
4. **Formatted text** - Markdown processing
5. **Edge cases** - Empty text, special characters, HTML entities

### Example Test Data

See `src/examples/TextFormattingExamples.tsx` for comprehensive test cases using real historical data from the Historin database.

## Migration Guide

### From Manual Text Handling

```tsx
// Old approach
const [expanded, setExpanded] = useState(false);
const truncated = text.length > 150 ? text.substring(0, 150) + '...' : text;

return (
  <div>
    <p>{expanded ? text : truncated}</p>
    {text.length > 150 && (
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Less' : 'More'}
      </button>
    )}
  </div>
);

// New approach
const { formattedText, isExpanded, needsExpansion, toggleExpanded } = 
  useExpandableText(text, 150);

return (
  <div>
    {formattedText}
    {needsExpansion && (
      <button onClick={toggleExpanded}>
        {isExpanded ? 'Less' : 'More'}
      </button>
    )}
  </div>
);
```

## Future Enhancements

### Planned Features

- [ ] **Rich text support**: HTML parsing and rendering
- [ ] **Link detection**: Automatic URL linking
- [ ] **Image embedding**: Inline image support
- [ ] **Table formatting**: Structured data display
- [ ] **Code highlighting**: Technical content support
- [ ] **Accessibility**: ARIA labels and screen reader support

### Configuration Options

- [ ] **Theme support**: Light/dark mode formatting
- [ ] **Language support**: RTL text handling
- [ ] **Custom parsers**: Plugin system for specialized formatting

## Troubleshooting

### Common Issues

1. **Text not formatting**: Check import paths and ensure React is available
2. **Styling not applied**: Verify Tailwind CSS classes are available
3. **Performance issues**: Use memoization for large datasets
4. **Mobile display**: Test responsive behavior on different screen sizes

### Debug Mode

Enable debug logging:

```tsx
formatText(text, { 
  // Add debug flag in development
  ...(process.env.NODE_ENV === 'development' && { debug: true })
});
```

## Contributing

When adding new formatting features:

1. Update the `FormatTextOptions` interface
2. Add test cases in `TextFormattingExamples.tsx`
3. Update this documentation
4. Ensure backward compatibility
5. Follow Historin's design system guidelines

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Maintainer**: Historin Development Team
