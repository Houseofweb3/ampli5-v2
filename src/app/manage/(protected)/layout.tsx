"use client";

import ManageAuthGuard from "@/src/components/manage/ManageAuthGuard";
import { ManageNav } from "@/src/components/manage/ManageNav";

export default function ManageProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <ManageAuthGuard>
      <ManageNav />
      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
    </ManageAuthGuard>
  );
}
