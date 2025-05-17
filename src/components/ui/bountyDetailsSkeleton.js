import React from 'react';
import Container from './container';

export default function BountyDetailsSkeleton() {
  return (
    <div className="relative animate-pulse">
      <div className="w-full h-[257px] bg-gray-300"></div>

      <div className="bg-cream-bg">
        <Container>
          <div className="w-full relative flex flex-col">
            <div className="rounded-full w-[80px] h-[80px] md:w-[141px] md:h-[141px] bg-gray-300 border-2 border-white -mt-[40px] md:-mt-[80px]"></div>

            <div className="mb-8">
              <div>
                <div className="h-8 w-64 bg-gray-300 my-4 rounded"></div>

                <div className="w-full sm:flex flex-wrap justify-between items-end gap-4">
                  <div className="flex flex-wrap gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-fit h-10 rounded-2xl bg-gray-300 px-6 py-2"></div>
                    ))}
                  </div>

                  <div className="sm:w-fit my-4 sm:my-0 h-10 w-[180px] bg-gray-300 rounded-full px-8"></div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
