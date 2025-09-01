import React, { useState, useEffect } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'base' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'base',
  className = ''
}) => {
  const [frame, setFrame] = useState(0);
  
  // Classic CLI spinner characters
  const spinnerChars = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(prev => (prev + 1) % spinnerChars.length);
    }, 80); // 80ms for smooth animation
    
    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg'
  };

  const baseClasses = `
    inline-block text-orange-300 font-mono
    ${sizeClasses[size]}
  `;

  return (
    <span className={`${baseClasses} ${className}`}>
      {spinnerChars[frame]}
    </span>
  );
}; 