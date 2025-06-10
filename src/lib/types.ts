import { StaticImageData } from "next/image";

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
export type Influencer = {
  id: string;
  dpLink: string;
  socialMediaLink: string;
  influencer: string;
  followers: number;
  blockchain: string;
  categoryName: string;
  engagementRate: string;
  niche: string;
  geography: string;
  platform: string;
  price: string;
  hiddenPrice: string;
  credibilityScore: string;
  tweetScoutScore: string | number;
  contentType?:string
};

export type CartInfluencer = {
  id: string;
  name: string;
  socialMediaLink: string;
  dpLink: string;
  influencer: string;
  followers: number;
  blockchain: string;
  subscribers: number;
  categoryName: string;
  engagementRate: string;
  niche: string;
  geography: string;
  platform: string;
  price: string;
  hiddenPrice: string;
  InfluencerCartId: string;
  credibilityScore: string;
};

export type InfluencerList = {
  pagination: Pagination;
  influencers: Influencer[];
};

export type UserType = {
  email: string;
  password: string;
  fullname: string;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  is_deleted: boolean;
  userType: string;
};

export type UserDataType = {
  user: UserType;
  message: string;
  accessToken: string;
  refreshToken: string;
};

export type Options = {
  id: string;
  text: string;
};

export type UserQuestion = {
  id: string;
  text: string;
  type: string;
  description: string;
  options: Options[];
};

export type UserOnboardingQuestions = {
  questions: UserQuestion[];
};

export type Testimonial = {
  image: StaticImageData;
  source: string;
  name: string;
};
