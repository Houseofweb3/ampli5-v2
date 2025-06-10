'use client';
import BountyPool from '../components/BountyPool';
import BountyDetailsSkeleton from '../components/ui/bountyDetailsSkeleton';
import Card from '../components/ui/card';
import Container from '../components/ui/container';
import ExploreBtn from '../components/ui/explorebtn';
import PrimaryButton from '../components/ui/PrimaryButton';
import { BountiesType } from '../data/data';
import axiosInstance from '../lib/axiosInstance';
import { deadlineCounter } from '../lib/deadlineCounter';
import { cn } from '../lib/utils';
import { useAuthStore } from '../store/auth';
import moment from 'moment';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Winner from './WinnerList';

interface BountyMetadata {
  coverImage: string;
  logo: string;
  about: string;
  resources: {
    website: string;
    description?: string;
    [key: string]: string | undefined;
  };
  founderTeam: {
    [key: string]: {
      name: string;
      xUrl: string;
    };
  };
  USP: string;
  missionStatement?: string;
  targetAudience?: string;
  competitiveAdvantage?: string;
  requirements?: string;
  evaluationCriteria?: string;
  timeline?: string;
  prizePool?: string;
  additionalInformation?: string;
  keyFeatures?: string[];
  callToAction?: string;
  contentInspiration?: {
    [key: string]: string;
  };
  dos?: string[];
  donts?: string[];
  contactForCoordination?: {
    [key: string]: string;
  };
}

interface Bounty {
  bountyName: string;
  prize: number;
  bountyType: string;
  yaps: number;
  status: 'open' | 'closed';
  endDate: string;
  metadata: BountyMetadata;
}

interface Submission {
  id: string;
  userId: string;
  submissionLink: string;
  status: string;
  fullname?: string;
}



const BountyDetailPage: React.FC = (): JSX.Element => {
  const { bounties_id } = useParams();
  const router = useRouter();
  const { isLogin, user } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(true);

  const [bounty, setBounty] = useState<Bounty | null>(null);
  const [submissionsList, setSubmissionsList] = useState<Submission[]>([]);
  const [winderList, setWinnerList] = useState<Submission[]>([]);

  const [submittedUser, setSubmittedUser] = useState<Submission | false>(false);
  const [submissionLink, setSubmissionLink] = useState<string>('');
  const [submissionLinkValidation, setSubmissionLinkValidation] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchBounty = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/bounty/${bounties_id}`);
        setBounty(response.data.bounty.bounty);
        setSubmissionsList(response.data.bounty.submissions);
      } catch (err) {
        console.error('Error fetching bounty:', err);
      } finally {
        setLoading(false);
      }
    };

    if (bounties_id) {
      fetchBounty();
    }
  }, [bounties_id]);

  useEffect(() => {
    if (user && submissionsList.length) {
      const userId = user.id;
      const isSubmittedUser = submissionsList.find((user) => user.userId === userId);
      setSubmittedUser(isSubmittedUser || false);
    }
  }, [user, submissionsList]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!submissionLink || !bounties_id || !user?.id) {
        toast.warn('Required filed messing');
        return;
      }
      const regex = /^https:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
      const isValid = regex.test(submissionLink);
      if (!isValid) {
        setSubmissionLinkValidation('Invalid submission link');
        return;
      }
      if (submittedUser) {
        axiosInstance.put(`/bounty-submission/${submittedUser.id}`, {
          submissionLink: submissionLink,
        });
        toast.success('Your submission has been Updated');
      } else {
        axiosInstance.post('/bounty-submission', {
          userId: user.id,
          bountyId: bounties_id,
          submissionLink: submissionLink,
        });
        toast.success('Your submission has been submitted');
      }
      setSubmissionLink('');
      router.push('/bounty-hunt');
    } catch (error) {
      if (submittedUser) {
        toast.error('Submission Update failed. Please try again.');
      } else {
        toast.error('Submission failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (submissionsList.length > 0) {
      const IsWinnerDeclared = submissionsList.filter(
        (submission) => submission.status === 'approved'
      );
      setWinnerList([...IsWinnerDeclared]);
    }
  }, [submissionsList]);

  return loading ? (
    <BountyDetailsSkeleton />
  ) : (
    <div>
      <div className="relative">
        <Image
          src={
            bounty?.metadata?.coverImage?.startsWith('http')
              ? bounty?.metadata?.coverImage
              : '/images/bounties-details-banner.png'
          }
          onError={(e: any) => (e.target.src = '/images/bounties-details-banner.png')}
          height={257}
          width={1440}
          alt="img"
          className="w-full h-257px object-cover bg-gray-400"
        />
      </div>
      <div className="bg_square relative bg-cream-bg">
        <Container>
          <div className="w-full relative flex flex-col">
            <Image
              src={bounty?.metadata?.logo || '/images/bounties-details-img.png'}
              onError={(e: any) => (e.target.src = '/images/bounties-details-img.png')}
              height={141}
              width={141}
              alt="img"
              className="rounded-full w-80px h-80px md:w-141px md:h-141px border-2 border-white -mt-40px md:-mt-80px bg-gray-400"
            />
            <div className="mb-8 ">
              <div>
                <h2 className="my-4">{bounty?.bountyName}</h2>
                <div className="w-full flex flex-wrap justify-between item-center gap-6">
                  <div className="flex flex-wrap gap-4">
                    <div className="w-fit text-white rounded-2xl h-fit  border-2 bg-blue-btn border-black py-2 px-3 flex gap-1.5 justify-between items-center">
                      <Image src="/icons/t-icon.png" height={24} width={24} alt="icon" />
                      <span className="uppercase  text-18"> {bounty?.prize} USDT</span>
                    </div>
                    <div
                      className={cn(
                        'w-fit text-white rounded-2xl h-fit py-2 px-3 flex gap-2 justify-between items-center border',
                        bounty?.bountyType ? BountiesType[bounty.bountyType]?.bgcolor : '',
                        bounty?.bountyType ? BountiesType[bounty.bountyType]?.borderColor : ''
                      )}
                    >
                      <Image
                        src={bounty?.bountyType ? BountiesType[bounty.bountyType]?.url : ''}
                        height={24}
                        width={24}
                        alt="icon"
                      />
                      <span className="text-18"> {bounty?.bountyType}</span>
                    </div>
                    <div className="w-fit h-fit text-white rounded-2xl bg-black border border-black py-2 px-3 flex gap-2 justify-between items-center">
                      <Image src="/icons/image-71.png" height={24} width={24} alt="icon" />
                      <span> {bounty?.yaps} Yaps Req</span>
                    </div>
                    {bounty?.status === 'closed' ? (
                      <div className="w-fit h-fit text-white rounded-2xl bg-videoBg border border-videoBadgeBorder py-2 px-3 flex gap-2 justify-between items-center">
                        Closed
                      </div>
                    ) : (
                      <div className="w-fit h-fit text-black/45 rounded-2xl bg-white border border-black py-2 px-3 flex gap-2 justify-between items-center">
                        <Image src="/icons/clock-05.png" height={24} width={24} alt="icon" />
                        <span className="text-18">
                          {moment(bounty?.endDate)?.format('DD/MM/YYYY')}
                        </span>
                      </div>
                    )}
                  </div>
                  {bounty?.status === 'closed' ? null : (
                    <div className="w-full sm:w-fit h-fit">
                      <Link href="#submit">
                        <PrimaryButton className="w-full sm:w-fit text-white px-6 lg:px-8 py-2 lg:py-3 ">
                          Submit Bounty
                        </PrimaryButton>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>

        <div className="w-full">
          <Container className="pb-4px">
            <Card className="ctm_bounties_details p-4 lg:p-9 shadow-xl">
              <h2 className="text-36"> About the Project</h2>
              <p>{bounty?.metadata?.about}</p>
              <Link
                href={bounty?.metadata?.resources?.website || '#'}
                className="font-medium text-18 pt-2 mb-9 flex items-center"
              >
                <ExploreBtn className="bg-yellow-bg hover:bg-white text-black/80 hover:text-black border-black shadow-xl px-4 lg:px-7 py-1.5 lg:py-3 text-14 md:text-18 w-full md:w-fit">
                  About Project - {bounty?.metadata?.resources?.website}
                  <Image
                    alt="Arrow"
                    width={1000}
                    height={1000}
                    className="w-6 h-6 ml-2 hidden sm:block"
                    src="/icons/arrow-up-right-01.png"
                  />
                </ExploreBtn>
              </Link>
              <h2>Founder/Team</h2>
              <ul className="flex flex-col p-0 mt-4 w-fit mb-9 ">
                {Object?.entries(bounty?.metadata?.founderTeam || {})?.map(([key, value], index) => (
                  <li key={index} className="grid grid-cols-2 gap-2 py-1  text-16 lg:text-18">
                    <span className="font-bold">{key}</span>
                    <Link href={value.xUrl} className="flex group items-center gap-2   break-all">
                      <span className=" group-hover:text-yellow-bg transition-all duration-300 ease-in-out">
                        {value.name}
                      </span>
                      <Image
                        alt="Arrow"
                        width={1000}
                        height={1000}
                        className="w-6 h-5 py-2px px-1 border border-solid border-black rounded-full shadow-xl bg-yellow-bg group-hover:shadow-none group-hover:bg-transparent transition-all duration-300 ease-in-out"
                        src="/icons/arrow-up-right-01.png"
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col md:flex-row gap-30px md:gap-9 mb-9">
                <div className="flex items-start flex-col flex-1 gap-2">
                  <h2>USP</h2>
                  <div className="bg-gradient-to-r from-light-blue1-bg to-light-sky-blue-bg p-6 rounded-2xl w-full flex flex-col items-end gap-4">
                    <h3 className="font-normal w-full text-left">{bounty?.metadata?.USP}</h3>
                    <Image src={'/icons/pie-chart.png'} width={54} height={54} alt="icons" />
                  </div>
                </div>
                <div className="flex items-start flex-col gap-2  flex-1">
                  <h2>Mission Statement</h2>
                  <div className="bg-gradient-to-r from-light-blue1-bg to-light-sky-blue-bg p-6 rounded-2xl w-full flex flex-col items-end gap-4">
                    <h3 className="font-normal w-full text-left">
                      {bounty?.metadata?.missionStatement}
                    </h3>
                    <Image src={'/icons/target.png'} width={54} height={54} alt="icons" />
                  </div>
                </div>
              </div>

              <div className="mb-9">
                <h2 className="mb-2">Key Features</h2>
                <ul className="p-0 m-0  text-16 sm:text-18">
                  {bounty?.metadata?.keyFeatures?.map((value, index) => (
                    <li key={index} className="!list-none">
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-9">
                <h2 className="mb-2">Call to Action</h2>
                <ul className="p-0 m-0  text-16 sm:text-18">
                  <li className="!list-none">{bounty?.metadata?.callToAction}</li>
                </ul>
              </div>
              <div>
                <h2>Resources</h2>
                <ul className="flex flex-col p-0 mt-4 w-fit mb-9  text-16 sm:text-18">
                  {Object.entries(bounty?.metadata?.resources || {})?.map(([key, value], index) => (
                    <li key={index} className="flex gap-1 py-1 group  text-16 sm:text-18">
                      <span className="font-bold capitalize">{key}:</span>
                      <Link href={value as string} className="flex gap-2 list-none">
                        <span className="  break-all group-hover:text-yellow-bg transition-all duration-300 ease-in-out break-words">
                          {value}
                        </span>
                        <Image
                          alt="Arrow"
                          width={1000}
                          height={1000}
                          className="w-6 h-5 py-2px px-1 border border-solid border-black rounded-full shadow-xl bg-yellow-bg group-hover:shadow-none group-hover:bg-transparent transition-all duration-300 ease-in-out"
                          src="/icons/arrow-up-right-01.png"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2>Bounties Inspiration</h2>
                <ul className="flex flex-col p-0 mt-4 w-fit mb-9  text-16 sm:text-18">
                  {Object?.entries(bounty?.metadata?.contentInspiration || {})?.map(
                    // eslint-disable-next-line
                    ([_, value], index) =>
                      value ? (
                        <li key={index} className="flex gap-1 py-1 group  text-16 sm:text-18">
                          <Link href={value} className="flex gap-2 list-none">
                            <span className="  break-all group-hover:text-yellow-bg transition-all duration-300 ease-in-out break-words">
                              {value}
                            </span>
                            <Image
                              alt="Arrow"
                              width={1000}
                              height={1000}
                              className="w-6 h-5 py-2px px-1 border border-solid border-black rounded-full shadow-xl bg-yellow-bg group-hover:shadow-none group-hover:bg-transparent transition-all duration-300 ease-in-out"
                              src="/icons/arrow-up-right-01.png"
                            />
                          </Link>
                        </li>
                      ) : null
                  )}
                </ul>
              </div>
              <h2 className="mb-4">Do's and Don'ts</h2>
              <div className="flex flex-col md:flex-row gap-4 mb-9">
                <div className="flex flex-1 items-start flex-col gap-2">
                  <div className="border border-solid border-black/15 p-6 rounded-2xl w-full flex flex-col gap-4">
                    <ul className="p-0 m-0  text-16 sm:text-18 break-all list-none space-y-2 ">
                      {bounty?.metadata?.dos?.map((value, index) => (
                        <li
                          key={index}
                          className="!list-none pb-1 before:content-['✅'] before:mr-2 before:inline-block"
                        >
                          {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-1 items-start flex-col gap-2">
                  <div className="border border-solid border-black/10 p-6 rounded-2xl w-full flex flex-col gap-4">
                    <ul className="p-0 m-0 space-y-1.5 text-16 sm:text-18 break-all">
                      {bounty?.metadata?.donts?.map((value, index) => (
                        <li
                          key={index}
                          className="!list-none pb-1 before:content-['❌'] before:mr-2 before:inline-block"
                        >
                          {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mb-9">
                <h2 className="mb-4">Deadline</h2>
                <div className="flex flex-col md:flex-row gap-4">
                  {deadlineCounter({ date: bounty?.endDate || '', status: bounty?.status || 'open' })}
                </div>
              </div>

              <div className="mb-9">
                <h2 className="mb-4">Rewards</h2>
                <div className="flex flex-row items-center gap-4 w-full p-6 border border-solid border-black/15 rounded-3xl">
                  <span className="text-20 lg:text-24 ">🤑</span>
                  <small className="text-black/80 font-semibold text-18 ">
                    {Number(bounty?.prize).toFixed(0)} USDT{' '}
                  </small>
                </div>
              </div>
              <div className="mb-9 scroll-mt-[40vh]" id="submit">
                <h2>Submission</h2>
                {bounty?.yaps && user?.yaps_score && bounty.yaps <= user.yaps_score ? (
                  isLogin ? (
                    <div>
                      {bounty?.status === 'open' ? (
                        <form onSubmit={handleSubmit}>
                          <div className="flex flex-col w-full">
                            <label className="text-14 text-dark-gray-bg">
                              For video submissions, videos can be submitted only on Youtube and
                              LinkedIn{' '}
                            </label>
                            <input
                              type="url"
                              required={true}
                              pattern="https?://.+"
                              className="bg-alabaster-bg border border-solid border-light-gray1-bg rounded-8 px-4 py-3.5 mt-4 w-full"
                              placeholder="https://x.com/yourthreadlink"
                              value={submissionLink}
                              onChange={(e) => {
                                setSubmissionLink(e.target.value.trim());
                                setSubmissionLinkValidation(null);
                              }}
                            />
                            {submissionLinkValidation && (
                              <span className="text-videoBg m-1"> {submissionLinkValidation}</span>
                            )}
                          </div>

                          <PrimaryButton
                            type="submit"
                            disabled={isSubmitting || submissionLink.length < 1 || bounty.status !== 'open'}
                            className="mt-4 text-white w-full md:w-fit py-3"
                          >
                            {submittedUser ? 'Update' : 'Submit'}
                          </PrimaryButton>
                        </form>
                      ) : null}
                      {bounty?.status === 'closed' ? (
                        <span className="text-videoBg">This bounty is now closed</span>
                      ) : null}
                    </div>
                  ) : (
                    <div>
                      <span> Join the bounty contest by signing up. It's free!</span>
                      <PrimaryButton className="text-white mt-2" onClick={() => signIn('twitter')}>
                        Sign up to participate{' '}
                      </PrimaryButton>
                    </div>
                  )
                ) : (
                  <div className="text-red-500">
                    <span>
                      {`You are not allowed to participate in this bounty because your Yaps score is too low.
                       You need at least ${(bounty?.yaps || 0) - (user?.yaps_score || 0)} more Yaps to qualify.`}
                    </span>
                  </div>
                )}
              </div>
              <div className="mb-0">
                <h2 className="mb-4">Contact for Coordination</h2>
                <ul className="p-0  text-16 sm:text-18">
                  {Object?.entries(bounty?.metadata?.contactForCoordination || {})?.map(
                    ([key, value], index) => (
                      <li key={index} className="flex gap-1 py-1  ">
                        <span className="capitalize">{key}:</span>
                        <Link
                          href={value}
                          className="flex items-center group gap-2 break-words whitespace-normal break-all w-fit"
                        >
                          <span className="text-18 group-hover:text-yellow-bg transition-all duration-300 ease-in-out">
                            {value}
                          </span>
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </Card>
          </Container>

          {bounty?.status === 'closed' ? (
            <Winner winderList={winderList as any} />
          ) : (
            <BountyPool Prize={bounty?.prize || 0} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BountyDetailPage;
