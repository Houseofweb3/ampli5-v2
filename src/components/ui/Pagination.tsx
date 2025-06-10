import React from 'react';
import ExploreBtn from './explorebtn';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { cn } from '../../lib/utils';
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  // eslint-disable-next-line no-unused-vars
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setPage }) => {
  const showLeftDots = currentPage > 3;
  const showRightDots = currentPage < totalPages - 2;

  const createMiddlePages = (): number[] => {
    const middlePages: number[] = [];

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      middlePages.push(i);
    }

    return middlePages;
  };

  const middlePages = createMiddlePages();

  return (
    <div className="flex gap-2 justify-center xsm:justify-between items-center mt-8">
      <ExploreBtn
        onClick={() => currentPage > 1 && setPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="shadow-none p-0 sm:px-4 lg:px-5 py-1.5 lg:py-2.5 text-14 lg:text-20 rounded-md  hidden xsm:flex"
      >
        <GoArrowLeft className="mx-2" />
        <span className="hidden sm:block"> Back</span>
      </ExploreBtn>
      <div className="space-x-2">
        <button
          onClick={() => setPage(1)}
          className={cn(
            'px-2  py-1 sm:px-3.5 sm:py-2 border-1 border-gray-border text-gray-border rounded-md',
            1 === currentPage ? 'bg-white text-black border-black' : ''
          )}
        >
          1
        </button>

        {showLeftDots && (
          <span className="px-2  py-1 sm:px-3.5 sm:py-2 border-1 border-gray-border text-gray-border rounded-md">
            ....
          </span>
        )}

        {middlePages.map((page) => (
          <button
            key={page}
            onClick={() => setPage(page)}
            className={cn(
              'px-2  py-1 sm:px-3.5 sm:py-2 border-1 border-gray-border text-gray-border rounded-md',
              page === currentPage ? 'bg-white text-black border-black' : ''
            )}
          >
            {page}
          </button>
        ))}

        {showRightDots && (
          <span className="px-2  py-1 sm:px-3.5 sm:py-2 border-1 border-gray-border text-gray-border rounded-md">
            ....
          </span>
        )}

        {totalPages > 1 && (
          <button
            onClick={() => setPage(totalPages)}
            className={cn(
              'px-2  py-1 sm:px-3.5 sm:py-2  border-1 border-gray-border text-gray-border rounded-md',
              totalPages === currentPage ? 'bg-white text-black border-black' : ''
            )}
          >
            {totalPages}
          </button>
        )}
      </div>

      <ExploreBtn
        disabled={currentPage === totalPages}
        onClick={() => currentPage < totalPages && setPage(currentPage + 1)}
        className="shadow-none p-0 sm:px-4 lg:px-5 py-1.5 lg:py-2.5 text-14 lg:text-20 rounded-md hidden xsm:flex"
      >
        <span className="hidden sm:block">Next</span>
        <GoArrowRight className="mx-2" />
      </ExploreBtn>
    </div>
  );
};

export default Pagination; 