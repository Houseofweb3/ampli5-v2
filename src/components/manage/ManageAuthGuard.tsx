"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  rehydrateManageWebUserAuth,
  useManageWebUserAuthStore,
} from "@/src/store/manageWebUserAuthStore";

const MANAGE_LOGIN = "/manage/login";

export default function ManageAuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const token = useManageWebUserAuthStore((s) => s.token);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const done = () => {
      if (!cancelled) setReady(true);
    };
    rehydrateManageWebUserAuth().then(done);
    const t = setTimeout(done, 800);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (!token) {
      router.replace(`${MANAGE_LOGIN}?next=${encodeURIComponent(pathname || "/manage/blogs")}`);
    }
  }, [ready, token, router, pathname]);

  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] bg-gray-50">
        <p className="text-gray-500">Loading…</p>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] bg-gray-50">
        <p className="text-gray-500">Redirecting to sign in…</p>
      </div>
    );
  }

  return <>{children}</>;
}
