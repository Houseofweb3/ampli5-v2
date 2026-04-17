/**
 * Public read-only blogs under `NEXT_PUBLIC_DASHBOARD_API_URL` (e.g. …/api/v1).
 * Full list: GET `/web/blogs/public`, detail: GET `/web/blogs/public/slug/:slug` (no JWT).
 */

/** ISR: regenerate static blog pages at most every 5 minutes */
export const PUBLIC_BLOG_REVALIDATE_SECONDS = 300;

/** Path segment after API base, no leading slash. */
export function publicBlogsBasePath(): string {
  return (
    process.env.NEXT_PUBLIC_PUBLIC_BLOGS_PATH?.replace(/^\//, "").replace(/\/$/, "") ??
    "web/blogs/public"
  );
}
