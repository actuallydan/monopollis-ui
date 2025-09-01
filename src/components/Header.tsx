import React from 'react';

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl';
}

export const Header: React.FC<HeaderProps> = ({
  children,
  className = '',
  size = 'base'
}) => {
  const sizeClasses = {
    sm: 'text-lg',
    base: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
    '2xl': 'text-4xl'
  };

  const baseClasses = `
    font-sans font-bold text-orange-300 leading-tight
  `;

  return (
    <h1 className={`${baseClasses} ${sizeClasses[size]} ${className}`}>
      {children}
    </h1>
  );
}; 