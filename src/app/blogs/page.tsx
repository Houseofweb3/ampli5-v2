import React from "react";
import PrimaryButton from "@/src/components/ui/PrimaryButton";
import Link from "next/link";
import { getAllBlogs } from "@/src/data/blogs";
import type { Metadata } from "next";

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

/** Static build: list page is pre-rendered at build time */
export const dynamic = "force-static";

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
        url: "/logo/ampli5.png",
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

export default function BlogsPage(): JSX.Element {
  const posts = getAllBlogs();

  return (
    <div className="w-full h-full min-h-screen bg-cream-bg">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          <span className="text-dark-purple1-bg">Blogs</span>
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-10">
          Insights on distribution, growth, and the AI agent economy.
        </p>

        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <Link href={`/blogs/${post.slug}`} className="block p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h2>
                {post.date && (
                  <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                )}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="inline-block mt-4 text-primary font-medium text-sm sm:text-base">
                  Read more →
                </span>
              </Link>
            </article>
          ))}
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
