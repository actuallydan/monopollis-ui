import React, { useState, useEffect } from "react";

/**
 * Props for the LoadingSpinner component.
 * @interface LoadingSpinnerProps
 */
interface LoadingSpinnerProps {
  /** The size variant of the spinner - affects font size */
  size?: "sm" | "base" | "lg";
  /** Additional CSS classes to apply to the spinner element */
  className?: string;
}

/**
 * An animated loading spinner component using classic CLI-style characters.
 *
 * The LoadingSpinner component provides a visually appealing loading indicator:
 * - Animated spinner using Unicode braille characters
 * - Smooth frame-by-frame animation (80ms intervals)
 * - Multiple size variants for different contexts
 * - Consistent styling with the design system
 * - Lightweight implementation with minimal dependencies
 * - Accessible text-based loading indicator
 *
 * This component is ideal for indicating loading states in buttons, forms,
 * or any interface element where a loading indicator is needed.
 *
 * @component
 * @param {LoadingSpinnerProps} props - The props for the LoadingSpinner component
 * @param {'sm' | 'base' | 'lg'} [props.size='base'] - The size variant affecting font size
 * @param {string} [props.className] - Additional CSS classes to apply to the spinner
 *
 * @example
 * ```tsx
 * // Basic usage with default size
 * <LoadingSpinner />
 *
 * // Small spinner for compact spaces
 * <LoadingSpinner size="sm" />
 *
 * // Large spinner for prominent loading states
 * <LoadingSpinner size="lg" />
 *
 * // With custom styling
 * <LoadingSpinner
 *   size="lg"
 *   className="text-center my-4"
 * />
 *
 * // In a button during loading
 * <Button disabled={isLoading}>
 *   {isLoading ? <LoadingSpinner size="sm" /> : 'Submit'}
 * </Button>
 *
 * // Different size variants
 * <LoadingSpinner size="sm" />
 * <LoadingSpinner size="base" />
 * <LoadingSpinner size="lg" />
 * ```
 *
 * @returns {JSX.Element} An animated loading spinner with the specified size and styling
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "base",
  className = "",
}) => {
  const [frame, setFrame] = useState(0);

  // Classic CLI spinner characters
  const spinnerChars = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % spinnerChars.length);
    }, 80); // 80ms for smooth animation

    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
  };

  const baseClasses = `
    inline-block text-orange-300 font-mono
    ${sizeClasses[size]}
  `;

  return (
    <span className={`${baseClasses} ${className}`}>{spinnerChars[frame]}</span>
  );
};
