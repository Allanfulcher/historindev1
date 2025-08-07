'use client'

import { ReactNode, useState } from 'react';

interface DropDownProps<T> {
  title: string;
  items: T[];
  itemKey: keyof T | ((item: T) => string | number);
  renderItem: (item: T) => ReactNode;
  className?: string;
  contentClassName?: string;
  buttonClassName?: string;
  defaultOpen?: boolean;
  disabled?: boolean;
}

const ChevronIcon = ({ isOpen, className = '' }: { isOpen: boolean; className?: string }) => (
  <svg
    className={`w-6 h-6 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'} ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
  </svg>
);

const DropDown = <T extends Record<string, any>>({
  title,
  items,
  itemKey,
  renderItem,
  className = '',
  contentClassName = 'mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3',
  buttonClassName = 'flex items-center justify-between w-full px-6 py-4 text-xl font-semibold text-left text-amber-900 bg-amber-50 rounded-lg hover:bg-amber-100 focus:outline-none transition-colors duration-200 border border-amber-100',
  defaultOpen = false,
  disabled = false,
}: DropDownProps<T>) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const toggle = () => !disabled && setIsOpen(prev => !prev);

  const getKey = (item: T): string | number => {
    return typeof itemKey === 'function' 
      ? itemKey(item) 
      : String(item[itemKey as string]);
  };

  return (
    <section className={`DropDown ${className}`}>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls="dropdown-content"
        disabled={disabled}
        className={`${buttonClassName} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span>{title}</span>
        <ChevronIcon isOpen={isOpen} className={disabled ? 'opacity-50' : ''} />
      </button>
      
      {isOpen && items.length > 0 && (
        <div 
          id="dropdown-content" 
          className={contentClassName}
          role="region"
          aria-live="polite"
        >
          {items.map((item) => (
            <div key={getKey(item)}>
              {renderItem(item)}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default DropDown;