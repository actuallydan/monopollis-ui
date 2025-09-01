import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface TextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  minRows?: number;
  maxRows?: number;
  className?: string;
  id?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  value,
  onChange,
  placeholder,
  description,
  error,
  disabled = false,
  minRows = 3,
  maxRows = 10,
  className = '',
  id
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const lineHeight = parseInt(getComputedStyle(textareaRef.current).lineHeight);
      const minHeight = lineHeight * minRows;
      const maxHeight = maxRows ? lineHeight * maxRows : scrollHeight;
      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [value, minRows, maxRows]);

  const baseClasses = `
    relative w-full
  `;

  const textareaClasses = `
    w-full px-4 py-2 rounded-md resize-none
    font-sans text-base
    bg-black text-orange-300
    border-2 border-orange-300/50
    placeholder-orange-300/50
    focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-black
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-all duration-200
    ${isFocused ? 'pl-6' : ''}
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

  return (
    <div className={`${baseClasses} ${className}`}>
      <label className={labelClasses}>
        {label}
      </label>
      
      <div className="relative">
        {isFocused && !disabled && (
          <ChevronRight className="absolute left-2 top-2 text-orange-300 w-4 h-4" />
        )}
        
        <textarea
          ref={textareaRef}
          id={inputId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
          aria-invalid={!!error}
          className={textareaClasses}
          rows={minRows}
        />
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