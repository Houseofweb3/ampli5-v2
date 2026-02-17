"use client";
import React, { useCallback, useEffect, useState } from "react";
import Container from "./ui/container";
import Title from "./ui/title";
import Card from "./ui/card";
import BountiesCard from "./BountiesCard";
import Filter from "./Filter";
import axiosInstance from "../lib/axiosInstance";
import isEmpty from "../lib/inEmpty";
import BountiesSkeletonCard from "./ui/bountiesSkeletonCard";
import { useAuthStore } from "../store/auth";
import groupByYap from "../lib/groupByYap";
import Pagination from "./ui/Pagination";
import GoBackButton from "./ui/goBackBtn";

interface BountiesListProps {
  title?: string;
  vector?: string;
  type?: "Bounties" | "Submissions";
}

interface Bounty {
  id: string;
  bountyName: string;
  prize: number;
  bountyType: string;
  yaps: number;
  status: string;
  endDate: string;
  metadata: any;
  [key: string]: any;
}

interface PaginationMeta {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

const BountiesList: React.FC<BountiesListProps> = ({ title, vector, type }) => {
  const Auth = useAuthStore();
  const hasHydrated = useAuthStore?.persist?.hasHydrated() || true;

  const [page, setPage] = useState<number>(1);
  const [statusFilter, setStatusFilter] = useState<string | null>("closed");
  const [sortBy, setSortBy] = useState<string>("");
  const [bountyType, setBountyType] = useState<string[]>([]);
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [needMoreYapsBounties, setNeedMoreYapsBounties] = useState<Bounty[]>([]);
  const [bountiesMetaData, setBountiesMetaData] = useState<PaginationMeta>({
    limit: 20,
    page: 1,
    total: 2,
    totalPages: 1,
  });

  const [loading, setLoading] = useState<boolean>(true);
  const YapScore = Auth.user.yaps_score;
  const userId = Auth.user.id;

  const fetchBounties = useCallback(async () => {
    try {
      setLoading(true);
      const params: any = {
        page,
        limit: 6,
        ...(statusFilter && { statusFilter }),
        ...(bountyType.length > 0 && { bountyType: bountyType.join(",") }),
        ...(sortBy && { sortBy }),
      };

      if (type === "Submissions") {
        const response = await axiosInstance.get(`/bounty/my/submission/${userId}`, { params });
        const data = response.data.bounty.bounty.reduce((pre: Bounty[], bounty: any) => {
          return [...pre, bounty.bounty];
        }, []);

        setBounties(data);
        setBountiesMetaData(response.data.bounty.pagination);
      } else {
        const response = await axiosInstance.get("/bounty", { params });
        if (Auth.isLogin) {
          const { greaterThen, lessThan } = await groupByYap({
            bounties: response.data.bounties,
            threshold: YapScore,
          });
          setBounties(greaterThen);
          setNeedMoreYapsBounties(lessThan);
        } else {
          setBounties(response.data.bounties);
        }
        setBountiesMetaData(response.data.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch bounties:", error);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, bountyType, sortBy, type, Auth.isLogin, YapScore, userId]);

  useEffect(() => {
    if (!hasHydrated) return;
    fetchBounties();
  }, [fetchBounties, hasHydrated]);

  useEffect(() => {
    setPage(1);
  }, [statusFilter, sortBy, bountyType, type]);

  return (
    <div className="bg-cream-bg relative pt-56px bg_square w-full overflow-x-hidden">
      <Container>
        <div className="mb-6 lg:mb-9 flex justify-center items-center gap-4">
          <GoBackButton /> <Title>{title || "Bounties"}</Title>
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
              />
            </div>

            {loading ? (
              <BountiesSkeletonCard count={6} />
            ) : !(bounties.length < 1 && needMoreYapsBounties.length < 1) ? (
              <div>
                {!isEmpty(bounties) ? (
                  <div>
                    {Auth.isLogin ? (
                      <div className="bg-light-gray2-bg rounded-44 py-4 text-center my-4 lg:my-6">
                        <h3 className="text-18 lg:text-26 font-extrabold">Qualified Bounties</h3>
                      </div>
                    ) : null}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {bounties.map((bounty) => (
                        <BountiesCard key={bounty.id} data={bounty} />
                      ))}
                    </div>
                  </div>
                ) : null}

                {Auth.isLogin && !isEmpty(needMoreYapsBounties) ? (
                  <div>
                    <div className="bg-light-gray2-bg rounded-44 py-4 text-center my-4 lg:my-6">
                      <h3 className="text-18 lg:text-26 font-extrabold">Need More Yaps</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {needMoreYapsBounties.map((bounty) => (
                        <BountiesCard key={bounty.id} data={bounty} />
                      ))}
                    </div>
                  </div>
                ) : null}

                <Pagination
                  currentPage={page}
                  totalPages={bountiesMetaData.totalPages}
                  setPage={setPage}
                />
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
};

export default BountiesList;
