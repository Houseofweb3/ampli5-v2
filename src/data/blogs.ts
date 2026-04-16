/**
 * Blog data model: list + detail driven by this array.
 * Add or edit posts here; list and dynamic [slug] page render from this data.
 */

// ----- Block types (content blocks can differ per post) -----

/** Inline piece inside a `richParagraph`: plain text or a link (internal `/path` or external URL). */
export type BlogRichSegment =
  | { kind: "text"; text: string }
  | { kind: "link"; text: string; href: string; external?: boolean };

/** List row: plain string, or rich segments (e.g. one `link` for the whole line). */
export type BlogListItem = string | { segments: BlogRichSegment[] };

export type BlogContentBlock =
  | { type: "paragraph"; content: string }
  /** Paragraph with inline links. Mix `text` and `link` segments in order. Internal: href="/"; external: href="https://..." and external: true */
  | { type: "richParagraph"; segments: BlogRichSegment[] }
  | { type: "paragraphSmall"; content: string }
  | { type: "heading"; content: string; href?: string }
  | { type: "list"; items: BlogListItem[]; ordered?: boolean }
  | { type: "listSimple"; items: string[] }
  | { type: "blockquote"; lines: string[] }
  | { type: "emphasis"; content: string; variant?: "bold" | "primary" }
  | { type: "emphasisLarge"; content: string; variant?: "bold" | "primary"; href?: string }
  | { type: "lines"; lines: string[] }
  | { type: "image"; src: string; alt: string }
  /** CMS / preview: sanitized HTML rendered with blog-adjacent typography */
  | { type: "htmlBody"; html: string };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** Optional: byline when set (e.g. from CMS) */
  author?: string;
  /** Optional: for list display (e.g. "Feb 20, 2025") */
  date?: string;
  /** Optional: hero image shown at the start of the post. Set src (e.g. "/blog/1.jpg") and alt. */
  heroImage?: { src: string; alt: string };
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
    heroImage: {
      src: "/blog/1.jpg",
      alt: "uber-of-distribution",
    },
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
      {
        type: "list",
        items: [
          {
            segments: [
              { kind: "link", text: "YouTube creators", href: "/services/influencer-marketing" },
            ],
          },
          {
            segments: [
              { kind: "link", text: "X influencers", href: "/services/influencer-marketing" },
            ],
          },
          {
            segments: [
              { kind: "link", text: "TikTok creators", href: "/services/influencer-marketing" },
            ],
          },
          "Newsletter operators",
          {
            segments: [
              { kind: "link", text: "Reddit power users", href: "/services/influencer-marketing" },
            ],
          },
          {
            segments: [
              { kind: "link", text: "Podcasters", href: "/services/influencer-marketing" },
            ],
          },
          {
            segments: [
              { kind: "link", text: "Clipping networks", href: "/services/influencer-marketing" },
            ],
          },
          "Programmatic ad engines",
          {
            segments: [
              {
                kind: "link",
                text: "AEO, Answer Engine Optimization for LLM visibility",
                href: "/services/aeo-llm-marketing",
              },
            ],
          },
        ],
      },
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
      { type: "heading", content: "AEO: Owning the LLM Layer", href: "/services/aeo-llm-marketing" },
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
      { type: "emphasisLarge", content: "Ampli5.", variant: "primary", href: "/" },
      { type: "lines", lines: ["One command.", "Full distribution.", "The Uber of attention."] },
    ],
  },
  {
    slug: "AEOvsSEO",
    title: "What is AEO? Ampli5 calls it the Answer Consensus Mechanism",
    excerpt:
      "The internet is transitioning from a search indexed web to an answer synthesised web. SEO optimised for ranking algorithms; AEO must optimise distributed knowledge signals.",
    date: "Mar 1, 2025",
    heroImage: {
      src: "/blog/1.jpg",
      alt: "AEOvsSEO",
    },
    content: [
      { type: "paragraph", content: "The internet is quietly transitioning from a search indexed web to an answer synthesised web." },
      { type: "paragraph", content: "For the last twenty years, visibility online was determined by ranking systems. Search engines crawled documents, scored them for relevance and authority, and returned links in an ordered list. The entire discipline of SEO emerged to influence this ranking process." },
      { type: "paragraph", content: "But the interface through which information is accessed has now changed." },
      { type: "paragraph", content: "Users are increasingly interacting with AI assistants such as ChatGPT, Perplexity AI and Gemini. These systems do not behave like traditional search engines. They do not simply retrieve documents. They synthesise answers." },
      { type: "paragraph", content: "This shift may appear subtle at first glance. In reality it represents a structural change in how information flows across the internet." },
      { type: "lines", lines: ["SEO optimised websites for ranking algorithms.", "AEO must optimise distributed knowledge signals."] },

      { type: "heading", content: "What AI Assistants Actually Do" },
      { type: "paragraph", content: "Google ranks documents. It crawls pages, assigns authority scores, and surfaces links in a ranked list. The optimisation game is fundamentally about document positioning — get your page to position one, and you win traffic." },
      { type: "paragraph", content: "AI assistants do not rank documents. They synthesise answers." },
      { type: "paragraph", content: 'When a user asks Perplexity "what\'s the best protein powder for muscle recovery," Perplexity does not retrieve a list of pages and show you the top result. It reads across dozens of sources — forum discussions, expert articles, product reviews, video transcripts, Reddit threads, creator content — and constructs a response that attempts to represent the consensus of the information landscape.' },
      { type: "paragraph", content: "ChatGPT does the same. Gemini does the same. The output is not a pointer to a document. It is a synthesised position, often citing two or three sources that were used to construct it." },
      { type: "paragraph", content: "These sources often include:" },
      { type: "list", items: ["forum discussions", "expert articles", "product reviews", "video transcripts", "Reddit threads", "creator content", "community discussions"] },
      { type: "paragraph", content: "The assistant then synthesises a response that attempts to represent the current consensus of the information landscape." },
      { type: "paragraph", content: "The output is not a list of links. It is a position." },
      { type: "paragraph", content: "Sometimes the assistant cites two or three sources that influenced the answer, but the response itself is a synthesis rather than a pointer to a document." },
      { type: "paragraph", content: "This creates a completely different optimization challenge." },
      { type: "emphasis", content: "This is a fundamentally different infrastructure problem. And it requires a fundamentally different strategy to solve.", variant: "bold" },

      { type: "heading", content: "The Concept of Answer Consensus" },
      { type: "paragraph", content: "Here is the mechanism that most brands have not yet understood: AI models are, at their core, consensus engines." },
      { type: "paragraph", content: "When a language model is trained, it learns to trust information that appears consistently across multiple independent sources. Not because any individual source is authoritative, but because convergence across unrelated voices is one of the strongest signals that something is true." },
      { type: "paragraph", content: "This dynamic does not stop at training. It extends to retrieval. When an AI assistant synthesises an answer in real time, it is performing a version of the same operation, looking for signal coherence across distributed sources before committing to a position." },
      { type: "paragraph", content: "Mohit, founder of Ampli5, calls this the Answer Consensus Mechanism: the phenomenon whereby AI systems preferentially surface information that is corroborated by multiple independent, contextually relevant sources across the internet." },
      { type: "paragraph", content: "The practical implication is stark. If your brand's answer to a user's question exists only on your own website, you have a single source. A single source, regardless of how well-written or technically optimised it is, cannot create consensus. It creates a data point." },
      { type: "paragraph", content: "To become the cited answer inside an AI assistant, you need to become the distributed answer, present across the independent sources that AI models use to construct their synthesis." },
      { type: "paragraph", content: "The internet contains contradictory information everywhere. To resolve this, large language models trust patterns of agreement across sources. When the same idea appears consistently across forums, blogs, expert commentary, creator discussions, community conversations and media references, the model assigns a higher probability that the information is reliable." },
      { type: "paragraph", content: "This is why many brands discover that publishing a perfectly written article on their website does not guarantee inclusion in AI answers. Because the model is not optimising for websites. It is optimising for knowledge consensus." },

      { type: "heading", content: "Why Traditional SEO Cannot Solve This" },
      { type: "paragraph", content: "SEO was built to solve a very specific problem." },
      { type: "paragraph", content: "It helps a single algorithm evaluate the authority and relevance of a single document." },
      { type: "paragraph", content: "Backlinks, keyword density, technical crawlability, schema markup and page speed are all document level signals designed to influence ranking systems." },
      { type: "paragraph", content: "AEO addresses a different problem." },
      { type: "paragraph", content: "You are not trying to rank a page. You are trying to influence the information environment from which an AI system will synthesise an answer." },
      { type: "emphasis", content: "That requires distributing knowledge across the ecosystem rather than concentrating authority in a single URL.", variant: "bold" },

      { type: "heading", content: "Building Answer Distribution Infrastructure" },
      {
        type: "richParagraph",
        segments: [
          { kind: "link", text: "At Ampli5", href: "/" },
          {
            kind: "text",
            text: " we approach this challenge as an infrastructure problem.",
          },
        ],
      },
      { type: "paragraph", content: "The objective is not simply publishing content. The objective is building a system that engineers Answer Consensus across the internet." },
      { type: "paragraph", content: "We refer to this system as Answer Distribution Infrastructure." },
      { type: "paragraph", content: "It operates through three layers." },
      {
        type: "image",
        src: "/blog/3.jpg",
        alt: "How can brands become part of AI answers? — Answer engine optimisation: Question Intelligence, Answer Distribution, Authority Amplification",
      },

      { type: "heading", content: "Layer One: Question Intelligence" },
      { type: "paragraph", content: "Before answers can be distributed, brands must understand the questions that define their category." },
      { type: "paragraph", content: "Most SEO tools focus on keywords. AI assistants operate on natural language questions." },
      { type: "paragraph", content: "Ampli5 built a system called Atlas to address this gap." },
      { type: "paragraph", content: "Atlas scans a brand website, competitor properties, forums, community discussions and AI query patterns. From this data it identifies the top one hundred natural language questions within a category." },
      { type: "paragraph", content: "These are the questions users actually type into AI systems when trying to understand a topic or make a decision." },
      { type: "paragraph", content: "The questions are then organised into a Question Graph." },
      { type: "paragraph", content: "The Question Graph maps how users explore a subject. It shows which questions appear early in the discovery process, which questions appear closer to a purchase decision, and which areas currently lack a clear consensus across the information ecosystem." },
      { type: "emphasis", content: "This is not keyword research. It is an intelligence infrastructure.", variant: "bold" },

      { type: "heading", content: "Layer Two: Answer Distribution" },
      { type: "paragraph", content: "Once the question landscape is mapped, the instinct is to publish better content on the brand website." },
      { type: "paragraph", content: "That is only part of the solution." },
      { type: "paragraph", content: "AI assistants learn from a wide range of internet surfaces. Therefore answers must exist across multiple environments." },
      { type: "paragraph", content: "The Answer Distribution layer deploys answers across platforms such as:" },
      {
        type: "list",
        items: [
          {
            segments: [
              { kind: "link", text: "Reddit communities", href: "/services/influencer-marketing" },
            ],
          },
          {
            segments: [
              { kind: "link", text: "creator videos", href: "/services/influencer-marketing" },
            ],
          },
          {
            segments: [{ kind: "link", text: "podcasts", href: "/services/influencer-marketing" }],
          },
          {
            segments: [
              { kind: "link", text: "expert blogs", href: "/services/influencer-marketing" },
            ],
          },
          "industry forums",
          "community Q and A threads",
        ],
      },
      { type: "paragraph", content: "Each platform contributes a different signal to the knowledge ecosystem." },
      { type: "paragraph", content: "The goal is not repetition. The goal is corroboration." },
      { type: "paragraph", content: "When an AI assistant encounters the same answer expressed across multiple independent sources, the signal begins to resemble public knowledge rather than marketing." },
      { type: "emphasis", content: "That is the type of signal AI systems trust.", variant: "bold" },

      { type: "heading", content: "Layer Three: Authority Amplification" },
      { type: "paragraph", content: "Consensus alone does not guarantee trust." },
      { type: "paragraph", content: "AI systems also weigh who is speaking." },
      { type: "paragraph", content: "Expert voices, practitioners and credentialed specialists carry stronger credibility signals than anonymous sources or brand owned content." },
      { type: "paragraph", content: "The Authority Amplification layer activates networks of creators, subject matter experts and industry practitioners around the questions identified in the Question Graph." },
      { type: "paragraph", content: "These experts discuss the questions through their own channels such as podcasts, video content, professional commentary and articles." },
      { type: "paragraph", content: "Media publications then reference these experts when covering the topic. This creates additional authority signals that AI systems recognise as credible." },
      { type: "paragraph", content: "Over time, these references compound into a durable signal that influences how AI assistants interpret a category." },

      { type: "heading", content: "The Emergence of Answer Consensus" },
      { type: "paragraph", content: "AI systems must solve a difficult problem." },
      { type: "paragraph", content: "The internet contains contradictory information everywhere." },
      { type: "paragraph", content: "To deal with this, large language models tend to trust patterns of agreement across sources." },
      { type: "paragraph", content: "When the same idea appears consistently across:" },
      { type: "list", items: ["forums", "blogs", "expert commentary", "creator discussions", "community conversations", "media references"] },
      { type: "paragraph", content: "The model assigns a higher probability that the information is reliable." },
      { type: "paragraph", content: "We call this phenomenon:" },
      { type: "emphasisLarge", content: "Answer Consensus", variant: "primary" },
      { type: "paragraph", content: "AI assistants increasingly trust information that appears consistently across multiple independent sources." },
      { type: "lines", lines: ["Not just on one authoritative website.", "Not just on a brand's blog.", "But across the distributed knowledge layer of the internet."] },
      { type: "paragraph", content: "This is why many brands discover that publishing a perfectly written article on their website does not guarantee inclusion in AI answers." },
      { type: "paragraph", content: "Because the model is not optimising for websites. It is optimising for knowledge consensus." },

      { type: "heading", content: "The Answer Consensus Engine" },
      { type: "paragraph", content: "When all three layers operate together, they create what we call an Answer Consensus Engine: a self-reinforcing system where a brand's answer to a category's most important questions becomes the distributed, corroborated, expert-endorsed position across the internet." },
      { type: "paragraph", content: "AI assistants scanning this landscape, whether for training or real-time retrieval, encounter the same answer from independent sources, expressed through credible voices, referenced by media institutions. The consensus signal is unambiguous." },
      { type: "paragraph", content: "The outcome is not a ranking. Rankings are a feature of document retrieval systems. The outcome is citation. The brand becomes the answer that AI assistants surface when users ask the questions that matter most in its category." },
      { type: "emphasis", content: "This is a different kind of infrastructure than SEO. It is not about building a better page. It is about building a more coherent presence across the information environment that AI models use to form their understanding of the world.", variant: "bold" },

      { type: "heading", content: "What This Means for Brands Operating Now" },
      { type: "paragraph", content: "The window for establishing Answer Consensus in most categories is still open, but it is closing. The brands that move first to build Answer Distribution Infrastructure will establish the consensus signals that AI models learn to trust. The brands that wait will find themselves optimising documents for a retrieval system that the industry has already moved past." },
      {
        type: "richParagraph",
        segments: [
          { kind: "text", text: "The question is not whether to " },
          {
            kind: "link",
            text: "invest in AEO",
            href: "/services/aeo-llm-marketing",
          },
          { kind: "text", text: ". The question is whether you " },
          { kind: "link", text: "understand", href: "/services/aeo-llm-marketing" },
          { kind: "text", text: " " },
          { kind: "link", text: "that AEO", href: "/services/aeo-llm-marketing" },
          {
            kind: "text",
            text: " is an infrastructure problem, and whether you are building the right infrastructure to solve it.",
          },
        ],
      },
      { type: "paragraph", content: "Ampli5 builds Answer Distribution Infrastructure for brands competing in AI-mediated search. Our three-layer system, Atlas Question Intelligence, Answer Distribution and Authority Amplification, is designed to engineer Answer Consensus at category scale." },
    ],
  },
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
