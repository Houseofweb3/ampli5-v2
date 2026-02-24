/**
 * Blog data model: list + detail driven by this array.
 * Add or edit posts here; list and dynamic [slug] page render from this data.
 */

// ----- Block types (content blocks can differ per post) -----

export type BlogContentBlock =
  | { type: "paragraph"; content: string }
  | { type: "paragraphSmall"; content: string }
  | { type: "heading"; content: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "listSimple"; items: string[] }
  | { type: "blockquote"; lines: string[] }
  | { type: "emphasis"; content: string; variant?: "bold" | "primary" }
  | { type: "emphasisLarge"; content: string; variant?: "bold" | "primary" }
  | { type: "lines"; lines: string[] };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** Optional: for list display (e.g. "Feb 20, 2025") */
  date?: string;
  /** Body: ordered array of blocks. Each block type renders differently. */
  content: BlogContentBlock[];
}

// ----- Data: add or edit blog posts here -----

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "uber-of-distribution",
    title: "The Uber of Distribution: How Ampli5 Is Rewriting Growth in the Age of AI Agents",
    excerpt:
      "Execution is no longer scarce. Distribution is. How Ampli5 aggregates attention and becomes the single growth engine for brands in the AI agent economy.",
    date: "Feb 20, 2025",
    content: [
      // Intro
      { type: "paragraph", content: "We are entering a world where AI agents can write your copy, design your creatives, edit your videos, optimize your landing page, and even negotiate your media buys." },
      { type: "emphasis", content: "Execution is no longer scarce.", variant: "bold" },
      { type: "emphasis", content: "Distribution is.", variant: "bold" },
      { type: "paragraph", content: "And that is exactly where Ampli5 comes in." },

      // From Viral Campaigns to Distribution Infrastructure
      { type: "heading", content: "From Viral Campaigns to Distribution Infrastructure" },
      { type: "paragraph", content: "Before building Ampli5, Mohit Ahuja was leading marketing at Cult's cycling vertical, where the now-famous campaign featuring Atul Khatri as a reluctant CEO went viral." },
      { type: "paragraph", content: "The campaign, covered by The Economic Times and afaqs!, did something most brands fail to achieve." },
      { type: "list", items: ["It made fitness culture self-aware.", "It made procrastination funny.", "It made marketing feel human again."] },
      { type: "paragraph", content: "But more importantly, it revealed a deeper truth:" },
      { type: "blockquote", lines: ["Great creative dies without distribution.", "Great distribution can resurrect average creative."] },
      { type: "paragraph", content: "And in today's AI-saturated landscape, everyone is creative." },
      { type: "emphasis", content: "Very few have distribution.", variant: "bold" },

      // The Real Bottleneck in the AI Agent Economy
      { type: "heading", content: "The Real Bottleneck in the AI Agent Economy" },
      { type: "paragraph", content: "AI agents can:" },
      { type: "list", items: ["Generate 100 blog posts in an hour", "Spin up 50 ad creatives in minutes", "Launch email funnels instantly", "Write LinkedIn threads endlessly"] },
      { type: "paragraph", content: "But none of that matters if nobody sees it." },
      { type: "emphasis", content: "The future of growth is not about building more AI tools. It is about building distribution rails.", variant: "bold" },
      { type: "paragraph", content: "Just like Uber did not invent taxis, but aggregated drivers. Just like Airbnb did not build hotels, but aggregated rooms." },
      { type: "emphasis", content: "Ampli5 aggregates attention.", variant: "primary" },

      // What Ampli5 Actually Does
      { type: "heading", content: "What Ampli5 Actually Does" },
      { type: "paragraph", content: "Ampli5 is the world's first true distribution aggregator. It brings together:" },
      { type: "list", items: ["YouTube creators", "X influencers", "TikTok creators", "Newsletter operators", "Reddit power users", "Podcasters", "Clipping networks", "Programmatic ad engines", "AEO, Answer Engine Optimization for LLM visibility"] },
      { type: "paragraph", content: "All under one unified growth engine." },
      { type: "paragraph", content: "Instead of brands negotiating separately with 50 creators, 10 newsletters, 5 podcasters, and 3 ad networks, they plug into a single system." },
      { type: "emphasis", content: "Ampli5 becomes the Uber layer for distribution.", variant: "bold" },
      { type: "lines", lines: ["You do not hire drivers.", "You request a ride.", "You do not chase influencers.", "You request distribution."] },

      // The Single Point Growth Engine
      { type: "heading", content: "The Single Point Growth Engine" },
      { type: "paragraph", content: "Most companies today look like this:" },
      { type: "paragraphSmall", content: "Marketing team → Agency → Influencer manager → Ad buyer → SEO consultant → PR firm → Community manager → Podcast outreach → Clipping team." },
      { type: "paragraph", content: "Each silo has its own cost structure." },
      { type: "listSimple", items: ["Its own reporting.", "Its own incentives.", "Its own delays."] },
      { type: "lines", lines: ["Ampli5 collapses this chaos into one engine.", "One dashboard.", "One strategy.", "One unified objective: reach, recall, revenue."] },
      { type: "emphasis", content: "It is not an agency. It is infrastructure.", variant: "bold" },

      // Why This Matters More Than Ever
      { type: "heading", content: "Why This Matters More Than Ever" },
      { type: "paragraph", content: "AI has lowered the cost of creation to near zero. That means:" },
      { type: "list", items: ["More content", "More ads", "More noise", "More competition"] },
      { type: "paragraph", content: "The companies that win in this era will not be the ones with the best AI prompts. They will be the ones that own distribution." },
      { type: "paragraph", content: "And distribution today is fragmented across platforms. Ampli5 stitches it together." },
      { type: "listSimple", items: ["YouTube for depth.", "Shorts for velocity.", "X for narrative.", "Podcasts for authority.", "Newsletters for retention.", "Reddit for trust.", "Programmatic for scale.", "AEO for the AI-first search future."] },
      { type: "emphasis", content: "One command center.", variant: "bold" },

      // AEO: Owning the LLM Layer
      { type: "heading", content: "AEO: Owning the LLM Layer" },
      { type: "paragraph", content: "Search is shifting from Google links to AI answers." },
      { type: "paragraph", content: "Brands that are not optimized for LLM citations will slowly disappear from discovery." },
      { type: "paragraph", content: "Ampli5 integrates AEO, ensuring brands do not just rank on Google but appear inside AI-generated answers." },
      { type: "emphasis", content: "It is not enough to go viral. You must become referenceable.", variant: "bold" },

      // Built for Founders Who Want Leverage
      { type: "heading", content: "Built for Founders Who Want Leverage" },
      { type: "paragraph", content: "In a world where AI agents execute tasks autonomously, founders need leverage, not more dashboards." },
      { type: "paragraph", content: "Ampli5 gives them exactly that: A single plug-in growth engine that activates multi-channel distribution instantly." },
      { type: "lines", lines: ["You focus on product.", "The network handles amplification."] },

      // The Bigger Vision
      { type: "heading", content: "The Bigger Vision" },
      { type: "paragraph", content: 'Mohit Ahuja calls it the "Uber of Distribution."' },
      { type: "paragraph", content: "Not because it sounds clever." },
      { type: "paragraph", content: "But because it describes exactly what the platform does:" },
      { type: "listSimple", items: ["It aggregates fragmented supply", "Standardizes demand", "And turns chaos into liquidity"] },
      { type: "paragraph", content: "Not liquidity of capital." },
      { type: "emphasis", content: "Liquidity of attention.", variant: "bold" },
      { type: "paragraph", content: "In the AI age, attention is the ultimate currency. And Ampli5 is building the exchange." },

      // The Bottom Line
      { type: "heading", content: "The Bottom Line" },
      { type: "paragraph", content: "AI agents will build. AI agents will write. AI agents will automate." },
      { type: "emphasis", content: "But distribution will remain the moat.", variant: "bold" },
      { type: "paragraph", content: "If you need a growth engine that activates YouTube, X, TikTok, newsletters, podcasts, Reddit, programmatic ads, and AI visibility in one motion, there is now a single entry point." },
      { type: "emphasisLarge", content: "Ampli5.", variant: "primary" },
      { type: "lines", lines: ["One command.", "Full distribution.", "The Uber of attention."] },
    ],
  },
  // Add more posts below, same shape: slug, title, excerpt, date?, content: BlogContentBlock[]
];

// ----- Helpers -----

export function getAllBlogs(): BlogPost[] {
  return BLOG_POSTS;
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getBlogSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}
