import Thumbnail from "../components/Thumbnail";
import {
  CabbageCatsIcon,
  MultipliCatsIcon,
  RouterLogo,
  SonicIcon,
  StoopidCatsIcon,
} from "./icon";

interface AuthProfileItem {
  id: string | null;
  label: string;
  type?: string;
}

interface BountyTypeItem {
  id: string;
  label: string;
  img: string;
}

interface FilterOption {
  label: string;
  value: string;
}

interface SortOption {
  label: string;
  value: string;
}

interface SortByOptionType {
  Bounties: SortOption[];
  Submissions: SortOption[];
}

interface ProjectLink {
  title: string;
  href: string;
}

interface SliderItem {
  name: string;
  url: string;
  link: string;
}

interface YoutubeItem {
  link: string;
  url: string;
}

interface EffectItem {
  url: string;
  link?: string;
}

interface PrizeDistribution {
  url: string;
  position: string;
  percentage: number;
}

interface BountyTypeInfo {
  name: string;
  url: string;
  bgcolor: string;
  borderColor: string;
}

interface TopAttentionItem {
  img: string;
  title: string;
}

interface NewsItem {
  image: string;
  icon: string;
  iconInvert: boolean;
  title: string;
  platform: string;
  href: string;
  tags: string;
}

interface BrandSliderItem {
  src: string;
  width: number;
  height: number;
  alt: string;
  link: string;
  invert?: boolean;
  hasFlexLayout?: boolean;
}

export const AuthProfile: AuthProfileItem[] = [
  { id: "/profile", label: "My Profile" },
  { id: "/bounty-hunt/my/submission", label: "My Submissions" },
  { id: null, label: "Logout", type: "Logout" },
];

export const BountyType: BountyTypeItem[] = [
  { id: "video", label: "Video", img: "/icons/ai-video.png" },
  { id: "thread", label: "Thread", img: "/icons/threads.png" },
  { id: "article", label: "Article", img: "/icons/news.png" },
  { id: "meme", label: "Meme", img: "/icons/cookie.png" },
  { id: "tweet", label: "Tweet", img: "/icons/x.png" },
  { id: "quests", label: "Quests", img: "/icons/news.png" },
];

export const BountiesStatusFilter: FilterOption[] = [
  { label: "All", value: "all" },
  { label: "Open", value: "open" },
  { label: "Closed", value: "closed" },
];

export const SortByOption: SortByOptionType = {
  Bounties: [
    { label: "Latest", value: "Latest" },
    { label: "Rewards", value: "prize" },
  ],
  Submissions: [
    { label: "Expiry Date", value: "ExpiredDate" },
    { label: "Launch Date", value: "LaunchDate" },
    { label: "Bounty Value", value: "BountyValue" },
  ],
};

export const forProjectLinks: ProjectLink[] = [
  { title: "Create Bounty", href: "/cast" },
  { title: "KOL-Discovery", href: "/dashboard" },
  { title: "Ambassador Program", href: "/ambassadors" },
  { title: "Founder-led Marketing", href: "/founder-signal" },
];

export const XSliderData: SliderItem[] = [
  {
    name: "Cyrill",
    url: "https://i.ibb.co/n0rvxF1/Sm-Sdt0s-O-400x400.jpg",
    link: "https://x.com/cyrilXBT/status/1892596081076113557",
  },
  {
    name: "Wals_Eth",
    url: "https://i.ibb.co/4MZfh40/Xsu5-AJk-400x400.jpg",
    link: "https://x.com/wals_eth/status/1896572199818998252",
  },
  {
    name: "Defi Warhol",
    url: "https://i.ibb.co/f9mcwjw/g-UPtadna-400x400.jpg",
    link: "https://x.com/Defi_Warhol/status/1891568055635026260",
  },
  {
    name: "Axel Bitblaze",
    url: "https://i.ibb.co/bJVQ0kC/p-YItl-Wat-400x400.jpg",
    link: "https://x.com/axel_bitblaze69/status/1893257987122221208",
  },
  {
    name: "Dapp Center",
    url: "https://i.ibb.co/dPjPHm2/oea-Z2-H0-X-400x400.jpg",
    link: "https://x.com/degenlifer/status/1891829854905172146",
  },
  {
    name: "Crypto Gems",
    url: "https://i.ibb.co/GtndzPN/c-L1-O2-Sl-B-400x400.jpg",
    link: "https://x.com/cryptogems555/status/1876348413698306428",
  },
  {
    name: "NFT perks",
    url: "https://i.ibb.co/CHyNLwf/GBWz-Jp-400x400.jpg",
    link: "https://x.com/nftperks/status/1876982612927087033",
  },
  {
    name: "Thanos",
    url: "https://i.ibb.co/DrMVgXD/5-Nm-H7h-GI-400x400.jpg",
    link: "https://x.com/CryptoThannos/status/1876687051434942676",
  },
  {
    name: "Dami-Defi",
    url: "https://i.ibb.co/L9nNKK2/Yd-Qv-XW46-400x400.jpg",
    link: "https://x.com/DamiDefi/status/1877029634988269820",
  },
];

export const YoutubeSliderData: YoutubeItem[] = [
  {
    link: "https://www.youtube.com/watch?v=tPYW09HMkeI",
    url: "https://img.youtube.com/vi/tPYW09HMkeI/hqdefault.jpg",
  },
  {
    link: "https://youtu.be/inpz64ZoG-0?si=IgxfJ5LvcVHv4liO",
    url: "https://img.youtube.com/vi/inpz64ZoG-0/hqdefault.jpg",
  },
  {
    link: "https://www.youtube.com/watch?v=mm1RwwpdFoY",
    url: "https://img.youtube.com/vi/mm1RwwpdFoY/hqdefault.jpg",
  },
  {
    link: "https://youtu.be/OuwQuaCafSk?si=POS609m-UOCVTSFa",
    url: "https://img.youtube.com/vi/OuwQuaCafSk/maxresdefault.jpg",
  },
];
export const EffectData: EffectItem[] = [
  {
    url: "/effect/image.png",
  },
  {
    url: "/effect/image1.png",
  },
  {
    url: "/effect/image3.png",
  },
];

export const BountiesPollPrizeDistribution: PrizeDistribution[] = [
  { url: "/images/win/1.png", position: "1st", percentage: 25 },
  { url: "/images/win/2.png", position: "2nd", percentage: 18 },
  { url: "/images/win/3.png", position: "3rd", percentage: 14 },
  { url: "/images/win/4.png", position: "4th", percentage: 10 },
  { url: "/images/win/5.png", position: "5th", percentage: 8 },
  { url: "/images/win/6.png", position: "6th", percentage: 7 },
  { url: "/images/win/7.png", position: "7th", percentage: 6 },
  { url: "/images/win/8.png", position: "8th", percentage: 5 },
  { url: "/images/win/9.png", position: "9th", percentage: 4 },
  { url: "/images/win/10.png", position: "10th", percentage: 3 },
];

export const BountiesType: Record<string, BountyTypeInfo> = {
  video: {
    name: "Video",
    url: "/icons/ai-video.png",
    bgcolor: "bg-videoBg",
    borderColor: "border-videoBadgeBorder",
  },
  thread: {
    name: "Thread",
    url: "/icons/threads.png",
    bgcolor: "bg-threadBadgeBg",
    borderColor: "border-threadBadgeBorder",
  },
  meme: {
    name: "Meme",
    url: "/icons/cookie.png",
    bgcolor: "bg-memeBadgeBg",
    borderColor: "border-memeBadgeBorder",
  },
  article: {
    name: "Article",
    url: "/icons/news.png",
    bgcolor: "bg-articleBadgeBg",
    borderColor: "border-articleBadgeBorder",
  },
  tweet: {
    name: "Tweet",
    url: "/icons/x.png",
    bgcolor: "bg-threadBadgeBg",
    borderColor: "border-threadBadgeBorder",
  },
  quests: {
    name: "Quests",
    url: "/icons/news.png",
    bgcolor: "bg-articleBadgeBg",
    borderColor: "border-articleBadgeBorder",
  },
};

export const TopAttention: TopAttentionItem[] = [
  {
    img: "/images/p1.png",
    title: "@ModestusOkoye",
  },
  {
    img: "/images/p2.png",
    title: "@ModestusOkoye",
  },
  {
    img: "/images/p3.png",
    title: "@ModestusOkoye",
  },
  {
    img: "/images/p4.png",
    title: "@ModestusOkoye",
  },
  {
    img: "/images/p5.png",
    title: "@ModestusOkoye",
  },
  {
    img: "/images/p6.png",
    title: "@ModestusOkoye",
  },
];

export const nftNewsData: NewsItem[] = [
  {
    image: "/images/Nft-slide01.png",
    icon: "/icons/u-tube.png",
    iconInvert: false,
    title: "Fintech Channel",
    platform: "YouTube",
    href: "https://www.youtube.com/@FinTechChannels/featured",
    tags: "AI, Defi",
  },
  {
    image: "/images/Nft-slide1.png",
    icon: "/icons/u-tube.png",
    iconInvert: false,
    title: "Professor Crypto",
    platform: "YouTube",
    href: "https://www.youtube.com/@ProfessorCrypto/videos",
    tags: "CEX/DEX, trading & Altcoins",
  },
  {
    image: "/images/Nft-slide2.png",
    icon: "/icons/icon-x.png",
    iconInvert: true,
    title: "Decypher Podcast",
    platform: "X",
    href: "https://x.com/JackNiewold",
    tags: "Defi, altcoins",
  },
  {
    image: "/images/Nft-slide4.png",
    icon: "/icons/u-tube.png",
    iconInvert: false,
    title: "Maria Andersen Crypto",
    platform: "YouTube",
    href: "https://www.youtube.com/@MariaAndersenCrypto",
    tags: "ALtcoins, Defi",
  },
  {
    image: "/images/Nft-slide5.png",
    icon: "/icons/icon-x.png",
    iconInvert: true,
    title: "Wolf Financial",
    platform: "X",
    href: "https://x.com/WOLF_Financial",
    tags: "Trading, Altcoins",
  },
  {
    image: "/images/Nft-slide6.png",
    icon: "/icons/u-tube.png",
    iconInvert: false,
    title: "Defi Talks",
    platform: "YouTube",
    href: "https://www.youtube.com/@DeFiTalks/videos",
    tags: "Defi, AI",
  },
  {
    image: "/images/Nft-slide7.png",
    icon: "/icons/spotify.png",
    iconInvert: false,
    title: "BlockHash",
    platform: "Spotify",
    href: "https://open.spotify.com/show/4AGqU8qxIYVkxXM4q2XpO1?si=b3024d5462354a9a&nd=1&dlsi=4e8575ccb2974380",
    tags: "Defi, altcoins",
  },
];

export const CASE_STUDY_DATA = [
  {
    thumbnail: (
      <Thumbnail
        brandLogo={<RouterLogo />}
        heading="Post-TGE sustenance campaign"
        date="December, 2024"
      />
    ),
    s3_url:
      "https://ampli5.s3.us-east-1.amazonaws.com/case_studies/Ampli5+X+Router.pdf",
  },
  {
    thumbnail: (
      <Thumbnail
        date="January, 2025"
        brandLogo={<SonicIcon />}
        heading="A CEX listing campaign"
      />
    ),
    s3_url:
      "https://ampli5.s3.us-east-1.amazonaws.com/case_studies/Ampli5+x+Sonic.pdf",
  },
  {
    thumbnail: (
      <Thumbnail
        date="March, 2024"
        brandLogo={<StoopidCatsIcon />}
        heading="A pre sale case study for P2E"
      />
    ),
    s3_url:
      "https://ampli5.s3.us-east-1.amazonaws.com/case_studies/Ampli5+x+Stoopid+Cats.pdf",
  },
  {
    thumbnail: (
      <Thumbnail
        date="December, 2024"
        brandLogo={<MultipliCatsIcon />}
        heading="High-Yield Defi Campaign"
      />
    ),
    s3_url:
      "https://ampli5.s3.us-east-1.amazonaws.com/case_studies/Ampli5+x+Multipli+Case+study.pdf",
  },
  {
    thumbnail: (
      <Thumbnail
        date="July, 2025"
        brandLogo={<CabbageCatsIcon />}
        heading="Memecoin Campaign"
      />
    ),
    s3_url:
      "https://ampli5.s3.us-east-1.amazonaws.com/case_studies/Ampli5+x+Cabbage.pdf",
  },
];
export const NEW_CASE_STUDY_DATA = [
  {
    brandLogo: <RouterLogo />,
    roi:'50x',
    mindshare:'Top 20',
    engagements:"13,000+",
    s3_url:
      "https://ampli5.s3.us-east-1.amazonaws.com/case_studies/Ampli5+X+Router.pdf",
  },
  {
    brandLogo: <SonicIcon />,
    roi:'30x',
    mindshare:'Top 10',
    engagements:"10,000+",
    s3_url:
      "https://ampli5.s3.us-east-1.amazonaws.com/case_studies/Ampli5+x+Sonic.pdf",
  },
  {
    brandLogo: <StoopidCatsIcon />,
    roi:'20x',
    mindshare:'Top 5',
    engagements:"8,000+",
    s3_url:
      "https://ampli5.s3.us-east-1.amazonaws.com/case_studies/Ampli5+x+Stoopid+Cats.pdf",
  },
  {
    brandLogo: <MultipliCatsIcon />,
    roi:'15x',
    mindshare:'Top 3',
    engagements:"6,000+",
    s3_url:
      "https://ampli5.s3.us-east-1.amazonaws.com/case_studies/Ampli5+x+Multipli+Case+study.pdf",
  },
  {
    brandLogo: <CabbageCatsIcon />,
    roi:'10x',
    mindshare:'Top 1',
    engagements:"4,000+",
    s3_url:
      "https://ampli5.s3.us-east-1.amazonaws.com/case_studies/Ampli5+x+Cabbage.pdf",
  },
];

export const DEMO_POINTS = [
  "Unlock the time-saving power of Ampli5's suite, fuelled by AI,",
  "Discover how we help you find the perfect influencers to kickstart your campaigns,",
  "Get answers to your most pressing questions!",
];

export const BrandSliderData: BrandSliderItem[] = [
  {
    src: "/images/brand/img1.png",
    width: 162,
    height: 55,
    alt: "image",
    link: "https://www.google.com",
  },
  {
    src: "/images/brand/img2.png",
    width: 121,
    height: 55,
    alt: "image",
    link: "https://www.google.com",
  },
  {
    src: "/images/brand/img3.png",
    width: 212,
    height: 55,
    alt: "image",
    link: "https://www.google.com",
  },
  {
    src: "/images/brand/img3.png",
    width: 212,
    height: 55,
    alt: "image",
    link: "https://www.google.com",
  },
];
