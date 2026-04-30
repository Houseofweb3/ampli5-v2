"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { BlogContentBlock, BlogListItem, BlogRichSegment } from "@/src/data/blogs";

const blockClasses = "text-gray-700 leading-relaxed";

const linkClassName =
  "text-primary hover:text-primaryHover font-medium underline underline-offset-2";

function ListItemContent({ item }: { item: BlogListItem }) {
  if (typeof item === "string") {
    return <>{item}</>;
  }
  return (
    <>
      {item.segments.map((segment, j) => (
        <RichSegment key={j} segment={segment} />
      ))}
    </>
  );
}

function RichSegment({ segment }: { segment: BlogRichSegment }) {
  if (segment.kind === "text") {
    return <>{segment.text}</>;
  }
  const isExternal =
    segment.external === true ||
    segment.href.startsWith("http://") ||
    segment.href.startsWith("https://");
  if (isExternal) {
    return (
      <a href={segment.href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
        {segment.text}
      </a>
    );
  }
  return (
    <Link href={segment.href} className={linkClassName}>
      {segment.text}
    </Link>
  );
}

export function BlockRenderer({ block }: { block: BlogContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className={blockClasses}>{block.content}</p>;
    case "richParagraph":
      return (
        <p className={blockClasses}>
          {block.segments.map((segment, i) => (
            <RichSegment key={i} segment={segment} />
          ))}
        </p>
      );
    case "paragraphSmall":
      return (
        <p className={`${blockClasses} text-sm sm:text-base text-gray-600`}>{block.content}</p>
      );
    case "heading":
      return (
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 mt-10 sm:mt-14 first:mt-0">
          {block.href ? (
            <Link
              href={block.href}
              className="text-gray-900 underline underline-offset-4 decoration-primary text-primary"
            >
              {block.content}
            </Link>
          ) : (
            block.content
          )}
        </h2>
      );
    case "list":
      return (
        <ul
          className={`list-disc pl-6 space-y-2 ${blockClasses} ${block.ordered ? "list-decimal" : ""}`}
        >
          {block.items.map((item, i) => (
            <li key={i}>
              <ListItemContent item={item} />
            </li>
          ))}
        </ul>
      );
    case "listSimple":
      return (
        <ul className="list-none space-y-1 pl-0 text-gray-800">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "blockquote":
      return (
        <blockquote className="border-l-4 border-primary pl-5 py-2 my-6 bg-white/60 rounded-r-lg text-gray-800 italic">
          {block.lines.map((line, i) => (
            <span key={i}>
              {line}
              {i < block.lines.length - 1 && <br />}
            </span>
          ))}
        </blockquote>
      );
    case "emphasis":
      if (block.variant === "primary") {
        return <p className={`${blockClasses} font-semibold text-primary`}>{block.content}</p>;
      }
      return <p className={`${blockClasses} font-semibold text-gray-900`}>{block.content}</p>;
    case "emphasisLarge":
      if (block.variant === "primary") {
        return (
          <p className="text-lg sm:text-xl font-bold text-primary">
            {block.href ? (
              <Link
                href={block.href}
                className="text-primary hover:text-primaryHover underline underline-offset-4"
              >
                {block.content}
              </Link>
            ) : (
              block.content
            )}
          </p>
        );
      }
      return (
        <p className="text-lg sm:text-xl font-bold text-gray-900">
          {block.href ? (
            <Link
              href={block.href}
              className="text-gray-900 hover:text-primary underline underline-offset-4"
            >
              {block.content}
            </Link>
          ) : (
            block.content
          )}
        </p>
      );
    case "lines":
      return (
        <div className={blockClasses}>
          {block.lines.map((line, i) => (
            <span key={i}>
              {line}
              {i < block.lines.length - 1 && <br />}
            </span>
          ))}
        </div>
      );
    case "image":
      return (
        <figure className="my-8 sm:my-10 w-full">
          <div className="relative w-full aspect-[16/10] sm:aspect-[2/1] min-h-[200px] rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 672px"
              className="object-contain"
            />
          </div>
          {block.alt && (
            <figcaption className="mt-2 text-sm text-gray-500 text-center">{block.alt}</figcaption>
          )}
        </figure>
      );
    case "htmlBody":
      return (
        <div
          className={`${blockClasses} manage-blog-html-body max-w-none space-y-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-900 [&_p]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-5 [&_blockquote]:py-2 [&_blockquote]:my-6 [&_blockquote]:italic [&_blockquote]:bg-white/60 [&_blockquote]:rounded-r-lg [&_a]:text-primary [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-primaryHover [&_a_strong]:text-primary [&_strong_a]:text-primary [&_img]:max-w-full [&_img]:rounded-lg [&_strong]:text-gray-900`}
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );
    default:
      return null;
  }
}

export function BlogContent({ blocks }: { blocks: BlogContentBlock[] }) {
  return (
    <div className="max-w-2xl space-y-5">
      {blocks.map((block, i) => (
        <BlockRenderer key={i} block={block} />
      ))}
    </div>
  );
}
