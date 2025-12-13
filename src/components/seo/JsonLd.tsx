import React from "react";

interface JsonLdProps {
  data: object;
}

/**
 * JsonLd component for rendering structured data (JSON-LD) in the page head
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Organization schema for structured data
 */
export function getOrganizationSchema() {
  const baseUrl = process.env.NEXTAUTH_URL || "https://ampli5.ai";
  
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ampli5",
    url: baseUrl,
    logo: `${baseUrl}/logo/ampli5.png`,
    description: "AI-powered influencer marketing and PR solutions for web3 projects",
    foundingDate: "2024",
    legalName: "HOW3 PTE LTD",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "contact@ampli5.ai",
    },
    sameAs: [
      "https://twitter.com/nomo_nomaya",
      // Add other social media links as needed
    ],
  };
}

/**
 * Website schema for structured data
 */
export function getWebsiteSchema() {
  const baseUrl = process.env.NEXTAUTH_URL || "https://ampli5.ai";
  
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ampli5",
    url: baseUrl,
    description: "AI-powered influencer marketing and PR solutions for web3 projects",
    publisher: {
      "@type": "Organization",
      name: "Ampli5",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Service schema for structured data
 */
export function getServiceSchema() {
  const baseUrl = process.env.NEXTAUTH_URL || "https://ampli5.ai";
  
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Influencer Marketing & PR Services",
    provider: {
      "@type": "Organization",
      name: "Ampli5",
      url: baseUrl,
    },
    areaServed: "Worldwide",
    description: "AI-powered influencer marketing and PR solutions for web3 projects. Connect with top crypto influencers, launch founder-led marketing campaigns, and amplify your brand.",
    offers: {
      "@type": "Offer",
      description: "Web3 influencer marketing and PR services",
      category: "Marketing Services",
    },
  };
}

/**
 * SoftwareApplication schema for structured data
 */
export function getSoftwareApplicationSchema() {
  const baseUrl = process.env.NEXTAUTH_URL || "https://ampli5.ai";
  
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Ampli5",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: "AI-powered platform for influencer marketing and PR solutions in the web3 space",
    url: baseUrl,
    publisher: {
      "@type": "Organization",
      name: "HOW3 PTE LTD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: "100",
    },
  };
}

