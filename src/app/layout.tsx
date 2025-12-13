import type { Metadata } from "next";
import { Bricolage_Grotesque } from 'next/font/google';
import { SessionProvider } from "next-auth/react";
import { auth } from "../../auth";

import "./globals.css";
import { LogCartProvider } from "../context/InfluencersContext";
import { LogpackageProvider } from "../context/PackagesContext";
import { CartProvider } from "../context/CartContext";
import { ToastProvider } from "../components/toast";
import Footer from "../components/ui/Footer";
import Navbar from "../components/Navbar";
import Toast from "../components/ui/toster";
import JsonLd, {
  getOrganizationSchema,
  getWebsiteSchema,
  getServiceSchema,
  getSoftwareApplicationSchema,
} from "../components/seo/JsonLd";


const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
});


export const metadata: Metadata = {
  title: {
    default: "Ampli5 | AI-Powered Influencer & PR Solutions for Web3",
    template: "%s | Ampli5",
  },
  description: "Ampli5 (Ampli5) - AI-powered influencer marketing and PR solutions for web3 projects. Connect with top crypto influencers, launch founder-led marketing campaigns, and amplify your brand with cutting-edge AI technology.",
  keywords: [
    "Ampli5",
    "Ampli5",
    "web3 influencer marketing",
    "crypto influencer marketing",
    "AI-powered PR",
    "web3 PR solutions",
    "founder-led marketing",
    "crypto marketing",
    "blockchain influencer",
    "web3 brand amplification",
    "AEO marketing",
    "LLM marketing",
    "UGC creator platform",
    "web3 advertising",
    "crypto PR agency",
  ],
  authors: [{ name: "Ampli5" }],
  creator: "Ampli5",
  publisher: "HOW3 PTE LTD",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://ampli5.ai"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXTAUTH_URL || "https://ampli5.ai",
    siteName: "Ampli5",
    title: "Ampli5 | AI-Powered Influencer & PR Solutions for Web3",
    description: "Ampli5 (Ampli5) - AI-powered influencer marketing and PR solutions for web3 projects. Connect with top crypto influencers and amplify your brand.",
    images: [
      {
        url: "/logo/ampli5.png",
        width: 1200,
        height: 630,
        alt: "Ampli5 - AI-Powered Influencer & PR Solutions for Web3",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ampli5 | AI-Powered Influencer & PR Solutions for Web3",
    description: "Ampli5 (Ampli5) - AI-powered influencer marketing and PR solutions for web3 projects.",
    images: ["/logo/ampli5.png"],
    creator: "@nomo_nomaya",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className={`scroll-smooth`}>
      <body className={`${bricolage.variable}`}>
        <JsonLd data={getOrganizationSchema()} />
        <JsonLd data={getWebsiteSchema()} />
        <JsonLd data={getServiceSchema()} />
        <JsonLd data={getSoftwareApplicationSchema()} />
        <Toast />
        <ToastProvider />
        <SessionProvider session={session}>
          <CartProvider>
            <LogCartProvider>
              <LogpackageProvider>
                <Navbar />
                <div className="h-[65px] lg:h-80px w-full bg-black"></div>
                <div className="min-h-[calc(100vh_-_295px)] bg-cream-bg">{children}</div>
                <Footer />
              </LogpackageProvider>
            </LogCartProvider>
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
