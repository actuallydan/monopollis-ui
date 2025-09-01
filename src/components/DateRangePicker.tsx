import React, { useState, useRef } from 'react';
import { useButton } from '@react-aria/button';
import { useOverlay, DismissButton } from '@react-aria/overlays';
import { CalendarDate, getLocalTimeZone, today, parseDate } from '@internationalized/date';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface DateRangePickerProps {
  label: string;
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  placeholder?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  id?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Select date range...',
  description,
  error,
  disabled = false,
  required = false,
  className = '',
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<CalendarDate | null>(
    value?.start ? parseDate(value.start.toISOString().split('T')[0]) : null
  );
  const [endDate, setEndDate] = useState<CalendarDate | null>(
    value?.end ? parseDate(value.end.toISOString().split('T')[0]) : null
  );
  const [currentMonth, setCurrentMonth] = useState<CalendarDate>(
    startDate || today(getLocalTimeZone())
  );
  const [isClicking, setIsClicking] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);

  const handleDateSelect = (date: CalendarDate) => {
    if (!startDate || (startDate && endDate)) {
      // Start new selection
      setStartDate(date);
      setEndDate(null);
    } else {
      // Complete selection
      if (date.compare(startDate) >= 0) {
        setEndDate(date);
        onChange?.({
          start: startDate.toDate(getLocalTimeZone()),
          end: date.toDate(getLocalTimeZone()),
        });
        setIsOpen(false);
      } else {
        // If selected date is before start date, swap them
        setStartDate(date);
        setEndDate(startDate);
        onChange?.({
          start: date.toDate(getLocalTimeZone()),
          end: startDate.toDate(getLocalTimeZone()),
        });
        setIsOpen(false);
      }
    }
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(currentMonth.subtract({ months: 1 }));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add({ months: 1 }));
  };

  const handleNextMonth2 = () => {
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

  const dateRangePickerId = id || `daterangepicker-${Math.random().toString(36).substr(2, 9)}`;
  const descriptionId = description ? `${dateRangePickerId}-description` : undefined;
  const errorId = error ? `${dateRangePickerId}-error` : undefined;

  const formatRange = () => {
    if (!startDate) return '';
    if (!endDate) return startDate.toDate(getLocalTimeZone()).toLocaleDateString();
    return `${startDate.toDate(getLocalTimeZone()).toLocaleDateString()} - ${endDate.toDate(getLocalTimeZone()).toLocaleDateString()}`;
  };

  return (
    <div className={`${baseClasses} ${className}`}>
      <label htmlFor={dateRangePickerId} className={labelClasses}>
        {label}
        {required && <span className="text-red-400 ml-1" aria-label="required">*</span>}
      </label>
      
      <div className="relative">
        <input
          id={dateRangePickerId}
          type="text"
          value={formatRange()}
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
          aria-label="Select date range"
        />

        {isOpen && (
          <div
            {...overlayProps}
            ref={overlayRef}
            className={overlayClasses}
          >
            <DismissButton onDismiss={() => setIsOpen(false)} />
            <div className="flex gap-4">
              <CalendarGrid
                currentMonth={currentMonth}
                startDate={startDate}
                endDate={endDate}
                onDateSelect={handleDateSelect}
                onPreviousMonth={handlePreviousMonth}
                onNextMonth={handleNextMonth}
                onMonthChange={setCurrentMonth}
                title="Start Date"
              />
              <CalendarGrid
                currentMonth={currentMonth.add({ months: 1 })}
                startDate={startDate}
                endDate={endDate}
                onDateSelect={handleDateSelect}
                onPreviousMonth={handleNextMonth}
                onNextMonth={handleNextMonth2}
                onMonthChange={setCurrentMonth}
                title="End Date"
              />
            </div>
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

// Calendar Grid Component for Date Range
interface CalendarGridProps {
  currentMonth: CalendarDate;
  startDate: CalendarDate | null;
  endDate: CalendarDate | null;
  onDateSelect: (date: CalendarDate) => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onMonthChange: (month: CalendarDate) => void;
  title: string;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentMonth,
  startDate,
  endDate,
  onDateSelect,
  onPreviousMonth,
  onNextMonth,
  onMonthChange,
  title,
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
  const startDateGrid = startOfMonth.subtract({ days: firstDayOfWeek });
  
  // Get the end of the week for the last day of the month
  const lastDayOfWeek = endOfMonth.toDate(getLocalTimeZone()).getDay();
  const endDateGrid = endOfMonth.add({ days: 6 - lastDayOfWeek });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const days: CalendarDate[] = [];
  
  let current = startDateGrid;
  while (current.compare(endDateGrid) <= 0) {
    days.push(current);
    current = current.add({ days: 1 });
  }

  const isInRange = (date: CalendarDate) => {
    if (!startDate || !endDate) return false;
    return date.compare(startDate) >= 0 && date.compare(endDate) <= 0;
  };

  const isRangeStart = (date: CalendarDate) => {
    return startDate?.compare(date) === 0;
  };

  const isRangeEnd = (date: CalendarDate) => {
    return endDate?.compare(date) === 0;
  };

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
        <div className="flex flex-col items-center">
          <h2 className="font-sans font-medium text-orange-300 text-sm">
            {title}
          </h2>
          <div className="flex items-center gap-1 mt-1">
            <select
              value={currentMonth.month}
              onChange={(e) => {
                const newMonth = new CalendarDate(currentMonth.year, parseInt(e.target.value), 1);
                onMonthChange(newMonth);
              }}
              className="bg-black text-orange-300 border border-orange-300/50 rounded px-1 py-0.5 text-xs focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-1 focus:ring-offset-black"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(2024, i).toLocaleDateString(undefined, { month: 'short' })}
                </option>
              ))}
            </select>
            <select
              value={currentMonth.year}
              onChange={(e) => {
                const newMonth = new CalendarDate(parseInt(e.target.value), currentMonth.month, 1);
                onMonthChange(newMonth);
              }}
              className="bg-black text-orange-300 border border-orange-300/50 rounded px-1 py-0.5 text-xs focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-1 focus:ring-offset-black"
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
            isSelected={isRangeStart(date) || isRangeEnd(date)}
            isInRange={isInRange(date)}
            isCurrentMonth={date.compare(startOfMonth) >= 0 && date.compare(endOfMonth) <= 0}
            onSelect={() => onDateSelect(date)}
          />
        ))}
      </div>
    </div>
  );
};

// Calendar Cell Component for Date Range
interface CalendarCellProps {
  date: CalendarDate;
  isSelected: boolean;
  isInRange: boolean;
  isCurrentMonth: boolean;
  onSelect: () => void;
}

const CalendarCell: React.FC<CalendarCellProps> = ({
  date,
  isSelected,
  isInRange,
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
      : isInRange
      ? 'bg-orange-300/20 text-orange-300'
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