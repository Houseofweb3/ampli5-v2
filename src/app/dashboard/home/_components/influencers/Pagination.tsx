import React, { useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (page: number) => void;
  totalInfluencers: number;
  influencerNumber: number;
}

type PageType = number | "...";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalInfluencers,
  influencerNumber,
}) => {
  // Add useEffect to handle scrolling when currentPage changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const getVisiblePages = (): PageType[] => {
    const visiblePages: PageType[] = [];

    // Always show the first page
    visiblePages.push(1);

    if (totalPages <= 5) {
      // If total pages are 5 or less, show all pages
      for (let i = 2; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      // Pages near the current page
      if (currentPage > 3) {
        visiblePages.push("...");
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i);
      }

      if (currentPage < totalPages - 2) {
        visiblePages.push("...");
      }

      // Always show the last page
      visiblePages.push(totalPages);
    }

    return visiblePages;
  };

  const handlePageClick = (page: PageType) => {
    if (typeof page === "number") {
      onPageChange(page);
    }
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex w-full items-center justify-center gap-4 md:justify-between mt-4 font-Jakarta flex-col md:flex-row">
      <div className="flex gap-2 text-gray-400">
        <span className="text-black">{influencerNumber}</span>of
        <span>{totalInfluencers}</span>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-full text-xl text-black hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transtion-all active:scale-95"
        >
          <FiChevronLeft />
        </button>
        <div className="flex divide-x divide-[#ffffff70]">
          {visiblePages.map((page, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(page)}
              className={`w-8 h-8 p-2 rounded-full text-sm flex items-center justify-center ${
                currentPage === page
                  ? "text-white bg-primary"
                  : " hover:bg-gray-100 text-gray-400"
              } ${page === "..." ? "cursor-default" : ""}`}
              disabled={page === "..."}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-full text-xl text-black disabled:opacity-50 disabled:cursor-not-allowed flex hover:bg-gray-100 items-center transtion-all active:scale-95"
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
