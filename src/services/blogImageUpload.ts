/**
 * Blog images: open upload on the dashboard API (`POST …/web/blog-images/upload`, no JWT).
 * Cloudinary fallback is disabled for blog uploads.
 */

function resolveUploadUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_BLOG_IMAGE_UPLOAD_URL?.trim();
  if (fromEnv) return fromEnv;

  const base = process.env.NEXT_PUBLIC_DASHBOARD_API_URL?.replace(/\/$/, "") ?? "";
  if (!base) {
    throw new Error(
      "Blog image upload API is not configured. Set NEXT_PUBLIC_DASHBOARD_API_URL or NEXT_PUBLIC_BLOG_IMAGE_UPLOAD_URL."
    );
  }
  return `${base}/web/blog-images/upload`;
}

export interface BlogImageUploadResult {
  url: string;
  publicId?: string;
}

/** Upload image for blog cover or rich text to the open blog-images API. */
export async function uploadBlogImage(file: File): Promise<BlogImageUploadResult> {
  const endpoint = resolveUploadUrl();
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  const data = (await res.json().catch(() => ({}))) as {
    url?: string;
    publicId?: string;
    message?: string;
    error?: string;
  };

  if (!res.ok) {
    throw new Error(data.message || data.error || `Upload failed (${res.status})`);
  }

  const url = data.url;
  if (!url || typeof url !== "string") {
    throw new Error("Upload succeeded but no image URL was returned.");
  }

  return { url, publicId: data.publicId };
}
