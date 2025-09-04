import React, { useState } from "react";

/**
 * Props for the Switch component.
 * @interface SwitchProps
 */
interface SwitchProps {
  /** The text label displayed next to the switch */
  label: string;
  /** Whether the switch is currently turned on (optional - if not provided, component manages its own state) */
  checked?: boolean;
  /** Function called when the switch state changes, receives the new checked state (optional if checked is not provided) */
  onChange?: (checked: boolean) => void;
  /** Whether the switch is disabled and cannot be interacted with */
  disabled?: boolean;
  /** Additional CSS classes to apply to the switch container */
  className?: string;
  /** Unique identifier for the switch input element */
  id?: string;
  /** Optional descriptive text displayed below the switch and label */
  description?: string;
}

/**
 * A toggle switch component with smooth animations and accessibility features.
 *
 * The Switch component provides a modern toggle interface for boolean settings:
 * - Smooth sliding animation between on/off states
 * - Custom styled switch with orange theme
 * - Accessible label association and description support
 * - Focus management with visible focus rings
 * - Disabled state handling with proper visual feedback
 * - Smooth transitions and hover effects
 * - Automatic ID generation for accessibility
 * - ARIA attributes for screen reader support
 * - Responsive design with proper spacing and typography
 * - Visual feedback for current state
 *
 * This component is ideal for settings toggles, feature flags, and any
 * interface where users need to turn features on or off.
 *
 * @component
 * @param {SwitchProps} props - The props for the Switch component
 * @param {string} props.label - The text label displayed next to the switch
 * @param {boolean} [props.checked] - Whether the switch is currently turned on (optional - component manages state if not provided)
 * @param {(checked: boolean) => void} [props.onChange] - Function called when switch state changes (optional if checked is not provided)
 * @param {boolean} [props.disabled=false] - Whether the switch is disabled
 * @param {string} [props.className] - Additional CSS classes to apply to the container
 * @param {string} [props.id] - Unique identifier for the switch input
 * @param {string} [props.description] - Optional descriptive text displayed below the switch
 *
 * @example
 * ```tsx
 * // Basic usage with controlled state
 * <Switch
 *   label="Enable notifications"
 *   checked={notificationsEnabled}
 *   onChange={setNotificationsEnabled}
 * />
 *
 * // Uncontrolled usage (component manages its own state)
 * <Switch
 *   label="Dark mode"
 *   description="Switch between light and dark themes"
 * />
 *
 * // With description
 * <Switch
 *   label="Dark mode"
 *   checked={darkModeEnabled}
 *   onChange={setDarkModeEnabled}
 *   description="Switch between light and dark themes"
 * />
 *
 * // Disabled state
 * <Switch
 *   label="Premium features"
 *   checked={false}
 *   onChange={() => {}}
 *   disabled={true}
 *   description="Upgrade to access premium features"
 * />
 *
 * // Settings panel example
 * <div className="space-y-4">
 *   <Switch
 *     label="Auto-save"
 *     checked={autoSaveEnabled}
 *     onChange={setAutoSaveEnabled}
 *     description="Automatically save your work every 5 minutes"
 *   />
 *   <Switch
 *     label="Sound effects"
 *     checked={soundEffectsEnabled}
 *     onChange={setSoundEffectsEnabled}
 *     description="Play audio feedback for user actions"
 *   />
 *   <Switch
 *     label="Analytics"
 *     checked={analyticsEnabled}
 *     onChange={setAnalyticsEnabled}
 *     description="Help us improve by collecting usage data"
 *   />
 * </div>
 *
 * // With custom styling
 * <Switch
 *   label="Custom Switch"
 *   checked={customEnabled}
 *   onChange={setCustomEnabled}
 *   className="my-6 p-4 border border-orange-300/30 rounded-lg"
 * />
 * ```
 *
 * @returns {JSX.Element} A toggle switch component with smooth animations and accessibility features
 */
export const Switch: React.FC<SwitchProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  className = "",
  id,
  description,
}) => {
  const [internalChecked, setInternalChecked] = useState(false);
  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : internalChecked;
  
  const inputId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;
  const descriptionId = description ? `${inputId}-description` : undefined;

  const baseClasses = `
    relative flex flex-col items-start
  `;

  const switchClasses = `
    relative inline-flex h-6 w-11 items-center rounded-full
    border-2 border-orange-300/50 transition-all duration-200
    focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-black
    ${currentChecked ? "bg-orange-300" : "bg-black"}
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    flex-shrink-0 min-w-[44px] min-h-[24px]
  `;

  const thumbClasses = `
    inline-block h-3 w-3 transform rounded-full transition-all duration-200
    ${currentChecked ? "translate-x-6 bg-black" : "translate-x-1 bg-orange-300"}
  `;

  const labelClasses = `
    ml-3 text-base font-sans text-orange-300
    ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
  `;

  const descriptionClasses = `
    mt-1 text-xs font-sans text-orange-300/80
  `;

  return (
    <div className={`${baseClasses} ${className}`}>
      <div className="flex items-center gap-2">
      <button
        id={inputId}
        type="button"
        role="switch"
        aria-checked={currentChecked}
        onClick={() => {
          if (!disabled) {
            if (isControlled && onChange) {
              onChange(!currentChecked);
            } else {
              setInternalChecked(!currentChecked);
            }
          }
        }}
        disabled={disabled}
        aria-describedby={descriptionId}
        className={switchClasses}
      >
        <span className={thumbClasses} />
      </button>

      <label htmlFor={inputId} className={labelClasses}>
        {label}
      </label>
      </div>

      {description && (
        <p id={descriptionId} className={descriptionClasses}>
          {description}
        </p>
      )}
    </div>
  );
};
