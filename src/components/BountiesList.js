'use client';
import React, { useEffect, useState } from 'react';
import Container from './ui/container';
import Title from './ui/title';
import Card from './ui/card';
import BountiesCard from './BountiesCard';
import Filter from './Filter';
import axiosInstance from '@/lib/axiosInstance';
import isEmpty from '@/lib/inEmpty';

export default function BountiesList({ title, vector, type }) {
  const [statusFilter, setStatusFilter] = useState(null);
  const [category, setCategory] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [bountyType, setBountyType] = useState([]);
  const [bounties, setBounties] = useState([]);
  const [bountiesMetaData, setBountiesMetaData] = useState({
    limit: 20,
    page: 1,
    total: 2,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBounties = async () => {
      try {
        setLoading(true);
        const params = {
          page: 1,
          limit: 20,
          ...(statusFilter && { statusFilter }),
          ...(bountyType.length > 0 && { bountyType: bountyType.join(',') }),
          ...(sortBy && { sortBy: sortBy }),
          ...(category && { category }),
        };

        const response = await axiosInstance.get('/bounty', { params });

        setBounties(response.data.bounties);
        setBountiesMetaData(response.data.pagination);
      } catch (error) {
        console.error('Failed to fetch bounties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBounties();
  }, [statusFilter, category, sortBy, bountyType]);

  return (
    <div className="bg-cream-bg relative pt-56px bg_square w-full overflow-x-hidden">
      <Container>
        <div className="mb-6 lg:mb-9">
          <Title>{title || 'Bounties'}</Title>
        </div>
        <Card vector={vector}>
          <div>
            <div className="mb-4 lg:mb-7">
              <Filter
                type={type}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                setSortBy={setSortBy}
                bountyType={bountyType}
                sortBy={sortBy}
                setBountyType={setBountyType}
                category={category}
                setCategory={setCategory}
              />
            </div>
            <div className="bg-light-gray2-bg rounded-44 py-4 text-center mb-4 lg:mb-6">
              <h3 className="text-18 lg:text-26 font-extrabold">Qualified Bounties</h3>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : !isEmpty(bounties) ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bounties.map((bounty) => (
                  <BountiesCard key={bounty.id} data={bounty} />
                ))}
              </div>
            ) : (
              <div className="w-full flex justify-center">
                <h2 className="text-center my-10 text-gray-500">No Bounties Found</h2>
              </div>
            )}
          </div>
        </Card>
      </Container>
    </div>
  );
}
