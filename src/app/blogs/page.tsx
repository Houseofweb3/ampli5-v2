import React from "react";
import Image from "next/image";
import PrimaryButton from "@/src/components/ui/PrimaryButton";
import Link from "next/link";
import type { Metadata } from "next";
import { PUBLIC_BLOG_REVALIDATE_SECONDS } from "@/src/config/publicBlogEndpoints";
import { fetchPublicBlogList, formatBlogDate } from "@/src/services/publicBlogs";

const BLOG_BASE_URL = process.env.NEXTAUTH_URL || "https://ampli5.ai";
const BLOG_LIST_KEYWORDS = [
  "Ampli5 blog",
  "distribution",
  "AI agents",
  "growth marketing",
  "influencer marketing",
  "content distribution",
  "AEO",
  "LLM marketing",
];

export const revalidate = PUBLIC_BLOG_REVALIDATE_SECONDS;

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Insights on distribution, growth, and the AI agent economy. Ampli5 blog on influencer marketing, content distribution, and growth.",
  keywords: BLOG_LIST_KEYWORDS,
  authors: [{ name: "Ampli5" }],
  creator: "Ampli5",
  publisher: "HOW3 PTE LTD",
  alternates: {
    canonical: `${BLOG_BASE_URL}/blogs`,
  },
  openGraph: {
    title: "Blogs | Ampli5",
    description:
      "Insights on distribution, growth, and the AI agent economy. Ampli5 blog on influencer marketing and content distribution.",
    url: `${BLOG_BASE_URL}/blogs`,
    siteName: "Ampli5",
    type: "website",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "Ampli5 - AI-Powered Influencer & PR Solutions",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs | Ampli5",
    description:
      "Insights on distribution, growth, and the AI agent economy. Ampli5 blog on influencer marketing and content distribution.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default async function BlogsPage(): Promise<JSX.Element> {
  const posts = await fetchPublicBlogList();

  return (
    <div className="w-full h-full min-h-screen bg-cream-bg">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          <span className="text-dark-purple1-bg">Blogs</span>
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-10">
          Insights on distribution, growth, and the AI agent economy.
        </p>

        <div className="space-y-8">
          {posts.length === 0 ? (
            <p className="text-gray-600 text-center py-12">No posts yet. Check back soon.</p>
          ) : (
            posts.map((post) => {
              const dateLabel = formatBlogDate(post.createdAt);
              return (
                <article
                  key={post.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <Link href={`/blogs/${post.slug}`} className="block sm:flex sm:gap-0">
                    {post.coverImage ? (
                      <div className="relative w-full sm:w-52 shrink-0 aspect-[16/10] sm:aspect-auto sm:min-h-[140px] bg-gray-100">
                        <Image
                          src={post.coverImage}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 208px"
                        />
                      </div>
                    ) : null}
                    <div className="p-6 sm:p-8 flex-1 min-w-0">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      {dateLabel ? <p className="text-sm text-gray-500 mb-2">{dateLabel}</p> : null}
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-2">
                        {post.teaser}
                      </p>
                      <span className="inline-block mt-4 text-primary font-medium text-sm sm:text-base">
                        Read more →
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 mx-auto">
          <Link href="/">
            <PrimaryButton className="text-white">Back to Home</PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
