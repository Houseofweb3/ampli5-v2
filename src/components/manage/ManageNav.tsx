"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useManageWebUserAuthStore } from "@/src/store/manageWebUserAuthStore";

export function ManageNav() {
  const router = useRouter();
  const user = useManageWebUserAuthStore((s) => s.user);
  const logout = useManageWebUserAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    router.replace("/manage/login");
  };

  return (
    <header className="border-b bg-gray-100  border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 mt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
          <Link href="/manage/blogs" className="text-gray-900 hover:text-primary">
            All posts
          </Link>
          <Link href="/manage/blog/add" className="text-gray-900 hover:text-primary">
            New post
          </Link>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-600 truncate max-w-[200px]" title={user?.email}>
            {user?.email}
          </span>
          <button
            type="button"
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-800 hover:bg-gray-50"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
