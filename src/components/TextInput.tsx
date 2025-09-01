import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  type?: 'text' | 'password' | 'email' | 'number';
  className?: string;
  id?: string;
  required?: boolean;
  'aria-describedby'?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  description,
  error,
  disabled = false,
  type = 'text',
  className = '',
  id,
  required = false,
  'aria-describedby': ariaDescribedby
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const baseClasses = `
    relative w-full
  `;

  const inputClasses = `
    w-full px-4 py-2 rounded-md
    font-sans text-base
    bg-black text-orange-300
    border-2 border-orange-300/50
    placeholder-orange-300/50
    focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-black
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-all duration-200
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

  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [ariaDescribedby, descriptionId, errorId].filter(Boolean).join(' ');

  return (
    <div className={`${baseClasses} ${className}`}>
      <label htmlFor={inputId} className={labelClasses}>
        {label}
        {required && <span className="text-red-400 ml-1" aria-label="required">*</span>}
      </label>
      
      <div className="relative">
        {isFocused && !disabled && (
          <ChevronRight className="absolute left-2 top-1/2 transform -translate-y-1/2 text-orange-300 w-4 h-4" />
        )}
        
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-describedby={describedBy || undefined}
          aria-invalid={!!error}
          className={`${inputClasses} ${isFocused && !disabled ? 'pl-6' : ''}`}
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