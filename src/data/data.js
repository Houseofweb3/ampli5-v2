export const AuthProfile = [
  { id: '/profile', label: 'My Profile' },
  { id: '/submissions', label: 'My Submissions' },
];
export const BountyType = [
  { id: 'video', label: 'Video', img: '/icons/ai-video.png' },
  { id: 'thread', label: 'Thread', img: '/icons/threads.png' },
  { id: 'article', label: 'Article', img: '/icons/news.png' },
  { id: 'meme', label: 'Meme', img: '/icons/cookie.png' },
];
export const BountiesStatusFilter = [
  { label: 'All', value: 'all' },
  { label: 'Open', value: 'open' },
  { label: 'Closed', value: 'closed' },
];
export const SortByOption = {
  Bounties: [
    { label: 'Latest', value: 'Latest' },
    { label: 'Rewards', value: 'Rewards' },
  ],
  Submissions: [
    { label: 'Expiry Date', value: 'ExpiryDate' },
    { label: 'Launch Date', value: 'LaunchDate' },
    { label: 'Grant Value', value: 'GrantValue' },
  ],
};

export const forProjectLinks = [
  { title: 'Create Bounty', href: '/create/bounty' },
  { title: 'KOL-Discovery', href: 'https://ampli5.ai/' },
  { title: 'Ambassador Program', href: '/ambassador' },
  { title: 'Founder-led Marketing', href: '/founder-led' },
];

export const XSliderData = [
  { url: '/images/content/image.png' },
  { url: '/images/content/image1.png' },
  { url: '/images/content/image2.png' },
  { url: '/images/content/image3.png' },
  { url: '/images/content/image3.png' },
  { url: '/images/content/image3.png' },
];
export const YoutubeSliderData = [
  { url: '/images/content/image.png' },
  { url: '/images/content/image1.png' },
  { url: '/images/content/image2.png' },
  { url: '/images/content/image3.png' },
];

export const BountiesPollPrizeDistribution = [
  { url: '/images/win-1.png', position: '1st', percentage: 25 },
  { url: '/images/win-2.png', position: '2nd', percentage: 18 },
  { url: '/images/win-3.png', position: '3rd', percentage: 14 },
  { url: '/images/win-4.png', position: '4th', percentage: 10 },
  { url: '/images/win-4.png', position: '5th', percentage: 8 },
  { url: '/images/win-4.png', position: '6th', percentage: 7 },
  { url: '/images/win-4.png', position: '7th', percentage: 6 },
  { url: '/images/win-4.png', position: '8th', percentage: 5 },
  { url: '/images/win-4.png', position: '9th', percentage: 4 },
  { url: '/images/win-4.png', position: '10th', percentage: 3 },
];

export const BountiesType = {
  video: {
    name: 'Video',
    url: '/icons/ai-video.png',
    bgcolor: 'bg-videoBg',
    borderColor: 'border-videoBadgeBorder',
  },
  thread: {
    name: 'Thread',
    url: '/icons/threads.png',
    bgcolor: 'bg-threadBadgeBg',
    borderColor: 'border-threadBadgeBorder',
  },
  meme: {
    name: 'Meme',
    url: '/icons/cookie.png',
    bgcolor: 'bg-memeBadgeBg',
    borderColor: 'border-memeBadgeBorder',
  },
  article: {
    name: 'Article',
    url: '/icons/news.png',
    bgcolor: 'bg-articleBadgeBg',
    borderColor: 'border-articleBadgeBorder',
  },
};
