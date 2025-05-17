'use client';

import React, { useRef, useEffect } from 'react';
import Button from './ui/filterbtn';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { BountiesStatusFilter, BountyType, SortByOption } from '@/data/data';

export default function Filter({
  type = "Bounties",
  statusFilter,
  setStatusFilter,
  category,
  setCategory,
  sortBy,
  setSortBy,
  bountyType,
  setBountyType,
}) {
  const [setIsSortByOpen, setSortByOpen] = React.useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = React.useState(false);

  const toggleFilter = (id) => {
    setBountyType((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  const sortByWrapperRef = useRef(null);
  const categoryWrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortByWrapperRef.current && !sortByWrapperRef.current.contains(event.target)) {
        setSortByOpen(false);
      }
      if (categoryWrapperRef.current && !categoryWrapperRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-wrap justify-between items-center gap-4">
      <div className="flex gap-2 flex-wrap">
        {BountyType?.map((filter) => (
          <Button
            key={filter.id}
            active={bountyType.includes(filter.id)}
            onClick={() => toggleFilter(filter.id)}
          >
            <Image src={filter.img} alt="icon" height={24} width={24} />
            {filter.label}
          </Button>
        ))}
        <Button onClick={() => setBountyType([])}>
          <Image src="/icons/multiplication-sign.png" alt="icon" height={24} width={24} />
          Deselect all
        </Button>
      </div>

      <div className="flex gap-2 sm:gap-3 border rounded-xl p-1 bg-white">
        {BountiesStatusFilter?.map((label) => {
          const value = label.value === 'all' ? null : label.value.toLowerCase();
          return (
            <Button
              key={label.label}
              label={label.label}
              active={statusFilter === value}
              onClick={() => setStatusFilter(value)}
              className={
                statusFilter === value
                  ? 'border border-black py-2 flex justify-center min-w-[90px]'
                  : 'bg-transparent border-none text-gray-bg py-2 flex justify-center min-w-[90px]'
              }
            />
          );
        })}
      </div>

      {/* Category Dropdown */}
      {/* {type === 'bounties' ? (
        <div className="relative" ref={categoryWrapperRef}>
          <Button
            active={isCategoryOpen}
            onClick={() => setIsCategoryOpen((prev) => !prev)}
            className={`gap-3 px-5 py-2.5 border-black ${isCategoryOpen ? '' : 'bg-transparent text-gray-bg'}`}
          >
            <Image
              src="/icons/sorting-05.png"
              alt="sortBy Icon"
              height={24}
              width={24}
              className="w-5"
            />
            <span> Category</span>
          </Button>

          {isCategoryOpen && (
            <div className="absolute top-14 left-0 bg-white border border-gray-bg rounded-xl p-4 px-7 z-50 min-w-150px">
              {['Thread', 'Article', 'Video', 'Meme'].map((label) => (
                <React.Fragment key={label}>
                  <Button
                    label={label}
                    active={category === label.toLowerCase()}
                    onClick={() => {
                      setCategory(label.toLowerCase());
                      setIsCategoryOpen(false);
                    }}
                    className="bg-transparent font-normal text-black py-3 px-0 w-full text-left border-none border-light-gray-bg"
                  />
                  <hr className="border-light-gray-bg" />
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      ) : null} */}

      <div className="relative" ref={sortByWrapperRef}>
        <Button
          active={setIsSortByOpen}
          onClick={() => setSortByOpen((prev) => !prev)}
          className={`flex gap-3 px-5 py-2.5 border-black ${setIsSortByOpen ? '' : 'bg-transparent text-gray-bg'}`}
        >
          <span> Sort by</span>
          <Image
            src="/icons/Vector-arrow.png"
            alt="sortBy Icon"
            height={12}
            width={12}
            className={cn(
              'w-3',
              setIsSortByOpen ? 'rotate-180' : 'rotate-0',
              'transition-transform duration-300'
            )}
          />
        </Button>

        {setIsSortByOpen && (
          <div className="absolute top-14 left-0 bg-white border border-gray-bg rounded-xl py-2 px-7 z-50 min-w-150px">
            {SortByOption[type]?.map((label) => (
              <React.Fragment key={label.label}>
                <Button
                  label={label.label}
                  active={sortBy === label.value.toLowerCase()}
                  onClick={() => {
                    setSortBy(label.value.toLowerCase());
                    setSortByOpen(false);
                  }}
                  className="bg-transparent font-normal text-black py-3 px-0 w-full text-left border-none border-light-gray-bg"
                />
                <hr className="border-light-gray-bg" />
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
