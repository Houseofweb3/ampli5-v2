import {
  publicBlogsBasePath,
  PUBLIC_BLOG_REVALIDATE_SECONDS,
} from "@/src/config/publicBlogEndpoints";
import type { BlogContentBlock } from "@/src/data/blogs";

const fetchNext = { revalidate: PUBLIC_BLOG_REVALIDATE_SECONDS } as const;

function dashboardApiBase(): string {
  return (process.env.NEXT_PUBLIC_DASHBOARD_API_URL || "").replace(/\/$/, "");
}

function joinApiUrl(base: string, path: string): string {
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

/** Stored slug format: alphanumeric with hyphen/underscore segments; avoids odd paths and bad requests. */
export function isValidPublicBlogSlug(slug: string): boolean {
  if (!slug || slug.length > 200) return false;
  if (slug.includes("/") || slug.includes("..")) return false;
  return /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/i.test(slug);
}

export interface PublicBlogListItem {
  id: string;
  title: string;
  slug: string;
  teaser: string;
  coverImage: string | null;
  author: string;
  createdAt: string;
  /** Present on some API list responses; omitted in minimal list payloads. */
  updatedAt?: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

export interface PublicBlogDetail extends PublicBlogListItem {
  content: string;
  updatedAt?: string;
}

function str(v: unknown, fallback = ""): string {
  if (v == null) return fallback;
  return String(v);
}

function mapListRow(row: unknown): PublicBlogListItem | null {
  if (!row || typeof row !== "object") return null;
  const r = row as Record<string, unknown>;
  const id = r.id;
  const slug = str(r.slug);
  if (slug === "") return null;
  const idStr = id != null && String(id).trim() !== "" ? String(id) : slug;
  const cover = r.coverImage ?? r.cover_image;
  const coverStr = cover != null && String(cover).trim() ? String(cover).trim() : null;
  const updatedRaw = r.updatedAt ?? r.updated_at;
  return {
    id: idStr,
    title: str(r.title),
    slug,
    teaser: str(r.teaser ?? r.excerpt),
    coverImage: coverStr,
    author: str(r.author),
    createdAt: str(r.createdAt ?? r.created_at),
    updatedAt: updatedRaw != null ? String(updatedRaw) : undefined,
    seoTitle: str(r.seoTitle ?? r.seo_title),
    seoDescription: str(r.seoDescription ?? r.seo_description),
    seoKeywords: str(r.seoKeywords ?? r.seo_keywords),
  };
}

function normalizeListPayload(data: unknown): PublicBlogListItem[] {
  const raw: unknown[] = [];
  if (Array.isArray(data)) raw.push(...data);
  else if (data && typeof data === "object") {
    const o = data as Record<string, unknown>;
    if (Array.isArray(o.blogs)) raw.push(...o.blogs);
    else if (Array.isArray(o.data)) raw.push(...o.data);
  }
  return raw.map(mapListRow).filter((x): x is PublicBlogListItem => x != null);
}

function unwrapBlog(data: unknown): unknown {
  if (data && typeof data === "object" && "blog" in data) {
    return (data as { blog: unknown }).blog;
  }
  return data;
}

function mapDetail(row: unknown): PublicBlogDetail | null {
  const base = mapListRow(row);
  if (!base) return null;
  const r = row as Record<string, unknown>;
  const content = str(r.content ?? r.contentHtml ?? r.content_html ?? r.bodyHtml ?? r.body);
  const updatedAt = r.updatedAt ?? r.updated_at;
  return {
    ...base,
    content,
    updatedAt: updatedAt != null ? String(updatedAt) : undefined,
  };
}

export async function fetchPublicBlogList(): Promise<PublicBlogListItem[]> {
  const base = dashboardApiBase();
  if (!base) return [];
  const url = joinApiUrl(base, publicBlogsBasePath());
  try {
    const res = await fetch(url, { next: fetchNext });
    if (!res.ok) return [];
    const data: unknown = await res.json();
    return normalizeListPayload(data);
  } catch {
    return [];
  }
}

export async function fetchPublicBlogBySlug(slug: string): Promise<PublicBlogDetail | null> {
  if (!isValidPublicBlogSlug(slug)) return null;
  const base = dashboardApiBase();
  if (!base) return null;
  const url = joinApiUrl(base, `${publicBlogsBasePath()}/slug/${encodeURIComponent(slug)}`);
  try {
    const res = await fetch(url, { next: fetchNext });
    if (res.status === 404 || res.status === 400) return null;
    if (!res.ok) return null;
    const data: unknown = await res.json();
    return mapDetail(unwrapBlog(data));
  } catch {
    return null;
  }
}

export function formatBlogDate(iso: string | undefined): string | undefined {
  if (!iso?.trim()) return undefined;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function publicBlogContentBlocks(html: string): BlogContentBlock[] {
  const trimmed = html?.trim();
  return [{ type: "htmlBody", html: trimmed ? trimmed : "<p></p>" }];
}
