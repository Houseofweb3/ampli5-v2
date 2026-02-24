"use client";

import React from "react";
import type { BlogContentBlock } from "@/src/data/blogs";

const blockClasses = "text-gray-700 leading-relaxed";

export function BlockRenderer({ block }: { block: BlogContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className={blockClasses}>{block.content}</p>;
    case "paragraphSmall":
      return <p className={`${blockClasses} text-sm sm:text-base text-gray-600`}>{block.content}</p>;
    case "heading":
      return (
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 mt-10 sm:mt-14 first:mt-0">
          {block.content}
        </h2>
      );
    case "list":
      return (
        <ul
          className={`list-disc pl-6 space-y-2 ${blockClasses} ${block.ordered ? "list-decimal" : ""}`}
        >
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
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
        return <p className="text-lg sm:text-xl font-bold text-primary">{block.content}</p>;
      }
      return <p className="text-lg sm:text-xl font-bold text-gray-900">{block.content}</p>;
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
