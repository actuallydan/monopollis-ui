import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export interface InputOtpProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  mask?: boolean;
  integerOnly?: boolean;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
}

export const InputOtp: React.FC<InputOtpProps> = ({
  value,
  onChange,
  length = 4,
  mask = false,
  integerOnly = false,
  disabled = false,
  className = '',
  placeholder = '0',
  autoFocus = false,
}) => {
  const [isMasked, setIsMasked] = useState(mask);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const otpRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize refs array
  useEffect(() => {
    otpRefs.current = otpRefs.current.slice(0, length);
  }, [length]);

  // Auto-focus first input
  useEffect(() => {
    if (autoFocus && !disabled) {
      hiddenInputRef.current?.focus();
    }
  }, [autoFocus, disabled]);

  // Handle hidden input focus
  const handleHiddenFocus = useCallback(() => {
    // Find the next empty position or focus the first one
    const nextIndex = value.length < length ? value.length : 0;
    setFocusedIndex(nextIndex);
  }, [value.length, length]);

  // Handle hidden input blur
  const handleHiddenBlur = useCallback(() => {
    setFocusedIndex(null);
  }, []);

  // Handle hidden input change
  const handleHiddenChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    
    // Filter input based on integerOnly
    if (integerOnly) {
      newValue = newValue.replace(/\D/g, '');
    }
    
    // Limit to length
    newValue = newValue.slice(0, length);
    
    onChange(newValue);
  }, [onChange, length, integerOnly]);

  // Handle hidden input keydown
  const handleHiddenKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && value.length > 0) {
      e.preventDefault();
      onChange(value.slice(0, -1));
    }
  }, [value, onChange]);

  // Handle paste
  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    let pastedData = e.clipboardData.getData('text');
    
    // Filter based on integerOnly
    if (integerOnly) {
      pastedData = pastedData.replace(/\D/g, '');
    }
    
    // Limit to length
    pastedData = pastedData.slice(0, length);
    
    onChange(pastedData);
    
    // Focus the hidden input after paste
    setTimeout(() => {
      hiddenInputRef.current?.focus();
    }, 0);
  }, [onChange, length, integerOnly]);

  // Handle individual input click
  const handleInputClick = useCallback((index: number) => {
    if (disabled) return;
    
    // Focus the hidden input and set the cursor position
    hiddenInputRef.current?.focus();
    setFocusedIndex(index);
    
    // Set cursor position in hidden input
    if (hiddenInputRef.current) {
      const newPosition = Math.min(index, value.length);
      hiddenInputRef.current.setSelectionRange(newPosition, newPosition);
    }
  }, [disabled, value.length]);

  // Get display value for each position
  const getDisplayValue = (index: number) => {
    if (index >= value.length) return '';
    if (isMasked) return '●';
    return value[index];
  };

  // Get input classes
  const getInputClasses = (index: number) => {
    const baseClasses = `
      w-12 h-12 rounded-md border-2 text-center text-lg font-mono
      transition-all duration-200 cursor-pointer
      focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-black
      disabled:opacity-50 disabled:cursor-not-allowed
    `;
    
    const stateClasses = `
      ${focusedIndex === index 
        ? 'border-orange-300 bg-orange-300/10' 
        : 'border-orange-300/50 bg-black hover:border-orange-300/80'
      }
    `;
    
    const textClasses = `
      ${focusedIndex === index ? 'text-orange-300' : 'text-orange-300/80'}
    `;
    
    return `${baseClasses} ${stateClasses} ${textClasses}`;
  };

  const baseClasses = `
    flex flex-col gap-4
    ${className}
  `;

  return (
    <div className={baseClasses}>
      {/* Hidden input for actual value and focus management */}
      <input
        ref={hiddenInputRef}
        type="text"
        value={value}
        onChange={handleHiddenChange}
        onKeyDown={handleHiddenKeyDown}
        onFocus={handleHiddenFocus}
        onBlur={handleHiddenBlur}
        onPaste={handlePaste}
        disabled={disabled}
        className="sr-only"
        inputMode={integerOnly ? 'numeric' : 'text'}
        autoComplete="one-time-code"
        aria-label={`Enter ${length}-digit code`}
      />
      
      {/* OTP display inputs */}
      <div className="flex gap-3 justify-center">
        {Array.from({ length }, (_, index) => (
          <div
            key={index}
            ref={(el) => {
              otpRefs.current[index] = el;
            }}
            className={getInputClasses(index)}
            onClick={() => handleInputClick(index)}
            role="button"
            tabIndex={-1}
            aria-label={`Digit ${index + 1}`}
          >
            <span className="flex items-center justify-center h-full">
              {getDisplayValue(index) || (focusedIndex === index ? '|' : placeholder)}
            </span>
          </div>
        ))}
      </div>
      
      {/* Mask toggle button */}
      {mask && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setIsMasked(!isMasked)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-orange-300/80 hover:text-orange-300 transition-colors duration-200"
            aria-label={isMasked ? 'Show code' : 'Hide code'}
          >
            {isMasked ? (
              <>
                <Eye className="w-4 h-4" />
                Show code
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4" />
                Hide code
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}; 