/**
 * Single source of truth for filter/onboarding options.
 * Used by: dashboard (FilterSection, Filters) and creator-onboarding.
 */

export const PLATFORM_OPTIONS = [
  "X",
  "Youtube",
  "Instagram",
  "TikTok",
  "Newsletter",
  "Spotify",
  "PR/Editorial",
] as const;

/** Short label + icon for audience-proof platform headers (e.g. IG, YT). */
export const PLATFORM_DISPLAY: Record<
  string,
  { shortLabel: string; iconSrc: string }
> = {
  X: { shortLabel: "X", iconSrc: "/socials/twitter.svg" },
  Youtube: { shortLabel: "YT", iconSrc: "/socials/youtube.svg" },
  Instagram: { shortLabel: "IG", iconSrc: "/socials/Instagram.svg" },
  TikTok: { shortLabel: "TT", iconSrc: "/socials/TikTok.svg" },
  Newsletter: { shortLabel: "NL", iconSrc: "/socials/news.svg" },
  Spotify: { shortLabel: "SP", iconSrc: "/socials/Spotify.svg" },
  "PR/Editorial": { shortLabel: "PR", iconSrc: "/socials/news.svg" },
};

export function getPlatformDisplay(platform: string) {
  return (
    PLATFORM_DISPLAY[platform] ?? {
      shortLabel: platform,
      iconSrc: "",
    }
  );
}

export const INDUSTRY_OPTIONS = [
  "Crypto",
  "AI",
  "Trading & Fintech",
  "Startups",
  "Robotics & Hardware",
  "Health & Fitness",
  "Travel",
] as const;

/** “I am a” options on creator onboarding (single selection). Sent as `type` in API payload. */
export const CREATOR_TYPE_OPTIONS = [
  "Influencer",
  "Content creator",
  "Videographer",
  "Photographer",
  "Blogger",
  "Vlogger",
  "Reel specialist",
  "Event Host",
  "Event organizer",
  "Script writer",
  "Voice artist",
  "Actor",
  "Artist",
] as const;

/** Per-platform collaboration proof: post link + screenshot for each slot (step 9). */
export type CollaborationProofImageField = "image1" | "image2";
export type CollaborationProofLinkField = "postLink1" | "postLink2";

export type PlatformCollaborationProof = {
  image1: string;
  image2: string;
  postLink1: string;
  postLink2: string;
  image1PublicId?: string;
  image2PublicId?: string;
};

export const EMPTY_PLATFORM_COLLABORATION_PROOF: PlatformCollaborationProof = {
  image1: "",
  image2: "",
  postLink1: "",
  postLink2: "",
  image1PublicId: "",
  image2PublicId: "",
};

/** UI labels and field keys for each collaboration proof slot. */

export type AudienceProofScreenshotField =
  | "ageScreenshot"
  | "genderScreenshot"
  | "topCountriesScreenshot";

export type AudienceProofExampleSlide = { src: string; caption: string };

const YT_AUDIENCE_PROOF_EXAMPLES: AudienceProofExampleSlide[] = [
  {
    src: "/cob/YT-Channel-analytics-example.jpg",
    caption: "YT — Age screenshot example",
  },
  {
    src: "/cob/YT-Age-Gender%26Demographics.jpg",
    caption: "YT — Gender screenshot example",
  },
  {
    src: "/cob/YT-video-insights-example.jpg",
    caption: "YT — Top countries screenshot example",
  },
];

const IG_AUDIENCE_PROOF_EXAMPLES: AudienceProofExampleSlide[] = [
  {
    src: "/cob/IG-Age-Example.jpeg",
    caption: "IG — Age screenshot example",
  },
  {
    src: "/cob/IG-Gender-example.jpeg",
    caption: "IG — Gender screenshot example",
  },
  {
    src: "/cob/IG-Location-example-Top-countries.jpeg",
    caption: "IG — Top countries screenshot example",
  },
];

/** Header “Ex.” gallery — Instagram & Youtube only. */
export function getAudienceProofHeaderExamples(
  platform: string
): AudienceProofExampleSlide[] | null {
  if (platform === "Instagram") return IG_AUDIENCE_PROOF_EXAMPLES;
  if (platform === "Youtube") return YT_AUDIENCE_PROOF_EXAMPLES;
  return null;
}

export const COLLABORATION_PROOF_SLOTS = [
  {
    imageField: "image1" as const,
    linkField: "postLink1" as const,
    sectionTitle: "Screenshot 1",
    linkLabel: "Copy-paste Collaboration post link 1",
    uploadLabel: "Upload Screenshot 1",
  },
  {
    imageField: "image2" as const,
    linkField: "postLink2" as const,
    sectionTitle: "Screenshot 2",
    linkLabel: "Copy-paste Collaboration post link 2",
    uploadLabel: "Upload Screenshot 2",
  },
] as const;

export const GEOGRAPHY_OPTIONS = [
  "North America (US, Canada)",
  "Europe (All Zones)",
  "SAARC (includes India & Pakistan)",
  "South East Asia",
  "LATAM (Central America & South America)",
  "MENA (Middle East & North Africa)",
] as const;

export const INDUSTRY_CATEGORY_OPTIONS: Record<string, string[]> = {
  Crypto: [
    "Crypto DeFi",
    "Crypto Infrastructure",
    "Crypto Trading & Prediction Market",
    "Crypto Memecoin",
    "Crypto Podcaster",
    "Crypto Clippers",
    "Crypto X Gamefi",
    "Generic Altcoiners",
    "Crypto X AI",
  ],
  AI: [
    "AI product Tools Review",
    "AI education",
    "AI news & releases",
    "AI Podcasts",
    "AI clippers",
  ],
  Startups: [
    "Startup News & Media",
    "Startup Product Reviews",
    "Startup Business Explainer",
    "Startup Growth & Marketing",
    "Startup Podcast",
    "Startup Clippers",
  ],
  "Trading & Fintech": [
    "Fintech Traders",
    "Fintech news & trends",
    "Fintech product reviews",
    "Fintech Podcasters",
    "Fintech clippers",
    "Metals/Forex/Indices Trading",
  ],
  "Robotics & Hardware": [
    "R&H Tech & Gadget creators",
    "R&H lifestyle creators",
    "R&H product reviews",
    "R&H innovation & future tech",
    "R&H podcasters",
    "R&H clippers",
  ],
  "Health & Fitness": [
    "Motivation - Clippers",
    "Health & Fitness - Physical Fitness",
    "Health & Fitness - Diet & Nutrition",
    "Health & Fitness - Biohacking",
    "Health & Fitness - Mental Health",
    "Health & Fitness - Podcasters",
    "Health & Fitness - Clippers",
  ],
  Travel: [
    "Couple travel",
    "Solo Travel",
    "City Guides & Hidden Gems",
    "Hotel & Resort Reviews",
    "Luxury Travel & Experiences",
    "Travel Vlogger",
    "Travel Podcast",
  ],
};

/** Shown only when Instagram is selected; user picks one (not sent in API payload). */
export type InstagramInventoryMode = "influencer" | "clipping";

/** Instagram inventory when "For Influencers" is selected. */
export const INSTAGRAM_INVENTORY_INFLUENCER: string[] = [
  "IG Reel – Original (Creator produces content)",
  "IG Reel – Repost (Brand provides content)",
  "Carousel (3–5 slides)",
  "Story sequence (3 slides)",
  "Reel / TikTok pinned (7 days)",
  "Collab Tag",
];

/** Instagram inventory when "For Clipping Channels" is selected. */
export const INSTAGRAM_INVENTORY_CLIPPING: string[] = [
  "IG Reel – Original (Creator produces content) ( 24 hours )",
  "IG Reel – Adapted (Brand provides content) ( 24 hours )",
  "IG Reel – Repost (Brand provides content) ( 24 hours )",
  "IG Reel – Original (Creator produces content) ( 7 days )",
  "IG Reel – Adapted (Brand provides content) ( 7 days )",
  "IG Reel – Repost (Brand provides content) ( 7 days )",
  "Carousel (3–5 slides)",
  "Story sequence (3 slides)",
  "Link in bio placement (7 days)",
  "Reel / TikTok pinned (7 days)",
  "Collab Tag",
];

/** All possible Instagram row keys (for reset / clearing hidden selections). */
export const ALL_INSTAGRAM_INVENTORY_KEYS: string[] = Array.from(
  new Set([...INSTAGRAM_INVENTORY_INFLUENCER, ...INSTAGRAM_INVENTORY_CLIPPING])
);

export const PLATFORM_INVENTORY_OPTIONS: Record<string, string[]> = {
  X: [
    "Single tweet",
    "Thread (5–7 tweets)",
    "Quote tweet",
    "Pinned tweet (7 days)",
    "AMA (X Spaces – 60 mins)",
    "Article",
  ],
  Youtube: [
    "Integrated video (≤3 mins)",
    "Sponsored-by tag",
    "Dedicated review / breakdown video",
    "Streams/Live trading video",
    "Shorts",
    "Collab Tag",
  ],
  Instagram: ALL_INSTAGRAM_INVENTORY_KEYS,
  TikTok: [
    "Tik Tok Original(with collab tag)",
    "Tik Tok Adapted(with collab tag)",
    "Tik Tok Live",
    "Tik Tok Story(3 carousel stories)",
  ],
  Newsletter: [
    "Sponsored-by mention (top)",
    "Sponsored-by mention (footer)",
    "Contextual integration within main content",
  ],
  "PR/Editorial": ["Organic PR with backlink", "Thematic article (brand included in narrative)"],
  Spotify: [
    "Dedicated podcast episode",
    "Podcast sponsored mention",
    "Short clips distribution (IG / Shorts / TikTok)",
    "Short virtual podcast (IG / Shorts / TikTok)",
  ],
};

export function getInventoryOptionsForPlatform(
  platform: string,
  instagramMode: InstagramInventoryMode | null
): string[] {
  if (platform === "Instagram") {
    if (instagramMode === "influencer") return [...INSTAGRAM_INVENTORY_INFLUENCER];
    if (instagramMode === "clipping") return [...INSTAGRAM_INVENTORY_CLIPPING];
    return [];
  }
  return PLATFORM_INVENTORY_OPTIONS[platform] ?? [];
}
