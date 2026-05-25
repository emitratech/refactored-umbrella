"use client";

import React, { useState } from "react";
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, Edit2, MoreVertical, Trash2 } from "lucide-react";

interface Column {
  key: string;
  label: string;
  width?: string;
  sortable?: boolean;
  align?: "left" | "center" | "right";
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, any>[];
  pageSize?: number;
  onRowClick?: (row: any) => void;
  onSort?: (column: string, direction: "asc" | "desc") => void;
  onAction?: (action: "edit" | "delete" | "menu", row: any) => void;
}

export function DataTable({
  columns,
  data,
  pageSize = 10,
  onRowClick,
  onSort,
  onAction,
}: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    if (onSort) onSort(key, direction);
  };

  // Mock pagination for UI
  const totalPages = Math.ceil(data.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pageSize);

  const getAlignmentClass = (align?: "left" | "center" | "right") => {
    switch (align) {
      case "center": return "text-center";
      case "right": return "text-right";
      default: return "text-left";
    }
  };

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 font-bold border-b border-gray-200 dark:border-gray-800">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  className={`px-4 py-3 cursor-pointer select-none group ${getAlignmentClass(col.align)}`}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                >
                  <div className={`flex items-center space-x-1 ${col.align === "right" ? "justify-end" : col.align === "center" ? "justify-center" : "justify-start"}`}>
                    <span>{col.label}</span>
                    {col.sortable !== false && (
                      <span className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 flex flex-col h-4">
                        {sortConfig?.key === col.key ? (
                          sortConfig.direction === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                        ) : (
                          <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowUp size={10} className="-mb-0.5" />
                            <ArrowDown size={10} />
                          </div>
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {onAction && <th className="px-4 py-3 text-right">ACTIONS</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`
                    border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors
                    ${onRowClick ? "cursor-pointer" : ""}
                    ${rowIndex % 2 === 1 ? "bg-gray-50/50 dark:bg-gray-800/20" : "bg-white dark:bg-[#1a1a1a]"}
                  `}
                >
                  {columns.map((col) => (
                    <td key={col.key} className={`px-4 py-3.5 text-gray-700 dark:text-gray-300 ${getAlignmentClass(col.align)}`}>
                      {row[col.key]}
                    </td>
                  ))}
                  {onAction && (
                    <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end items-center space-x-3 text-gray-400">
                        <button onClick={() => onAction("edit", row)} className="hover:text-primary transition-colors" title="Edit">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => onAction("delete", row)} className="hover:text-danger transition-colors" title="Delete">
                          <Trash2 size={16} />
                        </button>
                        <button onClick={() => onAction("menu", row)} className="hover:text-gray-600 dark:hover:text-gray-200 transition-colors" title="More">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (onAction ? 1 : 0)} className="px-4 py-8 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data.length > 0 && (
        <div className="bg-white dark:bg-[#1a1a1a] px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-800 text-sm">
          <div className="text-gray-500 dark:text-gray-400">
            Showing <span className="font-medium text-gray-900 dark:text-gray-100">{Math.min(startIndex + 1, data.length)}</span> to{" "}
            <span className="font-medium text-gray-900 dark:text-gray-100">{Math.min(startIndex + pageSize, data.length)}</span> of{" "}
            <span className="font-medium text-gray-900 dark:text-gray-100">{data.length}</span> results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded-md border border-gray-200 dark:border-gray-700 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Simple logic to show a few pages around current
                let pageNum = i + 1;
                if (totalPages > 5 && currentPage > 3) {
                  pageNum = currentPage - 2 + i;
                  if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md border transition-colors ${
                      currentPage === pageNum
                        ? "bg-primary text-white border-primary"
                        : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded-md border border-gray-200 dark:border-gray-700 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
