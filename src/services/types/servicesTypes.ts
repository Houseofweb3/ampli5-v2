export type User = {
  id?: string;
  email?: string;
  name?: string;
  instagramUrl?: string | null;
  twitterUrl?: string | null;
  linkedinUrl?: string | null;
  facebookUrl?: string | null;
  sessionToken?: string | null;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
export type Influencer = {
  id: string;
  influencer: string;
  followers: number;
  categoryName: string;
  engagementRate: string;
  niche: string;
  geography: string;
  platform: string;
  price: string;
  hiddenPrice: string;
};

export type InfluencerList = {
  pagination: Pagination;
  influencer: Influencer[];
};

export type FiltersType = {
  platforms: string[];
  locations: string[];
  blockchains: string[];
  followers: string[];
  niches: string[];
  engagementRates: string[];
  credibilityScores: string[];
  hiddenPrices: string[];
};
export type Cart = {
  id: string;
  user: User;
  createdAt: string;
  updatedAt: string;
  influencerCartItems: any[];
  packageCartItems: any[];
  checkout: string;
  subtotal: number;
  managementFee: number;
  discount: number;
  total: number;
  cutAmount: number;
  discountPercentage: number;
  managementFeePercentage: number;
  discountMessage: string;
};
