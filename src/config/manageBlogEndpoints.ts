/**
 * Blog CRUD under `NEXT_PUBLIC_DASHBOARD_API_URL` (e.g. …/api/v1).
 * Default: `/web/blogs` (full API: `/api/v1/web/blogs`). Requires web-user JWT via manageBlogClient.
 *
 * @see Web blogs API spec (GET/POST/PATCH/DELETE + open image upload).
 */

/** Path segment after API base, no leading slash. */
export const MANAGE_BLOG_LIST_PATH =
  process.env.NEXT_PUBLIC_MANAGE_BLOG_LIST_PATH?.replace(/^\//, "").replace(/\/$/, "") ?? "web/blogs";

export function manageBlogListUrl(): string {
  return `/${MANAGE_BLOG_LIST_PATH}`;
}

export function manageBlogItemUrl(id: string): string {
  return `/${MANAGE_BLOG_LIST_PATH}/${encodeURIComponent(id)}`;
}

/** GET full detail for edit (includes content, cover, SEO). */
export function manageBlogBySlugUrl(slug: string): string {
  return `/${MANAGE_BLOG_LIST_PATH}/slug/${encodeURIComponent(slug)}`;
}

/** When "true", list/create/update/delete use browser localStorage instead of HTTP. */
export function isManageBlogMockMode(): boolean {
  return process.env.NEXT_PUBLIC_MANAGE_BLOG_MOCK === "true";
}
