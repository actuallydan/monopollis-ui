import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft } from 'lucide-react';
import { Checkbox } from './Checkbox';
import { Button } from './Button';

interface TransferItem {
  id: string;
  label: string;
  disabled?: boolean;
}

interface TransferListProps {
  leftTitle?: string;
  rightTitle?: string;
  leftItems: TransferItem[];
  rightItems: TransferItem[];
  onTransfer: (fromLeft: boolean, itemIds: string[]) => void;
  className?: string;
  maxHeight?: number;
  searchable?: boolean;
  selectAll?: boolean;
}

export const TransferList: React.FC<TransferListProps> = ({
  leftTitle = 'Available Items',
  rightTitle = 'Selected Items',
  leftItems,
  rightItems,
  onTransfer,
  className = '',
  maxHeight = 300,
  searchable = true,
  selectAll = true,
}) => {
  const [leftSearch, setLeftSearch] = useState('');
  const [rightSearch, setRightSearch] = useState('');
  const [leftSelected, setLeftSelected] = useState<Set<string>>(new Set());
  const [rightSelected, setRightSelected] = useState<Set<string>>(new Set());

  const filteredLeftItems = leftSearch
    ? leftItems.filter(item => 
        item.label.toLowerCase().includes(leftSearch.toLowerCase())
      )
    : leftItems;

  const filteredRightItems = rightSearch
    ? rightItems.filter(item => 
        item.label.toLowerCase().includes(rightSearch.toLowerCase())
      )
    : rightItems;

  const handleLeftSelect = (itemId: string) => {
    const newSelected = new Set(leftSelected);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setLeftSelected(newSelected);
  };

  const handleRightSelect = (itemId: string) => {
    const newSelected = new Set(rightSelected);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setRightSelected(newSelected);
  };

  const handleSelectAllLeft = () => {
    const allIds = filteredLeftItems.map(item => item.id);
    setLeftSelected(new Set(allIds));
  };

  const handleSelectAllRight = () => {
    const allIds = filteredRightItems.map(item => item.id);
    setRightSelected(new Set(allIds));
  };

  const handleDeselectAllLeft = () => {
    setLeftSelected(new Set());
  };

  const handleDeselectAllRight = () => {
    setRightSelected(new Set());
  };

  const handleTransferRight = () => {
    if (leftSelected.size > 0) {
      onTransfer(true, Array.from(leftSelected));
      setLeftSelected(new Set());
      setLeftSearch('');
    }
  };

  const handleTransferLeft = () => {
    if (rightSelected.size > 0) {
      onTransfer(false, Array.from(rightSelected));
      setRightSelected(new Set());
      setRightSearch('');
    }
  };

  const handleTransferAllRight = () => {
    const allIds = filteredLeftItems.map(item => item.id);
    onTransfer(true, allIds);
    setLeftSelected(new Set());
    setLeftSearch('');
  };

  const handleTransferAllLeft = () => {
    const allIds = filteredRightItems.map(item => item.id);
    onTransfer(false, allIds);
    setRightSelected(new Set());
    setRightSearch('');
  };

  const renderList = (
    title: string,
    items: TransferItem[],
    selected: Set<string>,
    onSelect: (id: string) => void,
    searchValue: string,
    onSearchChange: (value: string) => void,
    onSelectAll: () => void,
    onDeselectAll: () => void
  ) => (
    <div className="flex flex-col h-full">
      <div className="px-4 py-2 border-b-2 border-orange-300/50 bg-black">
        <h3 className="font-sans font-medium text-orange-300 text-sm">{title}</h3>
        {selectAll && items.length > 0 && (
          <div className="flex gap-2 mt-1">
            <Button
              onClick={onSelectAll}
              variant="secondary"
              className="text-xs px-2 py-1 h-auto"
            >
              Select All
            </Button>
            <Button
              onClick={onDeselectAll}
              variant="secondary"
              className="text-xs px-2 py-1 h-auto"
            >
              Deselect All
            </Button>
          </div>
        )}
      </div>

      {searchable && (
        <div className="p-2 border-b border-orange-300/30">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search items..."
            className="w-full px-3 py-1 bg-black text-orange-300 border border-orange-300/50 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>
      )}

      <div 
        className="flex-1 overflow-auto"
        style={{ maxHeight: `${maxHeight}px` }}
      >
        {items.length > 0 ? (
          <div className="py-1">
            {items.map((item) => (
              <div
                key={item.id}
                className={`
                  px-4 py-2 font-sans text-sm cursor-pointer
                  transition-colors duration-200
                  ${item.disabled 
                    ? 'text-orange-300/50 cursor-not-allowed' 
                    : selected.has(item.id)
                    ? 'bg-orange-300/20 text-orange-300'
                    : 'text-orange-300 hover:bg-orange-300/10'
                  }
                `}
                onClick={() => !item.disabled && onSelect(item.id)}
              >
                                 <Checkbox
                   label={item.label}
                   checked={selected.has(item.id)}
                   onChange={() => !item.disabled && onSelect(item.id)}
                   disabled={item.disabled}
                   className="w-full"
                 />
              </div>
            ))}
          </div>
        ) : (
          <div className="px-4 py-8 text-center text-orange-300/50 font-sans text-sm">
            No items available
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={`flex gap-4 ${className}`}>
      {/* Left List */}
      <div className="flex-1 border-2 border-orange-300/50 rounded-md bg-black">
        {renderList(
          leftTitle,
          filteredLeftItems,
          leftSelected,
          handleLeftSelect,
          leftSearch,
          setLeftSearch,
          handleSelectAllLeft,
          handleDeselectAllLeft
        )}
      </div>

      {/* Transfer Controls */}
      <div className="flex flex-col justify-center gap-2">
        <Button
          onClick={handleTransferRight}
          disabled={leftSelected.size === 0}
          variant="secondary"
          className="p-2 h-auto"
          aria-label="Transfer selected items"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
        
        <Button
          onClick={handleTransferAllRight}
          disabled={filteredLeftItems.length === 0}
          variant="secondary"
          className="p-2 h-auto"
          aria-label="Transfer all items"
        >
          <ChevronsRight className="w-4 h-4" />
        </Button>
        
        <Button
          onClick={handleTransferLeft}
          disabled={rightSelected.size === 0}
          variant="secondary"
          className="p-2 h-auto"
          aria-label="Transfer selected items"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <Button
          onClick={handleTransferAllLeft}
          disabled={filteredRightItems.length === 0}
          variant="secondary"
          className="p-2 h-auto"
          aria-label="Transfer all items"
        >
          <ChevronsLeft className="w-4 h-4" />
        </Button>
      </div>

      {/* Right List */}
      <div className="flex-1 border-2 border-orange-300/50 rounded-md bg-black">
        {renderList(
          rightTitle,
          filteredRightItems,
          rightSelected,
          handleRightSelect,
          rightSearch,
          setRightSearch,
          handleSelectAllRight,
          handleDeselectAllRight
        )}
      </div>
    </div>
  );
}; 