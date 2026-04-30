"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ManageIndexPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/manage/blogs");
  }, [router]);
  return (
    <div className="flex items-center justify-center min-h-[30vh] text-gray-500 text-sm">
      Loading…
    </div>
  );
}
