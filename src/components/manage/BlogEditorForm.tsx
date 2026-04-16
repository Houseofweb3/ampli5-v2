"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { BlogRichEditor } from "./BlogRichEditor";
import { ManageBlogPreview } from "./ManageBlogPreview";
import type { ManageBlog, ManageBlogPayload } from "@/src/types/manageBlog";
import { toast } from "react-hot-toast";
import { uploadBlogImage } from "@/src/services/blogImageUpload";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

type SectionTab = "content" | "seo";

type FieldKey =
  | "title"
  | "slug"
  | "teaser"
  | "author"
  | "contentHtml"
  | "coverImageUrl"
  | "seoTitle"
  | "seoDescription"
  | "seoKeywords";

type FieldErrors = Partial<Record<FieldKey, string>>;

const CONTENT_ERROR_KEYS: FieldKey[] = [
  "title",
  "slug",
  "teaser",
  "author",
  "contentHtml",
  "coverImageUrl",
];

function slugifyTitle(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function inputErrorClass(hasError: boolean): string {
  return hasError
    ? "border-red-500 ring-1 ring-red-500 focus:border-red-500 focus:ring-red-500"
    : "border-gray-300 focus:ring-primary focus:border-primary";
}

export interface BlogEditorFormProps {
  mode: "add" | "edit";
  /** When provided (edit), form hydrates from this row. */
  initialBlog?: ManageBlog | null;
  // eslint-disable-next-line no-unused-vars -- callback contract
  onSubmit: (payload: ManageBlogPayload) => Promise<void>;
  submitLabel?: string;
}

export function BlogEditorForm({
  mode,
  initialBlog,
  onSubmit,
  submitLabel,
}: BlogEditorFormProps) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [teaser, setTeaser] = useState("");
  const [author, setAuthor] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [contentHtml, setContentHtml] = useState("<p></p>");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");

  const [sectionTab, setSectionTab] = useState<SectionTab>("content");
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editorKey, setEditorKey] = useState(0);
  const [coverUploading, setCoverUploading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const clearError = useCallback((key: FieldKey) => {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const hydrate = useCallback((blog: ManageBlog) => {
    setTitle(blog.title);
    setSlug(blog.slug);
    setTeaser(blog.teaser);
    setAuthor(blog.author);
    setCoverImageUrl(blog.coverImageUrl);
    setContentHtml(blog.contentHtml || "<p></p>");
    setSeoTitle(blog.seoTitle ?? "");
    setSeoDescription(blog.seoDescription ?? "");
    setSeoKeywords(blog.seoKeywords ?? "");
    setEditorKey((k) => k + 1);
    setErrors({});
  }, []);

  useEffect(() => {
    if (initialBlog) hydrate(initialBlog);
  }, [initialBlog, hydrate]);

  const payload = useMemo(
    (): ManageBlogPayload => ({
      title: title.trim(),
      slug: slug.trim(),
      teaser: teaser.trim(),
      author: author.trim(),
      coverImageUrl,
      contentHtml,
      seoTitle: seoTitle.trim(),
      seoDescription: seoDescription.trim(),
      seoKeywords: seoKeywords.trim(),
    }),
    [title, slug, teaser, author, coverImageUrl, contentHtml, seoTitle, seoDescription, seoKeywords]
  );

  const validate = (): boolean => {
    const next: FieldErrors = {};

    if (!title.trim()) next.title = "Title is required.";
    if (!slug.trim()) next.slug = "Slug is required.";
    else if (!SLUG_RE.test(slug.trim())) {
      next.slug = "Use lowercase letters, numbers, and single hyphens only.";
    }
    if (!teaser.trim()) next.teaser = "Teaser is required.";
    if (!author.trim()) next.author = "Author is required.";
    if (!coverImageUrl?.trim()) next.coverImageUrl = "Cover image is required.";
    if (!contentHtml.trim() || contentHtml.replace(/<[^>]+>/g, "").trim().length < 1) {
      next.contentHtml = "Content is required.";
    }

    if (!seoTitle.trim()) next.seoTitle = "SEO title is required.";
    if (!seoDescription.trim()) next.seoDescription = "SEO description is required.";
    const kwRaw = seoKeywords.trim();
    if (!kwRaw) {
      next.seoKeywords = "Keywords are required (comma-separated).";
    } else {
      const parts = kwRaw.split(",").map((s) => s.trim()).filter(Boolean);
      if (parts.length === 0) {
        next.seoKeywords = "Enter at least one keyword, separated by commas.";
      }
    }

    setErrors(next);
    if (Object.keys(next).length > 0) {
      toast.error("Please fill in all required fields.");
      const hasContentErr = Object.keys(next).some((k) =>
        CONTENT_ERROR_KEYS.includes(k as FieldKey)
      );
      setSectionTab(hasContentErr ? "content" : "seo");
      setShowPreview(false);
      return false;
    }
    return true;
  };

  const onCoverFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const input = e.target;
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      input.value = "";
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      toast.error("Image must be 5MB or smaller.");
      input.value = "";
      return;
    }
    setCoverUploading(true);
    try {
      const { url } = await uploadBlogImage(file);
      setCoverImageUrl(url);
      clearError("coverImageUrl");
      toast.success("Cover image uploaded.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Cover upload failed.";
      toast.error(msg);
    } finally {
      setCoverUploading(false);
      input.value = "";
    }
  };

  const save = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      await onSubmit(payload);
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "message" in err
          ? String((err as { message: string }).message)
          : "Save failed.";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void save();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
        {showPreview ? (
          <button
            type="button"
            onClick={() => setShowPreview(false)}
            className="text-sm font-medium text-gray-700 hover:text-primary"
          >
            ← Back to editor
          </button>
        ) : (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSectionTab("content")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                sectionTab === "content"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              Content
            </button>
            <button
              type="button"
              onClick={() => setSectionTab("seo")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                sectionTab === "seo"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              SEO
            </button>
          </div>
        )}
        {!showPreview ? (
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 ml-auto"
          >
            Preview
          </button>
        ) : (
          <button
            type="button"
            onClick={() => void save()}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primaryHover disabled:opacity-50 ml-auto"
          >
            {saving ? "Saving…" : submitLabel ?? (mode === "add" ? "Create post" : "Save changes")}
          </button>
        )}
      </div>

      {showPreview ? (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Review how the post will look on the public blog.</p>
          <ManageBlogPreview
            title={title}
            slug={slug}
            teaser={teaser}
            author={author}
            coverImageUrl={coverImageUrl}
            contentHtml={contentHtml}
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-7xl">
          {sectionTab === "content" ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    clearError("title");
                  }}
                  className={`w-full rounded-lg border px-3 py-2 text-gray-900 focus:ring-2 ${inputErrorClass(!!errors.title)}`}
                />
                {errors.title ? (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.title}
                  </p>
                ) : null}
                {mode === "add" && (
                  <button
                    type="button"
                    className="mt-1 text-xs text-primary hover:underline"
                    onClick={() => setSlug(slugifyTitle(title))}
                  >
                    Generate slug from title
                  </button>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
                    clearError("slug");
                  }}
                  className={`w-full rounded-lg border px-3 py-2 font-mono text-sm text-gray-900 focus:ring-2 ${inputErrorClass(!!errors.slug)}`}
                />
                {errors.slug ? (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.slug}
                  </p>
                ) : null}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teaser</label>
                <textarea
                  value={teaser}
                  onChange={(e) => {
                    setTeaser(e.target.value);
                    clearError("teaser");
                  }}
                  rows={3}
                  className={`w-full rounded-lg border px-3 py-2 text-gray-900 focus:ring-2 ${inputErrorClass(!!errors.teaser)}`}
                />
                {errors.teaser ? (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.teaser}
                  </p>
                ) : null}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => {
                    setAuthor(e.target.value);
                    clearError("author");
                  }}
                  className={`w-full rounded-lg border px-3 py-2 text-gray-900 focus:ring-2 ${inputErrorClass(!!errors.author)}`}
                />
                {errors.author ? (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.author}
                  </p>
                ) : null}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cover image</label>
                <p className="text-xs text-gray-500 mb-2">
                  Required. Images only, max 5MB. URL is stored after upload.
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(ev) => void onCoverFile(ev)}
                  disabled={coverUploading}
                  className={`block w-full text-sm text-gray-600 disabled:opacity-50 rounded-lg border px-2 py-2 ${inputErrorClass(!!errors.coverImageUrl)}`}
                />
                {errors.coverImageUrl ? (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.coverImageUrl}
                  </p>
                ) : null}
                {coverUploading ? <p className="text-xs text-gray-500 mt-1">Uploading cover…</p> : null}
                {coverImageUrl ? (
                  <div className="mt-3 relative w-full max-w-md aspect-[16/10] rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={coverImageUrl} alt="Cover preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        setCoverImageUrl(null);
                        clearError("coverImageUrl");
                      }}
                      className="absolute top-2 right-2 rounded bg-black/60 text-white text-xs px-2 py-1 hover:bg-black/80"
                    >
                      Remove
                    </button>
                  </div>
                ) : null}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <div className={errors.contentHtml ? "rounded-lg ring-2 ring-red-500 ring-offset-1" : ""}>
                  <BlogRichEditor
                    key={editorKey}
                    value={contentHtml}
                    onChange={(html) => {
                      setContentHtml(html);
                      clearError("contentHtml");
                    }}
                  />
                </div>
                {errors.contentHtml ? (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.contentHtml}
                  </p>
                ) : null}
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO title</label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => {
                    setSeoTitle(e.target.value);
                    clearError("seoTitle");
                  }}
                  className={`w-full rounded-lg border px-3 py-2 text-gray-900 focus:ring-2 ${inputErrorClass(!!errors.seoTitle)}`}
                  placeholder="Meta title for search engines"
                />
                {errors.seoTitle ? (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.seoTitle}
                  </p>
                ) : null}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO description</label>
                <textarea
                  value={seoDescription}
                  onChange={(e) => {
                    setSeoDescription(e.target.value);
                    clearError("seoDescription");
                  }}
                  rows={4}
                  className={`w-full rounded-lg border px-3 py-2 text-gray-900 focus:ring-2 ${inputErrorClass(!!errors.seoDescription)}`}
                  placeholder="Meta description for search results"
                />
                {errors.seoDescription ? (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.seoDescription}
                  </p>
                ) : null}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
                <p className="text-xs text-gray-500 mb-2">Comma-separated (e.g. web3, marketing, AEO)</p>
                <input
                  type="text"
                  value={seoKeywords}
                  onChange={(e) => {
                    setSeoKeywords(e.target.value);
                    clearError("seoKeywords");
                  }}
                  className={`w-full rounded-lg border px-3 py-2 text-gray-900 focus:ring-2 ${inputErrorClass(!!errors.seoKeywords)}`}
                  placeholder="keyword one, keyword two"
                />
                {errors.seoKeywords ? (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.seoKeywords}
                  </p>
                ) : null}
              </div>
            </>
          )}

          <div className="flex gap-3 pt-2 border-t border-gray-100">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primaryHover disabled:opacity-50"
            >
              {saving ? "Saving…" : submitLabel ?? (mode === "add" ? "Create post" : "Save changes")}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
