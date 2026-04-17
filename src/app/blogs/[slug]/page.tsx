import React from "react";
import Image from "next/image";
import Container from "@/src/components/ui/container";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PUBLIC_BLOG_REVALIDATE_SECONDS } from "@/src/config/publicBlogEndpoints";
import { BlogContent } from "@/src/components/blog/BlockRenderer";
import {
  type PublicBlogDetail,
  fetchPublicBlogBySlug,
  fetchPublicBlogList,
  formatBlogDate,
  isValidPublicBlogSlug,
  publicBlogContentBlocks,
} from "@/src/services/publicBlogs";

const BLOG_BASE_URL = process.env.NEXTAUTH_URL || "https://ampli5.ai";
const BLOG_DEFAULT_KEYWORDS = [
  "Ampli5",
  "distribution",
  "AI agents",
  "growth marketing",
  "influencer marketing",
  "content distribution",
  "AEO",
  "LLM marketing",
];

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = PUBLIC_BLOG_REVALIDATE_SECONDS;
export const dynamicParams = true;

export async function generateStaticParams() {
  const blogs = await fetchPublicBlogList();
  return blogs.filter((b) => isValidPublicBlogSlug(b.slug)).map((b) => ({ slug: b.slug }));
}

function keywordList(post: PublicBlogDetail): string[] {
  const fromSeo = post.seoKeywords
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return [...BLOG_DEFAULT_KEYWORDS, ...fromSeo, post.title];
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isValidPublicBlogSlug(slug)) return { title: "Blog | Ampli5" };

  const post = await fetchPublicBlogBySlug(slug);
  if (!post) return { title: "Blog | Ampli5" };

  const title = post.seoTitle?.trim() || post.title;
  const description = post.seoDescription?.trim() || post.teaser || post.title;
  const canonical = `${BLOG_BASE_URL}/blogs/${slug}`;
  const ogImage =
    post.coverImage && (post.coverImage.startsWith("https://") || post.coverImage.startsWith("http://"))
      ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }]
      : [
          {
            url: "/logo.svg",
            width: 1200,
            height: 630,
            alt: "Ampli5 - AI-Powered Influencer & PR Solutions",
          },
        ];

  const publishedTime = post.createdAt?.trim() || undefined;
  const modifiedTime = post.updatedAt?.trim() || publishedTime;

  return {
    title,
    description,
    keywords: keywordList(post),
    authors: [{ name: post.author?.trim() || "Ampli5" }],
    creator: "Ampli5",
    publisher: "HOW3 PTE LTD",
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
      siteName: "Ampli5",
      images: ogImage,
      locale: "en_US",
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage.map((img) => img.url),
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
}

function BlogLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-primary hover:text-primaryHover font-medium underline underline-offset-2"
    >
      {children}
    </Link>
  );
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  if (!isValidPublicBlogSlug(slug)) notFound();

  const post = await fetchPublicBlogBySlug(slug);
  if (!post) notFound();

  const dateLabel = formatBlogDate(post.createdAt);
  const blocks = publicBlogContentBlocks(post.content);
  const heroSrc = post.coverImage?.trim() || null;

  return (
    <article className="bg-cream-bg min-h-screen">
      <Container className="py-8 sm:py-12 lg:py-16">
        <nav className="mb-6 sm:mb-8">
          <BlogLink href="/blogs">← Back to Blogs</BlogLink>
        </nav>
        <header className="max-w-3xl mb-10 sm:mb-14">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            {post.title}
          </h1>
          {(post.author?.trim() || dateLabel) && (
            <p className="mt-3 text-sm text-gray-500">
              {post.author?.trim() ? <span>By {post.author.trim()}</span> : null}
              {post.author?.trim() && dateLabel ? " · " : null}
              {dateLabel ? <span>{dateLabel}</span> : null}
            </p>
          )}
        </header>
        {heroSrc ? (
          <figure className="w-full -mx-4 sm:mx-0 sm:rounded-xl overflow-hidden mb-10 sm:mb-14 aspect-[16/10]  relative bg-gray-100">
            <Image
              src={heroSrc}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
              priority
              unoptimized={
                heroSrc.startsWith("data:") ||
                heroSrc.startsWith("blob:") ||
                heroSrc.startsWith("//")
              }
            />
          </figure>
        ) : null}

        <div className="max-w-2xl space-y-14 sm:space-y-16">
          <BlogContent blocks={blocks} />
        </div>

        <footer className="mt-14 sm:mt-20 pt-10 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <BlogLink href="/blogs">← Back to Blogs</BlogLink>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primaryHover transition-colors"
            >
              Explore Ampli5
            </Link>
          </div>
        </footer>
      </Container>
    </article>
  );
}
