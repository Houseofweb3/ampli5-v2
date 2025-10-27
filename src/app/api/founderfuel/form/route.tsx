import { NextResponse } from "next/server";
import { google } from "googleapis";

interface FormData {
  fullName: string;
  startupName: string;
  startupDescription: string;
  stage: string;
  generatingRevenue: string;
  monthlyRevenue: string;
  conversationTopics: string[];
  hateAboutGroups: string;
  yearsBuilding: string;
  openToMatching: string;
  city: string;
  heardAbout: string;
  preferredMode: string;
  otherTopic: string;
}

export async function POST(request: Request) {
  try {
    const formData: FormData = await request.json();

    // Validate required fields
    if (
      !formData.fullName?.trim() ||
      !formData.startupName?.trim() ||
      !formData.startupDescription?.trim()
    ) {
      return NextResponse.json(
        { message: "All required fields must be filled." },
        { status: 400 }
      );
    }

    // Check if Google Sheets environment variables are set
    const hasGoogleConfig =
      process.env.SPREAD_SHEET_EMAIL &&
      process.env.GOOGLE_KEY &&
      process.env.SPREAD_SHEET_ID;

    if (hasGoogleConfig) {
      try {
        // Authenticate with Google Sheets API
        const auth = new google.auth.GoogleAuth({
          credentials: {
            client_email: process.env.SPREAD_SHEET_EMAIL,
            private_key: process.env.GOOGLE_KEY?.replace(/\\n/g, "\n"),
          },
          scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        // Prepare the data to append
        const values = [
          [
            formData.fullName,
            formData.startupName,
            formData.startupDescription,
            formData.stage,
            formData.generatingRevenue,
            formData.monthlyRevenue,
            formData.conversationTopics.join("; "),
            formData.hateAboutGroups,
            formData.yearsBuilding,
            formData.openToMatching,
            formData.city,
            formData.heardAbout,
            formData.preferredMode,
            formData.otherTopic || "",
          ],
        ];

        // Append to Google Sheet
        const spreadsheetId = process.env.SPREAD_SHEET_ID;
        const range = "Sheet1!A1:N1"; // Fixed: Added exclamation mark

        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range,
          valueInputOption: "RAW",
          requestBody: { values },
        });

        console.log("Data successfully appended to Google Sheets");
      } catch (sheetsError: any) {
        console.error("Google Sheets integration error:", sheetsError);
        console.log("Form data logged instead:", formData);
      }
    } else {
      console.log(
        "Google Sheets environment variables not configured. Logging form data:",
        formData
      );
    }

    return NextResponse.json(
      {
        message: "Form submitted successfully!",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
