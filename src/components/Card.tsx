import React from 'react';

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

  const titleClasses = `
    font-sans font-bold text-orange-300 mb-3 text-sm
  `;

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {title && <h3 className={titleClasses}>{title}</h3>}
      {children}
    </div>
  );
}; 