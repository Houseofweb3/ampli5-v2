import { manageBlogClient } from "@/src/lib/manageBlogClient";
import {
  isManageBlogMockMode,
  manageBlogBySlugUrl,
  manageBlogItemUrl,
  manageBlogListUrl,
} from "@/src/config/manageBlogEndpoints";
import type { ManageBlog, ManageBlogPayload } from "@/src/types/manageBlog";

const MOCK_STORAGE_KEY = "ampli5-manage-blog-mock-v1";

function readMock(): ManageBlog[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(MOCK_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as ManageBlog[]) : [];
  } catch {
    return [];
  }
}

function writeMock(posts: ManageBlog[]): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(posts));
}

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
  let cover: string | null =
    (r.coverImage ?? r.coverImageUrl ?? r.cover_image_url) as string | null;
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
  if (isManageBlogMockMode()) {
    return readMock();
  }
  const res = await manageBlogClient.get(manageBlogListUrl());
  return normalizeListResponse(res.data);
}

/** Load full post for editing (API: GET /web/blogs/slug/:slug). */
export async function getManageBlogBySlug(slug: string): Promise<ManageBlog | null> {
  if (isManageBlogMockMode()) {
    return readMock().find((p) => p.slug === slug) ?? null;
  }
  try {
    const res = await manageBlogClient.get(manageBlogBySlugUrl(slug));
    return mapRow(unwrapBlog(res.data));
  } catch {
    return null;
  }
}

export async function createManageBlog(payload: ManageBlogPayload): Promise<ManageBlog> {
  if (isManageBlogMockMode()) {
    const posts = readMock();
    const row: ManageBlog = {
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      ...payload,
      updatedAt: new Date().toISOString(),
    };
    posts.unshift(row);
    writeMock(posts);
    return row;
  }
  const res = await manageBlogClient.post(manageBlogListUrl(), payloadToCreateBody(payload));
  const mapped = mapRow(unwrapBlog(res.data));
  if (mapped) return mapped;
  throw new Error("Create succeeded but response shape was unexpected.");
}

export async function updateManageBlog(id: string, payload: ManageBlogPayload): Promise<ManageBlog> {
  if (isManageBlogMockMode()) {
    const posts = readMock();
    const idx = posts.findIndex((p) => p.id === id);
    const row: ManageBlog = {
      id,
      ...payload,
      updatedAt: new Date().toISOString(),
    };
    if (idx >= 0) posts[idx] = row;
    else posts.unshift(row);
    writeMock(posts);
    return row;
  }
  const res = await manageBlogClient.patch(manageBlogItemUrl(id), payloadToPatchBody(payload));
  const mapped = mapRow(unwrapBlog(res.data));
  if (mapped) return mapped;
  throw new Error("Update succeeded but response shape was unexpected.");
}

export async function deleteManageBlog(id: string): Promise<void> {
  if (isManageBlogMockMode()) {
    writeMock(readMock().filter((p) => p.id !== id));
    return;
  }
  await manageBlogClient.delete(manageBlogItemUrl(id));
}
