import React from 'react';
import { CheckCircle, Clock, AlertCircle, XCircle, ChevronRight } from 'lucide-react';
import { Badge } from './Badge';

export type TimelineItemStatus = 'default' | 'success' | 'warning' | 'error' | 'pending';

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  status?: TimelineItemStatus;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  position?: 'left' | 'right';
}

export interface TimelineProps {
  items: TimelineItem[];
  mode?: 'left' | 'right';
  pending?: boolean | React.ReactNode;
  reverse?: boolean;
  className?: string;
  maxHeight?: number;
}

export const Timeline: React.FC<TimelineProps> = ({
  items,
  mode = 'left',
  pending = false,
  reverse = false,
  className = '',
  maxHeight,
}) => {
  const displayItems = reverse ? [...items].reverse() : items;

  const getStatusIcon = (status: TimelineItemStatus) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-black" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-black" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-black" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-black" />;
      default:
        return <div className="w-3 h-3 rounded-full bg-black" />;
    }
  };

  const getItemPosition = (index: number, item: TimelineItem) => {
    if (mode === 'right') {
      return 'right';
    }
    return 'left';
  };

  const baseClasses = `
    relative
    ${className}
  `;

  const containerClasses = `
    relative
    ${maxHeight ? `max-h-[${maxHeight}px] overflow-y-auto` : ''}
  `;

  const itemClasses = (position: 'left' | 'right') => `
    relative flex gap-4 mb-6 last:mb-0
    ${position === 'right' ? 'flex-row-reverse' : ''}
  `;

  const contentClasses = (position: 'left' | 'right') => `
    flex-1 ${position === 'right' ? 'text-right' : ''}
  `;





  return (
    <div className={baseClasses}>
      <div className={containerClasses}>
        {displayItems.map((item, index) => {
          const position = getItemPosition(index, item);
          const isLast = index === displayItems.length - 1;
          
          return (
            <div key={item.id} className={itemClasses(position)}>
              {/* Timeline line */}
              {!isLast && (
                <div 
                  className="absolute top-6 left-3 w-0.5 bg-orange-300/30"
                  style={{ height: 'calc(100% + 1.5rem)' }}
                />
              )}
              
              {/* Timeline dot */}
              <div className="relative z-10 flex-shrink-0">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  item.status === 'success' ? 'bg-green-400' :
                  item.status === 'error' ? 'bg-red-400' :
                  item.status === 'pending' ? 'bg-orange-300' :
                  'bg-orange-300 border-2 border-orange-300'
                }`}>
                  {item.icon || getStatusIcon(item.status || 'default')}
                </div>
              </div>
              
              {/* Content */}
              <div className={contentClasses(position)}>
                <div className="space-y-2">
                  {/* Title and timestamp row */}
                  <div className={`flex items-center gap-3 ${position === 'right' ? 'justify-end' : ''}`}>
                    <h3 className="font-sans font-medium text-orange-300 text-base">
                      {item.title}
                    </h3>
                    {item.timestamp && (
                      <Badge variant="default" size="sm">
                        {item.timestamp}
                      </Badge>
                    )}
                  </div>
                  
                  {/* Description */}
                  {item.description && (
                    <p className="font-sans text-orange-300/80 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  )}
                  
                  {/* Custom children content */}
                  {item.children && (
                    <div className="mt-3">
                      {item.children}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Pending item */}
        {pending && (
          <div className="relative flex gap-4">
            <div className="relative z-10 flex-shrink-0">
              <div className="w-6 h-6 rounded-full bg-orange-300/50 flex items-center justify-center">
                <Clock className="w-4 h-4 text-black" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-sans font-medium text-orange-300/60 text-base">
                    {typeof pending === 'string' ? pending : 'In Progress...'}
                  </h3>
                  <Badge variant="default" size="sm">
                    Pending
                  </Badge>
                </div>
                {typeof pending !== 'string' && pending}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 