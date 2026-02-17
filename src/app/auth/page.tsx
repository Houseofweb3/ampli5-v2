"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/src/store/auth";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter();
  const params = useSearchParams();
  const Auth = useAuthStore();
  const error = params.get("error");
  const [hasHandled, setHasHandled] = useState(false);
  useEffect(() => {
    if (hasHandled) return;

    const id = params.get("id");
    const name = params.get("name");
    const username = params.get("username");
    const profile_picture = params.get("profile_picture");
    const yaps_score = params.get("yaps");
    const auth = params.get("token");

    if (auth && id && username && yaps_score) {
      Auth.login({
        user: {
          id: id || "",
          username: username || "",
          yaps_score: Number(yaps_score) || 0,
          name: name || "",
          profile_picture: profile_picture || "",
        },
        token: auth,
      });
      toast.success("Login successfully", { duration: 2000 });
      const cleanUrl = window.location.origin;
      router.replace(cleanUrl, { scroll: false });
    }
    setHasHandled(true);
  }, [params, router, hasHandled, Auth]);

  useEffect(() => {
    const errorMessages = {
      Callback: "Login was cancelled or failed.",
      AccessDenied: "You denied access.",
      Configuration: "Auth config error.",
      OAuthSignin: "Provider issue. Try again.",
      OAuthCallback: "Something went wrong.",
      Default: "Unknown error occurred.",
    } as const;

    type ErrorKey = keyof typeof errorMessages;

    if (error) {
      console.log("calllll");

      toast.error(errorMessages[error as ErrorKey] || error, { duration: 2000 });
      const cleanUrl = window.location.origin;
      router.replace(cleanUrl, { scroll: false });
    }
  }, [error]);

  return <div className="h-screen bg-white" />;
};

export default Page;
