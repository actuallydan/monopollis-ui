import React from 'react';

interface RangeSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  id?: string;
  description?: string;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className = '',
  id,
  description
}) => {
  const inputId = id || `slider-${Math.random().toString(36).substring(2, 9)}`;
  const descriptionId = description ? `${inputId}-description` : undefined;

  const baseClasses = `
    relative w-full
  `;

  const labelClasses = `
    block text-sm font-sans font-medium text-orange-300 mb-2
  `;

  const sliderClasses = `
    w-full h-2 rounded-md appearance-none cursor-pointer
    bg-black border-2 border-orange-300/50
    focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-black
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-all duration-200
    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-300 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-orange-300 [&::-webkit-slider-thumb]:cursor-pointer
    [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-300 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-orange-300 [&::-moz-range-thumb]:cursor-pointer
  `;

  const descriptionClasses = `
    mt-1 text-sm font-sans text-orange-300/80
  `;

  const valueDisplayClasses = `
    inline-block ml-2 px-2 py-1 rounded-md
    bg-orange-300/10 border-2 border-orange-300/20
    text-base font-mono text-orange-300 tracking-wider font-bold
  `;

  return (
    <div className={`${baseClasses} ${className}`}>
      <label htmlFor={inputId} className={labelClasses}>
        {label}
        <span className={valueDisplayClasses}>{value}</span>
      </label>
      
      <input
        id={inputId}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        aria-describedby={descriptionId}
        className={sliderClasses}
        style={{
          background: `linear-gradient(to right, #fbbf24 0%, #fbbf24 ${((value - min) / (max - min)) * 100}%, transparent ${((value - min) / (max - min)) * 100}%, transparent 100%)`
        }}
      />

      {description && (
        <p id={descriptionId} className={descriptionClasses}>
          {description}
        </p>
      )}
    </div>
  );
}; 