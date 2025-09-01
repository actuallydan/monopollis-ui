import React from 'react';

interface DividerProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'base' | 'lg';
}

export const Divider: React.FC<DividerProps> = ({
  className = '',
  orientation = 'horizontal',
  size = 'base'
}) => {
  const baseClasses = `
    bg-orange-300/30
  `;

  const orientationClasses = {
    horizontal: 'w-full h-px my-4',
    vertical: 'h-full w-px mx-4'
  };

  const sizeClasses = {
    sm: orientation === 'horizontal' ? 'my-2' : 'mx-2',
    base: orientation === 'horizontal' ? 'my-4' : 'mx-4',
    lg: orientation === 'horizontal' ? 'my-6' : 'mx-6'
  };

  return (
    <div 
      className={`${baseClasses} ${orientationClasses[orientation]} ${sizeClasses[size]} ${className}`}
      role="separator"
    />
  );
}; 