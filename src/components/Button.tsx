import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode | LucideIcon;
  className?: string;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  isLoading = false,
  icon,
  className = '',
  variant = 'primary',
  type = 'button',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  loadingText = 'Loading...',
}) => {
  const baseClasses = `
    inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md
    font-sans text-base font-medium transition-all duration-75
    border-2 border-orange-300/50
    cursor-pointer
    focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-black
    disabled:opacity-50 disabled:cursor-not-allowed
    ${isLoading ? 'cursor-not-allowed opacity-75' : ''}
  `;

  const variantClasses = {
    primary: `
      bg-black text-orange-300
      hover:bg-orange-300 hover:text-black
      active:bg-orange-300 active:text-black active:opacity-80 active:border-orange-200
      disabled:hover:bg-black disabled:hover:text-orange-300
    `,
    secondary: `
      bg-transparent text-orange-300 border-orange-300/30
      hover:bg-orange-300/10 hover:border-orange-300/80
      active:bg-orange-300/20 active:opacity-80 active:border-orange-200
      disabled:hover:bg-transparent disabled:hover:border-orange-300/30
    `
  };

  return (
    <button
      type={type}
      onClick={isLoading ? undefined : onClick}
      disabled={disabled || isLoading}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {isLoading ? (
        <LoadingSpinner size="sm" />
      ) : (
        icon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {React.isValidElement(icon) ? icon : React.createElement(icon as any)}
          </span>
        )
      )}
      {isLoading ? loadingText : children}
    </button>
  );
}; 