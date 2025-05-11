import React from 'react';
import Container from './ui/container';
import Title from './ui/title';
import Card from './ui/card';
import BountiesCard from './BountiesCard';
import Filter from './Filter';

export default function BountiesList({ title, vector, data }) {
  return (
    <div>
      <div className="bg-[#FDF4E9] relative pt-[56px] bg_square w-full overflow-x-hidden">
        <Container>
          <div className="mb-6 lg:mb-9">
            <Title>{title || 'Bounties'}</Title>
          </div>
          <Card vector={vector}>
            <div>
              <div className="mb-4 lg:mb-7">
                <Filter />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
                <BountiesCard />
              </div>
            </div>
          </Card>
        </Container>
      </div>
    </div>
  );
}
