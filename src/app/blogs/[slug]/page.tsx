import React from "react";
import Image from "next/image";
import Container from "@/src/components/ui/container";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogBySlug, getBlogSlugs } from "@/src/data/blogs";
import { BlogContent } from "@/src/components/blog/BlockRenderer";

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

/** Static build: pre-render all blog post pages at build time */
export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return { title: "Blog | Ampli5" };
  const canonical = `${BLOG_BASE_URL}/blogs/${slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    keywords: [...BLOG_DEFAULT_KEYWORDS, post.title],
    authors: [{ name: "Ampli5" }],
    creator: "Ampli5",
    publisher: "HOW3 PTE LTD",
    alternates: {
      canonical,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: canonical,
      siteName: "Ampli5",
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
      title: post.title,
      description: post.excerpt,
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
  const post = getBlogBySlug(slug);
  if (!post) notFound();

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
          {(post.author || post.date) && (
            <p className="mt-3 text-sm text-gray-500">
              {post.author ? <span>By {post.author}</span> : null}
              {post.author && post.date ? " · " : null}
              {post.date ? <span>{post.date}</span> : null}
            </p>
          )}
        </header>
        {post.heroImage && (
          <figure className="w-full -mx-4 sm:mx-0 sm:rounded-xl overflow-hidden mb-10 sm:mb-14 aspect-[16/10]  relative bg-gray-100">
            <Image
              src={post.heroImage.src}
              alt={post.heroImage.alt}
              fill
              sizes="w-full h-full"
              className="object-cover"
              priority
            />
          </figure>
        )}

       

        <div className="max-w-2xl space-y-14 sm:space-y-16">
          <BlogContent blocks={post.content} />
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
