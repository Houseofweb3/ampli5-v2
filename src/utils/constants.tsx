

import { CartBigIcon, ContentIcon, PaperCheckIcon, RocketIcon, TeamIcon, TruckIcon } from "@/public/icons"

export const ENDPOINTS = {
  INFLUENCER_CART_ITEM: "/api/v1/influencer-cart-item",
  PACKAGES_CART_ITEM: "/api/v1/package-cart-item",
  FETCH_INFLUENCER: "/api/v1/influencer/fetch",
  FETCH_PACKAGES: "/api/v1/packages",
  CHECKOUT: "/api/v1/checkout",
  REFRESH_TOKEN: "/api/v1/auth/refresh-token",
  APPLY_COUPON: "/api/v1/coupons",
  FETCH_CART: "api/v1/cart/getCart",
  FETCH_OPTIONS: "/api/v1/influencer/filter-options",
};

export const ALLROUTES = {
  DASHBOARD: "/dashboard",
  HOME: "/dashboard/home",
  ONBOARDING: "/onboarding",
  REDIRECT_TO_ONBOARDING: "/redirectSignup?page=onboarding",
  CHECKOUT_TO_COMPLETE: "/dashboard/checkout/complete",
  REDIRECT_TO_CHECKOUT: "/dashboard/redirectSignup?page=dashboard/checkout",
  CHECKOUT: "/dashboard/checkout",
  REDIRECT_TO_HOME: "/dashboard/redirectSignup?page=dashboard/home",
  SIGN_UP: "/dashboard/signup",
};

export const BUTTON_TYPES = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  OUTLINE: "outline",
  TEXT: "text",
};

export const BUTTON_SIZES = {
  LARGE: "lg",
  SMALL: "sm",
};

export const INPUT_VARIANTS = {
  DEFAULT: "default",
  TRANSPARENT: "transparent",
  OUTLINED: "outlined",
};



export const PERKS_CONTANTS = [
  {
    src: "/homepage/sec-1.svg",
    children: (
      <div className="flex flex-col gap-6">
        <h2 className="text-[24px] font-[600] md:text-[32px] md:max-w-[480px]">
          Amplify Your Web3 Project with{" "}
          <span className="text-primary">Authentic UGC</span>
        </h2>
        <p className="text-base md:text-lg md:max-w-[520px]">
          Launch your Web3 project with Ampli5.ai, the first UGC content
          generator for Web3 brands. Generate authentic content, boost organic
          growth, and engage your community with token-based rewards on
          Instagram, TikTok, and X.
        </p>
      </div>
    ),
  },
  {
    src: "/homepage/sec-2.svg",
    children: (
      <div className="flex flex-col gap-6">
        <h2 className="text-[24px] font-[600] md:text-[32px] md:max-w-[480px]">
          Web3’s Evolution Needs Authentic UGC
        </h2>
        <p className="text-base md:text-lg md:max-w-[520px]">
          In a world dominated by Twitter and Discord, visibility for your Web3
          project is everything. In the age of skyrocketing video consumption,
          the key to breaking through the noise is simple: authentic,
          community-driven content.
        </p>
      </div>
    ),
  },
  {
    src: "/homepage/sec-3.svg",
    children: (
      <div className="flex flex-col gap-6">
        <h2 className="text-[24px] font-[600] md:text-[32px] md:max-w-[480px]">
          Why UGC Matters to Your Brand:
        </h2>
        <ul className="text-base md:text-lg list-disc pl-4  md:max-w-[520px]">
          <li>Get unmatched engagement across Instagram, TikTok, and X</li>
          <li>Boost visibility with both Web2 & Web3 native users</li>
          <li>
            Unlock the power of word-of-mouth marketing at the nano and micro
            levels
          </li>
        </ul>
        <p className="text-base md:text-lg  md:max-w-[520px]">
          Ampli5.ai lets your community become your biggest advocates by turning
          them into content creators, generating buzz and driving real
          engagement around your project.
        </p>
      </div>
    ),
  },
];

export const STEP_ITEMS = [
  {
    title: "Create Custom Audio Podcasts",
    description:
      "We’ll craft a high-quality, tailored podcast about your Web3 project. This will become a core piece of content listed in our app's featured section, ensuring you get prime visibility from day one.",
    imageSrc: "/homepage/work-1.svg",
  },
  {
    title: "Build Engagement with Rewards",
    description:
      "We create a custom landing page with a reward pool, incentivizing your community to post user-generated content on platforms like Instagram, TikTok, and X. Each UGC post earns users 10 XP, turning your project into a movement they actively participate in.",
    imageSrc: "/homepage/work-2.svg",
  },
  {
    title: "Non-Botted Engagement Filter",
    description:
      "To ensure authentic engagement, users must first complete our podcast lesson and answer specific questions before they can submit UGC. This filters out bots and ensures only real, engaged users qualify for rewards.",
    imageSrc: "/homepage/work-3.svg",
  },
  {
    title: "Reward Users with Native Tokens",
    description:
      "For every 50 XP earned, users receive $10 worth of your project’s native tokens, building real value within your community. No more unnecessary spending on influencer hype – just direct, genuine engagement.",
    imageSrc: "/homepage/work-4.svg",
  },
  {
    title: "Distribute Content & Reach New Audiences",
    description:
      "Your UGC is distributed across social platforms, organically reaching both Web2 and Web3 users. Every piece of content extends your project's reach, bringing in new eyes and potential buyers.",
    imageSrc: "/homepage/work-5.svg",
  },
];

export const FAQs = [
  {
    heading:
      "Q. How does Ampli5.ai ensure the quality of user-generated content?",
    content: (
      <>
        <span className="">
          {" "}
          A: We implement a multi-step quality control process:
        </span>
        <ol className="list-decimal">
          <li className="">
            1. Users must engage with your podcast and answer questions before
            creating content, ensuring they understand your project.
          </li>
          <li className="">
            2. Our AI-powered content moderation system filters out
            inappropriate or off-brand content.
          </li>
          <li className="">
            3. For Spam content created, we will disregard all entries.{" "}
          </li>
        </ol>
      </>
    ),
  },
  {
    heading:
      "Q: Can we customise the reward structure for our specific token economics?",
    content:
      "A: Absolutely! We work closely with each project to design a reward structure that aligns with your token economics and community engagement goals. We can adjust XP values token reward amounts, and even create unique challenges or tiers for your most engaged users.",
  },
  {
    heading:
      "Q: How does Ampli5.ai help bridge the gap between our Web3 project and Web2 audiences?",
    content: (
      <>
        <p className=""> A: We employ several strategies:</p>
        <ol className="list-decimal">
          <li className="">
            1. Content is created on familiar Web2 platforms (Instagram, TikTok,
            X) for easy consumption.
          </li>
          <li className="">
            2. Our educational content simplifies Web3 concepts for newcomers.
          </li>
          <li className="">
            3. The reward system introduces Web2 users to tokens in a low-risk,
            engaging way.
          </li>
          <li className="">
            4. We provide templates and guidelines to help creators explain Web3
            concepts effectively.
          </li>
        </ol>
      </>
    ),
  },
  {
    heading:
      "Q: Can Ampli5.ai integrate with our existing community management tools?",
    content:
      "A: Yes! We offer API integrations with popular community management platforms, Discord bots, and analytics tools. This ensures Ampli5.ai fits seamlessly into your existing workflow and data ecosystem.",
  },
  {
    heading:
      "Q: How do you prevent bots or fake accounts from gaming the reward system?",
    content: (
      <>
        <span className="">A: Our anti-bot measures include:</span>
        <ol className="list-decimal">
          <li className="">1. Mandatory podcast engagement and quizzes</li>
          <li className="">
            2. AI-powered behaviour analysis to detect suspicious activity
          </li>
          <li className="">
            3. Gradual reward unlocking to discourage short-term exploitation
          </li>
          <li className="">
            4. Manual review for high-value rewards or suspicious accounts
          </li>
        </ol>
      </>
    ),
  },
  {
    heading:
      "Q. What support does Ampli5.ai provide for onboarding our team and community?",
    content: (
      <>
        <span className="">
          A: We offer a comprehensive onboarding package:
        </span>
        <ol className="list-decimal">
          <li className="">1. Dedicated account manager for your project</li>
          <li className="">
            2. Training sessions for your community management team
          </li>
          <li className="">
            3. 24/7 support for technical issues or strategic questions
          </li>
        </ol>
      </>
    ),
  },
  {
    heading: "Q. How does Ampli5.ai handle content rights and ownership?",
    content:
      "A: All UGC created through our platform is owned by the creators and only meant for educational and awareness purposes. If you wish to buy any content's rights, you must do so through the Ampli5 team. Any illicit activity in this regard will blacklist your project and its community managers also on our platform forever.",
  },
  {
    heading: "Q: How quickly can we get started?",
    content:
      "A: Once you pay, we can start in 7 days! We’ll work with your team to produce the custom podcast, set up the reward pool, and launch your UGC campaign within a week.",
  },
];


export const PRICE_TOOLTIP_CONTENT = [
  "$$$$ = Over $3000",
  "$$$ = $2000 - $3000",
  "$$ = $1000 - $2000",
  "$ = Under $1000",
];
export const MANAGEMENT_FEE_TOOLTIP_CONTENT = [
  "Under 25K, Management Fee 20%",
  "Under 50K, Management Fee 15%",
];

export const HEADINGS = [
  // "Number",
  "Influencers",
  "Platform",
  "ContentType",
  "Niche",
  "ER",
  "Credibility Score",
  "Price",
  "Actions",
];
export const HEADINGS_WIDTH_MAPPING = [
  // {
  //   id: "Number",
  //   width: "5%",
  // },
  {
    id: "Influencers",
    width: "16%",
  },
  {
    id: "Platform",
    width: "12%",
  },
  {
    id: "ContentType",
    width: "12%",
  },
  {
    id: "Niche",
    width: "12%",
  },
  {
    id: "ER",
    width: "12%",
  },
  {
    id: "Credibility Score",
    width: "12%",
  },
  {
    id: "Price",
    width: "12%",
  },
  {
    id: "Actions",
    width: "12%",
  },
];

export const getColumnWidth = (id: string): string | undefined => {
  const matching = HEADINGS_WIDTH_MAPPING.find((item) => {
    return item.id === id;
  });
  if (matching) return matching?.width;
  else return "100%";
};


export const PLATFORM_MAP: { [key: string]: string } = {
  x: "/socials/twitter.svg",
  youtube: "/socials/youtube.svg",
  podcast: "/socials/mic.svg",
  telegram: "/socials/telegram.svg",
  "ama/spaces": "/socials/message.svg",
};

export const NAVBAR_CONSTANTS = {
  GET_STARTED: "Get Started",
  FREE_AI_TOOL_DEMO: "FREE AI-TOOL DEMO",
  LAUNCH_APP: "Launch App",
};

export const DISCOUNT_MESSAGE = {
  ALREADY_APPLIED: "You have already used this coupon code",
};


export const TRUST_BY = [
  "/landing/gemini.svg",
  "/landing/cakeDefy.svg",
  "/landing/defy.svg",
  "/landing/gemini.svg",
  "/landing/utherverse.svg",
  "/landing/bybit.svg",
];

export const DEMO_POINTS = [
  "Unlock the time-saving power of Ampli5's suite, fuelled by AI,",
  "Discover how we help you find the perfect influencers to kickstart your campaigns,",
  "Get answers to your most pressing questions!",
];

export const STEPS = [
  {
    number: 1,
    icon: <CartBigIcon />,
    title: "Place Order",
    description: "Pick the content type that your brand needs",
  },
  {
    number: 2,
    icon: <PaperCheckIcon />,
    title: "Complete Brief",
    description: "Fill out our creative brief to learn more about your project",
  },
  {
    number: 3,
    icon: <TruckIcon />,
    title: "Ship Product",
    description:
      "A dedicated account manager will get in touch to confirm shipping details",
  },
  {
    number: 4,
    icon: <ContentIcon />,
    title: "Get Content",
    description:
      "Get all the content you need delivered to your inbox in 10-12 business days",
  },
];

export const CHARACTERISTICS = [
  {
    src: "/landing/card-1.svg",
    title: "Overcome Influencer Marketing Challenges",
    description:
      "Stop wasting budget on fake followers, reach the right audience, and build long-term success instead of short-term spikes.",
  },
  {
    src: "/landing/card-2.svg",
    title: "Quick, Data-Driven Campaigns with Guaranteed Results",
    description:
      "Get a custom influencer list in 5 minutes, backed by data, and launch your campaign in 72 hours—or your money back.",
  },
];
export const FILTER_APPROACH_POINTS = [
  {
    src: "/landing/fa-1.svg",
    title: "Product-Influencer Fit",
    description: "Checking for a personality match.",
  },
  {
    src: "/landing/fa-2.svg",
    title: "Product-Market Fit",
    description: "Analysing follower demography & resonance.",
  },
  {
    src: "/landing/fa-3.svg",
    title: "Sentiment Analysis Fit",
    description: "Evaluating past collaboration perceptions.",
  },
];

export const DELIVER_RESULT_POINTS = [
  {
    src: "/landing/dr-1.svg",
    title: "Curated Influencer & PR Lists",
    subTitle: "Discover influencer",
    description:
      "Discover the best influencers and PR agencies for Crypto & Web3.",
  },
  {
    src: "/landing/dr-2.svg",
    title: "Data-Driven Analytics",
    subTitle: "Analytics influencer",
    description: "Analyze performance metrics to make informed decisions.",
  },
  {
    src: "/landing/dr-3.svg",
    title: "Seamless Campaign Execution",
    subTitle: "Discover influencer",
    description:
      "Launch and manage your campaigns effortlessly from start to finish.",
  },
];

export const PUBLICATIONS_LIST = [
  "/landing/reuters.svg",
  "/landing/ft.svg",
  "/landing/coinTele.svg",
  "/landing/forbes.svg",
  "/landing/coindesk.svg",
  "/landing/ap.svg",
  "/landing/newsBTC.svg",
  "/landing/yahoo.svg",
  "/landing/bloomberg.svg",
  "/landing/entre.svg",
  "/landing/block.svg",
];
export const WHAT_NEXT = [
  {
    title: "Reserve Yourt KOLs",
    description: "Fill out all the necessary details and reserve your KOL’s",
    src: <CartBigIcon />,
  },
  {
    title: "Our team will get in touch ",
    description:
      "A dedicated account manager will get in touch to confirm shipping details",
    src: <TeamIcon />,
  },
  {
    title: "We launch your Campaign",
    description:
      "Get all the content you need delivered to your inbox in 10-12 business days",
    src: <RocketIcon   />,
  },
];

export const TESTIMONIALS = [
  {
    content:
      "This team has been a standout in the Web3 space, surpassing past agencies with their skill and professionalism. We’re excited to see the impact they’ll make.",
    author: "Mark",
    channel: "@Dollarcurrency1",
  },
  {
    content:
      " I’m incredibly proud to see everyone’s effort come together, especially the unsung heroes who make it all happen. Kudos to all!",
    author: "Bhoomi Kamlesh Panchal",
    channel: "",
  },
  {
    content:
      "I’ve absolutely loved working with the team at HOW3 and can’t wait to continue our journey together through 2023!",
    author: "Shrey Meti",
    channel: "@Dollarcurrency1",
  },
  {
    content: "The Grandma campaign looks fantastic and has been a huge help!",
    author: "Lucutz",
    channel: "@Dollarcurrency1",
  },
];
