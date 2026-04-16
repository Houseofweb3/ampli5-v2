"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import axios from "axios";
import { listManageBlogs, deleteManageBlog } from "@/src/services/manageBlog";
import type { ManageBlog } from "@/src/types/manageBlog";
import { isManageBlogMockMode } from "@/src/config/manageBlogEndpoints";

function listErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err) && err.response?.data) {
    const d = err.response.data as { error?: string; message?: string };
    if (d.error) return d.error;
    if (d.message) return d.message;
  }
  if (err instanceof Error) return err.message;
  return "Could not load posts.";
}

function formatBlogDate(dateIso?: string): string {
  if (!dateIso) return "";
  const d = new Date(dateIso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ManageBlogsListPage() {
  const [rows, setRows] = useState<ManageBlog[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listManageBlogs();
      setRows(data);
    } catch (err) {
      toast.error(listErrorMessage(err));
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const onDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete “${title}”? This cannot be undone.`)) return;
    try {
      await deleteManageBlog(id);
      toast.success("Deleted.");
      void load();
    } catch (err) {
      toast.error(listErrorMessage(err));
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog posts</h1>
          <p className="text-gray-600 text-sm mt-1">
            Create, edit, or remove posts.
            {isManageBlogMockMode() ? (
              <span className="text-amber-700 font-medium"> Mock mode is on (localStorage only).</span>
            ) : null}
          </p>
        </div>
        <Link
          href="/manage/blog/add"
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primaryHover"
        >
          New post
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : rows.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-600">
          <p className="mb-4">No posts yet.</p>
          <Link href="/manage/blog/add" className="text-primary font-medium hover:underline">
            Create your first post
          </Link>
        </div>
      ) : (
        <ul className="space-y-8">
          {rows.map((row) => (
            <li key={row.id}>
              <article className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 line-clamp-2">
                        {row.title}
                      </h2>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/manage/blog/update/${encodeURIComponent(row.slug)}`}
                        className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm text-gray-800 hover:bg-gray-50"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => void onDelete(row.id, row.title)}
                        className="px-3 py-1.5 rounded-lg border border-red-200 text-sm text-red-700 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 font-mono truncate mb-2">{row.slug}</p>
                  {formatBlogDate(row.createdAt || row.updatedAt) ? (
                    <p className="text-sm text-gray-500 mb-2">
                      {formatBlogDate(row.createdAt || row.updatedAt)}
                    </p>
                  ) : null}
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-2">
                    {row.teaser || "No teaser available for this post."}
                  </p>
                  <Link
                    href={`/manage/blog/update/${encodeURIComponent(row.slug)}`}
                    className="inline-block mt-4 text-primary font-medium text-sm sm:text-base"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
