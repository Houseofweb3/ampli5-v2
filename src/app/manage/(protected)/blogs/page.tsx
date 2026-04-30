"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import axios from "axios";
import ConfirmationModal from "@/src/components/ui/ConfirmationModal";
import { listManageBlogs, deleteManageBlog } from "@/src/services/manageBlog";
import type { ManageBlog } from "@/src/types/manageBlog";

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
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [deletePending, setDeletePending] = useState(false);

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

  const confirmDelete = useCallback(async () => {
    if (!deleteTarget) return;
    setDeletePending(true);
    try {
      await deleteManageBlog(deleteTarget.id);
      toast.success("Post deleted.");
      setDeleteTarget(null);
      void load();
    } catch (err) {
      toast.error(listErrorMessage(err));
    } finally {
      setDeletePending(false);
    }
  }, [deleteTarget, load]);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog posts</h1>
          <p className="text-gray-600 text-sm mt-1">Create, edit, or remove posts.</p>
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
          {rows.map((row) => {
            const dateLabel = formatBlogDate(row.createdAt || row.updatedAt);
            const editHref = `/manage/blog/update/${encodeURIComponent(row.slug)}`;
            const cover = row.coverImageUrl?.trim() || null;
            const coverUnoptimized = Boolean(
              cover?.startsWith("data:") || cover?.startsWith("blob:")
            );
            return (
              <li key={row.id}>
                <article className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-stretch">
                  <div className="relative w-full sm:w-48 md:w-52 shrink-0 aspect-[16/10] sm:aspect-square bg-gray-100">
                    {cover ? (
                      <Image
                        src={row.coverImageUrl || "/logo.svg"}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 208px"
                        unoptimized={coverUnoptimized}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs font-medium px-3 text-center">
                        No cover
                      </div>
                    )}
                  </div>
                  <div className="p-6 sm:p-8 flex-1 min-w-0 flex flex-col">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 line-clamp-2 mb-2">
                          {row.title}
                        </h2>
                        {dateLabel ? (
                          <p className="text-sm text-gray-500 mb-1">{dateLabel}</p>
                        ) : null}
                        <p className="text-xs text-gray-500 font-mono truncate mb-2">{row.slug}</p>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-3">
                          {row.teaser || "No teaser available for this post."}
                        </p>
                        <Link
                          href={editHref}
                          className="inline-block mt-4 text-primary font-medium text-sm sm:text-base hover:text-primaryHover"
                        >
                          Read more →
                        </Link>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Link
                          href={editHref}
                          className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm text-gray-800 hover:bg-gray-50"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget({ id: row.id, title: row.title })}
                          disabled={deletePending}
                          className="px-3 py-1.5 rounded-lg border border-red-200 text-sm text-red-700 hover:bg-red-50 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}

      <ConfirmationModal
        isOpen={deleteTarget != null}
        onClose={() => {
          if (!deletePending) setDeleteTarget(null);
        }}
        onConfirm={confirmDelete}
        closeOnConfirm={false}
        isPending={deletePending}
        variant="danger"
        title="Delete this post?"
        message={
          deleteTarget
            ? `“${deleteTarget.title}” will be permanently removed. This cannot be undone.`
            : ""
        }
        confirmText="Delete post"
        cancelText="Keep post"
        pendingConfirmText="Deleting…"
      />
    </div>
  );
}
