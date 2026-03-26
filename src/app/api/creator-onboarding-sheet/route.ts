import { NextResponse } from "next/server";
import { google } from "googleapis";
import {
  ccpFromBuyingPrice,
  cpmFromSellingPrice,
  sellingPriceFromBuyingPrice,
  stripPriceToNumeric,
} from "@/src/lib/creatorOnboardingPricing";

// Must match creator-onboarding page Step 4 options (platform -> inventory item labels)
const PLATFORM_INVENTORY_OPTIONS: Record<string, string[]> = {
  X: [
    "Single tweet",
    "Thread (5–7 tweets)",
    "Quote tweet",
    "Pinned tweet (7 days)",
    "AMA (X Spaces – 60 mins)",
    "Article",
  ],
  Youtube: [
    "Integrated video (≤3 mins)",
    "Sponsored-by tag",
    "Dedicated review / breakdown video",
    "Streams/Live trading video",
    "Shorts",
  ],
  Instagram: [
    "IG Reel – Original (Creator produces content) ( 24 hours )",
    "IG Reel – Adapted (Brand provides content)( 24 hours )",
    "IG Reel – Repost (Brand provides content) ( 24h )",
    "IG Reel – Original (Creator produces content) ( 7 hours )",
    "IG Reel – Adapted (Brand provides content)( 7 hours )",
    "IG Reel – Repost (Brand provides content) ( 7h )",
    "Carousel (3–5 slides)",
    "Story sequence (3 slides)",
    "Link in bio placement (7 days)",
    "Reel pinned (7 days)",
    "IG Reel – Original (Creator produces content)",
  ],
  TikTok: [
    "Tik Tok Original(with collab tag)",
    "Tik Tok Adapted(with collab tag)",
    "Tik Tok Live",
    "Tik Tok Story(3 carousel stories)",
  ],
  Newsletter: [
    "Sponsored-by mention (top)",
    "Sponsored-by mention (footer)",
    "Contextual integration within main content",
  ],
  "PR/Editorial": ["Organic PR with backlink", "Thematic article (brand included in narrative)"],
  Spotify: [
    "Dedicated podcast episode",
    "Podcast sponsored mention",
    "Short clips distribution (IG / Shorts / TikTok)",
    "Short virtual podcast (IG / Shorts / TikTok)",
  ],
};

interface CreatorOnboardingInventoryItem {
  selected: boolean;
  rate: string;
  averageViews?: string;
  cpm?: string;
  ccp?: string;
}

interface CreatorOnboardingFormData {
  channelBrandName: string;
  primaryContactEmail: string;
  telegramId?: string;
  whatsappNumber?: string;
  primaryCountry?: string;
  primaryTimezone?: string;
  platforms?: string[];
  platformUrls?: Record<string, string>;
  industries?: string[];
  categories?: string[];
  inventoryItems?: Record<string, CreatorOnboardingInventoryItem>;
  primaryAudienceGeography?: string[];
  secondaryAudienceGeography?: string[];
  ageScreenshot?: string;
  genderScreenshot?: string;
  topCountriesScreenshot?: string;
  paymentTerms?: string;
  turnaroundTimes?: string[];
  firstCollaborationImage1?: string;
  firstCollaborationImage2?: string;
  firstCollaborationImage3?: string;
  xLink?: string;
  instagramLink?: string;
  youtubeLink?: string;
  tiktokLink?: string;
  newsletterLink?: string;
  finalConfirmation?: boolean;
}

function formatCpmForSheet(value: number): string {
  return value.toFixed(2);
}

export async function POST(request: Request) {
  try {
    const body: CreatorOnboardingFormData = await request.json();

    if (!body.channelBrandName?.trim()) {
      return NextResponse.json({ message: "Channel / Brand Name is required." }, { status: 400 });
    }
    if (!body.primaryContactEmail?.trim()) {
      return NextResponse.json({ message: "Primary Contact Email is required." }, { status: 400 });
    }

    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    const indiaTime = new Intl.DateTimeFormat("en-US", options).format(new Date());

    if (
      !process.env.SPREAD_SHEET_EMAIL ||
      !process.env.GOOGLE_KEY ||
      !process.env.SPREAD_SHEET_ID_FOR_CREATOR_ONBOARDING
    ) {
      console.error("Missing environment variables for creator onboarding sheet");
      return NextResponse.json({ message: "Server configuration error." }, { status: 500 });
    }

    let googleKey = process.env.GOOGLE_KEY;
    try {
      const parsed = JSON.parse(googleKey as string);
      if (parsed && parsed.private_key) {
        googleKey = parsed.private_key;
      }
    } catch {
      // Not JSON
    }
    if (
      googleKey &&
      ((googleKey.startsWith('"') && googleKey.endsWith('"')) ||
        (googleKey.startsWith("'") && googleKey.endsWith("'")))
    ) {
      googleKey = googleKey.slice(1, -1);
    }
    if (googleKey) {
      googleKey = googleKey.replace(/\\\\n/g, "\n");
      googleKey = googleKey.replace(/\\n/g, "\n");
    }
    googleKey = googleKey.trim();

    if (!googleKey || !googleKey.includes("BEGIN") || !googleKey.includes("PRIVATE KEY")) {
      console.error("Google Key invalid for creator onboarding sheet");
      return NextResponse.json(
        { message: "Server configuration error: Invalid key format." },
        { status: 500 }
      );
    }

    const client = new google.auth.JWT({
      email: process.env.SPREAD_SHEET_EMAIL,
      key: googleKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    try {
      await client.authorize();
    } catch (authError: unknown) {
      const msg = authError instanceof Error ? authError.message : String(authError);
      console.error("Google Auth Error:", msg);
      return NextResponse.json(
        {
          message: "Authentication failed. Please check server configuration.",
          error: process.env.NODE_ENV === "development" ? msg : undefined,
        },
        { status: 500 }
      );
    }

    const sheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = process.env.SPREAD_SHEET_ID_FOR_CREATOR_ONBOARDING;

    const platformUrls = body.platformUrls || {};
    const inventoryItems = body.inventoryItems || {};
    const platforms = body.platforms || [];

    /**
     * Column order (add header row in Sheet to match):
     * Date, Time, Channel/Brand, Email, Telegram, WhatsApp, Country, Timezone,
     * Platform, Platform Link, Inventory, Price/Rate (display), Buy price, Selling price (CSP),
     * Avg Views, CPM, CCP, Industries, Categories, Primary GEO, Secondary GEO,
     * Age / Gender / Top countries screenshots, Payment terms, Turnaround,
     * Collab images 1–3, X/IG/YT/TikTok/Newsletter links, Final confirmation
     */
    const commonFields = (
      platform: string,
      platformLink: string,
      inventory: string,
      priceDisplay: string,
      buyPriceStr: string,
      sellPriceStr: string,
      avgViews: string,
      cpmStr: string,
      ccpStr: string
    ) => [
      formattedDate,
      indiaTime,
      body.channelBrandName || "",
      body.primaryContactEmail || "",
      body.telegramId || "",
      body.whatsappNumber || "",
      body.primaryCountry || "",
      body.primaryTimezone || "",
      platform,
      platformLink,
      inventory,
      priceDisplay,
      buyPriceStr,
      sellPriceStr,
      avgViews,
      cpmStr,
      ccpStr,
      body.industries?.join(", ") || "",
      body.categories?.join(", ") || "",
      body.primaryAudienceGeography?.join(", ") || "",
      body.secondaryAudienceGeography?.join(", ") || "",
      body.ageScreenshot || "",
      body.genderScreenshot || "",
      body.topCountriesScreenshot || "",
      body.paymentTerms || "",
      body.turnaroundTimes?.join(", ") || "",
      body.firstCollaborationImage1 || "",
      body.firstCollaborationImage2 || "",
      body.firstCollaborationImage3 || "",
      body.xLink || "",
      body.instagramLink || "",
      body.youtubeLink || "",
      body.tiktokLink || "",
      body.newsletterLink || "",
      body.finalConfirmation ? "Yes" : "No",
    ];

    const values: string[][] = [];

    for (const platform of platforms) {
      const platformLink = platformUrls[platform] ?? "";
      const optionsForPlatform = PLATFORM_INVENTORY_OPTIONS[platform] ?? [];
      for (const item of optionsForPlatform) {
        const inv = inventoryItems[item];
        if (!inv?.selected) continue;
        const rate = inv.rate != null ? String(inv.rate).trim() : "";
        if (!rate || rate === "0") continue;
        const avgViewsRaw = inv.averageViews != null ? String(inv.averageViews).trim() : "";
        const priceDisplay = rate.startsWith("$") ? rate : `$${rate}`;

        const buyPrice = stripPriceToNumeric(rate);
        const sellPrice =
          buyPrice != null ? sellingPriceFromBuyingPrice(buyPrice) : null;
        const buyPriceStr = buyPrice != null ? String(buyPrice) : "";
        const sellPriceStr = sellPrice != null ? String(sellPrice) : "";

        const avgViewsNum = parseFloat(avgViewsRaw.replace(/,/g, "")) || 0;
        let cpmStr = "";
        const payloadCpm = inv.cpm != null ? String(inv.cpm).trim() : "";
        if (payloadCpm !== "") {
          cpmStr = payloadCpm;
        } else if (sellPrice != null) {
          const computed = cpmFromSellingPrice(sellPrice, avgViewsNum);
          if (computed != null) cpmStr = formatCpmForSheet(computed);
        }

        let ccpStr = "";
        if (buyPrice != null) {
          const computedCcp = ccpFromBuyingPrice(buyPrice, avgViewsNum);
          if (computedCcp != null) ccpStr = formatCpmForSheet(computedCcp);
        }

        values.push(
          commonFields(
            platform,
            platformLink,
            item,
            priceDisplay,
            buyPriceStr,
            sellPriceStr,
            avgViewsRaw,
            cpmStr,
            ccpStr
          )
        );
      }
    }

    if (values.length === 0) {
      values.push(
        commonFields("", "", "", "", "", "", "", "", "")
      );
    }

    const sheetName ="creator-onboarding";
    const range = `${sheetName}!A:AI`;

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: { values },
    });

    return NextResponse.json({ status: 200, message: "Form submitted successfully!" });
  } catch (error: unknown) {
    console.error("Error submitting creator onboarding form to sheet:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
