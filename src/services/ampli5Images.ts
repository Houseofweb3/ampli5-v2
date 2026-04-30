/**
 * Ampli5 images: open upload/list/delete on the dashboard API (no JWT).
 *
 * Endpoints:
 * - POST   /web/ampli5-images/upload (multipart: file, folderName)
 * - GET    /web/ampli5-images?folderName=...&limit=...
 * - DELETE /web/ampli5-images (json: { url } or { key })
 */

function resolveBaseUrl(): string {
  const base = process.env.NEXT_PUBLIC_DASHBOARD_API_URL?.replace(/\/$/, "") ?? "";
  if (!base) {
    throw new Error("Ampli5 images API is not configured. Set NEXT_PUBLIC_DASHBOARD_API_URL.");
  }
  return base;
}

export type Ampli5ImagesFolderName = string;

export function sanitizeAmpli5FolderName(input: string): Ampli5ImagesFolderName {
  const raw = (input ?? "").trim();
  // keep only allowed chars: letters, numbers, underscore, hyphen
  let sanitized = raw.replace(/[^A-Za-z0-9_-]/g, "_");
  sanitized = sanitized.replace(/_+/g, "_");
  sanitized = sanitized.replace(/^_+/, "");
  sanitized = sanitized.slice(0, 64);
  // must start with letter/number
  if (!/^[A-Za-z0-9]/.test(sanitized)) sanitized = sanitized.replace(/^[^A-Za-z0-9]+/, "");
  return sanitized.slice(0, 64);
}

export function buildOnboardingFolderName(channelBrandName: string, now = new Date()): string {
  const yyyyMmDd = now.toISOString().slice(0, 10);
  const base = sanitizeAmpli5FolderName(channelBrandName);
  const fallback = `onboarding-audience-demography_${yyyyMmDd}`;
  if (!base) return fallback;

  // Ensure the final string stays within 64 chars.
  const suffix = `_${yyyyMmDd}`;
  const maxBaseLen = 64 - suffix.length;
  const clippedBase = base.slice(0, Math.max(1, maxBaseLen));
  return `${clippedBase}${suffix}`;
}

export interface Ampli5ImageUploadResult {
  url: string;
}

export async function uploadAmpli5Image(
  file: File,
  folderName: string
): Promise<Ampli5ImageUploadResult> {
  const endpoint = `${resolveBaseUrl()}/web/ampli5-images/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("folderName", folderName);

  const res = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  const data = (await res.json().catch(() => ({}))) as {
    url?: string;
    message?: string;
    error?: string;
  };

  if (!res.ok) {
    throw new Error(data.message || data.error || `Upload failed (${res.status})`);
  }
  if (!data.url || typeof data.url !== "string") {
    throw new Error("Upload succeeded but no image URL was returned.");
  }
  return { url: data.url };
}

export async function deleteAmpli5ImageByUrl(url: string): Promise<{ deleted: boolean }> {
  const endpoint = `${resolveBaseUrl()}/web/ampli5-images`;

  const res = await fetch(endpoint, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  const data = (await res.json().catch(() => ({}))) as { deleted?: boolean; message?: string };

  if (!res.ok) {
    throw new Error(data.message || `Delete failed (${res.status})`);
  }

  return { deleted: !!data.deleted };
}

export async function listAmpli5Images(params: {
  folderName: string;
  limit?: number;
}): Promise<{ urls: string[] }> {
  const { folderName, limit } = params;
  const base = resolveBaseUrl();
  const qs = new URLSearchParams({ folderName });
  if (typeof limit === "number") qs.set("limit", String(limit));
  const endpoint = `${base}/web/ampli5-images?${qs.toString()}`;

  const res = await fetch(endpoint, { method: "GET" });
  const data = (await res.json().catch(() => ({}))) as { urls?: string[]; message?: string };

  if (!res.ok) {
    throw new Error(data.message || `List failed (${res.status})`);
  }
  return { urls: Array.isArray(data.urls) ? data.urls : [] };
}
