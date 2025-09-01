import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  homeHref?: string;
  homeOnClick?: () => void;
  className?: string;
  separator?: React.ReactNode;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  showHome = true,
  homeHref,
  homeOnClick,
  className = '',
  separator = <ChevronRight className="w-4 h-4 text-orange-300/50" />,
}) => {
  const allItems = showHome 
    ? [{ label: 'Home', href: homeHref, onClick: homeOnClick }, ...items]
    : items;

  return (
    <nav 
      className={`flex items-center space-x-2 font-sans text-sm ${className}`}
      aria-label="Breadcrumb"
    >
      {allItems.map((item, index) => {
        const isLast = index === allItems.length - 1;
        const isHome = showHome && index === 0;

        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className="flex-shrink-0" aria-hidden="true">
                {separator}
              </span>
            )}
            
            {isLast ? (
              <span 
                className="text-orange-300 font-medium"
                aria-current="page"
              >
                {isHome && <Home className="inline w-4 h-4 mr-1" />}
                {item.label}
              </span>
            ) : (
              <a
                href={item.href}
                onClick={item.onClick}
                className="text-orange-300/80 hover:text-orange-300 hover:underline transition-colors duration-200"
              >
                {isHome && <Home className="inline w-4 h-4 mr-1" />}
                {item.label}
              </a>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}; 