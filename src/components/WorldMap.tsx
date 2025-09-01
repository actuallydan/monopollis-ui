import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { MapPin } from 'lucide-react';

export interface WorldMapLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  color?: string;
  size?: number;
  onClick?: () => void;
  onHover?: (isHovering: boolean) => void;
}

export interface WorldMapProps {
  locations?: WorldMapLocation[];
  onLocationClick?: (location: WorldMapLocation) => void;
  onLocationHover?: (location: WorldMapLocation | null) => void;
  className?: string;
  width?: number | string;
  height?: number | string;
  responsive?: boolean;
}

export const WorldMap: React.FC<WorldMapProps> = ({
  locations = [],
  onLocationClick,
  onLocationHover,
  className = '',
  width = '100%',
  height = '100%',
  responsive = true,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  // Responsive sizing
  useEffect(() => {
    if (!responsive || !containerRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [responsive]);

  // World map projection calculations
  const projection = useMemo(() => {
    const { width: w, height: h } = dimensions;
    const scale = Math.min(w / 800, h / 400);
    
    return {
      scale,
      translateX: w / 2,
      translateY: h / 2,
    };
  }, [dimensions]);

  // Convert lat/lng to SVG coordinates
  const projectCoordinates = useCallback((lat: number, lng: number) => {
    const { scale, translateX, translateY } = projection;
    
    // Simple equirectangular projection
    const x = (lng + 180) * (dimensions.width / 360) * scale;
    const y = (90 - lat) * (dimensions.height / 180) * scale;
    
    return { x, y };
  }, [projection, dimensions]);

  // Handle location click
  const handleLocationClick = useCallback((location: WorldMapLocation) => {
    location.onClick?.();
    onLocationClick?.(location);
  }, [onLocationClick]);

  // Handle location hover
  const handleLocationHover = useCallback((location: WorldMapLocation, isHovering: boolean) => {
    setHoveredLocation(isHovering ? location.id : null);
    location.onHover?.(isHovering);
    onLocationHover?.(isHovering ? location : null);
  }, [onLocationHover]);

  // World map path data (simplified continents)
  const worldPath = useMemo(() => {
    const { scale } = projection;
    return `
      M 0,${200 * scale} 
      L ${800 * scale},${200 * scale} 
      L ${800 * scale},${400 * scale} 
      L 0,${400 * scale} Z
    `;
  }, [projection]);

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{ width, height }}
    >
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="w-full h-full"
        aria-label="World Map"
      >
        {/* Background */}
        <rect
          width={dimensions.width}
          height={dimensions.height}
          fill="black"
          className="fill-black"
        />
        
        {/* World outline */}
        <path
          d={worldPath}
          fill="none"
          stroke="rgba(251, 146, 60, 0.3)"
          strokeWidth={1}
          className="stroke-orange-300/30"
        />
        
        {/* Grid lines */}
        {Array.from({ length: 9 }, (_, i) => {
          const x = (i + 1) * (dimensions.width / 10);
          return (
            <line
              key={`v-${i}`}
              x1={x}
              y1={0}
              x2={x}
              y2={dimensions.height}
              stroke="rgba(251, 146, 60, 0.1)"
              strokeWidth={0.5}
              className="stroke-orange-300/10"
            />
          );
        })}
        
        {Array.from({ length: 5 }, (_, i) => {
          const y = (i + 1) * (dimensions.height / 6);
          return (
            <line
              key={`h-${i}`}
              x1={0}
              y1={y}
              x2={dimensions.width}
              y2={y}
              stroke="rgba(251, 146, 60, 0.1)"
              strokeWidth={0.5}
              className="stroke-orange-300/10"
            />
          );
        })}
        
        {/* Locations */}
        {locations.map((location) => {
          const { x, y } = projectCoordinates(location.lat, location.lng);
          const isHovered = hoveredLocation === location.id;
          const size = (location.size || 8) * projection.scale;
          const color = location.color || 'rgb(251, 146, 60)';
          
          return (
            <g key={location.id}>
              {/* Location circle */}
              <circle
                cx={x}
                cy={y}
                r={isHovered ? size * 1.5 : size}
                fill={color}
                stroke="rgba(251, 146, 60, 0.8)"
                strokeWidth={isHovered ? 2 : 1}
                className="cursor-pointer transition-all duration-200"
                onClick={() => handleLocationClick(location)}
                onMouseEnter={() => handleLocationHover(location, true)}
                onMouseLeave={() => handleLocationHover(location, false)}
                role="button"
                tabIndex={0}
                aria-label={`${location.name} (${location.lat.toFixed(2)}, ${location.lng.toFixed(2)})`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleLocationClick(location);
                  }
                }}
              />
              
              {/* Location label (shown on hover) */}
              {isHovered && (
                <text
                  x={x}
                  y={y - size - 5}
                  textAnchor="middle"
                  fill="rgb(251, 146, 60)"
                  fontSize={12 * projection.scale}
                  className="pointer-events-none font-sans font-medium"
                >
                  {location.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}; 