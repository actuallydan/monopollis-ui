import React from 'react';

interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'base' | 'lg';
}

export const Paragraph: React.FC<ParagraphProps> = ({
  children,
  className = '',
  size = 'base'
}) => {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg'
  };

  const baseClasses = `
    font-sans text-orange-300 leading-relaxed
  `;

  return (
    <p className={`${baseClasses} ${sizeClasses[size]} ${className}`}>
      {children}
    </p>
  );
}; 