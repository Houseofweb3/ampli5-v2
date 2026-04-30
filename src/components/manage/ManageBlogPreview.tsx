"use client";

import React from "react";
import Image from "next/image";
import Container from "@/src/components/ui/container";
import { BlogContent } from "@/src/components/blog/BlockRenderer";
import type { BlogContentBlock } from "@/src/data/blogs";

export interface ManageBlogPreviewProps {
  title: string;
  slug: string;
  teaser: string;
  author: string;
  coverImageUrl: string | null;
  contentHtml: string;
}

/**
 * Article-only preview: matches public blog body (cream background, header, hero, content)
 * without draft labels or site navigation.
 */
export function ManageBlogPreview({
  title,
  author,
  coverImageUrl,
  contentHtml,
}: ManageBlogPreviewProps) {
  const blocks: BlogContentBlock[] = [
    { type: "htmlBody", html: contentHtml?.trim() ? contentHtml : "<p></p>" },
  ];

  return (
    <article className="bg-cream-bg min-h-screen rounded-xl border border-gray-200 overflow-hidden shadow-inner">
      <Container className="py-8 sm:py-12 lg:py-16">
        <header className="max-w-3xl mb-10 sm:mb-14">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            {title.trim() || "Untitled"}
          </h1>
          {author.trim() ? (
            <p className="mt-3 text-sm text-gray-500">
              <span>By {author.trim()}</span>
            </p>
          ) : null}
        </header>
        {coverImageUrl ? (
          <figure className="w-full -mx-4 sm:mx-0 sm:rounded-xl overflow-hidden mb-10 sm:mb-14 aspect-[16/10] relative bg-gray-100">
            <Image
              src={coverImageUrl}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
              unoptimized={coverImageUrl.startsWith("data:") || coverImageUrl.startsWith("blob:")}
            />
          </figure>
        ) : null}

        <div className="max-w-2xl space-y-14 sm:space-y-16">
          <BlogContent blocks={blocks} />
        </div>
      </Container>
    </article>
  );
}
