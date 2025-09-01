import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Checkbox } from './Checkbox';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  label: string;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  options: SelectOption[];
  placeholder?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  allowClear?: boolean;
  searchable?: boolean;
  multiselect?: boolean;
  id?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select an option...',
  description,
  error,
  disabled = false,
  required = false,
  className = '',
  allowClear = false,
  searchable = true,
  multiselect = false,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOptions = multiselect 
    ? options.filter(option => (value as string[]).includes(option.value))
    : options.filter(option => option.value === value);
  const selectedOption = selectedOptions[0];

  const filteredOptions = searchable && searchValue
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchValue.toLowerCase()) &&
        !option.disabled
      )
    : options.filter(option => !option.disabled);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchValue('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        setIsOpen(false);
        setSearchValue('');
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
    }
  };

  const handleSelect = (option: SelectOption) => {
    if (!option.disabled) {
      if (multiselect) {
        const currentValues = value as string[];
        const newValues = currentValues.includes(option.value)
          ? currentValues.filter(v => v !== option.value)
          : [...currentValues, option.value];
        onChange(newValues);
      } else {
        onChange(option.value);
        setIsOpen(false);
        setSearchValue('');
      }
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(multiselect ? [] : '');
    setIsOpen(false);
    setSearchValue('');
  };

  const baseClasses = `
    relative w-full
  `;

  const triggerClasses = `
    w-full px-4 py-2 rounded-md
    font-sans text-base
    bg-black text-orange-300
    border-2 border-orange-300/50
    focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-black
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-all duration-200
    flex items-center justify-between
    cursor-pointer
    ${isFocused ? 'border-orange-300' : ''}
    ${error ? 'border-red-400' : ''}
  `;

  const labelClasses = `
    block text-sm font-sans font-medium text-orange-300 mb-2
  `;

  const descriptionClasses = `
    mt-1 text-xs font-sans text-orange-300/80
  `;

  const errorClasses = `
    mt-1 text-xs font-sans text-red-400
  `;

  const dropdownClasses = `
    absolute top-full left-0 right-0 z-50 mt-1
    bg-black border-2 border-orange-300/50 rounded-md
    max-h-60 overflow-auto
    shadow-lg
  `;

  const optionClasses = `
    px-4 py-2 font-sans text-orange-300
    hover:bg-orange-300/10 cursor-pointer
    transition-colors duration-200
  `;

  const disabledOptionClasses = `
    px-4 py-2 font-sans text-orange-300/50
    cursor-not-allowed
  `;

  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  const descriptionId = description ? `${selectId}-description` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;

  return (
    <div className={`${baseClasses} ${className}`}>
      <label htmlFor={selectId} className={labelClasses}>
        {label}
        {required && <span className="text-red-400 ml-1" aria-label="required">*</span>}
      </label>
      
      <div ref={selectRef} className="relative">
        <div
          className={triggerClasses}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={isOpen ? `${selectId}-listbox` : undefined}
        >
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {multiselect ? (
              selectedOptions.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {selectedOptions.map((option) => (
                    <span key={option.value} className="bg-orange-300/20 text-orange-300 px-2 py-1 rounded text-sm">
                      {option.label}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-orange-300/50 truncate">{placeholder}</span>
              )
            ) : (
              selectedOption ? (
                <span className="truncate">{selectedOption.label}</span>
              ) : (
                <span className="text-orange-300/50 truncate">{placeholder}</span>
              )
            )}
          </div>
          
                      <div className="flex items-center gap-2 flex-shrink-0">
              {allowClear && ((multiselect && (value as string[]).length > 0) || (!multiselect && value)) && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1 hover:bg-orange-300/10 rounded transition-colors duration-200"
                  aria-label="Clear selection"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              {isOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
        </div>

        {isOpen && (
          <div className={dropdownClasses} id={`${selectId}-listbox`} role="listbox">
            {searchable && (
              <div className="p-2 border-b border-orange-300/30">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search options..."
                  className="w-full px-3 py-1 bg-black text-orange-300 border border-orange-300/50 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>
            )}
            
            <div className="py-1">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    className={option.disabled ? disabledOptionClasses : optionClasses}
                    onClick={() => handleSelect(option)}
                    role="option"
                    aria-selected={multiselect ? (value as string[]).includes(option.value) : option.value === value}
                  >
                    <div className="flex items-center gap-2">
                      {multiselect && (
                        <Checkbox
                          label=""
                          checked={(value as string[]).includes(option.value)}
                          onChange={() => handleSelect(option)}
                          disabled={option.disabled}
                          className="flex-shrink-0"
                        />
                      )}
                      <span className={multiselect ? 'ml-2' : ''}>{option.label}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-orange-300/50 font-sans text-sm">
                  No options found
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {description && !error && (
        <p id={descriptionId} className={descriptionClasses}>
          {description}
        </p>
      )}

      {error && (
        <p id={errorId} className={errorClasses} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}; 