import { PUBLIC_BLOG_REVALIDATE_SECONDS } from "@/src/config/publicBlogEndpoints";
import { fetchPublicBlogList } from "@/src/services/publicBlogs";

export const revalidate = PUBLIC_BLOG_REVALIDATE_SECONDS;

/* eslint-disable no-unused-vars */
const getLastModified = async (path: string) => {
  return new Date();
};

export default async function sitemap() {
  const baseUrl = process.env.NEXTAUTH_URL || "https://ampli5.ai";

  // Public pages - high priority for SEO
  const publicPages = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/ampli5", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/blogs", priority: 0.8, changeFrequency: "daily" as const },
    { path: "/case-studies", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/discover-kols", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/bounty-hunt", priority: 0.7, changeFrequency: "daily" as const },
    { path: "/ambassadors", priority: 0.6, changeFrequency: "monthly" as const },
  ];

  // Service pages - high priority for SEO
  const servicePages = [
    { path: "/services/influencer-marketing", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services/founder-led-marketing", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services/aeo-llm-marketing", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services/ai-ad-generation", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services/ugc-creator-arena", priority: 0.9, changeFrequency: "monthly" as const },
  ];

  // Other public pages
  const otherPages = [
    { path: "/for-project", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/founderfuel", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/founder-signal", priority: 0.6, changeFrequency: "monthly" as const },
  ];

  // Dynamic blog post pages (public blogs API)
  const blogPosts = await fetchPublicBlogList();
  const blogPages = blogPosts.map((post) => {
    const raw = post.updatedAt ?? post.createdAt;
    const lastModified = raw ? new Date(raw) : new Date();
    return {
      path: `/blogs/${post.slug}`,
      priority: 0.8 as const,
      changeFrequency: "weekly" as const,
      lastModified: Number.isNaN(lastModified.getTime()) ? new Date() : lastModified,
    };
  });

  // Combine static pages
  const allStaticPages = [...publicPages, ...servicePages, ...otherPages];

  const staticEntries = await Promise.all(
    allStaticPages.map(async ({ path, priority, changeFrequency }) => {
      const lastModified = await getLastModified(path);
      return {
        url: `${baseUrl}${path}`,
        lastModified,
        changeFrequency,
        priority,
      };
    })
  );

  const blogEntries = blogPages.map(({ path, priority, changeFrequency, lastModified }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  return [...staticEntries, ...blogEntries];
}
