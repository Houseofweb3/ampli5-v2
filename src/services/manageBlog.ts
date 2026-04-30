import { manageBlogClient } from "@/src/lib/manageBlogClient";
import {
  manageBlogBySlugUrl,
  manageBlogItemUrl,
  manageBlogListUrl,
} from "@/src/config/manageBlogEndpoints";
import type { ManageBlog, ManageBlogPayload } from "@/src/types/manageBlog";

function unwrapBlog(data: unknown): unknown {
  if (data && typeof data === "object" && "blog" in data) {
    return (data as { blog: unknown }).blog;
  }
  return data;
}

function mapRow(row: unknown): ManageBlog | null {
  if (!row || typeof row !== "object") return null;
  const r = row as Record<string, unknown>;
  const id = r.id ?? r._id;
  if (id == null || id === "") return null;
  const hero = r.heroImage;
  let cover: string | null = (r.coverImage ?? r.coverImageUrl ?? r.cover_image_url) as
    | string
    | null;
  if (!cover && hero && typeof hero === "object" && "src" in hero) {
    cover = String((hero as { src: string }).src);
  }
  return {
    id: String(id),
    title: String(r.title ?? ""),
    slug: String(r.slug ?? ""),
    teaser: String(r.teaser ?? r.excerpt ?? ""),
    coverImageUrl: cover && String(cover).trim() ? String(cover) : null,
    contentHtml: String(r.content ?? r.contentHtml ?? r.content_html ?? r.bodyHtml ?? r.body ?? ""),
    author: String(r.author ?? ""),
    seoTitle: String(r.seoTitle ?? r.seo_title ?? r.metaTitle ?? r.meta_title ?? ""),
    seoDescription: String(
      r.seoDescription ?? r.seo_description ?? r.metaDescription ?? r.meta_description ?? ""
    ),
    seoKeywords: String(
      r.seoKeywords ?? r.seo_keywords ?? r.keywords ?? r.metaKeywords ?? r.meta_keywords ?? ""
    ),
    createdAt:
      r.createdAt != null
        ? String(r.createdAt)
        : r.created_at != null
          ? String(r.created_at)
          : undefined,
    updatedAt:
      r.updatedAt != null
        ? String(r.updatedAt)
        : r.updated_at != null
          ? String(r.updated_at)
          : undefined,
  };
}

function normalizeListResponse(data: unknown): ManageBlog[] {
  const raw: unknown[] = [];
  if (Array.isArray(data)) raw.push(...data);
  else if (data && typeof data === "object") {
    const o = data as Record<string, unknown>;
    if (Array.isArray(o.blogs)) raw.push(...o.blogs);
    else if (Array.isArray(o.data)) raw.push(...o.data);
    else if (Array.isArray(o.posts)) raw.push(...o.posts);
    else if (Array.isArray(o.items)) raw.push(...o.items);
  }
  return raw.map(mapRow).filter((x): x is ManageBlog => x != null);
}

/** API POST body: `coverImage` + `content` (not our internal names). */
function payloadToCreateBody(payload: ManageBlogPayload): Record<string, string> {
  return {
    title: payload.title,
    slug: payload.slug,
    teaser: payload.teaser,
    coverImage: payload.coverImageUrl ?? "",
    content: payload.contentHtml,
    author: payload.author,
    seoTitle: payload.seoTitle,
    seoDescription: payload.seoDescription,
    seoKeywords: payload.seoKeywords,
  };
}

function payloadToPatchBody(payload: ManageBlogPayload): Record<string, string> {
  return payloadToCreateBody(payload);
}

export async function listManageBlogs(): Promise<ManageBlog[]> {
  const res = await manageBlogClient.get(manageBlogListUrl());
  return normalizeListResponse(res.data);
}

/** Load full post for editing (API: GET /web/blogs/slug/:slug). */
export async function getManageBlogBySlug(slug: string): Promise<ManageBlog | null> {
  try {
    const res = await manageBlogClient.get(manageBlogBySlugUrl(slug));
    return mapRow(unwrapBlog(res.data));
  } catch {
    return null;
  }
}

export async function createManageBlog(payload: ManageBlogPayload): Promise<ManageBlog> {
  const res = await manageBlogClient.post(manageBlogListUrl(), payloadToCreateBody(payload));
  const mapped = mapRow(unwrapBlog(res.data));
  if (mapped) return mapped;
  throw new Error("Create succeeded but response shape was unexpected.");
}

export async function updateManageBlog(
  id: string,
  payload: ManageBlogPayload
): Promise<ManageBlog> {
  const res = await manageBlogClient.patch(manageBlogItemUrl(id), payloadToPatchBody(payload));
  const mapped = mapRow(unwrapBlog(res.data));
  if (mapped) return mapped;
  throw new Error("Update succeeded but response shape was unexpected.");
}

export async function deleteManageBlog(id: string): Promise<void> {
  await manageBlogClient.delete(manageBlogItemUrl(id));
}
