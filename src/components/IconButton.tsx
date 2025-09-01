import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';

interface IconButtonProps {
  icon: React.ReactNode | LucideIcon;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'base' | 'lg';
  'aria-label': string;
  'aria-describedby'?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  disabled = false,
  isLoading = false,
  className = '',
  variant = 'primary',
  size = 'base',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby
}) => {
  const baseClasses = `
    inline-flex items-center justify-center rounded-md
    font-sans font-medium transition-all duration-75
    border-2 border-orange-300/50
    cursor-pointer
    focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-black
    disabled:opacity-50 disabled:cursor-not-allowed
    ${isLoading ? 'cursor-not-allowed opacity-75' : ''}
  `;

  const sizeClasses = {
    sm: 'w-8 h-8 text-base',
    base: 'w-10 h-10 text-lg',
    lg: 'w-12 h-12 text-xl'
  };

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
      onClick={isLoading ? undefined : onClick}
      disabled={disabled || isLoading}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {isLoading ? (
        <LoadingSpinner size={size === 'lg' ? 'base' : 'sm'} />
      ) : (
        React.isValidElement(icon) ? icon : React.createElement(icon as any)
      )}
    </button>
  );
}; 