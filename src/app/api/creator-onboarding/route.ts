import { NextResponse } from "next/server";
import { google } from "googleapis";
import { sendNewEntryNotification } from "@/src/lib/email";

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

interface CreatorOnboardingFormData {
  // Step 1: Basic Details
  channelBrandName: string;
  primaryContactEmail: string;
  telegramId: string;
  whatsappNumber: string;
  primaryCountry: string;
  primaryTimezone: string;
  platforms: string[];
  platformUrls?: Record<string, string>;

  // Step 2: Industry selection
  industries: string[];

  // Step 3: Category Selection
  categories: string[];

  // Step 4: Inventory selection & Rates
  inventoryItems: Record<string, { selected: boolean; rate: string; averageViews?: string }>;

  // Step 5: Audience & GEO
  primaryAudienceGeography: string[];
  secondaryAudienceGeography: string[];

  // Step 6: Audience Proof (Images)
  ageScreenshot: string;
  genderScreenshot: string;
  topCountriesScreenshot: string;

  // Step 7: Payment Terms
  paymentTerms: string;

  // Step 8: Turnaround & Reliability
  turnaroundTimes: string[];

  // Step 9: Previous Collaborations
  firstCollaborationImage1: string;
  firstCollaborationImage2: string;
  firstCollaborationImage3: string;
  xLink: string;
  instagramLink: string;
  youtubeLink: string;
  tiktokLink: string;
  newsletterLink: string;

  // Step 10: Final Confirmation
  finalConfirmation: boolean;
}

export async function POST(request: Request) {
  try {
    const body: CreatorOnboardingFormData = await request.json();

    // Validate required fields
    if (!body.channelBrandName?.trim()) {
      return NextResponse.json({ message: "Channel / Brand Name is required." }, { status: 400 });
    }
    if (!body.primaryContactEmail?.trim()) {
      return NextResponse.json({ message: "Primary Contact Email is required." }, { status: 400 });
    }

    // Get date and time
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

    // Ensure environment variables are set
    if (
      !process.env.SPREAD_SHEET_EMAIL ||
      !process.env.GOOGLE_KEY ||
      !process.env.SPREAD_SHEET_ID_FOR_CREATOR_ONBOARDING
    ) {
      console.error("Missing environment variables");
      return NextResponse.json({ message: "Server configuration error." }, { status: 500 });
    }

    // Handle Google Key formatting
    let googleKey = process.env.GOOGLE_KEY;

    // Check if key is stored as JSON (full credentials object)
    try {
      const parsed = JSON.parse(googleKey);
      if (parsed && parsed.private_key) {
        googleKey = parsed.private_key;
      }
    } catch (e) {
      // Not JSON, continue with string processing
    }

    // Remove surrounding quotes if present
    if (
      googleKey &&
      ((googleKey.startsWith('"') && googleKey.endsWith('"')) ||
        (googleKey.startsWith("'") && googleKey.endsWith("'")))
    ) {
      googleKey = googleKey.slice(1, -1);
    }

    // Replace escaped newlines with actual newlines (handle both \n and \\n)
    if (googleKey) {
      googleKey = googleKey.replace(/\\\\n/g, "\n"); // Handle double-escaped
      googleKey = googleKey.replace(/\\n/g, "\n"); // Handle single-escaped
    }

    // Remove any stray quotes that might interfere
    googleKey = googleKey.trim();

    // Validate key is not empty
    if (!googleKey || googleKey.length === 0) {
      console.error("Google Key is empty after processing");
      return NextResponse.json(
        { message: "Server configuration error: Invalid key format." },
        { status: 500 }
      );
    }

    // Validate key format
    if (!googleKey.includes("BEGIN") || !googleKey.includes("PRIVATE KEY")) {
      console.error("Google Key does not appear to be in correct format");
      return NextResponse.json(
        { message: "Server configuration error: Invalid key format." },
        { status: 500 }
      );
    }

    // Create JWT client
    const client = new google.auth.JWT({
      email: process.env.SPREAD_SHEET_EMAIL,
      key: googleKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    try {
      await client.authorize();
    } catch (authError: any) {
      console.error("Google Auth Error:", authError.message);
      return NextResponse.json(
        {
          message: "Authentication failed. Please check server configuration.",
          error: process.env.NODE_ENV === "development" ? authError.message : undefined,
        },
        { status: 500 }
      );
    }

    const sheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = process.env.SPREAD_SHEET_ID_FOR_CREATOR_ONBOARDING;

    // Build one row per (platform + inventory item). Each row has: common form data + Platform, Platform Link, Inventory, Price, Avg Views.
    const platformUrls = body.platformUrls || {};
    const inventoryItems = body.inventoryItems || {};
    const platforms = body.platforms || [];

    const commonFields = (
      platform: string,
      platformLink: string,
      inventory: string,
      price: string,
      avgViews: string
    ) => [
      formattedDate, // Date
      indiaTime, // Time
      body.channelBrandName || "", // Channel / Brand Name
      body.primaryContactEmail || "", // Primary Contact Email
      body.telegramId || "", // Telegram ID
      body.whatsappNumber || "", // WhatsApp Number
      body.primaryCountry || "", // Primary Country
      body.primaryTimezone || "", // Primary Timezone
      platform, // Platform (e.g. X, Youtube)
      platformLink, // Platform Link (profile/channel URL)
      inventory, // Inventory type (e.g. Shorts, Single tweet)
      price, // Price / Rate (e.g. $200)
      avgViews, // Avg Views
      body.industries?.join(", ") || "", // Industries
      body.categories?.join(", ") || "", // Categories
      body.primaryAudienceGeography?.join(", ") || "", // Primary Audience Geography
      body.secondaryAudienceGeography?.join(", ") || "", // Secondary Audience Geography
      body.ageScreenshot || "", // Age Screenshot URL
      body.genderScreenshot || "", // Gender Screenshot URL
      body.topCountriesScreenshot || "", // Top Countries Screenshot URL
      body.paymentTerms || "", // Payment Terms
      body.turnaroundTimes?.join(", ") || "", // Turnaround Times
      body.firstCollaborationImage1 || "", // First Collaboration Image 1 URL
      body.firstCollaborationImage2 || "", // First Collaboration Image 2 URL
      body.firstCollaborationImage3 || "", // First Collaboration Image 3 URL
      body.xLink || "", // X Link
      body.instagramLink || "", // Instagram Link
      body.youtubeLink || "", // YouTube Link
      body.tiktokLink || "", // TikTok Link
      body.newsletterLink || "", // Newsletter Link
      body.finalConfirmation ? "Yes" : "No", // Final Confirmation
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
        const avgViews = inv.averageViews != null ? String(inv.averageViews).trim() : "";
        const priceDisplay = rate.startsWith("$") ? rate : `$${rate}`;
        values.push(commonFields(platform, platformLink, item, priceDisplay, avgViews));
      }
    }

    // If no rows (edge case: no platforms or no selected inventory), append one row with common data and empty platform/inventory columns
    if (values.length === 0) {
      values.push(commonFields("", "", "", "", ""));
    }

    const sheetName = process.env.SPREAD_SHEET_NAME || "creator-onboarding";
    const range = `${sheetName}!A:AE`;

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: { values },
    });

    // Notify team after successful sheet save
    const summary = [
      `New Creator Onboarding entry`,
      `Channel/Brand: ${body.channelBrandName || "-"}`,
      `Email: ${body.primaryContactEmail || "-"}`,
      `Platforms: ${body.platforms?.join(", ") || "-"}`,
      `Submitted at: ${formattedDate} ${indiaTime}`,
    ].join("\n");
    await sendNewEntryNotification({
      formType: "creator",
      subject: "New Creator Onboarding – " + (body.channelBrandName || "New entry"),
      summary,
    });

    return NextResponse.json({ status: 200, message: "Form submitted successfully!" });
  } catch (error: unknown) {
    console.error("Error submitting creator onboarding form:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
