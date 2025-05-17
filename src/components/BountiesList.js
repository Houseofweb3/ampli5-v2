'use client';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Container from './ui/container';
import Title from './ui/title';
import Card from './ui/card';
import BountiesCard from './BountiesCard';
import Filter from './Filter';
import axiosInstance from '@/lib/axiosInstance';
import isEmpty from '@/lib/inEmpty';
import ExploreBtn from './ui/explorebtn';
import { GoArrowRight } from 'react-icons/go';
import { GoArrowLeft } from 'react-icons/go';
import BountiesSkeletonCard from './ui/bountiesSkeletonCard';
import { useAuthStore } from '@/store/auth';
import groupByYap from '@/lib/groupByYap';
import { useSession } from 'next-auth/react';

export default function BountiesList({ title, vector, type }) {
  const auth = useAuthStore();
  const authsession = useSession();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState(null);
  const [category, setCategory] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [bountyType, setBountyType] = useState([]);
  const [bounties, setBounties] = useState([]);
  const [needMoreYapsBounties, setNeedMoreYapsBounties] = useState([]);
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
          page,
          limit: 20,
          ...(statusFilter && { statusFilter }),
          ...(bountyType.length > 0 && { bountyType: bountyType.join(',') }),
          ...(sortBy && { sortBy: sortBy }),
          ...(category && { category }),
        };

        if (type === 'Submissions') {
          let response = await axiosInstance.get(
            '/bounty-submission/0f9b7c86-d622-48cb-8cb1-48deaad7b3d9',
            { params }
          );

          setBounties(response.data.bounties);
          setBountiesMetaData(response.data.pagination);
        } else {
          let response = await axiosInstance.get('/bounty', { params });

          if (!auth.token && isEmpty(response.data.bounties)) {
            setBounties(response.data.bounties);
            setBountiesMetaData(response.data.pagination);
          }

          if (auth.token && !isEmpty(response.data.bounties)) {
            const yepScore = 1500;
            const { greaterThen, lessThan } = groupByYap({
              bounties: response.data.bounties,
              threshold: yepScore,
            });
            setBounties(greaterThen);
            setNeedMoreYapsBounties(lessThan);
            setBountiesMetaData(response.data.pagination);
          }
        }
      } catch (error) {
        console.error('Failed to fetch bounties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBounties();
  }, [statusFilter, category, sortBy, bountyType, page, auth]);

  useEffect(() => {
    setPage(1);
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

            {loading ? (
              <BountiesSkeletonCard count={3} />
            ) : !isEmpty(bounties) ? (
              <div>
                <div>
                  {auth.token && type === 'Bounties' ? (
                    <div className="bg-light-gray2-bg rounded-44 py-4 text-center my-4 lg:my-6">
                      <h3 className="text-18 lg:text-26 font-extrabold">Qualified Bounties</h3>
                    </div>
                  ) : null}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bounties.map((bounty) => (
                      <BountiesCard key={bounty.id} data={bounty} />
                    ))}
                  </div>
                </div>

                <div>
                  {auth.token && type === 'Bounties' && !isEmpty(needMoreYapsBounties) ? (
                    <div className="bg-light-gray2-bg rounded-44 py-4 text-center my-4 lg:my-6">
                      <h3 className="text-18 lg:text-26 font-extrabold">Need More Yaps</h3>
                    </div>
                  ) : null}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {needMoreYapsBounties.map((bounty) => (
                      <BountiesCard key={bounty.id} data={bounty} />
                    ))}
                  </div>
                </div>
                <div className="flex mt-4 lg:mt-8 justify-between items-center">
                  <ExploreBtn
                    className="shadow-none px-4 lg:px-5 py-1.5 lg:py-2.5 text-14 lg:text-20"
                    onClick={() => page > 1 && setPage((prev) => prev - 1)}
                    disabled={page <= 1}
                  >
                    <GoArrowLeft className="mx-2" />
                    Back
                  </ExploreBtn>

                  <div className="text-lg font-medium">
                    {`${page}/${bountiesMetaData.totalPages}`}{' '}
                    <span className="text-black"> pages</span>
                  </div>

                  <ExploreBtn
                    className="shadow-none px-4 lg:px-5 py-1.5 lg:py-2.5 text-14 lg:text-20"
                    onClick={() =>
                      page < bountiesMetaData.totalPages && setPage((prev) => prev + 1)
                    }
                    disabled={page >= bountiesMetaData.totalPages}
                  >
                    Next
                    <GoArrowRight className="mx-2" />
                  </ExploreBtn>
                </div>
              </div>
            ) : (
              <div className="w-full flex justify-center">
                <h2 className="text-center my-10 text-gray-300">No Bounties Found</h2>
              </div>
            )}
          </div>
        </Card>
      </Container>
    </div>
  );
}
