import React, { useState, useRef } from 'react';
import { useDatePicker } from '@react-aria/datepicker';
import { useCalendarGrid, useCalendarCell } from '@react-aria/calendar';
import { useButton } from '@react-aria/button';
import { useOverlay, DismissButton } from '@react-aria/overlays';
import { CalendarDate, getLocalTimeZone, today, parseDate, createCalendar } from '@internationalized/date';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
  label: string;
  value?: Date;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  id?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Select a date...',
  description,
  error,
  disabled = false,
  required = false,
  className = '',
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(
    value ? parseDate(value.toISOString().split('T')[0]) : null
  );
  const [currentMonth, setCurrentMonth] = useState<CalendarDate>(
    selectedDate || today(getLocalTimeZone())
  );
  const [isClicking, setIsClicking] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);

  const handleDateSelect = (date: CalendarDate) => {
    setSelectedDate(date);
    onChange?.(date.toDate(getLocalTimeZone()));
    setIsOpen(false);
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(currentMonth.subtract({ months: 1 }));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add({ months: 1 }));
  };



  const { overlayProps } = useOverlay(
    {
      isOpen,
      onClose: () => setIsOpen(false),
      shouldCloseOnBlur: true,
      isDismissable: true,
    },
    overlayRef
  );

  const baseClasses = `
    relative w-full
  `;

  const labelClasses = `
    block text-sm font-sans font-medium text-orange-300 mb-2
  `;

  const descriptionClasses = `
    mt-1 text-xs font-sans text-orange-300/80
  `;

  const errorClasses = `
    mt-1 text-xs font-sans text-red-400
  `;

  const overlayClasses = `
    absolute top-full left-0 right-0 z-50 mt-1
    bg-black border-2 border-orange-300/50 rounded-md
    shadow-lg p-4
  `;

  const datePickerId = id || `datepicker-${Math.random().toString(36).substr(2, 9)}`;
  const descriptionId = description ? `${datePickerId}-description` : undefined;
  const errorId = error ? `${datePickerId}-error` : undefined;

  return (
    <div className={`${baseClasses} ${className}`}>
      <label htmlFor={datePickerId} className={labelClasses}>
        {label}
        {required && <span className="text-red-400 ml-1" aria-label="required">*</span>}
      </label>
      
      <div className="relative">
        <input
          id={datePickerId}
          type="text"
          value={selectedDate ? selectedDate.toDate(getLocalTimeZone()).toLocaleDateString() : ''}
          readOnly
          className={`
            w-full px-4 py-2 rounded-md
            font-sans text-base
            bg-black text-orange-300
            border-2 border-orange-300/50
            focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-black
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
            cursor-pointer
            ${error ? 'border-red-400' : ''}
          `}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
          aria-invalid={!!error}
          onMouseDown={() => setIsClicking(true)}
          onClick={() => {
            if (!disabled) {
              setIsOpen(!isOpen);
              setIsClicking(false);
            }
          }}
          onFocus={() => {
            if (!disabled && !isClicking) {
              setIsOpen(true);
            }
          }}
          aria-label="Select date"
        />

        {isOpen && (
          <div
            {...overlayProps}
            ref={overlayRef}
            className={overlayClasses}
          >
            <DismissButton onDismiss={() => setIsOpen(false)} />
            <CalendarGrid
              currentMonth={currentMonth}
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              onPreviousMonth={handlePreviousMonth}
              onNextMonth={handleNextMonth}
              onMonthChange={setCurrentMonth}
            />
            <DismissButton onDismiss={() => setIsOpen(false)} />
          </div>
        )}
      </div>

      {description && !error && (
        <p id={descriptionId} className={descriptionClasses}>
          {description}
        </p>
      )}

      {error && (
        <p id={errorId} className={errorClasses} role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

// Calendar Grid Component
interface CalendarGridProps {
  currentMonth: CalendarDate;
  selectedDate: CalendarDate | null;
  onDateSelect: (date: CalendarDate) => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onMonthChange: (month: CalendarDate) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentMonth,
  selectedDate,
  onDateSelect,
  onPreviousMonth,
  onNextMonth,
  onMonthChange,
}) => {
  const { buttonProps: prevButtonProps } = useButton(
    {
      onPress: onPreviousMonth,
      'aria-label': 'Previous month',
    },
    useRef<HTMLButtonElement>(null)
  );

  const { buttonProps: nextButtonProps } = useButton(
    {
      onPress: onNextMonth,
      'aria-label': 'Next month',
    },
    useRef<HTMLButtonElement>(null)
  );

  // Generate calendar grid
  const startOfMonth = new CalendarDate(currentMonth.year, currentMonth.month, 1);
  const endOfMonth = new CalendarDate(currentMonth.year, currentMonth.month, currentMonth.calendar.getDaysInMonth(currentMonth));
  
  // Get the start of the week for the first day of the month
  const firstDayOfWeek = startOfMonth.toDate(getLocalTimeZone()).getDay();
  const startDate = startOfMonth.subtract({ days: firstDayOfWeek });
  
  // Get the end of the week for the last day of the month
  const lastDayOfWeek = endOfMonth.toDate(getLocalTimeZone()).getDay();
  const endDate = endOfMonth.add({ days: 6 - lastDayOfWeek });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const days: CalendarDate[] = [];
  
  let current = startDate;
  while (current.compare(endDate) <= 0) {
    days.push(current);
    current = current.add({ days: 1 });
  }

  return (
    <div className="w-64">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          {...prevButtonProps}
          className="p-2 text-orange-300 hover:bg-orange-300/10 rounded transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-black"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2">
          <select
            value={currentMonth.month}
            onChange={(e) => {
              const newMonth = new CalendarDate(currentMonth.year, parseInt(e.target.value), 1);
              onMonthChange(newMonth);
            }}
            className="bg-black text-orange-300 border border-orange-300/50 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-1 focus:ring-offset-black"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(2024, i).toLocaleDateString(undefined, { month: 'long' })}
              </option>
            ))}
          </select>
          <select
            value={currentMonth.year}
            onChange={(e) => {
              const newMonth = new CalendarDate(parseInt(e.target.value), currentMonth.month, 1);
              onMonthChange(newMonth);
            }}
            className="bg-black text-orange-300 border border-orange-300/50 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-1 focus:ring-offset-black"
          >
            {Array.from({ length: 20 }, (_, i) => {
              const year = new Date().getFullYear() - 10 + i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
        <button
          {...nextButtonProps}
          className="p-2 text-orange-300 hover:bg-orange-300/10 rounded transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-black"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Week day headers */}
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="text-center text-xs font-sans font-medium text-orange-300/80 py-2"
          >
            {day}
          </div>
        ))}

        {/* Calendar cells */}
        {days.map((date) => (
          <CalendarCell
            key={date.toString()}
            date={date}
            isSelected={selectedDate?.compare(date) === 0}
            isCurrentMonth={date.compare(startOfMonth) >= 0 && date.compare(endOfMonth) <= 0}
            onSelect={() => onDateSelect(date)}
          />
        ))}
      </div>
    </div>
  );
};

// Calendar Cell Component
interface CalendarCellProps {
  date: CalendarDate;
  isSelected: boolean;
  isCurrentMonth: boolean;
  onSelect: () => void;
}

const CalendarCell: React.FC<CalendarCellProps> = ({
  date,
  isSelected,
  isCurrentMonth,
  onSelect,
}) => {
  const { buttonProps } = useButton(
    {
      onPress: onSelect,
    },
    useRef<HTMLButtonElement>(null)
  );

  const cellClasses = `
    h-8 w-8 rounded text-sm font-sans
    focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-1 focus:ring-offset-black
    transition-all duration-200
    ${isSelected
      ? 'bg-orange-300 text-black font-medium'
      : isCurrentMonth
      ? 'text-orange-300 hover:bg-orange-300/10'
      : 'text-orange-300/30'
    }
    cursor-pointer
  `;

  return (
    <div className="text-center">
      <button
        {...buttonProps}
        className={cellClasses}
      >
        {date.day}
      </button>
    </div>
  );
}; 