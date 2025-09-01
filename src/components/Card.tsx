import React from 'react';
import { Header } from './Header';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  variant?: 'default' | 'bordered';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  variant = 'default'
}) => {
  const baseClasses = `
    bg-black rounded-md p-4
  `;

  const variantClasses = {
    default: 'border-2 border-orange-300/20',
    bordered: 'border-2 border-orange-300/50'
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {title && <Header size="lg" className="mb-3">{title}</Header>}
      {children}
    </div>
  );
}; 