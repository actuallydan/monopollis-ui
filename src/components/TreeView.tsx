import React, { useState, useMemo, useCallback } from 'react';
import { ChevronRight, ChevronDown, MoreHorizontal } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  data?: any; // Additional data for the node
}

interface TreeViewProps {
  data: TreeNode[];
  maxHeight?: number;
  className?: string;
  onNodeClick?: (node: TreeNode) => void;
  onNodeAction?: (node: TreeNode) => void;
  getNodeIcon?: (node: TreeNode, isOpen: boolean) => LucideIcon | undefined;
}

interface TreeNodeProps {
  node: TreeNode;
  level: number;
  isOpen: boolean;
  onToggle: (nodeId: string) => void;
  onNodeClick: (node: TreeNode) => void;
  onNodeAction: (node: TreeNode) => void;
  expandedNodes: Set<string>;
  getNodeIcon?: (node: TreeNode, isOpen: boolean) => LucideIcon | undefined;
}

// Memoized individual tree node component
const TreeNodeComponent = React.memo<TreeNodeProps>(({
  node,
  level,
  isOpen,
  onToggle,
  onNodeClick,
  onNodeAction,
  expandedNodes,
  getNodeIcon
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const hasChildren = node.children && node.children.length > 0;
  const paddingLeft = `${level * 16}px`;
  
  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(node.id);
  }, [node.id, onToggle]);

  const handleClick = useCallback(() => {
    if (hasChildren) {
      onToggle(node.id);
    }
  }, [node, onToggle, hasChildren]);

  const handleAction = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onNodeAction(node);
  }, [node, onNodeAction]);

  const rowClasses = `
    flex items-center w-full px-2 py-1 rounded-md
    hover:bg-orange-300/10 transition-colors duration-75
    cursor-pointer select-none
  `;

  const labelClasses = `
    flex-1 min-w-0 text-lg font-sans text-orange-300
    truncate
  `;

  const actionButtonClasses = `
    flex-shrink-0 ml-2 p-1 rounded-md
    bg-orange-300/10 border border-orange-300/20
    text-orange-300 hover:text-black
    hover:bg-orange-300 hover:border-orange-300
    transition-all duration-75 cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-1 focus:ring-offset-black
    ${isHovered ? 'opacity-100' : 'opacity-0'}
  `;

  return (
    <div>
      <div
        className={rowClasses}
        style={{ paddingLeft }}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Toggle arrow */}
        <div className="flex-shrink-0 w-6 h-6 mr-1">
          {hasChildren && (
            <button
              onClick={handleToggle}
              className="w-full h-full flex items-center justify-center text-orange-300 hover:text-orange-200 transition-colors duration-75"
            >
              {isOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {/* Node icon */}
        {getNodeIcon && getNodeIcon(node, isOpen) && (
          <div className="flex-shrink-0 w-6 h-6 mr-2 text-orange-300">
            {React.createElement(getNodeIcon(node, isOpen)!, { className: "w-5 h-5" })}
          </div>
        )}

        {/* Node label */}
        <span className={labelClasses} title={node.label}>
          {node.label}
        </span>

        {/* Action button */}
        <button
          onClick={handleAction}
          className={actionButtonClasses}
          aria-label={`Actions for ${node.label}`}
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Children */}
      {hasChildren && isOpen && (
        <div>
          {node.children!.map((child) => (
            <TreeNodeComponent
              key={child.id}
              node={child}
              level={level + 1}
              isOpen={expandedNodes.has(child.id)}
              onToggle={onToggle}
              onNodeClick={onNodeClick}
              onNodeAction={onNodeAction}
              expandedNodes={expandedNodes}
              getNodeIcon={getNodeIcon}
            />
          ))}
        </div>
      )}
    </div>
  );
});

TreeNodeComponent.displayName = 'TreeNodeComponent';

export const TreeView: React.FC<TreeViewProps> = ({
  data,
  maxHeight = 600,
  className = '',
  onNodeClick = () => {},
  onNodeAction = () => {},
  getNodeIcon
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const handleToggle = useCallback((nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  }, []);

  const handleNodeClick = useCallback((node: TreeNode) => {
    onNodeClick(node);
  }, [onNodeClick]);

  const handleNodeAction = useCallback((node: TreeNode) => {
    onNodeAction(node);
  }, [onNodeAction]);

  const containerClasses = `
    w-full border-2 border-orange-300/30 rounded-md
    bg-black overflow-y-auto
    ${className}
  `;

  return (
    <div className={containerClasses} style={{ maxHeight }}>
      <div className="p-1">
        {data.map((node) => (
          <TreeNodeComponent
            key={node.id}
            node={node}
            level={0}
            isOpen={expandedNodes.has(node.id)}
            onToggle={handleToggle}
            onNodeClick={handleNodeClick}
            onNodeAction={handleNodeAction}
            expandedNodes={expandedNodes}
            getNodeIcon={getNodeIcon}
          />
        ))}
      </div>
    </div>
  );
}; 