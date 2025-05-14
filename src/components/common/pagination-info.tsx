"use client";

import type React from "react";

interface PaginationInfoProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onItemsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export const PaginationInfo: React.FC<PaginationInfoProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onItemsPerPageChange,
  className = "",
}) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div
      className={`flex flex-col sm:flex-row items-center gap-3 ${className}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-white text-xs sm:text-sm">Show</span>
        <select
          value={itemsPerPage}
          onChange={onItemsPerPageChange}
          className="bg-purple-900 text-white border border-purple-700 rounded px-2 py-1 text-xs sm:text-sm"
          aria-label="Items per page"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <span className="text-white text-xs sm:text-sm">per page</span>
      </div>

      <p className="text-white text-xs sm:text-sm">
        {totalItems > 0
          ? `Showing ${startItem} to ${endItem} of ${totalItems}`
          : "No items to display"}
      </p>
    </div>
  );
};
