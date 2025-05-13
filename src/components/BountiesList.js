'use client';
import React, { useEffect, useState } from 'react';
import Container from './ui/container';
import Title from './ui/title';
import Card from './ui/card';
import BountiesCard from './BountiesCard';
import Filter from './Filter';
import axiosInstance from '@/lib/axiosInstance';

export default function BountiesList({ title, vector }) {
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
        const response = await axiosInstance.get(
          '/bounty?statusFilter=open&bountyType=video&sortBy=prize&page=1&limit=20'
        );

        setBounties(response.data.bounties);
        setBountiesMetaData(response.data.pagination);
      } catch (error) {
        console.error('Failed to fetch bounties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBounties();
  }, []);


  return (
    <div>
      <div className="bg-cream-bg relative pt-56px bg_square w-full overflow-x-hidden">
        <Container>
          <div className="mb-6 lg:mb-9">
            <Title>{title || 'Bounties'}</Title>
          </div>
          <Card vector={vector}>
            <div>
              <div className="mb-4 lg:mb-7">
                <Filter />
              </div>
              <div className="bg-light-gray2-bg rounded-44 py-4 text-center mb-4 lg:mb-6">
                <h3 className="text-18 lg:text-26 font-extrabold">Qualified Bounties</h3>
              </div>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bounties.map((bounty) => (
                    <BountiesCard key={bounty.id} data={bounty} />
                  ))}
                </div>
              )}
            </div>
          </Card>
        </Container>
      </div>
    </div>
  );
}
