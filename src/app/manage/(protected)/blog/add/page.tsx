"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import { BlogEditorForm } from "@/src/components/manage/BlogEditorForm";
import { createManageBlog } from "@/src/services/manageBlog";
import type { ManageBlogPayload } from "@/src/types/manageBlog";

function errMsg(err: unknown): string {
  if (axios.isAxiosError(err) && err.response?.data) {
    const d = err.response.data as { error?: string; message?: string };
    if (d.error) return d.error;
    if (d.message) return d.message;
  }
  if (err instanceof Error) return err.message;
  return "Could not create post.";
}

export default function ManageBlogAddPage() {
  const router = useRouter();

  const handleSubmit = async (payload: ManageBlogPayload) => {
    try {
      await createManageBlog(payload);
      toast.success("Post created.");
      router.push("/manage/blogs");
    } catch (err) {
      toast.error(errMsg(err));
      throw err;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">New post</h1>
      <BlogEditorForm mode="add" onSubmit={handleSubmit} />
    </div>
  );
}
