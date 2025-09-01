import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type PaginationState,
} from '@tanstack/react-table';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  className?: string;
  maxHeight?: number;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
}

export function Table<TData>({
  data,
  columns,
  className = '',
  maxHeight = 400,
  enableSorting = true,
  enableFiltering = false,
  enablePagination = true,
  pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
}: TableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    enableSorting,
    enableFilters: enableFiltering,
    manualPagination: !enablePagination,
  });

  const getSortIcon = (column: any) => {
    if (!column.getCanSort()) return null;
    
    if (column.getIsSorted() === 'asc') {
      return <ChevronUp className="w-4 h-4" />;
    }
    if (column.getIsSorted() === 'desc') {
      return <ChevronDown className="w-4 h-4" />;
    }
    return <ChevronsUpDown className="w-4 h-4 opacity-50" />;
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Table Container */}
      <div 
        className="border-2 border-orange-300/50 rounded-md overflow-hidden"
        style={{ maxHeight: `${maxHeight}px` }}
      >
        <div className="overflow-auto">
          <table className="w-full border-collapse">
            {/* Header */}
            <thead className="bg-orange-300 border-b-2 border-orange-300/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={`
                        px-4 py-3 text-left font-sans font-medium text-black
                        border-r border-black/30 last:border-r-0
                        ${header.column.getCanSort() ? 'cursor-pointer select-none hover:bg-orange-200' : ''}
                      `}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {getSortIcon(header.column)}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            {/* Body */}
            <tbody className="bg-black">
              {table.getRowModel().rows.map((row, rowIndex) => (
                <tr
                  key={row.id}
                  className={`
                    border-b border-orange-300/20 last:border-b-0
                    hover:bg-orange-300/5
                    ${rowIndex % 2 === 0 ? 'bg-black' : 'bg-orange-300/5'}
                  `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-2 font-sans text-orange-300 border-r border-orange-300/20 last:border-r-0"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {enablePagination && (
        <div className="flex items-center justify-between mt-4 px-2">
          <div className="flex items-center gap-4 text-sm text-orange-300">
            <span>
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </span>
            <span>
              Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length
              )}{' '}
              of {table.getFilteredRowModel().rows.length} results
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 border border-orange-300/50 rounded text-orange-300 hover:bg-orange-300/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 border border-orange-300/50 rounded text-orange-300 hover:bg-orange-300/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 