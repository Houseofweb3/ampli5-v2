"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import { BlogEditorForm } from "@/src/components/manage/BlogEditorForm";
import { getManageBlogBySlug, updateManageBlog } from "@/src/services/manageBlog";
import type { ManageBlog, ManageBlogPayload } from "@/src/types/manageBlog";

function errMsg(err: unknown): string {
  if (axios.isAxiosError(err) && err.response?.data) {
    const d = err.response.data as { error?: string; message?: string };
    if (d.error) return d.error;
    if (d.message) return d.message;
  }
  if (err instanceof Error) return err.message;
  return "Could not save post.";
}

export default function ManageBlogUpdatePage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const slug = decodeURIComponent(params.slug);
  const [blog, setBlog] = useState<ManageBlog | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const row = await getManageBlogBySlug(slug);
      setBlog(row);
      if (!row) toast.error("Post not found.");
    } catch {
      toast.error("Failed to load post.");
      setBlog(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    void load();
  }, [load]);

  const handleSubmit = async (payload: ManageBlogPayload) => {
    if (!blog?.id) return;
    try {
      await updateManageBlog(blog.id, payload);
      toast.success("Saved.");
      router.push("/manage/blogs");
    } catch (err) {
      toast.error(errMsg(err));
      throw err;
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading…</p>;
  }

  if (!blog) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-gray-700">
        <p className="mb-4">This post could not be found.</p>
        <button
          type="button"
          onClick={() => router.push("/manage/blogs")}
          className="text-primary font-medium hover:underline"
        >
          Back to list
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit post</h1>
      <BlogEditorForm mode="edit" initialBlog={blog} onSubmit={handleSubmit} />
    </div>
  );
}
