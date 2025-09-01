import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronRight, ArrowUp, ArrowDown } from 'lucide-react';

export interface TerminalMenuItem {
  id: string;
  label: string;
  description?: string;
  action?: () => void;
  href?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface TerminalMenuProps {
  items: TerminalMenuItem[];
  onEsc?: () => void;
  className?: string;
  autoFocus?: boolean;
  maxHeight?: number;
}

export const TerminalMenu: React.FC<TerminalMenuProps> = ({
  items,
  onEsc,
  className = '',
  autoFocus = true,
  maxHeight,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize refs array
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items.length);
  }, [items.length]);

  // Auto-focus
  useEffect(() => {
    if (autoFocus) {
      containerRef.current?.focus();
    }
  }, [autoFocus]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : items.length - 1
        );
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < items.length - 1 ? prev + 1 : 0
        );
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        const selectedItem = items[selectedIndex];
        if (selectedItem && !selectedItem.disabled) {
          if (selectedItem.action) {
            selectedItem.action();
          } else if (selectedItem.href) {
            window.location.href = selectedItem.href;
          }
        }
        break;
      case 'Escape':
        e.preventDefault();
        onEsc?.();
        break;
      case 'Home':
        e.preventDefault();
        setSelectedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setSelectedIndex(items.length - 1);
        break;
    }
  }, [items, selectedIndex, onEsc]);

  // Scroll selected item into view
  useEffect(() => {
    const selectedRef = itemRefs.current[selectedIndex];
    if (selectedRef && containerRef.current) {
      selectedRef.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedIndex]);

  // Handle item click
  const handleItemClick = useCallback((item: TerminalMenuItem, index: number) => {
    setSelectedIndex(index);
    if (item.action) {
      item.action();
    } else if (item.href) {
      window.location.href = item.href;
    }
  }, []);

  // Handle item hover
  const handleItemHover = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const baseClasses = `
    outline-none
    ${className}
  `;

  const containerClasses = `
    border-2 border-orange-300/50 rounded-md bg-black
    ${isFocused ? 'border-orange-300' : ''}
    transition-colors duration-200
  `;

  const getItemClasses = (index: number, item: TerminalMenuItem) => {
    const baseClasses = `
      flex items-center gap-3 px-4 py-3 cursor-pointer
      transition-all duration-150 border-l-4
      hover:bg-orange-300/10
      ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `;
    
    const stateClasses = `
      ${index === selectedIndex 
        ? 'border-l-orange-300 bg-orange-300/10' 
        : 'border-l-transparent'
      }
    `;
    
    return `${baseClasses} ${stateClasses}`;
  };

  return (
    <div
      ref={containerRef}
      className={baseClasses}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      role="menu"
      aria-label="Terminal navigation menu"
    >
      <div className={containerClasses}>
        <div 
          className="p-2 border-b border-orange-300/30 bg-orange-300/5"
          style={{ maxHeight }}
        >
          <div className="flex items-center gap-2 text-orange-300/80 text-sm">
            <ArrowUp className="w-4 h-4" />
            <ArrowDown className="w-4 h-4" />
            <span>Navigate with arrow keys</span>
            <span className="mx-2">•</span>
            <span>Enter to select</span>
            {onEsc && (
              <>
                <span className="mx-2">•</span>
                <span>Esc to go back</span>
              </>
            )}
          </div>
        </div>
        
        <div 
          className="overflow-y-auto"
          style={{ maxHeight: maxHeight ? maxHeight - 60 : undefined }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={getItemClasses(index, item)}
              onClick={() => !item.disabled && handleItemClick(item, index)}
              onMouseEnter={() => !item.disabled && handleItemHover(index)}
              role="menuitem"
              tabIndex={-1}
              aria-label={item.description || item.label}
              aria-disabled={item.disabled}
            >
              {/* Selection indicator */}
              <div className="flex-shrink-0">
                {index === selectedIndex ? (
                  <ChevronRight className="w-4 h-4 text-orange-300" />
                ) : (
                  <div className="w-4 h-4" />
                )}
              </div>
              
              {/* Icon */}
              {item.icon && (
                <div className="flex-shrink-0 text-orange-300/80">
                  {item.icon}
                </div>
              )}
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="font-sans font-medium text-orange-300">
                  {item.label}
                </div>
                {item.description && (
                  <div className="text-sm text-orange-300/60 mt-1">
                    {item.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 