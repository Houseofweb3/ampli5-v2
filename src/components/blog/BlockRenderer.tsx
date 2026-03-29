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
      return <p className={`${blockClasses} text-sm sm:text-base text-gray-600`}>{block.content}</p>;
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
