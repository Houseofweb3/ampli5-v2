import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXTAUTH_URL || "https://ampli5.ai";

export default function robots(): MetadataRoute.Robots {
  return {
    host: baseUrl,
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/auth/", "/dashboard/", "/proposals/", "/proposals-pr/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
