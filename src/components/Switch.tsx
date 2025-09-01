import React from 'react';

interface SwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  description?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  className = '',
  id,
  description
}) => {
  const inputId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;
  const descriptionId = description ? `${inputId}-description` : undefined;

  const baseClasses = `
    relative flex items-center
  `;

  const switchClasses = `
    relative inline-flex h-6 w-11 items-center rounded-full
    border-2 border-orange-300/50 transition-all duration-200
    focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-black
    ${checked ? 'bg-orange-300' : 'bg-black'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `;

  const thumbClasses = `
    inline-block h-4 w-4 transform rounded-full transition-all duration-200
    ${checked ? 'translate-x-5 bg-black' : 'translate-x-1 bg-orange-300'}
  `;

  const labelClasses = `
    ml-3 text-base font-sans text-orange-300
    ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
  `;

  const descriptionClasses = `
    mt-1 text-xs font-sans text-orange-300/80 ml-14
  `;

  return (
    <div className={`${baseClasses} ${className}`}>
      <button
        id={inputId}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        aria-describedby={descriptionId}
        className={switchClasses}
      >
        <span className={thumbClasses} />
      </button>
      
      <label htmlFor={inputId} className={labelClasses}>
        {label}
      </label>

      {description && (
        <p id={descriptionId} className={descriptionClasses}>
          {description}
        </p>
      )}
    </div>
  );
}; 