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
  contentType?: string;
};

/** Cart item in cartData.influencers. InfluencerCartId only for API cart (logged-in remove). */
export type CartInfluencer = {
  id: string;
  name: string;
  sellPrice: string | null;
  contentType: string | null;
  platform: string | null;
  platformLink: string | null;
  views: string | null;
  InfluencerCartId?: string;
};

export type InfluencerList = {
  pagination: Pagination;
  influencers: Influencer[];
};

/** Web list API: GET /api/v1/web/influencer response item */
export type WebInfluencer = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  platform: string | null;
  platformLink: string | null;
  inventory: string | null;
  primaryCountry: string | null;
  sellPrice: string | null;
  cpm: string | null;
  avgViews: string | null;
  industries: string | null;
  categories: string | null;
  primaryAudienceGeography: string | null;
};

export type WebInfluencerListResponse = {
  influencers: WebInfluencer[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
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
