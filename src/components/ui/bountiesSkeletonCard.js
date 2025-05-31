import React from 'react';

export default function BountiesSkeletonCard({ count = 1 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="border border-solid border-gray-300 rounded-3xl p-4 lg:p-6 relative animate-pulse bg-white"
        >
          <div className="flex flex-col gap-4 lg:gap-6">
            {/* Top Section */}
            <div className="flex items-center gap-8 lg:gap-6 justify-between">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gray-300 rounded"></div>
                  <div className="h-3 w-20 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="h-8 w-24 bg-gray-300 rounded-full"></div>
            </div>

            {/* Stats Section */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between overflow-hidden">
                <div className="flex-1 pr-3">
                  <div className="h-3 w-20 bg-gray-200 rounded mb-1"></div>
                  <div className="h-4 w-16 bg-gray-300 rounded"></div>
                </div>
                <div className="flex-1 px-3 border-l border-r border-black/10 border-solid">
                  <div className="h-3 w-20 bg-gray-200 rounded mb-1"></div>
                  <div className="h-4 w-10 bg-gray-300 rounded"></div>
                </div>
                <div className="flex-1 pl-3">
                  <div className="h-3 w-20 bg-gray-200 rounded mb-1"></div>
                  <div className="h-4 w-16 bg-gray-300 rounded"></div>
                </div>
              </div>

              {/* Button Placeholder */}
              <div className="flex items-center gap-4">
                <div className="w-24 h-10 bg-gray-300 rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
