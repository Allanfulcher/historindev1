import React from 'react';

/**
 * Text Formatting Utility for Historin
 * 
 * This utility provides comprehensive text formatting capabilities for descriptions,
 * stories, and other text content throughout the application.
 * 
 * Features:
 * - Automatic paragraph detection and formatting
 * - Line break preservation
 * - Basic markdown-like formatting (bold, italic, emphasis)
 * - Special character handling
 * - Improved readability with proper spacing
 * - Responsive text sizing
 */

export interface FormatTextOptions {
  preserveLineBreaks?: boolean;
  enableMarkdown?: boolean;
  maxLength?: number;
  showMore?: boolean;
  className?: string;
  paragraphClassName?: string;
  emphasisClassName?: string;
}

/**
 * Formats raw text into properly structured, readable content
 */
export function formatText(
  text: string, 
  options: FormatTextOptions = {}
): React.ReactElement {
  const {
    preserveLineBreaks = true,
    enableMarkdown = true,
    maxLength,
    showMore = false,
    className = '',
    paragraphClassName = 'mb-3 last:mb-0',
    emphasisClassName = 'font-medium text-[#CD853F]'
  } = options;

  if (!text || typeof text !== 'string') {
    return <span className={className}>Texto não disponível</span>;
  }

  // Clean and normalize the text
  let processedText = cleanText(text);

  // Split into paragraphs first
  let paragraphs = splitIntoParagraphs(processedText, preserveLineBreaks);

  // Truncate if needed (but respect paragraph boundaries)
  if (maxLength && processedText.length > maxLength && !showMore) {
    let totalLength = 0;
    const truncatedParagraphs = [];
    
    for (const paragraph of paragraphs) {
      if (totalLength + paragraph.length <= maxLength) {
        truncatedParagraphs.push(paragraph);
        totalLength += paragraph.length;
      } else {
        // If we can fit part of this paragraph, truncate it
        const remainingLength = maxLength - totalLength;
        if (remainingLength > 50) { // Only if we have reasonable space left
          const truncatedParagraph = paragraph.substring(0, remainingLength).trim() + '...';
          truncatedParagraphs.push(truncatedParagraph);
        }
        break;
      }
    }
    
    paragraphs = truncatedParagraphs;
  }

  // Process each paragraph for formatting
  const formattedParagraphs = paragraphs.map((paragraph, index) => {
    let content: React.ReactNode = paragraph;

    if (enableMarkdown) {
      content = applyMarkdownFormatting(paragraph, emphasisClassName);
    }

    return (
      <p key={index} className={paragraphClassName}>
        {content}
      </p>
    );
  });

  return (
    <div className={`formatted-text ${className}`}>
      {formattedParagraphs}
    </div>
  );
}

/**
 * Cleans and normalizes text content
 */
function cleanText(text: string): string {
  return text
    // Fix common encoding issues
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    // Normalize quotes
    .replace(/[""]/g, '"')
    .replace(/['']/g, "'")
    // Clean up excessive spaces (but preserve line breaks)
    .replace(/[ \t]+/g, ' ')
    // Clean up excessive line breaks (more than 2 consecutive)
    .replace(/\n{3,}/g, '\n\n')
    // Trim leading/trailing whitespace
    .trim();
}

/**
 * Splits text into logical paragraphs
 */
function splitIntoParagraphs(text: string, preserveLineBreaks: boolean): string[] {
  if (!preserveLineBreaks) {
    return [text];
  }

  // Split by double line breaks (paragraph breaks)
  let paragraphs = text.split(/\n\s*\n/);
  
  // If no double breaks found, try single breaks for shorter texts
  if (paragraphs.length === 1 && text.length > 200) {
    // Look for sentence endings followed by line breaks
    paragraphs = text.split(/\.\s*\n/);
    if (paragraphs.length > 1) {
      // Re-add periods except for the last paragraph
      paragraphs = paragraphs.map((p, i) => 
        i < paragraphs.length - 1 ? p + '.' : p
      );
    }
  }

  // If still one long paragraph, try to break by sentences for very long text
  if (paragraphs.length === 1 && text.length > 400) {
    const sentences = text.split(/\.\s+/);
    if (sentences.length > 3) {
      // Group sentences into paragraphs of 2-3 sentences each
      paragraphs = [];
      for (let i = 0; i < sentences.length; i += 2) {
        const paragraph = sentences.slice(i, i + 2).join('. ');
        if (paragraph.trim()) {
          paragraphs.push(paragraph + (paragraph.endsWith('.') ? '' : '.'));
        }
      }
    }
  }

  return paragraphs
    .map(p => p.trim())
    .filter(p => p.length > 0);
}

/**
 * Applies markdown-like formatting to text
 */
function applyMarkdownFormatting(text: string, emphasisClassName: string): React.ReactNode {
  // Split text by formatting markers while preserving them
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_|\b[A-Z][A-Z\s]+\b)/);
  
  return parts.map((part, index) => {
    // Bold text (**text**)
    if (part.startsWith('**') && part.endsWith('**')) {
      const content = part.slice(2, -2);
      return <strong key={index} className="font-bold">{content}</strong>;
    }
    
    // Italic text (*text* or _text_)
    if ((part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) ||
        (part.startsWith('_') && part.endsWith('_'))) {
      const content = part.slice(1, -1);
      return <em key={index} className="italic">{content}</em>;
    }
    
    // All caps words (likely important terms)
    if (/^[A-Z][A-Z\s]+$/.test(part.trim()) && part.trim().length > 2) {
      return <span key={index} className={emphasisClassName}>{part}</span>;
    }
    
    return part;
  });
}

/**
 * Formats text for preview (truncated version)
 */
export function formatTextPreview(
  text: string, 
  maxLength: number = 150,
  options: Omit<FormatTextOptions, 'maxLength' | 'showMore'> = {}
): React.ReactElement {
  return formatText(text, {
    ...options,
    maxLength,
    showMore: false,
    paragraphClassName: 'mb-2 last:mb-0'
  });
}

/**
 * Formats text for full display
 */
export function formatTextFull(
  text: string,
  options: Omit<FormatTextOptions, 'maxLength' | 'showMore'> = {}
): React.ReactElement {
  return formatText(text, {
    ...options,
    showMore: true
  });
}

/**
 * Hook for managing expandable text with formatting
 */
export function useExpandableText(text: string, previewLength: number = 150) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  const needsExpansion = text && text.length > previewLength;
  
  const formattedText = React.useMemo(() => {
    if (!text) return null;
    
    if (isExpanded || !needsExpansion) {
      return formatTextFull(text);
    } else {
      return formatTextPreview(text, previewLength);
    }
  }, [text, isExpanded, needsExpansion, previewLength]);
  
  const toggleExpanded = React.useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);
  
  return {
    formattedText,
    isExpanded,
    needsExpansion,
    toggleExpanded
  };
}

/**
 * Utility to extract plain text from formatted content (for SEO, search, etc.)
 */
export function extractPlainText(text: string): string {
  return cleanText(text)
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold markers
    .replace(/\*([^*]+)\*/g, '$1')     // Remove italic markers
    .replace(/_([^_]+)_/g, '$1')       // Remove underscore markers
    .replace(/\n+/g, ' ')              // Replace line breaks with spaces
    .trim();
}
