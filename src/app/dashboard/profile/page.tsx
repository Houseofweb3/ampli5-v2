"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { TbMailOpenedFilled } from "react-icons/tb";
import { useDashboardAuth } from "@/src/context/DashboardAuthContext";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const { client, logout } = useDashboardAuth();

  const profile = useMemo(() => {
    if (!client) {
      return {
        name: "",
        email: "",
        telegramId: null as string | null,
        whatsAppNumber: null as string | null,
      };
    }
    return {
      name: client.name || "",
      email: client.email || "",
      telegramId: client.telegramId ?? null,
      whatsAppNumber: client.whatsAppNumber ?? null,
    };
  }, [client]);

  const handleLogout = () => {
    logout();
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("cartData");
      } catch {
        /* ignore */
      }
    }
    router.push("/");
  };

  return (
    <div className="flex flex-col min-h-screen w-full px-4 md:px-12 py-8 font-Jakarta">
      <h1 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-4">Profile</h1>
      <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm p-6 md:p-8 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <div className="px-4 py-3 rounded-lg border border-gray-200 bg-gray-50/80 text-gray-900 font-[400] text-[15px] min-h-[48px] flex items-center">
              {profile.name || "—"}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="px-4 py-3 rounded-lg border border-gray-200 bg-gray-50/80 text-gray-900 font-[400] text-[15px] min-h-[48px] flex items-center gap-2">
              <TbMailOpenedFilled className="text-gray-500 shrink-0 text-lg" />
              <span>{profile.email || "—"}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Telegram ID</label>
            <div className="px-4 py-3 rounded-lg border border-gray-200 bg-gray-50/80 text-gray-900 font-[400] text-[15px] min-h-[48px] flex items-center">
              {profile.telegramId || "—"}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">WhatsApp Number</label>
            <div className="px-4 py-3 rounded-lg border border-gray-200 bg-gray-50/80 text-gray-900 font-[400] text-[15px] min-h-[48px] flex items-center">
              {profile.whatsAppNumber || "—"}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex gap-4 justify-between items-center">
          <Link href="/dashboard/influencers">
            <button
              type="button"
              className="px-5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
            >
              Back
            </button>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
