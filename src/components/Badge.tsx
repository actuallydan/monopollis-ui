import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'base';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'base',
  className = ''
}) => {
  const baseClasses = `
    inline-flex items-center font-sans font-medium rounded-full
    border-2
  `;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-sm',
    base: 'px-3 py-1 text-base'
  };

  const variantClasses = {
    default: 'text-orange-300 border-orange-300/30 bg-orange-300/5',
    success: 'bg-green-900/20 text-green-300 border-green-300/30 bg-green-300/5',
    warning: 'bg-yellow-900/20 text-yellow-300 border-yellow-300/30 bg-yellow-300/5',
    error: 'bg-red-900/20 text-red-300 border-red-300/30 bg-red-300/5'
  };

  return (
    <span className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}; 