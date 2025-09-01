import React, { useState, useRef, useEffect } from 'react';

interface ClipboardProps {
  text: string;
  className?: string;
  label?: string;
}

export const Clipboard: React.FC<ClipboardProps> = ({
  text,
  className = '',
  label
}) => {
  const [copied, setCopied] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        setIsOverflowing(textRef.current.scrollWidth > textRef.current.clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [text]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const baseClasses = `
    relative flex items-center justify-between
    bg-orange-300/5 border-2 border-orange-300/30 rounded-md
    p-3 transition-all duration-200
    hover:border-orange-300/50
  `;

  const textClasses = `
    flex-1 font-mono text-base text-orange-300
    overflow-hidden whitespace-nowrap
    ${isOverflowing ? 'animate-scroll' : ''}
  `;

  const buttonClasses = `
    flex-shrink-0 ml-3 p-2 rounded-md
    bg-orange-300/10 border-2 border-orange-300/20
    text-orange-300 hover:text-black
    hover:bg-orange-300 hover:border-orange-300
    active:bg-orange-300 active:text-black active:opacity-80 active:border-orange-200
    transition-all duration-75 cursor-pointer
    focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-black
  `;

  return (
    <div className={`${baseClasses} ${className}`}>
      {label && (
        <div className="absolute -top-2 left-3 px-2 bg-black text-xs text-orange-300/80">
          {label}
        </div>
      )}
      
      <div 
        ref={textRef}
        className={textClasses}
        title={isOverflowing ? text : undefined}
      >
        {text}
      </div>
      
      <button
        onClick={handleCopy}
        className={buttonClasses}
        aria-label={copied ? "Copied!" : "Copy to clipboard"}
        title={copied ? "Copied!" : "Copy to clipboard"}
      >
        {copied ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}; 