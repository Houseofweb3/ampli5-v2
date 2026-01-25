import { NextResponse } from "next/server";
import { google } from "googleapis";

interface BrandIntakeFormData {
    // Step 1: Brand Snapshot
    brandProductName: string;
    websiteLink: string;
    primaryContactEmail: string;
    telegramId: string;
    whatsappNumber: string;

    // Step 2: Market & Audience Readiness
    categories: string[];

    // Step 3: Campaign Goal
    campaignGoals: string[];

    // Step 4: Revenue Model & Market focus
    monetizationModel: string[];

    // Step 5: Demographics
    primaryAudienceGeography: string[];
    ageRange: string;
    genderSkew: string;

    // Step 6: Timeline
    campaignStartTimeline: string;

    // Step 7: Custom Brief
    customBrief: string;
}

export async function POST(request: Request) {
  try {
    const body: BrandIntakeFormData = await request.json();

    // Validate required fields
    if (!body.brandProductName?.trim()) {
      return NextResponse.json(
        { message: "Brand Product Name is required." },
        { status: 400 }
      );
    }
    if (!body.websiteLink?.trim()) {
      return NextResponse.json(
        { message: "Website Link is required." },
        { status: 400 }
      );
    }
    if (!body.primaryContactEmail?.trim()) {
      return NextResponse.json(
        { message: "Primary Contact Email is required." },
        { status: 400 }
      );
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

    const indiaTime = new Intl.DateTimeFormat("en-US", options).format(
      new Date()
    );

    // Ensure environment variables are set
    if (
      !process.env.SPREAD_SHEET_EMAIL ||
            !process.env.GOOGLE_KEY ||
            !process.env.SPREAD_SHEET_ID_FOR_BRABD_INTAKE
    ) {
      console.error("Missing environment variables");
      return NextResponse.json(
        { message: "Server configuration error." },
        { status: 500 }
      );
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
          error:
                        process.env.NODE_ENV === "development"
                          ? authError.message
                          : undefined,
        },
        { status: 500 }
      );
    }

    const sheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = process.env.SPREAD_SHEET_ID_FOR_BRABD_INTAKE;

    // Prepare values array - ONLY fields that exist in the form UI
    // Column order: Date, Time, Brand Product Name, Website Link, Primary Contact Email, 
    // Telegram ID, WhatsApp Number, Categories, Campaign Goals, Monetization Model,
    // Primary Audience Geography, Age Range, Gender Skew, Campaign Start Timeline, Custom Brief
    const values = [
      [
        formattedDate, // Date
        indiaTime, // Time
        body.brandProductName || "", // Brand Product Name
        body.websiteLink || "", // Website Link
        body.primaryContactEmail || "", // Primary Contact Email
        body.telegramId || "", // Telegram ID
        body.whatsappNumber || "", // WhatsApp Number
        body.categories?.join(", ") || "", // Categories
        body.campaignGoals?.join(", ") || "", // Campaign Goals
        body.monetizationModel?.join(", ") || "", // Monetization Model
        body.primaryAudienceGeography?.join(", ") || "", // Primary Audience Geography
        body.ageRange || "", // Age Range
        body.genderSkew || "", // Gender Skew
        body.campaignStartTimeline || "", // Campaign Start Timeline
        body.customBrief || "", // Custom Brief
      ],
    ];

    // Use append with proper A1 notation range
    // For append operations, you can use the sheet name with column range
    // If the sheet name doesn't exist, it will fail. Use the actual sheet name from your Google Sheet
    // You can also set this via environment variable: SPREAD_SHEET_NAME
    const sheetName = process.env.SPREAD_SHEET_NAME || "Sheet1";
    const range = `${sheetName}!A:Z`;

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: { values },
    });

    return NextResponse.json({ status: 200, message: "Form submitted successfully!" });
  } catch (error: any) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
