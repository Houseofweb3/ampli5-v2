import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs | Ampli5 - Web3 Marketing Insights",
  description:
    "Read the latest insights, industry updates, and expert articles about web3 marketing, influencer marketing, crypto PR, and AI-powered marketing solutions from Ampli5 (Ampli5).",
  keywords: [
    "web3 marketing blog",
    "crypto marketing insights",
    "Ampli5 blog",
    "Ampli5 articles",
    "web3 PR blog",
    "influencer marketing tips",
    "blockchain marketing news",
  ],
  openGraph: {
    title: "Blogs | Ampli5 - Web3 Marketing Insights",
    description: "Read the latest insights and expert articles about web3 marketing from Ampli5.",
    url: `${process.env.NEXTAUTH_URL || "https://ampli5.ai"}/blogs`,
  },
  alternates: {
    canonical: "/blogs",
  },
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
