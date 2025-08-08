import React from 'react';
import { Button } from './ui/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading: boolean;
  totalItems?: number;
  itemsPerPage?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  loading,
  totalItems,
  itemsPerPage = 6,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  // Calculate visible page range
  const getVisiblePages = () => {
    if (totalPages <= 5) return pages;
    
    if (currentPage <= 3) return pages.slice(0, 5);
    if (currentPage >= totalPages - 2) return pages.slice(totalPages - 5);
    
    return pages.slice(currentPage - 3, currentPage + 2);
  };

  const visiblePages = getVisiblePages();
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems || 0);

  return (
    <div className="flex flex-col items-center space-y-4 mt-8">
      {/* Page Info */}
      {totalItems && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {startItem} to {endItem} of {totalItems} users
        </div>
      )}
      
      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className="flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </Button>
        
        {/* First page if not visible */}
        {visiblePages[0] > 1 && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(1)}
              disabled={loading}
              className="w-10"
            >
              1
            </Button>
            {visiblePages[0] > 2 && (
              <span className="text-gray-500">...</span>
            )}
          </>
        )}
        
        {/* Page Numbers */}
        {visiblePages.map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "primary" : "outline"}
            size="sm"
            onClick={() => onPageChange(page)}
            disabled={loading}
            className="w-10"
          >
            {page}
          </Button>
        ))}
        
        {/* Last page if not visible */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="text-gray-500">...</span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(totalPages)}
              disabled={loading}
              className="w-10"
            >
              {totalPages}
            </Button>
          </>
        )}
        
        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className="flex items-center"
        >
          Next
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
      
      {/* Quick Jump */}
      {totalPages > 5 && (
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-600 dark:text-gray-400">Go to page:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            className="w-16 px-2 py-1 border border-gray-300 rounded text-center dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const value = parseInt(e.currentTarget.value);
                if (value >= 1 && value <= totalPages) {
                  onPageChange(value);
                  e.currentTarget.value = '';
                }
              }
            }}
          />
        </div>
      )}
    </div>
  );
};
