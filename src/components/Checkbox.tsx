import React from 'react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  description?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  className = '',
  id,
  description
}) => {
  const inputId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  const descriptionId = description ? `${inputId}-description` : undefined;

  const baseClasses = `
    relative flex items-start
  `;

  const checkboxClasses = `
    w-5 h-5 rounded border-2 border-orange-300/50
    bg-black text-orange-300
    focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-black
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-all duration-200
    flex-shrink-0 mt-0.5
    appearance-none checked:bg-orange-300 checked:border-orange-300
    checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M13.854%203.646a.5.5%200%200%201%200%20.708l-7%207a.5.5%200%200%201-.708%200l-3.5-3.5a.5.5%200%201%201%20.708-.708L6.5%2010.293l6.646-6.647a.5.5%200%200%201%20.708%200z%22%20fill%3D%22%23000%22/%3E%3C/svg%3E')] checked:bg-center checked:bg-no-repeat
  `;

  const labelClasses = `
    ml-3 text-base font-sans text-orange-300 cursor-pointer
    ${disabled ? 'cursor-not-allowed' : ''}
  `;

  const descriptionClasses = `
    mt-1 text-xs font-sans text-orange-300/80 ml-7
  `;

  return (
    <div className={`${baseClasses} ${className}`}>
      <input
        id={inputId}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        aria-describedby={descriptionId}
        className={checkboxClasses}
      />
      
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