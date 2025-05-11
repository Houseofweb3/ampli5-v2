'use client';

import React, { useState, useRef, useEffect } from 'react';
import FilterGroup from './ui/FilterGroup';
import Button from './ui/filterbtn';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function Filter() {
  const [status, setStatus] = useState(null);
  const [category, setCategory] = useState(null);
  const [sorting, setSorting] = useState(null);
  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const sortingWrapperRef = useRef(null);
  const categoryWrapperRef = useRef(null);

  const getButtonClass = (btnStatus) => {
    const isActive = status === btnStatus;
    return isActive
      ? 'border border-black py-2 flex justify-center min-w-[90px]'
      : 'bg-transparent border-none text-[#878787] py-2 flex justify-center min-w-[90px]';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortingWrapperRef.current && !sortingWrapperRef.current.contains(event.target)) {
        setIsSortingOpen(false);
      }
      if (categoryWrapperRef.current && !categoryWrapperRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', () => setIsSortingOpen(false));
      document.removeEventListener('click', () => setIsCategoryOpen(false));
    };
  }, []);

  return (
    <div className="flex flex-wrap justify-between items-center gap-4">
      <FilterGroup />

      {/* Status Buttons */}
      <div className="flex  gap-2 sm:gap-3 border rounded-xl p-1 bg-white">
        {['All', 'Open', 'Closed'].map((label) => {
          const value = label === 'All' ? null : label.toLowerCase();
          return (
            <Button
              key={label}
              label={label}
              active={status === value}
              onClick={() => setStatus(value)}
              className={getButtonClass(value)}
            />
          );
        })}
      </div>

      {/* Category Dropdown */}
      <div className="relative" ref={categoryWrapperRef}>
        <Button
          active={isCategoryOpen}
          onClick={() => setIsCategoryOpen((prev) => !prev)}
          className={`gap-3 px-5 py-2.5 border-black ${isCategoryOpen ? '' : 'bg-transparent text-[#878787]'}`}
        >
          <Image
            src="/icons/sorting-05.png"
            alt="Sorting Icon"
            height={1000}
            width={1000}
            className={cn('w-5')}
          />
          <span> Sort by</span>
        </Button>

        {isCategoryOpen && (
          <div className="absolute top-14 left-0 bg-white border border-[#878787] rounded-xl p-4 px-7 z-50 min-w-[150px]">
            {['Thread', 'Article', 'Video', 'Meme'].map((label) => (
              <React.Fragment key={label}>
                <Button
                  label={label}
                  active={category === label.toLowerCase()}
                  onClick={() => {
                    setCategory(label.toLowerCase());
                    setIsCategoryOpen(false);
                  }}
                  className="bg-transparent font-normal text-black py-3 px-0 w-full text-left border-none border-[#d3d3d3]"
                />
                <hr className="border-[#d3d3d3] nth-last-[1]:border-none" />
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Sorting Dropdown */}
      <div className="relative" ref={sortingWrapperRef}>
        <Button
          active={isSortingOpen}
          onClick={() => setIsSortingOpen((prev) => !prev)}
          className={`flex  gap-3 px-5 py-2.5 border-black  ${isSortingOpen ? '' : 'bg-transparent text-[#878787]'}`}
        >
          <span> Sort by</span>
          <Image
            src="/icons/Vector-arrow.png"
            alt="Sorting Icon"
            height={1000}
            width={1000}
            className={cn(
              'w-3',
              isSortingOpen ? 'rotate-180' : 'rotate-0',
              'transition-transform duration-300'
            )}
          />
        </Button>

        {isSortingOpen && (
          <div className="absolute top-14 left-0 bg-white border border-[#878787] rounded-xl py-2 px-7 z-50 min-w-[150px]">
            {['Latest', 'Rewards'].map((label) => (
              <React.Fragment key={label}>
                <Button
                  label={label}
                  active={sorting === label.toLowerCase()}
                  onClick={() => {
                    setSorting(label.toLowerCase());
                    setIsSortingOpen(false);
                  }}
                  className="bg-transparent font-normal text-black py-3 px-0 w-full text-left border-none border-[#d3d3d3]"
                />
                <hr className="border-[#d3d3d3] nth-last-[1]:border-none" />
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
